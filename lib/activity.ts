export async function logActivity(params: {
    action: string
    entityType: string
    entityId?: string
    entityName?: string
    oldValue?: any
    newValue?: any
}) {
    try {
        await fetch("/api/activity-logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        })
    } catch (error) {
        console.error("Failed to log activity:", error)
    }
}
