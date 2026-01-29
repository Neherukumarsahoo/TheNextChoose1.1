import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default async function CostPage() {
    const investments = await prisma.investment.findMany({
        orderBy: { date: 'desc' },
        include: { creator: { select: { name: true } } }
    })

    const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Cost & Investments</h1>
                    <p className="text-muted-foreground mt-1">Track your business expenses and investments.</p>
                </div>
                <Link href="/cost/add">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Investment
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-transparent border-red-200 dark:border-red-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                        <TrendingUp className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-700 dark:text-red-400">₹{totalInvestment.toLocaleString('en-IN')}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total capital invested</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ₹{investments.filter(i => new Date(i.date).getMonth() === new Date().getMonth()).reduce((s, i) => s + i.amount, 0).toLocaleString('en-IN')}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Invested in current month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transaction Count</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{investments.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total records</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Investment History</CardTitle>
                    <CardDescription>Detailed log of all investments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b">
                                <tr>
                                    <th className="p-4 font-medium">Reason</th>
                                    <th className="p-4 font-medium">Description</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Amount</th>
                                    <th className="p-4 font-medium">Added By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {investments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No investments recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    investments.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="p-4 font-medium">{inv.reason}</td>
                                            <td className="p-4 text-muted-foreground">{inv.description || "-"}</td>
                                            <td className="p-4">{format(new Date(inv.date), "PPP")}</td>
                                            <td className="p-4 font-bold text-red-600">₹{inv.amount.toLocaleString('en-IN')}</td>
                                            <td className="p-4 text-xs text-muted-foreground">
                                                {inv.creator.name}
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
