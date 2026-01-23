import { auth } from "@/lib/auth"
import { ReportingDashboard } from "@/components/reports/ReportingDashboard"
import { redirect } from "next/navigation"

export default async function ReportsPage() {
    const session = await auth()
    
    // Optional: Add specific permission check
    if (!session?.user) redirect("/login")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Reports</h1>
                <p className="text-muted-foreground mt-1">
                    Export system data and insights
                </p>
            </div>
            
            <ReportingDashboard />
        </div>
    )
}
