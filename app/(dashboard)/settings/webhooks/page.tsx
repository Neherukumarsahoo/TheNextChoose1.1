"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Webhook, Plus, Trash2 } from "lucide-react"

export default function WebhooksPage() {
    const [webhooks, setWebhooks] = useState([
        { id: 1, url: 'https://hooks.zapier.com/hooks/catch/12392/s82/', event: 'campaign.created', active: true },
        { id: 2, url: 'https://api.slack.com/webhook/99283-292', event: 'payment.failed', active: false },
    ])
    const [newUrl, setNewUrl] = useState('')

    const addWebhook = () => {
        if (!newUrl) return
        setWebhooks([...webhooks, { id: Date.now(), url: newUrl, event: 'all.events', active: true }])
        setNewUrl('')
        toast.success("Webhook endpoint added")
    }

    const removeWebhook = (id: number) => {
        setWebhooks(webhooks.filter(w => w.id !== id))
        toast.success("Webhook removed")
    }

    return (
        <div className="p-8 max-w-[1000px] mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
                <p className="text-muted-foreground">
                    Connect your admin panel to external tools like Zapier, Slack, or Make.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Webhook</CardTitle>
                    <CardDescription>Enter the destination URL for system events.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <div className="flex-1">
                        <Label htmlFor="url" className="sr-only">URL</Label>
                        <Input 
                            id="url" 
                            placeholder="https://your-webhook-url.com/..." 
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                        />
                    </div>
                    <Button onClick={addWebhook} className="gap-2">
                        <Plus className="w-4 h-4" /> Add
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {webhooks.map((hook) => (
                    <div key={hook.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-2 bg-gray-100 rounded-md">
                                <Webhook className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{hook.url}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                                        {hook.event}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${hook.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {hook.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch checked={hook.active} />
                            <Button variant="ghost" size="icon" onClick={() => removeWebhook(hook.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
