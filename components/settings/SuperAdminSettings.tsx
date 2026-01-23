"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Megaphone, Shield, Layout, Percent, ShieldAlert, ShieldCheck, GitPullRequest, Webhook as WebhookIcon, Mail, Database } from "lucide-react"
import { RBACEditor } from "./RBACEditor"
import { IPManager } from "./IPManager"
import { ApprovalChainManager } from "./ApprovalChainManager"
import { WebhookManager } from "./WebhookManager"
import { CommunicationSettings } from "./CommunicationSettings"
import { RetentionSettings } from "./RetentionSettings"
import { Separator } from "@/components/ui/separator"

export function SuperAdminSettings() {
    const [settings, setSettings] = useState<any>(null)
    const [announcementMsg, setAnnouncementMsg] = useState("")
    const [announcementType, setAnnouncementType] = useState("info")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/platform-settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data)
                setLoading(false)
            })
    }, [])

    const handleToggleModule = async (module: string) => {
        const flags = JSON.parse(settings?.featureFlags || "{}")
        flags[module] = !flags[module]
        
        const res = await fetch("/api/platform-settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ featureFlags: JSON.stringify(flags) })
        })

        if (res.ok) {
            setSettings({ ...settings, featureFlags: JSON.stringify(flags) })
            toast.success("Module preference updated")
        }
    }

    const postAnnouncement = async () => {
        if (!announcementMsg) return
        const res = await fetch("/api/announcements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: announcementMsg, type: announcementType })
        })

        if (res.ok) {
            toast.success("Announcement posted live!")
            setAnnouncementMsg("")
        }
    }

    const updateCommission = async (val: string) => {
        const res = await fetch("/api/platform-settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commission: parseFloat(val) })
        })

        if (res.ok) {
            setSettings({ ...settings, commission: parseFloat(val) })
            toast.success("Commission rate updated")
        }
    }

    if (loading) return <div>Loading super settings...</div>

    const modules = JSON.parse(settings?.featureFlags || "{}")

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Megaphone className="h-5 w-5 text-blue-600" />
                            <CardTitle>Global Announcement</CardTitle>
                        </div>
                        <CardDescription>Post a message visible to all admin users.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Input 
                                value={announcementMsg} 
                                onChange={(e) => setAnnouncementMsg(e.target.value)}
                                placeholder="e.g. System maintenance scheduled for tonight..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Banner Type</Label>
                            <Select value={announcementType} onValueChange={setAnnouncementType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="info">Information (Blue)</SelectItem>
                                    <SelectItem value="warning">Critical/Warning (Amber)</SelectItem>
                                    <SelectItem value="success">Success (Green)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={postAnnouncement} className="w-full">Post Announcement</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Percent className="h-5 w-5 text-green-600" />
                            <CardTitle>Commission Engine</CardTitle>
                        </div>
                        <CardDescription>Set the default platform commission percentage.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Default Rate (%)</Label>
                            <div className="flex gap-2">
                                <Input 
                                    type="number" 
                                    defaultValue={settings?.commission} 
                                    onBlur={(e) => updateCommission(e.target.value)}
                                />
                                <Button variant="outline">Save</Button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            This rate will be applied to all new campaign calculations by default.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5 text-purple-600" />
                        <CardTitle>Module Management</CardTitle>
                    </div>
                    <CardDescription>Enable or disable major platform feature modules.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">Content Review</p>
                                <p className="text-xs text-muted-foreground">Elite Phase 8 Tool</p>
                            </div>
                            <Switch 
                                checked={modules["content-review"] !== false} 
                                onCheckedChange={() => handleToggleModule("content-review")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">Audit Logs</p>
                                <p className="text-xs text-muted-foreground">Internal Security</p>
                            </div>
                            <Switch 
                                checked={modules["audit-logs"] !== false} 
                                onCheckedChange={() => handleToggleModule("audit-logs")}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">System Health</p>
                                <p className="text-xs text-muted-foreground">Real-time Metrics</p>
                            </div>
                            <Switch 
                                checked={modules["system-health"] !== false} 
                                onCheckedChange={() => handleToggleModule("system-health")}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2 pt-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Advanced Security & Compliance
                </h4>
                <Separator />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <RBACEditor />
                <IPManager />
            </div>

            <ApprovalChainManager />

            <div className="space-y-2 pt-8">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                    <WebhookIcon className="h-5 w-5 text-blue-500" />
                    Workflows & Data Orchestration
                </h4>
                <Separator />
            </div>

            <WebhookManager />

            <div className="space-y-2 pt-8">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-600" />
                    Messaging & Retention
                </h4>
                <Separator />
            </div>

            <CommunicationSettings />
            <RetentionSettings />
        </div>
    )
}
