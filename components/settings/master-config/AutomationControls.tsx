"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AutomationControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Intelligence & Tasks</CardTitle>
                    <CardDescription>Manage automated background processes.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="41. Admin Daily Digest" 
                        type="switch" 
                        value={config.daily_digest !== false}
                        onChange={(v: any) => update("daily_digest", v)}
                    />
                    <ControlRow 
                        label="43. Approval Escalation (hrs)" 
                        type="input" 
                        value={config.escalation_hrs || "24"}
                        onChange={(v: any) => update("escalation_hrs", v)}
                    />
                    <ControlRow 
                        label="49. Social Refresh Interval" 
                        type="select" 
                        options={["Daily", "Twice Daily", "Hourly"]} 
                        value={config.social_interval || "Daily"}
                        onChange={(v: any) => update("social_interval", v)}
                    />
                    <ControlRow 
                        label="50. Global Workflow Master" 
                        type="switch" 
                        value={config.workflow_master !== false}
                        onChange={(v: any) => update("workflow_master", v)}
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
