"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function SessionTimer() {
    const { data: session } = useSession()
    const [timeLeft, setTimeLeft] = useState<string>("")
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        if (!session?.expires) return

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const expires = new Date(session.expires).getTime()
            const diff = expires - now

            if (diff <= 0) {
                clearInterval(interval)
                signOut({ callbackUrl: "/auth/login" })
                return
            }

            // Alert when less than 5 minutes remain
            if (diff < 5 * 60 * 1000) {
                setAlert(true)
            }

            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
        }, 1000)

        return () => clearInterval(interval)
    }, [session])

    if (!session) return null

    return (
        <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border ${alert ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-50 text-slate-500 border-slate-200'} transition-colors`}>
            <Clock className="h-3 w-3" />
            <span>{timeLeft || "Calculat..."}</span>
        </div>
    )
}
