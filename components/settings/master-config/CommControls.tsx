"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CommControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Outreach Infrastructure</CardTitle>
                    <CardDescription>Manage how the platform talks to the world.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="61. Default SMTP Provider" 
                        type="select" 
                        options={["SendGrid", "Mailgun", "AWS SES"]} 
                        value={config.smtp_provider || "SendGrid"}
                        onChange={(v: any) => update("smtp_provider", v)}
                    />
                    <ControlRow 
                        label="63. WhatsApp Official API" 
                        type="switch" 
                        value={config.whatsapp_api === true}
                        onChange={(v: any) => update("whatsapp_api", v)}
                    />
                    <ControlRow 
                        label="64. Outreach Email Theme" 
                        type="select" 
                        options={["Modern", "Agency", "Minimal"]} 
                        value={config.email_theme || "Modern"}
                        onChange={(v: any) => update("email_theme", v)}
                    />
                    <ControlRow 
                        label="66. Forced Unsubscribe Footer" 
                        type="switch" 
                        value={config.force_unsubscribe !== false}
                        onChange={(v: any) => update("force_unsubscribe", v)}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

function ControlRow({ label, type, options, value, onChange }: any) {
    return (
        <div className="flex items-center justify-between py-4">
            <Label className="text-sm font-medium">{label}</Label>
            {type === "switch" && <Switch checked={value} onCheckedChange={onChange} />}
            {type === "input" && <Input className="w-40 text-right" value={value} onChange={(e) => onChange(e.target.value)} />}
            {type === "select" && (
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((o: string) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                </Select>
            )}
        </div>
    )
}
