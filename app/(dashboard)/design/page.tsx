"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Waves } from "lucide-react"

export default function DesignPlaygroundPage() {
    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Design System</h1>
                <p className="text-lg text-muted-foreground">
                    Core UI components and style tokens.
                </p>
            </div>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Buttons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </section>

             {/* Form Elements */}
             <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Inputs & Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Input placeholder="Default Input" />
                        <Input placeholder="Disabled Input" disabled />
                        <div className="flex items-center space-x-2">
                             <Switch id="airplane-mode" />
                             <label htmlFor="airplane-mode">Airplane Mode</label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                 <h2 className="text-2xl font-semibold border-b pb-2">Cards</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Standard Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Content goes here.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Info Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-600">This is an informational card.</p>
                        </CardContent>
                    </Card>
                 </div>
            </section>

             {/* Alerts & Badges */}
             <section className="space-y-4">
                 <h2 className="text-2xl font-semibold border-b pb-2">Status Indicators</h2>
                 <div className="flex flex-wrap gap-4 mb-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Success</Badge>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Warning</Badge>
                 </div>
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components to your app using the cli.
                    </AlertDescription>
                </Alert>
            </section>
        </div>
    )
}
