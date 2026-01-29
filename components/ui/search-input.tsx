"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
// import { useDebounce } from "@/lib/utils" // Removed invalid import

export function SearchInput({
    placeholder = "Search...",
    className
}: {
    placeholder?: string,
    className?: string
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(searchParams.get("query") || "")

    // Simple debounce implementation inside to avoid dependency issues if utils doesn't have it
    useEffect(() => {
        const timer = setTimeout(() => {
            // Avoid infinite loop: only navigate if query actually changed
            const currentQuery = searchParams.get("query") || ""
            if (currentQuery === value) return

            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set("query", value)
            } else {
                params.delete("query")
            }
            params.set("page", "1") // Reset to page 1 on search
            router.push(`?${params.toString()}`)
        }, 500)

        return () => clearTimeout(timer)
    }, [value, router, searchParams])

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
