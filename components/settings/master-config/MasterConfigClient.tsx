"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Settings2, Shield, Database, Zap, Globe, Cpu, AlertTriangle } from "lucide-react"
import { DataControls } from "./DataControls"
import { SecurityControls } from "./SecurityControls"
import { FinancialControls } from "./FinancialControls"
import { UIControls } from "./UIControls"
import { AutomationControls } from "./AutomationControls"
import { CommControls } from "./CommControls"
import { AnalyticsControls } from "./AnalyticsControls"
import { DevControls } from "./DevControls"
import { Separator } from "@/components/ui/separator"

export function MasterConfigClient({ initialSettings }: { initialSettings: any }) {
    const [settings, setSettings] = useState(initialSettings)
    const [config, setConfig] = useState<any>(JSON.parse(initialSettings?.masterConfig || "{}"))
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)

    const categories = [
        { id: "data", label: "Data & Entity", icon: Database, component: <DataControls config={config} update={updateConfig} /> },
        { id: "security", label: "Security & Access", icon: Shield, component: <SecurityControls config={config} update={updateConfig} /> },
        { id: "financial", label: "Financial & Revenue", icon: Zap, component: <FinancialControls config={config} update={updateConfig} /> },
        { id: "ui", label: "UI & UX", icon: Globe, component: <UIControls config={config} update={updateConfig} /> },
        { id: "automation", label: "Automation", icon: Zap, component: <AutomationControls config={config} update={updateConfig} /> },
        { id: "comm", label: "Communications", icon: Globe, component: <CommControls config={config} update={updateConfig} /> },
        { id: "analytics", label: "Analytics", icon: Database, component: <AnalyticsControls config={config} update={updateConfig} /> },
        { id: "dev", label: "Developer Tools", icon: Cpu, component: <DevControls config={config} update={updateConfig} /> }
    ]

    function updateConfig(key: string, value: any) {
        setConfig((prev: any) => ({ ...prev, [key]: value }))
        setHasChanges(true)
    }

    const saveChanges = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/platform-settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ masterConfig: JSON.stringify(config) })
            })

            if (res.ok) {
                toast.success("Master Configuration synchronized successfully")
                setHasChanges(false)
            } else {
                toast.error("Failed to sync configuration")
            }
        } catch (error) {
            toast.error("Network error during Master Sync")
        } finally {
            setSaving(false)
        }
    }

    const resetDefaults = () => {
        if (confirm("Are you sure you want to reset ALL 100+ settings to system defaults? This cannot be undone.")) {
            setConfig({})
            setHasChanges(true)
            toast.info("Settings reset to defaults (Commit required to persist)")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 text-red-600 dark:text-red-500">
                        <Settings2 className="h-10 w-10" />
                        MASTER CONFIG
                    </h1>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Direct kernel-level control over the platform's orchestration engine.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="font-bold border-2" onClick={resetDefaults}>
                        RESET DEFAULTS
                    </Button>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 font-bold gap-2 shadow-lg shadow-red-500/30">
                        <AlertTriangle className="h-5 w-5" /> THE BIG RED BUTTON
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="data" className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-xl h-auto flex-wrap gap-1 border">
                    {categories.map(cat => (
                        <TabsTrigger 
                            key={cat.id} 
                            value={cat.id} 
                            className="gap-2 py-3 px-6 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-black shadow-sm"
                        >
                            <cat.icon className="h-4 w-4" />
                            {cat.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="mt-8">
                    {categories.map(cat => (
                        <TabsContent key={cat.id} value={cat.id}>
                            {cat.component}
                        </TabsContent>
                    ))}
                </div>
            </Tabs>

            {hasChanges && (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 flex items-center justify-between animate-in slide-in-from-bottom-5">
                    <div>
                        <p className="font-bold text-lg">Unsaved Changes Detected</p>
                        <p className="text-sm text-muted-foreground">The platform is currently running on a cached configuration.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" onClick={() => { setConfig(JSON.parse(settings?.masterConfig || "{}")); setHasChanges(false); }}>Discard</Button>
                        <Button size="lg" className="px-10 font-black shadow-lg" onClick={saveChanges} disabled={saving}>
                            {saving ? "SYNCING CORE..." : "COMMIT CHANGES TO CORE"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
