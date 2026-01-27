import { auth } from "@/lib/auth"
import { ActivityLogTable } from "@/components/activity-log/ActivityLogTable"

export default async function ActivityLogPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Unauthorized - Super Admin only</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto p-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
                <p className="text-muted-foreground text-lg">
                    Enterprise-grade security monitoring and flight recorder.
                </p>
            </div>

            <ActivityLogTable />
        </div>
    )
}
