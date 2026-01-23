import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

async function getActivityLogs() {
    return await prisma.activityLog.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    role: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 100,
    })
}

export default async function ActivityLogPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Unauthorized - Super Admin only</p>
            </div>
        )
    }

    const logs = await getActivityLogs()

    const getActionColor = (action: string) => {
        if (action.includes("CREATE")) return "bg-green-100 text-green-700"
        if (action.includes("UPDATE")) return "bg-blue-100 text-blue-700"
        if (action.includes("DELETE")) return "bg-red-100 text-red-700"
        if (action.includes("APPROVE")) return "bg-purple-100 text-purple-700"
        return "bg-gray-100 text-gray-700"
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Activity Log</h1>
                <p className="text-muted-foreground mt-1">
                    Complete audit trail of all system activities
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity ({logs.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className={getActionColor(log.action)}>
                                            {log.action}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {log.entityType}
                                        </span>
                                        {log.entityName && (
                                            <span className="text-sm font-medium">
                                                "{log.entityName}"
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium">{log.user.name}</span>
                                        <span>•</span>
                                        <span>{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</span>
                                        {log.ipAddress && log.ipAddress !== "unknown" && (
                                            <>
                                                <span>•</span>
                                                <span className="text-xs">{log.ipAddress}</span>
                                            </>
                                        )}
                                    </div>
                                    {(log.oldValue || log.newValue) && (
                                        <div className="mt-2 text-xs space-y-1">
                                            {log.oldValue && (
                                                <div className="text-red-600">
                                                    <span className="font-semibold">Old: </span>
                                                    <code className="bg-red-50 px-1 rounded">{log.oldValue.substring(0, 100)}</code>
                                                </div>
                                            )}
                                            {log.newValue && (
                                                <div className="text-green-600">
                                                    <span className="font-semibold">New: </span>
                                                    <code className="bg-green-50 px-1 rounded">{log.newValue.substring(0, 100)}</code>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {log.user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                </Badge>
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <p className="text-center text-muted-foreground py-12">
                                No activity logs yet
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
