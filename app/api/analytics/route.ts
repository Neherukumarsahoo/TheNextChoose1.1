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
            revenueAgg,
            payoutsAgg,
            investmentAgg
        ] = await Promise.all([
            prisma.influencer.count(),
            prisma.influencer.count({ where: { active: true } }),
            prisma.brand.count(),
            prisma.campaign.count(),
            prisma.campaign.count({ where: { status: "ACTIVE" } }),
            prisma.payment.aggregate({
                where: { type: "BRAND_PAYMENT" },
                _sum: { amount: true }
            }),
            prisma.payment.aggregate({
                where: { type: "INFLUENCER_PAYOUT" },
                _sum: { amount: true }
            }),
            prisma.investment.aggregate({
                _sum: { amount: true }
            })
        ])

        const totalRevenue = revenueAgg._sum.amount || 0
        const totalPayouts = payoutsAgg._sum.amount || 0
        const totalInvestment = investmentAgg._sum.amount || 0
        const profit = totalRevenue - totalPayouts - totalInvestment

        // Fetch trend data
        const monthsToShow = period === "1year" ? 12 : 6
        const trendPromises = Array.from({ length: monthsToShow }).map(async (_, index) => {
            const i = monthsToShow - 1 - index
            const date = subMonths(new Date(), i)
            const start = startOfMonth(date)
            const end = endOfMonth(date)

            const [monthRevenue, monthPayouts, monthInvestment] = await Promise.all([
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
                }),
                prisma.investment.aggregate({
                    where: {
                        date: { gte: start, lte: end }
                    },
                    _sum: { amount: true }
                })
            ])

            return {
                month: format(date, "MMM yyyy"),
                revenue: monthRevenue._sum.amount || 0,
                payouts: monthPayouts._sum.amount || 0,
                investment: monthInvestment._sum.amount || 0,
                profit: (monthRevenue._sum.amount || 0) - (monthPayouts._sum.amount || 0) - (monthInvestment._sum.amount || 0)
            }
        })

        const trendData = await Promise.all(trendPromises)

        return NextResponse.json({
            stats: {
                totalInfluencers,
                activeInfluencers,
                totalBrands,
                totalCampaigns,
                activeCampaigns,
                totalRevenue,
                totalPayouts,
                totalInvestment,
                profit
            },
            trendData
        })
    } catch (error) {
        console.error("Analytics Error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
