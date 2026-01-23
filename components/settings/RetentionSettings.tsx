"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Database, Trash2, Clock } from "lucide-react"
import { toast } from "sonner"

export function RetentionSettings() {
    const handleSave = () => {
        toast.success("Retention policies updated")
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-amber-600" />
                    <CardTitle>Data Lifecycle & Retention</CardTitle>
                </div>
                <CardDescription>Automate database cleanup and audit log archiving.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Audit Log Age
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="90" />
                            <span className="text-sm text-muted-foreground">Days</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Auto-Delete Drafts
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="30" />
                            <span className="text-sm text-muted-foreground">Days</span>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Button onClick={handleSave} className="w-full">Apply Policies</Button>
                    </div>
                </div>
                <p className="text-xs text-amber-600 font-medium">
                    ⚠️ Caution: Once data is purged according to these rules, it cannot be recovered without a database backup.
                </p>
            </CardContent>
        </Card>
    )
}
