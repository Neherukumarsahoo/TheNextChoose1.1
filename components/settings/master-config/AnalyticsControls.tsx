"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Reporting Intelligence</CardTitle>
                    <CardDescription>Configure how platform performance is measured.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="72. Reporting Lookback (days)" 
                        type="input" 
                        value={config.reporting_lookback || "180"}
                        onChange={(v: any) => update("reporting_lookback", v)}
                    />
                    <ControlRow 
                        label="73. Real-time FX Rates" 
                        type="switch" 
                        value={config.realtime_fx !== false}
                        onChange={(v: any) => update("realtime_fx", v)}
                    />
                    <ControlRow 
                        label="74. Default Chart Visual" 
                        type="select" 
                        options={["Area", "Line", "Bar"]} 
                        value={config.chart_visual || "Area"}
                        onChange={(v: any) => update("chart_visual", v)}
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
