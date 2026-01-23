import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit, Building2, Mail, Phone, Globe, Instagram } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ id: string }>
}

async function getBrand(id: string) {
    const brand = await prisma.brand.findUnique({
        where: { id },
        include: {
            campaigns: {
                include: {
                    influencers: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    })

    if (!brand) {
        notFound()
    }

    return brand
}

export default async function BrandDetailPage({ params }: PageProps) {
    const { id } = await params
    const brand = await getBrand(id)
    const totalSpent = brand.campaigns.reduce((sum, c) => sum + c.totalAmount, 0)
    const activeCampaigns = brand.campaigns.filter(c => c.status === "ACTIVE").length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/brands">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{brand.name}</h1>
                        <p className="text-muted-foreground mt-1">
                            Brand Profile & Campaign History
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={brand.active ? "default" : "secondary"}>
                        {brand.active ? "Active" : "Inactive"}
                    </Badge>
                    <Link href={`/brands/${brand.id}`}>
                        <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {brand.type && (
                            <div>
                                <p className="text-sm text-muted-foreground">Type</p>
                                <Badge variant="outline">{brand.type}</Badge>
                            </div>
                        )}
                        {brand.industry && (
                            <div>
                                <p className="text-sm text-muted-foreground">Industry</p>
                                <Badge variant="outline">{brand.industry}</Badge>
                            </div>
                        )}
                        {(brand.city || brand.country) && (
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <div className="flex items-center gap-1">
                                    <Building2 className="h-4 w-4" />
                                    <p className="font-medium">
                                        {[brand.city, brand.country].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                        )}
                        {brand.budgetRange && (
                            <div>
                                <p className="text-sm text-muted-foreground">Budget Range</p>
                                <p className="font-medium">{brand.budgetRange}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {brand.contactPerson && (
                            <div>
                                <p className="text-sm text-muted-foreground">Contact Person</p>
                                <p className="font-medium">{brand.contactPerson}</p>
                            </div>
                        )}
                        {brand.email && (
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <a href={`mailto:${brand.email}`} className="font-medium hover:underline flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {brand.email}
                                </a>
                            </div>
                        )}
                        {brand.phone && (
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <a href={`tel:${brand.phone}`} className="font-medium hover:underline flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {brand.phone}
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Online Presence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {brand.website && (
                            <div>
                                <p className="text-sm text-muted-foreground">Website</p>
                                <a
                                    href={brand.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:underline flex items-center gap-1"
                                >
                                    <Globe className="h-4 w-4" />
                                    Visit Website
                                </a>
                            </div>
                        )}
                        {brand.instagramId && (
                            <div>
                                <p className="text-sm text-muted-foreground">Instagram</p>
                                <a
                                    href={`https://instagram.com/${brand.instagramId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:underline flex items-center gap-1"
                                >
                                    <Instagram className="h-4 w-4" />
                                    @{brand.instagramId}
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Campaigns</span>
                            <span className="text-2xl font-bold">{brand.campaigns.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Active Campaigns</span>
                            <span className="text-xl font-semibold text-green-600">{activeCampaigns}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-muted-foreground">Total Spent</span>
                            <span className="text-2xl font-bold text-blue-600">₹{totalSpent.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Latest Campaigns</CardTitle>
                        <Link href="/campaigns/create">
                            <Button size="sm">New Campaign</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {brand.campaigns.length === 0 ? (
                            <p className="text-center text-muted-foreground py-4">
                                No campaigns yet
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {brand.campaigns.slice(0, 5).map((campaign) => (
                                    <Link
                                        key={campaign.id}
                                        href={`/campaigns/${campaign.id}`}
                                        className="block p-3 border rounded-lg hover:bg-muted/50"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{campaign.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {campaign.influencers.length} influencers
                                                </p>
                                            </div>
                                            <Badge variant={
                                                campaign.status === "ACTIVE" ? "default" :
                                                    campaign.status === "COMPLETED" ? "secondary" : "outline"
                                            }>
                                                {campaign.status}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
