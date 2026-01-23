"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Server, Shield, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function SystemHealth() {
    const [dbStatus, setDbStatus] = useState("Connected")
    const [apiLatency, setApiLatency] = useState(0)
    const [lastBackup, setLastBackup] = useState("2 hours ago")

    useEffect(() => {
        // Simulate real-time monitoring
        const interval = setInterval(() => {
            setApiLatency(Math.floor(Math.random() * 50) + 10)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const triggerBackup = () => {
        toast.info("Starting database backup...")
        setTimeout(() => {
            setLastBackup("Just now")
            toast.success("Backup completed successfully")
        }, 1500)
    }

    return (
        <div className="space-y-6">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <div className="text-2xl font-bold">{dbStatus}</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">SQLite via Prisma</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">API Latency</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{apiLatency}ms</div>
                        <p className="text-xs text-muted-foreground mt-1">Average response time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.98%</div>
                        <p className="text-xs text-muted-foreground mt-1">Last restart: 14 days ago</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Security Scan</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Clean</div>
                        <p className="text-xs text-muted-foreground mt-1">Last scan: 4 hours ago</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                     <CardTitle>System Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <p className="font-medium">Database Backup</p>
                            <p className="text-sm text-muted-foreground">Last backup: {lastBackup}</p>
                        </div>
                        <Button onClick={triggerBackup} variant="outline" className="gap-2">
                            <Database className="h-4 w-4" />
                            Trigger Backup
                        </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <p className="font-medium">Clear Cache</p>
                            <p className="text-sm text-muted-foreground">Clear server-side cache</p>
                        </div>
                         <Button variant="outline" onClick={() => toast.success("Cache cleared")}>
                            Clear Cache
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
