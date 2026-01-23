import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { SearchInput } from "@/components/ui/search-input"
import { TablePagination } from "@/components/ui/table-pagination"
import { BrandStatusFilter } from "@/components/brands/BrandStatusFilter"
import { Prisma } from "@prisma/client"

interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getBrands(params: {
    page: number
    limit: number
    query?: string
    status?: string
}) {
    const skip = (params.page - 1) * params.limit

    // Build where clause
    const where: Prisma.BrandWhereInput = {}

    if (params.query) {
        where.OR = [
            { name: { contains: params.query } },
            { type: { contains: params.query } },
            { industry: { contains: params.query } },
            { contactPerson: { contains: params.query } }
        ]
    }

    if (params.status) {
        if (params.status === 'active') where.active = true
        if (params.status === 'inactive') where.active = false
    }

    const [data, total] = await Promise.all([
        prisma.brand.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: params.limit,
        }),
        prisma.brand.count({ where })
    ])

    return { data, total }
}

export default async function BrandsPage(props: SearchParamsProps) {
    const searchParams = await props.searchParams

    // Parse params
    const page = Number(searchParams.page) || 1
    const limit = 10
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined

    const { data: brands, total } = await getBrands({ page, limit, query, status })
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Brands</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your clients
                    </p>
                </div>
                <Link href="/brands/add">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Brand
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="hidden md:block">All Brands ({total})</CardTitle>
                        <div className="flex flex-1 md:flex-none items-center gap-2 w-full md:w-auto">
                            <SearchInput className="w-full md:w-[300px]" />
                            <BrandStatusFilter />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Name</th>
                                    <th className="text-left p-3">Type</th>
                                    <th className="text-left p-3">City</th>
                                    <th className="text-left p-3">Contact</th>
                                    <th className="text-left p-3">Budget Range</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center p-8 text-muted-foreground">
                                            {query ? "No brands found matching your search." : "No brands found. Add your first brand to get started."}
                                        </td>
                                    </tr>
                                ) : (
                                    brands.map((brand) => (
                                        <tr key={brand.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="p-3 font-medium">{brand.name}</td>
                                            <td className="p-3">{brand.type || "-"}</td>
                                            <td className="p-3">{brand.city || "-"}</td>
                                            <td className="p-3">{brand.contactPerson || "-"}</td>
                                            <td className="p-3">{brand.budgetRange || "-"}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${brand.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    {brand.active ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <Link href={`/brands/${brand.id}`}>
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                </Link>
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

