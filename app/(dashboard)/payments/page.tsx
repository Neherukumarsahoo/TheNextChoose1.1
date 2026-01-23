import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { canViewProfit } from "@/lib/permissions"
import { ProfitChart } from "@/components/payments/ProfitChart"

async function getPayments() {
    const brandPayments = await prisma.payment.findMany({
        where: { type: "BRAND_PAYMENT" },
        include: { campaign: { include: { brand: true } } },
        orderBy: { createdAt: "desc" },
    })

    const influencerPayouts = await prisma.payment.findMany({
        where: { type: "INFLUENCER_PAYOUT" },
        include: { influencer: true },
        orderBy: { createdAt: "desc" },
    })

    return { brandPayments, influencerPayouts }
}

async function getPlatformSettings() {
    return await prisma.platformSettings.findUnique({
        where: { id: "settings" },
    })
}

export default async function PaymentsPage() {
    const session = await auth()
    const { brandPayments, influencerPayouts } = await getPayments()
    const settings = await getPlatformSettings()
    const canSeeProfit = session?.user?.role && canViewProfit(session.user.role)

    const totalRevenue = brandPayments.reduce((sum, p) => sum + p.amount, 0)
    const totalPayouts = influencerPayouts.reduce((sum, p) => sum + p.amount, 0)
    const profit = totalRevenue - totalPayouts
    const commission = settings?.commission || 20

    // Calculate monthly data for chart
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - (5 - i))
        const monthName = date.toLocaleString('default', { month: 'short' })

        const monthRevenue = brandPayments
            .filter(p => p.createdAt.getMonth() === date.getMonth() && p.createdAt.getFullYear() === date.getFullYear())
            .reduce((sum, p) => sum + p.amount, 0)

        const monthPayouts = influencerPayouts
            .filter(p => p.createdAt.getMonth() === date.getMonth() && p.createdAt.getFullYear() === date.getFullYear())
            .reduce((sum, p) => sum + p.amount, 0)

        return {
            name: monthName,
            revenue: monthRevenue,
            payouts: monthPayouts,
            profit: monthRevenue - monthPayouts
        }
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700"
            case "PAID":
                return "bg-green-100 text-green-700"
            case "HOLD":
                return "bg-red-100 text-red-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="text-muted-foreground mt-1">
                        Track all financial transactions
                    </p>
                </div>
            </div>

            {canSeeProfit && (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{totalPayouts.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Platform Profit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">₹{profit.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Commission Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{commission}%</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProfitChart data={monthlyData} />
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Brand Payments (Incoming)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Campaign</th>
                                    <th className="text-left p-3">Brand</th>
                                    <th className="text-left p-3">Total Amount</th>
                                    <th className="text-left p-3">Advance Paid</th>
                                    <th className="text-left p-3">Balance</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center p-8 text-muted-foreground">
                                            No brand payments recorded yet
                                        </td>
                                    </tr>
                                ) : (
                                    brandPayments.map((payment) => (
                                        <tr key={payment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="p-3">{payment.campaign?.name || "-"}</td>
                                            <td className="p-3">{payment.campaign?.brand.name || "-"}</td>
                                            <td className="p-3 font-medium">₹{payment.amount.toLocaleString()}</td>
                                            <td className="p-3">₹{payment.advance.toLocaleString()}</td>
                                            <td className="p-3">₹{payment.balance.toLocaleString()}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <Link href={`/payments/invoice/${payment.id}`}>
                                                    <Button variant="outline" size="sm">Invoice</Button>
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

            <Card>
                <CardHeader>
                    <CardTitle>Influencer Payouts (Outgoing)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Influencer</th>
                                    <th className="text-left p-3">Amount</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Notes</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {influencerPayouts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center p-8 text-muted-foreground">
                                            No influencer payouts recorded yet
                                        </td>
                                    </tr>
                                ) : (
                                    influencerPayouts.map((payment) => (
                                        <tr key={payment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="p-3 font-medium">{payment.influencer?.name || "-"}</td>
                                            <td className="p-3">${payment.amount.toLocaleString()}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm text-muted-foreground">{payment.notes || "-"}</td>
                                            <td className="p-3">
                                                {payment.status !== "PAID" && (
                                                    <form action={async () => {
                                                        "use server"
                                                        await prisma.payment.update({
                                                            where: { id: payment.id },
                                                            data: { status: "PAID", paidDate: new Date() }
                                                        })
                                                    }}>
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                                            Mark Paid
                                                        </Button>
                                                    </form>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
