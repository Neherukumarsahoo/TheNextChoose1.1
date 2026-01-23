"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Core Entity Logic</CardTitle>
                    <CardDescription>How the platform handles basic data units.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="1. Auto-ID Format" 
                        type="select" 
                        options={["CUID", "UUID", "Numeric"]} 
                        value={config.auto_id_format || "CUID"}
                        onChange={(v: any) => update("auto_id_format", v)}
                    />
                    <ControlRow 
                        label="2. Soft Delete Policy" 
                        type="switch" 
                        value={config.soft_delete !== false}
                        onChange={(v: any) => update("soft_delete", v)}
                    />
                    <ControlRow 
                        label="3. Draft Mode Enforcement" 
                        type="switch" 
                        value={config.draft_mode === true}
                        onChange={(v: any) => update("draft_mode", v)}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Advanced Orchestration</CardTitle>
                    <CardDescription>Database and infrastructure level data settings.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="51. Unique ID Hash Algorithm" 
                        type="select" 
                        options={["SHA-256", "Argon2", "BCrypt"]} 
                        value={config.hash_algo || "SHA-256"}
                        onChange={(v: any) => update("hash_algo", v)}
                    />
                    <ControlRow 
                        label="54. DB Query Timeout (ms)" 
                        type="input" 
                        value={config.query_timeout || "5000"} 
                        onChange={(v: any) => update("query_timeout", v)}
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
