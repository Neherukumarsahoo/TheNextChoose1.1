"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface FilterProps {
    onSearch: (term: string) => void
    onCategoryFilter: (category: string) => void
    onStatusFilter: (status: string) => void
    categories?: string[]
}

export function InfluencerFilters({ onSearch, onCategoryFilter, onStatusFilter, categories = [] }: FilterProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [category, setCategory] = useState("all")
    const [status, setStatus] = useState("all")

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        onSearch(value)
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        onCategoryFilter(value)
    }

    const handleStatusChange = (value: string) => {
        setStatus(value)
        onStatusFilter(value)
    }

    const handleReset = () => {
        setSearchTerm("")
        setCategory("all")
        setStatus("all")
        onSearch("")
        onCategoryFilter("all")
        onStatusFilter("all")
    }

    return (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-lg border space-y-4">
            <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Filters</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or Instagram..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="inactive">Inactive Only</SelectItem>
                        <SelectItem value="approved">Approved Only</SelectItem>
                        <SelectItem value="pending">Pending Approval</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {(searchTerm || category !== "all" || status !== "all") && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="w-full"
                >
                    <X className="mr-2 h-4 w-4" />
                    Reset Filters
                </Button>
            )}
        </div>
    )
}
