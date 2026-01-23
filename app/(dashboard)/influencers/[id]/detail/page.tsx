import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit, Star, MapPin, Instagram, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ id: string }>
}

async function getInfluencer(id: string) {
    const influencer = await prisma.influencer.findUnique({
        where: { id },
        include: {
            campaigns: {
                include: {
                    campaign: {
                        include: {
                            brand: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    })

    if (!influencer) {
        notFound()
    }

    return influencer
}

export default async function InfluencerDetailPage({ params }: PageProps) {
    const { id } = await params
    const influencer = await getInfluencer(id)
    const totalEarnings = influencer.campaigns.reduce((sum, ci) => sum + ci.price, 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/influencers">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{influencer.name}</h1>
                        <p className="text-muted-foreground mt-1">
                            Influencer Profile & Performance
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={influencer.active ? "default" : "secondary"}>
                        {influencer.active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant={influencer.approved ? "default" : "secondary"}>
                        {influencer.approved ? "Approved" : "Pending"}
                    </Badge>
                    <Link href={`/influencers/${influencer.id}`}>
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
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Instagram</p>
                            <div className="flex items-center gap-2">
                                <Instagram className="h-4 w-4" />
                                <a
                                    href={influencer.profileLink || `https://instagram.com/${influencer.instagramId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:underline flex items-center gap-1"
                                >
                                    @{influencer.instagramId}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <Badge variant="outline">{influencer.category}</Badge>
                        </div>
                        {(influencer.city || influencer.country) && (
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <p className="font-medium">
                                        {[influencer.city, influencer.country].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                        )}
                        {influencer.rating && influencer.rating > 0 && (
                            <div>
                                <p className="text-sm text-muted-foreground">Rating</p>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <p className="font-medium">{influencer.rating.toFixed(1)}/5.0</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Followers</p>
                            <p className="text-2xl font-bold">{influencer.followers.toLocaleString()}</p>
                        </div>
                        {influencer.avgViews && (
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Views</p>
                                <p className="text-xl font-semibold">{influencer.avgViews.toLocaleString()}</p>
                            </div>
                        )}
                        {influencer.engagementRate && (
                            <div>
                                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                                <p className="text-xl font-semibold">{influencer.engagementRate}%</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-muted-foreground">Total Campaigns</p>
                            <p className="text-xl font-semibold">{influencer.campaigns.length}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Earnings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Reel Price</p>
                            <p className="font-semibold">₹{influencer.reelPrice.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Story Price</p>
                            <p className="font-semibold">₹{influencer.storyPrice.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Post Price</p>
                            <p className="font-semibold">₹{influencer.postPrice.toLocaleString()}</p>
                        </div>
                        <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground">Total Earnings</p>
                            <p className="text-2xl font-bold text-green-600">₹{totalEarnings.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaign History</CardTitle>
                </CardHeader>
                <CardContent>
                    {influencer.campaigns.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                            No campaigns yet
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {influencer.campaigns.map((ci) => (
                                <div
                                    key={ci.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                                >
                                    <div>
                                        <Link href={`/campaigns/${ci.campaign.id}`} className="font-semibold hover:underline">
                                            {ci.campaign.name}
                                        </Link>
                                        <p className="text-sm text-muted-foreground">
                                            {ci.campaign.brand.name} • {new Date(ci.campaign.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">₹{ci.price.toLocaleString()}</p>
                                        <Badge variant={
                                            ci.status === "POSTED" ? "default" :
                                                ci.status === "APPROVED" ? "secondary" : "outline"
                                        }>
                                            {ci.status.replace("_", " ")}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
