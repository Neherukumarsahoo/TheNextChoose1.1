"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Bell, Lock, Shield, Smartphone, Globe, Mail, CreditCard, Database, Key } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SuperAdminSettings } from "@/components/settings/SuperAdminSettings"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
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
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="admin">Super Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="admin" className="space-y-4">
                    <SuperAdminSettings />
                </TabsContent>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Configuration</CardTitle>
                            <CardDescription>
                                Configure core platform settings and feature flags.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">Maintenance Mode</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Disable access to the platform for non-admin users.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">Public Registration</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Allow new brands/influencers to sign up publicly.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">Influencer Approval</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Require manual approval for new influencer accounts.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Public contact details for support.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="support-email">Support Email</Label>
                                <Input id="support-email" placeholder="support@thenextchoose.com" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
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
                                <Input id="brand-name" placeholder="TheNextChoose" />
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
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="system" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                            <CardDescription>
                                Metadata and SEO settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="site-title">Site Title</Label>
                                <Input id="site-title" placeholder="TheNextChoose Admin" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="site-desc">Meta Description</Label>
                                <Input id="site-desc" placeholder="Admin dashboard for influencer management." />
                            </div>
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
                                <Switch defaultChecked />
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
                                <Switch defaultChecked />
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
                            <div className="flex items-center justify-between mt-4">
                                <div className="space-y-0.5">
                                    <Label>Secure Connection (TLS)</Label>
                                    <p className="text-sm text-muted-foreground">Encryption for emails.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>



                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Preferences</CardTitle>
                            <CardDescription>
                                Manage security settings for the admin panel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-base">2-Factor Authentication (Admin)</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Enforce 2FA for all admin users.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Key className="h-4 w-4 text-muted-foreground" />
                                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                </div>
                                <Input id="session-timeout" type="number" placeholder="30" />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Strong Password Policy</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Require uppercase, numbers, and special characters.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>API Key Management</CardTitle>
                            <CardDescription>
                                Manage access keys for external integrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/50">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium">Production API Key</div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 bg-white dark:bg-black border rounded px-2 py-1 text-sm font-mono overflow-hidden text-ellipsis">
                                        sk_live_51...92xK
                                    </code>
                                    <Button variant="ghost" size="sm">Copy</Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Revoke</Button>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    Last used: 2 minutes ago
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                Generate New Key
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-4">
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
                                <Button variant="outline">Connect</Button>
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
                                <Button variant="outline">Configure</Button>
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
                                <Button variant="outline">Configure</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    )
}
