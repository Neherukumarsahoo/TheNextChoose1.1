"use client"

import { useEffect, useState } from "react"
import { Megaphone, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function AnnouncementBanner() {
    const [announcements, setAnnouncements] = useState<any[]>([])
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const res = await fetch("/api/announcements")
            if (res.ok) {
                const data = await res.json()
                setAnnouncements(data)
            }
        }
        fetchAnnouncements()
    }, [])

    if (!visible || announcements.length === 0) return null

    const current = announcements[0] // Show the latest

    const getTypeStyles = (type: string) => {
        switch (type) {
            case "warning": return "bg-amber-500 text-white"
            case "success": return "bg-green-600 text-white"
            default: return "bg-blue-600 text-white"
        }
    }

    return (
        <div className={cn(
            "relative flex items-center justify-center gap-4 px-4 py-2 text-sm font-medium transition-all animate-in slide-in-from-top duration-500",
            getTypeStyles(current.type)
        )}>
            <Megaphone className="h-4 w-4" />
            <p className="text-center">{current.message}</p>
            <button 
                onClick={() => setVisible(false)}
                className="absolute right-4 hover:opacity-70"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
