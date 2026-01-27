"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

export function useAutoSave<T>(key: string, initialData: T) {
    const [data, setData] = useState<T>(initialData)
    const [isRestored, setIsRestored] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setData(parsed)
                setIsRestored(true)
                toast.info("Draft restored from auto-save", {
                    action: {
                        label: "Clear Draft",
                        onClick: () => clearDraft()
                    }
                })
            } catch (error) {
                console.error("Failed to parse auto-save", error)
            }
        }
    }, [key])

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (data && JSON.stringify(data) !== JSON.stringify(initialData)) {
            const timeoutId = setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(data))
            }, 1000) // Debounce 1s

            return () => clearTimeout(timeoutId)
        }
    }, [key, data, initialData])

    const clearDraft = useCallback(() => {
        localStorage.removeItem(key)
        setData(initialData)
        setIsRestored(false)
        toast.success("Draft cleared")
    }, [key, initialData])

    return { data, setData, clearDraft, isRestored }
}
