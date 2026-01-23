"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitPullRequest, Plus, Trash2, Shield } from "lucide-react"
import { toast } from "sonner"

export function ApprovalChainManager() {
    const [chains, setChains] = useState<any[]>([])
    const [entityType, setEntityType] = useState("CAMPAIGN")
    const [threshold, setThreshold] = useState("0")
    const [requiredRoles, setRequiredRoles] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchChains = async () => {
        const res = await fetch("/api/approval-chains")
        if (res.ok) {
            const data = await res.json()
            setChains(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchChains()
    }, [])

    const addChain = async () => {
        if (!requiredRoles) return
        const res = await fetch("/api/approval-chains", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entityType, threshold: parseFloat(threshold), requiredRoles })
        })

        if (res.ok) {
            toast.success("Approval chain added")
            setThreshold("0")
            setRequiredRoles("")
            fetchChains()
        }
    }

    const deleteChain = async (id: string) => {
        const res = await fetch(`/api/approval-chains?id=${id}`, { method: "DELETE" })
        if (res.ok) {
            toast.success("Approval chain removed")
            fetchChains()
        }
    }

    if (loading) return <div>Loading approval chains...</div>

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <GitPullRequest className="h-5 w-5 text-purple-600" />
                    <CardTitle>Approval Workflows</CardTitle>
                </div>
                <CardDescription>Define multi-step approval gates for high-value entities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4 items-end bg-muted/30 p-4 rounded-lg">
                    <div className="grid gap-2">
                        <Label>Entity Type</Label>
                        <Select value={entityType} onValueChange={setEntityType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CAMPAIGN">Campaign</SelectItem>
                                <SelectItem value="PAYMENT">Payment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Min. Amount (₹)</Label>
                        <Input type="number" value={threshold} onChange={e => setThreshold(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Req. Roles (CSV)</Label>
                        <Input value={requiredRoles} onChange={e => setRequiredRoles(e.target.value)} placeholder="MANAGER,SUPER_ADMIN" />
                    </div>
                    <Button onClick={addChain} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Gate
                    </Button>
                </div>

                <div className="space-y-3">
                    {chains.map(chain => (
                        <div key={chain.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/10">
                            <div className="flex items-center gap-4">
                                <Shield className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold text-sm">{chain.entityType} Approval Gate</p>
                                    <p className="text-xs text-muted-foreground">
                                        Triggers at ₹{chain.threshold.toLocaleString()} • Roles: {chain.requiredRoles}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteChain(chain.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {chains.length === 0 && (
                        <p className="text-sm text-center py-4 text-muted-foreground italic">
                            No custom approval gates active. Normal one-step approval applies.
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
