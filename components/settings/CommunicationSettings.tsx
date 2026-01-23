"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Mail, MessageSquare, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

export function CommunicationSettings() {
    const handleSave = () => {
        toast.success("Core communication settings updated")
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <CardTitle>SMTP Gateway</CardTitle>
                    </div>
                    <CardDescription>Configure primary email delivery credentials.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>SMTP Host</Label>
                        <Input placeholder="smtp.mailtrap.io" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Port</Label>
                            <Input placeholder="587" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Encryption</Label>
                            <Input placeholder="TLS" />
                        </div>
                    </div>
                    <Button onClick={handleSave} className="w-full">Save Mail Config</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <CardTitle>SMS & WhatsApp Hub</CardTitle>
                    </div>
                    <CardDescription>Connect Twilio or Meta for text outreach.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Account SID</Label>
                        <Input type="password" value="ACxxxxxxxxxxxxxxxx" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="text-sm font-medium">WhatsApp Business</p>
                            <p className="text-xs text-muted-foreground">Force official API usage</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Button onClick={handleSave} variant="secondary" className="w-full">Save SMS Config</Button>
                </CardContent>
            </Card>
        </div>
    )
}
