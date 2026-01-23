"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UIControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Personalization Engine</CardTitle>
                    <CardDescription>Tailor the visual experience for all admins.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="31. Accent Color (Primary)" 
                        type="input" 
                        value={config.accent_color || "#2563eb"}
                        onChange={(v: any) => update("accent_color", v)}
                    />
                    <ControlRow 
                        label="33. Default Campaign View" 
                        type="select" 
                        options={["Kanban", "Table", "Grid"]} 
                        value={config.default_view || "Kanban"}
                        onChange={(v: any) => update("default_view", v)}
                    />
                    <ControlRow 
                        label="34. Compact Layout Mode" 
                        type="switch" 
                        value={config.compact_mode === true}
                        onChange={(v: any) => update("compact_mode", v)}
                    />
                    <ControlRow 
                        label="39. Forced Interface Theme" 
                        type="select" 
                        options={["System", "Dark", "Light"]} 
                        value={config.theme_force || "System"}
                        onChange={(v: any) => update("theme_force", v)}
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
