"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

interface ExportButtonProps {
    data: any[]
    filename: string
    type: "influencers" | "brands" | "campaigns" | "payments"
}

export function ExportButton({ data, filename, type }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false)

    const convertToCSV = (data: any[]) => {
        if (data.length === 0) return ""

        const headers = Object.keys(data[0])
        const rows = data.map(item =>
            headers.map(header => {
                const value = item[header]
                return typeof value === 'string' ? `"${value}"` : value
            }).join(',')
        )

        return [headers.join(','), ...rows].join('\n')
    }

    const handleExport = () => {
        setIsExporting(true)
        try {
            const csv = convertToCSV(data)
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
            toast.success("Data exported successfully!")
        } catch (error) {
            toast.error("Failed to export data")
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting || data.length === 0}
        >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
        </Button>
    )
}
