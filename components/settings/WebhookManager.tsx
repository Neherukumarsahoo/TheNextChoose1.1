"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link2, Plus, Trash2, Webhook as WebhookIcon, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

const events = [
    { id: "CAMPAIGN_APPROVED", label: "Campaign Approved" },
    { id: "PAYMENT_PAID", label: "Payment Marked Paid" },
    { id: "INFLUENCER_JOINED", label: "New Influencer Joined" },
    { id: "CAMPAIGN_COMPLETED", label: "Campaign Completed" }
]

export function WebhookManager() {
    const [webhooks, setWebhooks] = useState<any[]>([])
    const [url, setUrl] = useState("")
    const [event, setEvent] = useState("CAMPAIGN_APPROVED")
    const [secret, setSecret] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchWebhooks = async () => {
        const res = await fetch("/api/webhooks")
        if (res.ok) {
            const data = await res.json()
            setWebhooks(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchWebhooks()
    }, [])

    const addWebhook = async () => {
        if (!url) return
        const res = await fetch("/api/webhooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, event, secret })
        })

        if (res.ok) {
            toast.success("Webhook registered successfully")
            setUrl("")
            setSecret("")
            fetchWebhooks()
        }
    }

    const deleteWebhook = async (id: string) => {
        const res = await fetch(`/api/webhooks?id=${id}`, { method: "DELETE" })
        if (res.ok) {
            toast.success("Webhook deleted")
            fetchWebhooks()
        }
    }

    if (loading) return <div>Loading webhooks...</div>

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <WebhookIcon className="h-5 w-5 text-blue-500" />
                    <CardTitle>System Webhooks</CardTitle>
                </div>
                <CardDescription>Transmit real-time event signals to external apps (Slack, Zapier, etc).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4 items-end bg-muted/30 p-4 rounded-lg">
                    <div className="grid gap-2 col-span-2">
                        <Label>Payload URL</Label>
                        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://hooks.zapier.com/..." />
                    </div>
                    <div className="grid gap-2">
                        <Label>Trigger Event</Label>
                        <Select value={event} onValueChange={setEvent}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {events.map(ev => (
                                    <SelectItem key={ev.id} value={ev.id}>{ev.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={addWebhook} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Hook
                    </Button>
                </div>

                <div className="space-y-3">
                    {webhooks.map(hook => (
                        <div key={hook.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/10">
                            <div className="flex items-center gap-4">
                                <Link2 className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold text-sm truncate max-w-md">{hook.url}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Trigger: <span className="text-blue-600 font-medium">{hook.event}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => deleteWebhook(hook.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {webhooks.length === 0 && (
                        <p className="text-sm text-center py-4 text-muted-foreground italic">
                            No webhooks configured. The platform is isolated.
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
