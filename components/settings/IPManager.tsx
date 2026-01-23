"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Plus, Trash2, Globe } from "lucide-react"
import { toast } from "sonner"

export function IPManager() {
    const [ips, setIps] = useState<any[]>([])
    const [newIp, setNewIp] = useState("")
    const [label, setLabel] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchIps = async () => {
        const res = await fetch("/api/ip-whitelist")
        if (res.ok) {
            const data = await res.json()
            setIps(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchIps()
    }, [])

    const addIp = async () => {
        if (!newIp) return
        const res = await fetch("/api/ip-whitelist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip: newIp, label })
        })

        if (res.ok) {
            toast.success("IP added to whitelist")
            setNewIp("")
            setLabel("")
            fetchIps()
        }
    }

    const deleteIp = async (id: string) => {
        const res = await fetch(`/api/ip-whitelist?id=${id}`, { method: "DELETE" })
        if (res.ok) {
            toast.success("IP removed")
            fetchIps()
        }
    }

    if (loading) return <div>Loading white-list...</div>

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <CardTitle>IP Whitelisting</CardTitle>
                </div>
                <CardDescription>Restrict admin panel access to trusted IP addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4 items-end bg-muted/30 p-4 rounded-lg">
                    <div className="grid gap-2 flex-1">
                        <Label>IP Address</Label>
                        <Input value={newIp} onChange={e => setNewIp(e.target.value)} placeholder="e.g. 192.168.1.1" />
                    </div>
                    <div className="grid gap-2 flex-1">
                        <Label>Label</Label>
                        <Input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Head Office" />
                    </div>
                    <Button onClick={addIp} className="gap-2">
                        <Plus className="h-4 w-4" /> Add IP
                    </Button>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium">Whitelisted Addresses ({ips.length})</p>
                    {ips.map(ip => (
                        <div key={ip.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10">
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-mono text-sm">{ip.ip}</p>
                                    <p className="text-xs text-muted-foreground">{ip.label || "No label"}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteIp(ip.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {ips.length === 0 && (
                        <p className="text-sm text-center py-4 text-muted-foreground">
                            No IP restrictions active. The panel is accessible from anywhere.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function Label({ children }: { children: React.ReactNode }) {
    return <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</span>
}
