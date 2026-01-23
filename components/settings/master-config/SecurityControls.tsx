"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SecurityControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Access & Authentication</CardTitle>
                    <CardDescription>Guard the gates of the admin panel.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="11. Session Lifespan (min)" 
                        type="input" 
                        value={config.session_lifespan || "120"}
                        onChange={(v: any) => update("session_lifespan", v)}
                    />
                    <ControlRow 
                        label="12. Concurrent Login Block" 
                        type="switch" 
                        value={config.block_concurrent === true}
                        onChange={(v: any) => update("block_concurrent", v)}
                    />
                    <ControlRow 
                        label="13. Password Policy" 
                        type="select" 
                        options={["Standard", "Strict (Enterprise)"]} 
                        value={config.password_policy || "Standard"}
                        onChange={(v: any) => update("password_policy", v)}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Enterprise Isolation</CardTitle>
                    <CardDescription>High-level security and emergency protocols.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="91. SSO Gateway" 
                        type="select" 
                        options={["None", "Auth0", "Okta", "Azure AD"]} 
                        value={config.sso_gateway || "None"}
                        onChange={(v: any) => update("sso_gateway", v)}
                    />
                    <ControlRow 
                        label="92. IP Geofencing (Country)" 
                        type="switch" 
                        value={config.geofencing === true}
                        onChange={(v: any) => update("geofencing", v)}
                    />
                    <ControlRow 
                        label="100. Global Kill Switch" 
                        type="switch" 
                        value={config.kill_switch === true}
                        onChange={(v: any) => update("kill_switch", v)}
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
            {type === "input" && <Input className="w-24 text-right" value={value} onChange={(e) => onChange(e.target.value)} />}
            {type === "select" && (
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-40">
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
