"use client"

import { Separator } from "@/components/ui/separator"
import { WebsiteCMS } from "@/components/settings/WebsiteCMS"

export default function CMSPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Website Configuration</h3>
                <p className="text-sm text-muted-foreground">
                    Directly manage your public website content, colors, and layout.
                </p>
            </div>
            <Separator />
            <WebsiteCMS />
        </div>
    )
}
