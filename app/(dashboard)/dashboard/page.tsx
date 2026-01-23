import { auth } from "@/lib/auth"
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview"
import { PerformanceCharts } from "@/components/analytics/PerformanceCharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Users, Building2, PlusCircle } from "lucide-react"
import { AdminPulse } from "@/components/dashboard/AdminPulse"
import { AIIntelligenceStarter } from "@/components/dashboard/AIIntelligenceStarter"

export default async function DashboardPage() {
    const session = await auth()

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Welcome back, {session?.user?.name}! Here's what's happening today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <a
                        href="/campaigns/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Campaign
                    </a>
                </div>
            </div>

            {/* Platform Stats */}
            <AnalyticsOverview />

            <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
                {/* Performance Chart */}
                <div className="md:col-span-4 lg:col-span-4 space-y-6">
                    <PerformanceCharts />
                    <AIIntelligenceStarter />
                </div>

                {/* Quick Actions & Activity */}
                <div className="md:col-span-3 lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <a
                                href="/influencers/add"
                                className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:bg-accent hover:border-accent"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-semibold">Add Influencer</div>
                                    <div className="text-xs text-muted-foreground line-clamp-1">Onboard a new creator</div>
                                </div>
                            </a>
                            <a
                                href="/brands/add"
                                className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:bg-accent hover:border-accent"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-semibold">Add Brand</div>
                                    <div className="text-xs text-muted-foreground line-clamp-1">Register a new client</div>
                                </div>
                            </a>
                            <a
                                href="/campaigns/create"
                                className="group flex items-center gap-4 rounded-xl border p-4 transition-all hover:bg-accent hover:border-accent"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Megaphone className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-semibold">Create Campaign</div>
                                    <div className="text-xs text-muted-foreground line-clamp-1">Start a new project</div>
                                </div>
                            </a>
                        </CardContent>
                    </Card>

                    <AdminPulse />
                </div>
            </div>
        </div>
    )
}
