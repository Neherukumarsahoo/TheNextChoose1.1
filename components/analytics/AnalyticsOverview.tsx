"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Megaphone, DollarSign, TrendingUp, Wallet, PieChart } from "lucide-react"

interface AnalyticsData {
    stats: {
        totalInfluencers: number
        activeInfluencers: number
        totalBrands: number
        totalCampaigns: number
        activeCampaigns: number
        totalRevenue: number
        totalPayouts: number
        totalInvestment: number
        profit: number
    }
    trendData: Array<{
        month: string
        revenue: number
        payouts: number
        investment: number
        profit: number
    }>
}

export function AnalyticsOverview() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/analytics")
                if (response.ok) {
                    const result = await response.json()
                    setData(result)
                }
            } catch (error) {
                console.error("Failed to fetch analytics:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(7)].map((_, i) => ( 
                <Card key={i} className="animate-pulse">
                    <CardHeader className="h-20 bg-gray-100 dark:bg-gray-800" />
                    <CardContent className="h-16 bg-gray-50 dark:bg-gray-900" />
                </Card>
            ))}
        </div>
    }

    if (!data) return null

    const statCards = [
        {
            title: "Total Influencers",
            value: data.stats.totalInfluencers,
            sub: `${data.stats.activeInfluencers} active`,
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Brands",
            value: data.stats.totalBrands,
            sub: "Total registered",
            icon: Briefcase,
            color: "text-purple-600"
        },
        {
            title: "Campaigns",
            value: data.stats.totalCampaigns,
            sub: `${data.stats.activeCampaigns} ongoing`,
            icon: Megaphone,
            color: "text-orange-600"
        },
        {
            title: "Total Revenue",
            value: `₹${data.stats.totalRevenue.toLocaleString('en-IN')}`,
            sub: "All time brand payments",
            icon: DollarSign,
            color: "text-green-600"
        },
        {
            title: "Influencer Payouts",
            value: `₹${data.stats.totalPayouts.toLocaleString('en-IN')}`,
            sub: "All time influencer payments",
            icon: Wallet,
            color: "text-red-600"
        },
        {
            title: "Total Investment",
            value: `₹${data.stats.totalInvestment.toLocaleString('en-IN')}`,
            sub: "Total capital invested",
            icon: PieChart,
            color: "text-amber-600"
        },
        {
            title: "Net Profit",
            value: `₹${data.stats.profit.toLocaleString('en-IN')}`,
            sub: "Earnings after all costs",
            icon: TrendingUp,
            color: "text-emerald-600"
        }
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
