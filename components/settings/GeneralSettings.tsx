"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Smartphone, Globe, Shield } from "lucide-react"

export function GeneralSettings() {
    const [settings, setSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/platform-settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data)
                setLoading(false)
            })
    }, [])

    const handleToggle = async (key: string) => {
        // Since we are storing these in a JSON field "masterConfig" or similar, 
        // we might need to parse it first. For this demo, let's assume we patch 
        // specific fields if they existed in the schema, OR we use `featureFlags` 
        // as a bucket for these toggles too. 
        // Let's use `masterConfig` JSON bucket for general toggles.
        
        const currentConfig = JSON.parse(settings?.masterConfig || "{}")
        currentConfig[key] = !currentConfig[key]

        const res = await fetch("/api/platform-settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ masterConfig: JSON.stringify(currentConfig) })
        })

        if (res.ok) {
            setSettings({ ...settings, masterConfig: JSON.stringify(currentConfig) })
            toast.success("Setting updated")
        } else {
            toast.error("Failed to update setting")
        }
    }

    const config = JSON.parse(settings?.masterConfig || "{}")

    if (loading) return <div>Loading settings...</div>

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>
                        Configure core platform settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                <Label className="text-base">Maintenance Mode</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Disable access to the platform for non-admin users.
                            </p>
                        </div>
                        <Switch 
                            checked={config.maintenanceMode || false} 
                            onCheckedChange={() => handleToggle("maintenanceMode")}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <Label className="text-base">Public Registration</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Allow new brands/influencers to sign up publicly.
                            </p>
                        </div>
                        <Switch 
                             checked={config.publicRegistration !== false} // Default true
                             onCheckedChange={() => handleToggle("publicRegistration")}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <Label className="text-base">Influencer Approval</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Require manual approval for new influencer accounts.
                            </p>
                        </div>
                        <Switch 
                             checked={config.influencerApproval !== false} // Default true
                             onCheckedChange={() => handleToggle("influencerApproval")}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                        Public contact details for support. (Read-only for demo)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input id="support-email" defaultValue="support@thenextchoose.com" disabled />
                    </div>
                    <Button variant="outline" disabled>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
