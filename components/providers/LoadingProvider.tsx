"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"

interface LoadingContextType {
    isLoading: boolean
    startLoading: () => void
    stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()

    // Reset loading state when path changes (navigation complete)
    useEffect(() => {
        setIsLoading(false)
    }, [pathname])

    const startLoading = () => setIsLoading(true)
    const stopLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider")
    }
    return context
}
