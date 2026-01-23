"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileBarChart, Users, Megaphone, DollarSign } from "lucide-react"

export function ReportingDashboard() {
    const downloadReport = (type: string) => {
        // In a real app, this would call an API endpoint that generates a stream
        window.open(`/api/reports/download?type=${type}`, '_blank')
    }

    const reports = [
        {
            title: "Influencer Performance",
            description: "Detailed metrics on all influencers, including engagement rates and pricing.",
            icon: Users,
            type: "influencers"
        },
        {
            title: "Brand Campaigns",
            description: "Summary of all active and completed campaigns by brand.",
            icon: Megaphone,
            type: "campaigns"
        },
        {
            title: "Financial Statement",
            description: "Complete breakdown of revenue, payouts, and margins.",
            icon: DollarSign,
            type: "financials"
        },
        {
            title: "System Audit Log",
            description: "Full history of user actions and system events.",
            icon: FileBarChart,
            type: "audit"
        }
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
                <Card key={report.type} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <report.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base">{report.title}</CardTitle>
                            <CardDescription className="mt-1">{report.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            variant="outline" 
                            className="w-full gap-2"
                            onClick={() => downloadReport(report.type)}
                        >
                            <Download className="h-4 w-4" />
                            Download CSV
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
