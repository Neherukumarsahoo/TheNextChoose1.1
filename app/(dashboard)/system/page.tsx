import { auth } from "@/lib/auth"
import { SystemHealth } from "@/components/system/SystemHealth"
import { redirect } from "next/navigation"

export default async function SystemHealthPage() {
    const session = await auth()
    
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        redirect("/dashboard")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">System Health</h1>
                <p className="text-muted-foreground mt-1">
                    Monitor system performance and status
                </p>
            </div>
            
            <SystemHealth />
        </div>
    )
}
