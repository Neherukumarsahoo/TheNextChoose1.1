"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"

type SortDirection = "asc" | "desc" | null

interface SortableTableHeaderProps {
    label: string
    field: string
    currentSort: { field: string; direction: SortDirection }
    onSort: (field: string) => void
}

export function SortableTableHeader({ label, field, currentSort, onSort }: SortableTableHeaderProps) {
    const isActive = currentSort.field === field

    return (
        <th
            className="text-left p-3 cursor-pointer hover:bg-muted/50 select-none"
            onClick={() => onSort(field)}
        >
            <div className="flex items-center gap-2">
                {label}
                {isActive ? (
                    currentSort.direction === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : (
                        <ArrowDown className="h-4 w-4" />
                    )
                ) : (
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                )}
            </div>
        </th>
    )
}

export function useSortableData<T>(
    data: T[],
    initialField: string = "",
    initialDirection: SortDirection = null
) {
    const [sortConfig, setSortConfig] = useState<{ field: string; direction: SortDirection }>({
        field: initialField,
        direction: initialDirection,
    })

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.field || !sortConfig.direction) return 0

        const aValue = (a as any)[sortConfig.field]
        const bValue = (b as any)[sortConfig.field]

        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1

        if (typeof aValue === "string") {
            return sortConfig.direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
    })

    const requestSort = (field: string) => {
        let direction: SortDirection = "asc"

        if (sortConfig.field === field) {
            if (sortConfig.direction === "asc") {
                direction = "desc"
            } else if (sortConfig.direction === "desc") {
                direction = null
            }
        }

        setSortConfig({ field, direction })
    }

    return { sortedData, sortConfig, requestSort }
}
