"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Bell, Lock, Globe, Mail, CreditCard, Database, Key, Webhook } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { GeneralSettings } from "@/components/settings/GeneralSettings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const router = useRouter()

    return (
        <div className="space-y-6 max-w-[1200px] mx-auto p-4">
            <div>
                <h3 className="text-3xl font-bold">Settings</h3>
                <p className="text-muted-foreground mt-1 text-lg">
                    Manage your platform configuration and preferences.
                </p>
            </div>
            <Separator />

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="h-auto flex-wrap justify-start gap-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>

                </TabsList>



                <TabsContent value="general" className="space-y-4">
                    <GeneralSettings />
                </TabsContent>

                <TabsContent value="branding" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Identity</CardTitle>
                            <CardDescription>
                                Customize the look and feel of your admin panel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="brand-name">Brand Name</Label>
                                <Input id="brand-name" defaultValue="TheNextChoose" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Primary Color</Label>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 cursor-pointer"></div>
                                    <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer"></div>
                                    <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer"></div>
                                    <div className="h-8 w-8 rounded-full bg-orange-600 cursor-pointer"></div>
                                </div>
                            </div>
                            <Button onClick={() => toast.success("Branding updated!")}>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="system" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                            <CardDescription>
                                Advanced system settings have moved to a dedicated page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Visit the dedicated System Settings page for Maintenance Mode, Error Tracking, and Environment Variables.
                            </p>
                            <Button onClick={() => router.push("/settings/system")} className="gap-2">
                                Open System Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                                Choose what emails you want to receive.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">New User Signups</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Receive an email when a new user registers.
                                    </p>
                                </div>
                                <Switch defaultChecked onCheckedChange={(c) => toast.success(c ? "Notifications Enabled" : "Notifications Disabled")} />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Bell className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">Campaign Approvals</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Receive alerts when a campaign needs review.
                                    </p>
                                </div>
                                <Switch defaultChecked onCheckedChange={(c) => toast.success(c ? "Notifications Enabled" : "Notifications Disabled")} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>SMTP Configuration</CardTitle>
                            <CardDescription>
                                Configure your email sending service.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-host">SMTP Host</Label>
                                    <Input id="smtp-host" placeholder="smtp.example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-port">SMTP Port</Label>
                                    <Input id="smtp-port" placeholder="587" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-user">Username</Label>
                                    <Input id="smtp-user" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-pass">Password</Label>
                                    <Input id="smtp-pass" type="password" />
                                </div>
                            </div>
                            <Button onClick={() => toast.success("SMTP Settings Saved")}>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-4">
                    {/* Redirect to Webhooks */}
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Webhook className="w-5 h-5 text-blue-700" />
                                <CardTitle className="text-blue-700">Webhooks</CardTitle>
                            </div>
                            <CardDescription className="text-blue-600">
                                Connect external tools like Zapier, Make, and Slack via Webhooks.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => router.push("/settings/webhooks")}>Manage Webhooks</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>External Services</CardTitle>
                            <CardDescription>
                                Connect with third-party APIs and services.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <Globe className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Google Analytics</p>
                                        <p className="text-sm text-muted-foreground">Track user behavior and traffic.</p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={() => toast.info("Opening Google Auth...")}>Connect</Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-indigo-100 p-2">
                                        <CreditCard className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Stripe Payment</p>
                                        <p className="text-sm text-muted-foreground">Manage payments and subscriptions.</p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={() => toast.info("Opening Stripe Auth...")}>Configure</Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-gray-100 p-2">
                                        <Database className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">S3 Storage</p>
                                        <p className="text-sm text-muted-foreground">AWS S3 bucket for file uploads.</p>
                                    </div>
                                </div>
                                <Button variant="outline" onClick={() => toast.info("Opening AWS Config...")}>Configure</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    )
}
