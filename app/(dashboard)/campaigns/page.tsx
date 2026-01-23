import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, LayoutList, Kanban, Calendar as CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignKanban } from "@/components/campaigns/CampaignKanban"
import { CampaignCalendar } from "@/components/campaigns/CampaignCalendar"
import { CampaignBriefGenerator } from "@/components/campaigns/CampaignBriefGenerator"

async function getCampaigns() {
    const campaigns = await prisma.campaign.findMany({
        include: {
            brand: true,
            influencers: {
                include: {
                    influencer: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    })

    // Serialize dates for Client Components
    return campaigns.map(c => ({
        ...c,
        startDate: c.startDate.toISOString(), // Convert Date to string
        endDate: c.endDate ? c.endDate.toISOString() : null
    }))
}

export default async function CampaignsPage() {
    const campaigns = await getCampaigns()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DRAFT":
                return "bg-gray-100 text-gray-700"
            case "ACTIVE":
                return "bg-green-100 text-green-700"
            case "COMPLETED":
                return "bg-blue-100 text-blue-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Campaigns</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage influencer marketing campaigns
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <CampaignBriefGenerator />
                    <Link href="/campaigns/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Campaign
                        </Button>
                    </Link>
                </div>
            </div>

            <Tabs defaultValue="list" className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <TabsList>
                        <TabsTrigger value="list" className="flex items-center gap-2">
                            <LayoutList className="h-4 w-4" />
                            List View
                        </TabsTrigger>
                        <TabsTrigger value="kanban" className="flex items-center gap-2">
                            <Kanban className="h-4 w-4" />
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="list" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Campaigns ({campaigns.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-3">Campaign Name</th>
                                            <th className="text-left p-3">Brand</th>
                                            <th className="text-left p-3">Platform</th>
                                            <th className="text-left p-3">Content Type</th>
                                            <th className="text-left p-3">Influencers</th>
                                            <th className="text-left p-3">Status</th>
                                            <th className="text-left p-3">Start Date</th>
                                            <th className="text-left p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {campaigns.length === 0 ? (
                                            <tr>
                                                <td colSpan={8} className="text-center p-8 text-muted-foreground">
                                                    No campaigns found. Create your first campaign to get started.
                                                </td>
                                            </tr>
                                        ) : (
                                            campaigns.map((campaign) => (
                                                <tr key={campaign.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                                    <td className="p-3 font-medium">{campaign.name}</td>
                                                    <td className="p-3">{campaign.brand.name}</td>
                                                    <td className="p-3">{campaign.platform}</td>
                                                    <td className="p-3">{campaign.contentType}</td>
                                                    <td className="p-3">{campaign.influencers.length}</td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                                                            {campaign.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">{new Date(campaign.startDate).toLocaleDateString()}</td>
                                                    <td className="p-3">
                                                        <Link href={`/campaigns/${campaign.id}`}>
                                                            <Button variant="ghost" size="sm">View</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="kanban" className="flex-1 overflow-hidden h-full min-h-[500px]">
                    <CampaignKanban initialCampaigns={campaigns} />
                </TabsContent>

                <TabsContent value="calendar" className="flex-1 overflow-hidden h-full min-h-[500px]">
                    {/* Pass filtered campaigns or all campaigns. Assuming map is compatible. */}
                    {/* Calendar expects Date objects for calculation but receives strings. 
                         The component wrapper should convert strings back to dates if needed 
                         OR we update the component to accept strings. 
                         Let's update the component to accept strings. 
                      */}
                    <CampaignCalendar campaigns={campaigns.map(c => ({
                        ...c,
                        startDate: new Date(c.startDate),
                        endDate: c.endDate ? new Date(c.endDate) : null
                    }))} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
