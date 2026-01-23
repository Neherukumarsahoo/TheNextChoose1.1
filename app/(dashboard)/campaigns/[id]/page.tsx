import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"
import { canApproveCampaign } from "@/lib/permissions"
import { CampaignInfluencerStatusManager } from "@/components/campaigns/StatusManager"

interface PageProps {
    params: Promise<{ id: string }>
}

async function getCampaign(id: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            brand: true,
            influencers: {
                include: {
                    influencer: true,
                    submissions: {
                        orderBy: { submittedAt: 'desc' }
                    }
                },
            },
            payments: true,
        },
    })

    if (!campaign) {
        notFound()
    }

    return campaign
}

export default async function CampaignDetailPage({ params }: PageProps) {
    const { id } = await params
    const session = await auth()
    const campaign = await getCampaign(id)
    const canApprove = session?.user?.role && canApproveCampaign(session.user.role)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DRAFT": return "bg-gray-100 text-gray-700"
            case "ACTIVE": return "bg-green-100 text-green-700"
            case "COMPLETED": return "bg-blue-100 text-blue-700"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    const getInfluencerStatusIcon = (status: string) => {
        switch (status) {
            case "ASSIGNED": return <Clock className="h-4 w-4 text-yellow-600" />
            case "CONTENT_SUBMITTED": return <CheckCircle className="h-4 w-4 text-blue-600" />
            case "APPROVED": return <CheckCircle className="h-4 w-4 text-green-600" />
            case "POSTED": return <CheckCircle className="h-4 w-4 text-purple-600" />
            default: return <Clock className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/campaigns">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{campaign.name}</h1>
                        <p className="text-muted-foreground mt-1">
                            Campaign Details & Tracking
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                    </Badge>
                    {canApprove && !campaign.approved && campaign.status === "DRAFT" && (
                        <form action={`/api/campaigns/${campaign.id}/approve`} method="POST">
                            <Button type="submit" size="sm">
                                Approve Pricing
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Brand</p>
                            <p className="font-medium">{campaign.brand.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Platform</p>
                            <p className="font-medium">{campaign.platform}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Content Type</p>
                            <p className="font-medium">{campaign.contentType}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Objective</p>
                            <p className="font-medium">{campaign.objective || "Not specified"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Start Date</p>
                                <p className="font-medium">{new Date(campaign.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">End Date</p>
                                <p className="font-medium">{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : "Ongoing"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Campaign Value</p>
                            <p className="text-2xl font-bold">₹{campaign.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Number of Influencers</p>
                            <p className="font-medium">{campaign.influencers.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Approval Status</p>
                            <Badge variant={campaign.approved ? "default" : "secondary"}>
                                {campaign.approved ? "Approved" : "Pending Approval"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Influencers & Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {campaign.influencers.map((ci) => (
                            <CampaignInfluencerStatusManager
                                key={ci.id}
                                campaignInfluencer={ci}
                                influencer={ci.influencer}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
