import { auth } from "@/lib/auth"
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard"

export default async function AnalyticsPage() {
    const session = await auth()

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto p-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
                <p className="text-muted-foreground text-lg">
                    Enterprise intelligence layer with Predictive AI.
                </p>
            </div>

            <AnalyticsDashboard />
        </div>
    )
}
