"use client"

import { useEffect } from "react"
import { toast } from "sonner"

export function KeyboardShortcuts() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K for global search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                toast.info("Global search (Coming soon)")
            }

            // Ctrl/Cmd + B for toggle sidebar
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault()
                document.querySelector('[data-sidebar-toggle]')?.dispatchEvent(new Event('click'))
            }

            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault()
                toast.info("Keyboard shortcuts:\n⌘K - Search\n⌘B - Toggle sidebar\n⌘/ - Help")
            }

            // G then D for dashboard
            if (e.key === 'g') {
                setTimeout(() => {
                    const nextKey = (ev: KeyboardEvent) => {
                        if (ev.key === 'd') {
                            window.location.href = '/dashboard'
                        } else if (ev.key === 'i') {
                            window.location.href = '/influencers'
                        } else if (ev.key === 'b') {
                            window.location.href = '/brands'
                        } else if (ev.key === 'c') {
                            window.location.href = '/campaigns'
                        } else if (ev.key === 'p') {
                            window.location.href = '/payments'
                        }
                        window.removeEventListener('keydown', nextKey)
                    }
                    window.addEventListener('keydown', nextKey)
                }, 100)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return null
}
