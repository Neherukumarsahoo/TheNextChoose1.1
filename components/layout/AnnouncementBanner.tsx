"use client"

import { useState } from "react"
import { Megaphone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCMS } from "@/components/cms/CMSProvider"
import Link from "next/link"

export function AnnouncementBanner() {
    const config = useCMS()
    const [visible, setVisible] = useState(true)

    if (!visible || !config.bannerActive) return null

    return (
        <div
            className="relative flex items-center justify-center gap-4 px-4 py-2 text-sm font-medium transition-all animate-in slide-in-from-top duration-500"
            style={{ backgroundColor: config.bannerBgColor, color: config.bannerTextColor }}
        >
            <Megaphone className="h-4 w-4" />
            <p className="text-center">
                {config.bannerText}
                {config.bannerLink && (
                    <Link href={config.bannerLink} className="underline ml-2 hover:opacity-80">
                        Check it out &rarr;
                    </Link>
                )}
            </p>
            <button 
                onClick={() => setVisible(false)}
                className="absolute right-4 hover:opacity-70"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
