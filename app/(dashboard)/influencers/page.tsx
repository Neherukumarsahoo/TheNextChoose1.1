import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoadingLink } from "@/components/ui/loading-link"
import { Plus } from "lucide-react"
import { canApproveInfluencer } from "@/lib/permissions"
import { SearchInput } from "@/components/ui/search-input"
import { TablePagination } from "@/components/ui/table-pagination"
import { InfluencerStatusFilter } from "@/components/influencers/InfluencerStatusFilter"
import { Prisma } from "@prisma/client"
import { approveInfluencer } from "./actions"

// Define the shape of search params (Next.js 15+)
// However, since we are in a server component in Next 14/15, props.searchParams is a Promise or object depending on version.
// The user's package.json says "next": "16.1.4", so searchParams is a Promise.

interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getInfluencers(params: {
    page: number
    limit: number
    query?: string
    status?: string
}) {
    const skip = (params.page - 1) * params.limit

    // Build where clause
    const where: Prisma.InfluencerWhereInput = {}

    if (params.query) {
        where.OR = [
            { name: { contains: params.query } }, // SQLite is case-insensitive by default in many cases, but normally mode: 'insensitive' is safer for Postgres. Prism sqlite provider handles it.
            { instagramId: { contains: params.query } },
            { category: { contains: params.query } }
        ]
    }

    if (params.status) {
        if (params.status === 'active') where.active = true
        if (params.status === 'inactive') where.active = false
        if (params.status === 'approved') where.approved = true
        if (params.status === 'pending') where.approved = false
    }

    const [data, total] = await Promise.all([
        prisma.influencer.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: params.limit,
        }),
        prisma.influencer.count({ where })
    ])

    return { data, total }
}

export default async function InfluencersPage(props: SearchParamsProps) {
    const session = await auth()
    const canApprove = session?.user?.role && canApproveInfluencer(session.user.role)
    const searchParams = await props.searchParams

    // Parse params
    const page = Number(searchParams.page) || 1
    const limit = 10
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined

    const { data: influencers, total } = await getInfluencers({ page, limit, query, status })
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Influencers</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your network of creators
                    </p>
                </div>
                <LoadingLink href="/influencers/add">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Influencer
                    </Button>
                </LoadingLink>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="hidden md:block">All Influencers ({total})</CardTitle>
                        <div className="flex flex-1 md:flex-none items-center gap-2 w-full md:w-auto">
                            <SearchInput className="w-full md:w-[300px]" />
                            <InfluencerStatusFilter />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Name</th>
                                    <th className="text-left p-3">Instagram</th>
                                    <th className="text-left p-3">Category</th>
                                    <th className="text-left p-3">Followers</th>
                                    <th className="text-left p-3">Reel Price</th>
                                    <th className="text-left p-3">Status</th>
                                    {canApprove && <th className="text-left p-3">Approved</th>}
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {influencers.length === 0 ? (
                                    <tr>
                                        <td colSpan={canApprove ? 8 : 7} className="text-center p-8 text-muted-foreground">
                                            {query ? "No influencers found matching your search." : "No influencers found. Add your first influencer to get started."}
                                        </td>
                                    </tr>
                                ) : (
                                    influencers.map((influencer) => (
                                        <tr key={influencer.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="p-3">{influencer.name}</td>
                                            <td className="p-3">@{influencer.instagramId}</td>
                                            <td className="p-3">{influencer.category}</td>
                                            <td className="p-3">{influencer.followers.toLocaleString()}</td>
                                            <td className="p-3">₹{influencer.reelPrice}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${influencer.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    {influencer.active ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            {canApprove && (
                                                <td className="p-3">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`px-2 py-1 rounded-full text-xs w-max ${influencer.approved ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                                                            }`}>
                                                            {influencer.approved ? "Approved" : "Pending"}
                                                        </span>
                                                        {influencer.verified && (
                                                            <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 w-max">
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <LoadingLink href={`/influencers/${influencer.id}`}>
                                                        <Button variant="ghost" size="sm">Edit</Button>
                                                    </LoadingLink>
                                                    {canApprove && !influencer.approved && (
                                                        <form action={approveInfluencer.bind(null, influencer.id)}>
                                                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                                                Approve
                                                            </Button>
                                                        </form>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
                {totalPages > 1 && (
                    <TablePagination
                        totalItems={total}
                        totalPages={totalPages}
                        currentPage={page}
                        itemsPerPage={limit}
                    />
                )}
            </Card>
        </div>
    )
}

