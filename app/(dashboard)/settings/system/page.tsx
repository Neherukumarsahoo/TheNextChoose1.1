"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { ShieldAlert, Terminal, Moon, Sun, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"

export default function SystemSettingsPage() {
    const { setTheme, theme } = useTheme()
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    const [sentryDsn, setSentryDsn] = useState('https://examplePublicKey@o0.ingest.sentry.io/0')

    const handleSave = () => {
        toast.success("System settings updated successfully")
    }

    return (
        <div className="p-8 max-w-[1000px] mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
                <p className="text-muted-foreground">
                   Manage global platform settings and environment variables.
                </p>
            </div>

            {/* Feature 17: Maintenance Mode */}
            <Card className={maintenanceMode ? "border-amber-400 bg-amber-50" : ""}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {maintenanceMode ? <AlertTriangle className="text-amber-600" /> : <ShieldAlert />}
                        Maintenance Mode
                    </CardTitle>
                    <CardDescription>
                        Put the public-facing site into maintenance mode. Only admins can access.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="text-base">Enable Maintenance Mode</Label>
                        <p className="text-sm text-gray-500">
                            Current Status: <span className="font-bold">{maintenanceMode ? "ACTIVE" : "Inactive"}</span>
                        </p>
                    </div>
                    <Switch 
                        checked={maintenanceMode} 
                        onCheckedChange={(c) => {
                            setMaintenanceMode(c)
                            if (c) toast.warning("Maintenance Mode Activated")
                            else toast.success("Maintenance Mode Deactivated")
                        }} 
                    />
                </CardContent>
            </Card>

            {/* Feature 18: Error Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Terminal />
                        Error Tracking (Sentry)
                    </CardTitle>
                    <CardDescription>
                        Configure Sentry DSN for frontend error logging.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="dsn">Sentry DSN (Public Client Key)</Label>
                        <Input 
                            id="dsn" 
                            value={sentryDsn} 
                            onChange={(e) => setSentryDsn(e.target.value)} 
                            className="font-mono text-sm"
                        />
                     </div>
                </CardContent>
            </Card>

             {/* Feature 20: System Theme Defaults */}
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Moon />
                        Default Theme Appearance
                    </CardTitle>
                    <CardDescription>
                        Set the default theme for new users.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex gap-4">
                        <Button
                            variant={theme === 'light' ? 'default' : 'outline'}
                            onClick={() => setTheme('light')}
                            className="flex-1 gap-2"
                        >
                            <Sun className="w-4 h-4" /> Light Mode
                        </Button>
                        <Button 
                            variant={theme === 'dark' ? 'default' : 'outline'}
                            onClick={() => setTheme('dark')}
                            className="flex-1 gap-2"
                        >
                            <Moon className="w-4 h-4" /> Dark Mode
                        </Button>
                        <Button 
                            variant={theme === 'system' ? 'default' : 'outline'}
                            onClick={() => setTheme('system')}
                            className="flex-1 gap-2"
                        >
                            <Terminal className="w-4 h-4" /> System
                        </Button>
                     </div>
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button onClick={handleSave} size="lg">Save Changes</Button>
            </div>
        </div>
    )
}
