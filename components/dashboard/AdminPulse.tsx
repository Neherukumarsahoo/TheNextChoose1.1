"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, MousePointer2, Clock } from "lucide-react"

export function AdminPulse() {
    const [activities, setActivities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPulse = async () => {
            const res = await fetch("/api/activity-logs?limit=10")
            if (res.ok) {
                const data = await res.json()
                setActivities(data)
            }
            setLoading(false)
        }
        
        fetchPulse()
    }, [])

    if (loading) return <div>Initializing pulse...</div>

    return (
        <Card className="border-blue-200 dark:border-blue-900 shadow-lg shadow-blue-500/10">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
                        <CardTitle>Admin Pulse</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 animate-pulse text-[10px]">LIVE</Badge>
                </div>
                <CardDescription>Real-time stream of administrative actions across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((log) => (
                        <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/5 animate-in fade-in slide-in-from-left-2 duration-300">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold">{log.user.name}</p>
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {new Date(log.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MousePointer2 className="h-3 w-3" /> 
                                    {log.action} <span className="font-medium text-foreground">{log.entityType}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                    {activities.length === 0 && (
                        <p className="text-sm text-center py-10 text-muted-foreground">Waiting for activity...</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
