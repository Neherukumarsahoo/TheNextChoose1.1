import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const period = searchParams.get("period") || "6months"

        // Fetch basic stats
        const [
            totalInfluencers,
            activeInfluencers,
            totalBrands,
            totalCampaigns,
            activeCampaigns,
            brandPayments,
            influencerPayouts
        ] = await Promise.all([
            prisma.influencer.count(),
            prisma.influencer.count({ where: { active: true } }),
            prisma.brand.count(),
            prisma.campaign.count(),
            prisma.campaign.count({ where: { status: "ACTIVE" } }),
            prisma.payment.findMany({ where: { type: "BRAND_PAYMENT" } }),
            prisma.payment.findMany({ where: { type: "INFLUENCER_PAYOUT" } })
        ])

        const totalRevenue = brandPayments.reduce((sum, p) => sum + p.amount, 0)
        const totalPayouts = influencerPayouts.reduce((sum, p) => sum + p.amount, 0)
        const profit = totalRevenue - totalPayouts

        // Fetch trend data
        const monthsToShow = period === "1year" ? 12 : 6
        const trendData = []

        for (let i = monthsToShow - 1; i >= 0; i--) {
            const date = subMonths(new Date(), i)
            const start = startOfMonth(date)
            const end = endOfMonth(date)

            const [monthRevenue, monthPayouts] = await Promise.all([
                prisma.payment.aggregate({
                    where: {
                        type: "BRAND_PAYMENT",
                        createdAt: { gte: start, lte: end }
                    },
                    _sum: { amount: true }
                }),
                prisma.payment.aggregate({
                    where: {
                        type: "INFLUENCER_PAYOUT",
                        createdAt: { gte: start, lte: end }
                    },
                    _sum: { amount: true }
                })
            ])

            trendData.push({
                month: format(date, "MMM yyyy"),
                revenue: monthRevenue._sum.amount || 0,
                payouts: monthPayouts._sum.amount || 0,
                profit: (monthRevenue._sum.amount || 0) - (monthPayouts._sum.amount || 0)
            })
        }

        return NextResponse.json({
            stats: {
                totalInfluencers,
                activeInfluencers,
                totalBrands,
                totalCampaigns,
                activeCampaigns,
                totalRevenue,
                totalPayouts,
                profit
            },
            trendData
        })
    } catch (error) {
        console.error("Analytics Error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
