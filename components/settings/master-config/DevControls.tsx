"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DevControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>System & Infrastructure</CardTitle>
                    <CardDescription>Direct control over the server environment.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="81. Global Log Level" 
                        type="select" 
                        options={["Info", "Debug", "Warn", "Error"]} 
                        value={config.log_level || "Info"}
                        onChange={(v: any) => update("log_level", v)}
                    />
                    <ControlRow 
                        label="87. SQL Query Logging" 
                        type="switch" 
                        value={config.sql_logging === true}
                        onChange={(v: any) => update("sql_logging", v)}
                    />
                    <ControlRow 
                        label="88. Environment Meta-Ribbon" 
                        type="switch" 
                        value={config.env_ribbon !== false}
                        onChange={(v: any) => update("env_ribbon", v)}
                    />
                    <ControlRow 
                        label="93. Active AI Brain" 
                        type="select" 
                        options={["Claude 3.5 Sonnet", "GPT-4o", "Gemini 1.5 Pro"]} 
                        value={config.ai_brain || "Claude 3.5 Sonnet"}
                        onChange={(v: any) => update("ai_brain", v)}
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
                    <SelectTrigger className="w-44">
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
