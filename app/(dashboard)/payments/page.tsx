import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { canViewProfit } from "@/lib/permissions"
import { ProfitChart } from "@/components/payments/ProfitChart"

interface GetPaymentsParams {
    page: number
    limit: number
}

import { markPaymentAsPaid } from "./actions"

function getStatusColor(status: string) {
    if (!status) return "bg-gray-100 text-gray-700"
    switch (status.toUpperCase()) {
        case 'PAID': return 'bg-green-100 text-green-700'
        case 'PENDING': return 'bg-yellow-100 text-yellow-700'
        case 'OVERDUE': return 'bg-red-100 text-red-700'
        default: return 'bg-gray-100 text-gray-700'
    }
}

async function getPayments({ page, limit }: GetPaymentsParams) {
    const skip = (page - 1) * limit

    const [brandPayments, totalRevenue, brandCount] = await Promise.all([
        prisma.payment.findMany({
            where: { type: "BRAND_PAYMENT" },
            include: {
                campaign: { include: { brand: true } },
                manualTransaction: true
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        // Calculate totals separately (expensive? maybe just one big aggregate usually, but simple query is fast enough for now if indexed)
        // Wait, profit chart needs ALL data for grouping?
        // "Calculate monthly data for chart" -> The original code fetched ALL data to do JS-side map/reduce.
        // This is BAD for performance.
        // I should decouple chart data from table data.
        // For the Chart: fetch aggregate using groupBy? Prisma supports it.
        // But for now, user cares about "sidebar loading time".
        // I'll leave the chart logic optimization for a second step or simplify it to "Last 6 months" query.
        prisma.payment.aggregate({
            where: { type: "BRAND_PAYMENT" },
            _sum: { amount: true }
        }),
        prisma.payment.count({ where: { type: "BRAND_PAYMENT" } })
    ])

    const [influencerPayouts, totalPayouts, influencerCount, manualTransactions] = await Promise.all([
        prisma.payment.findMany({
            where: { type: "INFLUENCER_PAYOUT" },
            include: {
                influencer: true,
                manualTransaction: true
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.payment.aggregate({
            where: { type: "INFLUENCER_PAYOUT" },
            _sum: { amount: true }
        }),
        prisma.payment.count({ where: { type: "INFLUENCER_PAYOUT" } }),
        prisma.manualTransaction.findMany({
            orderBy: { createdAt: "desc" },
            take: 10 // Show recent 10 manual transactions
        })
    ])

    // Optimize Chart Data: Fetch specifically for last 6 months instead of filtering in JS
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5)
    sixMonthsAgo.setDate(1) // Start of month

    const [chartRevenue, chartPayouts] = await Promise.all([
        prisma.payment.groupBy({
            by: ['createdAt'], // SQLite/Prisma limitation often needs raw query for month extraction.
            // Fallback: fetch last 6 months data only (much smaller than "all time")
            where: {
                type: "BRAND_PAYMENT",
                createdAt: { gte: sixMonthsAgo }
            },
            _sum: { amount: true },
        }),
        prisma.payment.findMany({ // GroupBy is tricky with dates, sticking to findMany with date filter is safer for hydration
            where: {
                type: "INFLUENCER_PAYOUT",
                createdAt: { gte: sixMonthsAgo }
            },
            select: { createdAt: true, amount: true }
        })
    ])

    // For the chart, I will start fetching "last 6 months" data only, reducing payload.
    // Actually, I'll return the full raw chunks for chart logic to process, but filtered by date.
    const rawChartDataRevenue = await prisma.payment.findMany({
        where: { type: "BRAND_PAYMENT", createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true, amount: true }
    })
    const rawChartDataPayouts = await prisma.payment.findMany({
        where: { type: "INFLUENCER_PAYOUT", createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true, amount: true }
    })

    return {
        brandPayments,
        influencerPayouts,
        totalRevenue: totalRevenue._sum.amount || 0,
        totalPayouts: totalPayouts._sum.amount || 0,
        brandCount,
        influencerCount,
        rawChartDataRevenue,
        rawChartDataPayouts,
        manualTransactions
    }
}

async function getPlatformSettings() {
    return await prisma.platformSettings.findUnique({
        where: { id: "settings" },
    })
}

import { LoadingLink } from "@/components/ui/loading-link"
import { Plus, Edit } from "lucide-react"
import { ManualPaymentDialog } from "@/components/payments/ManualPaymentDialog"
import { DeleteTransactionButton } from "@/components/payments/DeleteTransactionButton"
import { TablePagination } from "@/components/ui/table-pagination"

interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PaymentsPage(props: SearchParamsProps) {
    const session = await auth()
    const searchParams = await props.searchParams
    const page = Number(searchParams.page) || 1
    const limit = 10

    const {
        brandPayments,
        influencerPayouts,
        totalRevenue,
        totalPayouts,
        brandCount,
        influencerCount,
        rawChartDataRevenue,
        rawChartDataPayouts,
        manualTransactions
    } = await getPayments({ page, limit })

    const settings = await getPlatformSettings()
    const canSeeProfit = session?.user?.role && canViewProfit(session.user.role)

    // Profit calculation used pre-calculated totals
    const profit = totalRevenue - totalPayouts
    const commission = settings?.commission || 20

    // Calculate monthly data for chart
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - (5 - i))
        const monthName = date.toLocaleString('default', { month: 'short' })

        const monthRevenue = rawChartDataRevenue
            .filter(p => p.createdAt.getMonth() === date.getMonth() && p.createdAt.getFullYear() === date.getFullYear())
            .reduce((sum, p) => sum + p.amount, 0)

        const monthPayouts = rawChartDataPayouts
            .filter(p => p.createdAt.getMonth() === date.getMonth() && p.createdAt.getFullYear() === date.getFullYear())
            .reduce((sum, p) => sum + p.amount, 0)

        return {
            name: monthName,
            revenue: monthRevenue,
            payouts: monthPayouts,
            profit: monthRevenue - monthPayouts
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="text-muted-foreground mt-1">
                        Track all financial transactions
                    </p>
                </div>
                <div className="flex gap-2">
                    <ManualPaymentDialog />
                    <LoadingLink href="/payments/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Payment
                        </Button>
                    </LoadingLink>
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

                    {/* Manual Transactions Table */}
                    <Card className="border-indigo-100 dark:border-indigo-900 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg">Manual Transactions (Quick Entry)</CardTitle>
                                <p className="text-xs text-muted-foreground">Recent manual records with instant profit tracking</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-xs text-muted-foreground uppercase tracking-wider">
                                            <th className="text-left py-3 px-4">Brand</th>
                                            <th className="text-left py-3 px-4">Influencer</th>
                                            <th className="text-left py-3 px-4">Revenue</th>
                                            <th className="text-left py-3 px-4">Payout</th>
                                            <th className="text-left py-3 px-4 text-green-600">Profit</th>
                                            <th className="text-right py-3 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {manualTransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                                                    No manual transactions yet. Use the button above to add one.
                                                </td>
                                            </tr>
                                        ) : (
                                            manualTransactions.map((tx: any) => (
                                                <tr key={tx.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900 group">
                                                    <td className="py-3 px-4 font-medium">{tx.brandName || "Direct"}</td>
                                                    <td className="py-3 px-4">{tx.influencerName || "Independent"}</td>
                                                    <td className="py-3 px-4">₹{tx.totalAmount.toLocaleString()}</td>
                                                    <td className="py-3 px-4">₹{tx.payoutAmount.toLocaleString()}</td>
                                                    <td className="py-3 px-4 font-bold text-green-600">
                                                        ₹{tx.profit.toLocaleString()}
                                                        <span className="text-[10px] ml-1 font-normal text-muted-foreground">({tx.margin}%)</span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right flex items-center justify-end gap-1">
                                                        <ManualPaymentDialog
                                                            initialData={tx}
                                                            trigger={
                                                                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 border hover:bg-slate-100">
                                                                    <Edit className="h-4 w-4" />
                                                                    <span>Edit</span>
                                                                </Button>
                                                            }
                                                        />
                                                        <DeleteTransactionButton id={tx.id} showLabel />
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
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Brand Payments (Incoming)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* ... table content ... */}
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
                                            <td className="p-3 flex items-center gap-1">
                                                <Link href={`/payments/invoice/${payment.id}`}>
                                                    <Button variant="outline" size="sm">Invoice</Button>
                                                </Link>
                                                {payment.manualTransaction && (
                                                    <>
                                                        <ManualPaymentDialog
                                                            initialData={payment.manualTransaction}
                                                            trigger={
                                                                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 border hover:bg-slate-100">
                                                                    <Edit className="h-3.5 w-3.5" />
                                                                    <span>Edit</span>
                                                                </Button>
                                                            }
                                                        />
                                                        <DeleteTransactionButton id={payment.manualTransaction.id} showLabel />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {Math.ceil(brandCount / limit) > 1 && (
                        <div className="mt-4">
                            <TablePagination
                                totalItems={brandCount}
                                totalPages={Math.ceil(brandCount / limit)}
                                currentPage={page}
                                itemsPerPage={limit}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Influencer Payouts (Outgoing)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* ... table content ... */}
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
                                            <td className="p-3">₹{payment.amount.toLocaleString()}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm text-muted-foreground">{payment.notes || "-"}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-1">
                                                    {payment.status !== "PAID" && (
                                                        <form action={markPaymentAsPaid.bind(null, payment.id)}>
                                                            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                                                Mark Paid
                                                            </Button>
                                                        </form>
                                                    )}
                                                    {payment.manualTransaction && (
                                                        <>
                                                            <ManualPaymentDialog
                                                                initialData={payment.manualTransaction}
                                                                trigger={
                                                                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 border hover:bg-slate-100">
                                                                        <Edit className="h-3.5 w-3.5" />
                                                                        <span>Edit</span>
                                                                    </Button>
                                                                }
                                                            />
                                                            <DeleteTransactionButton id={payment.manualTransaction.id} showLabel />
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {Math.ceil(influencerCount / limit) > 1 && (
                        <div className="mt-4">
                            <TablePagination
                                totalItems={influencerCount}
                                totalPages={Math.ceil(influencerCount / limit)}
                                currentPage={page}
                                itemsPerPage={limit}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
