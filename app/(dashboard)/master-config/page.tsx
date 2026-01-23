import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings2, Shield, Database, Zap, Globe, Cpu, AlertTriangle } from "lucide-react"

import { prisma } from "@/lib/db"
import { MasterConfigClient } from "@/components/settings/master-config/MasterConfigClient"

export default async function MasterSettingsPage() {
    const session = await auth()
    if (session?.user?.role !== "SUPER_ADMIN") redirect("/dashboard")

    const settings = await prisma.platformSettings.findFirst()

    return (
        <MasterConfigClient initialSettings={settings} />
    )
}

function ControlCard({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all">
            <CardHeader className="bg-muted/30">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="divide-y pt-4">
                {children}
            </CardContent>
        </Card>
    )
}

function ControlRow({ label, type, options, defaultValue, defaultChecked }: any) {
    return (
        <div className="flex items-center justify-between py-4">
            <Label className="text-base font-medium">{label}</Label>
            {type === "switch" && <Switch defaultChecked={defaultChecked} />}
            {type === "input" && <Input className="w-24 text-right" defaultValue={defaultValue} />}
            {type === "select" && (
                <select className="bg-muted border rounded p-1 text-sm font-medium outline-none">
                    {options.map((o: string) => <option key={o}>{o}</option>)}
                </select>
            )}
        </div>
    )
}
