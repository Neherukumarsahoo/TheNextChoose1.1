"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FinancialControls({ config, update }: { config: any, update: (k: string, v: any) => void }) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Orchestration</CardTitle>
                    <CardDescription>Global financial logic and tax settings.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                    <ControlRow 
                        label="21. Tax Entity Label" 
                        type="select" 
                        options={["GST", "VAT", "Sales Tax"]} 
                        value={config.tax_label || "GST"}
                        onChange={(v: any) => update("tax_label", v)}
                    />
                    <ControlRow 
                        label="22. Global Tax Rate (%)" 
                        type="input" 
                        value={config.tax_rate || "18"}
                        onChange={(v: any) => update("tax_rate", v)}
                    />
                    <ControlRow 
                        label="24. Auto-Invoice Generation" 
                        type="switch" 
                        value={config.auto_invoice !== false}
                        onChange={(v: any) => update("auto_invoice", v)}
                    />
                    <ControlRow 
                        label="29. Active Gateway" 
                        type="select" 
                        options={["Stripe", "Razorpay", "Manual"]} 
                        value={config.payment_gateway || "Stripe"}
                        onChange={(v: any) => update("payment_gateway", v)}
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
