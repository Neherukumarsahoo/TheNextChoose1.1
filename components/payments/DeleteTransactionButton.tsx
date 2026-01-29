"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function DeleteTransactionButton({ id, showLabel }: { id: string, showLabel?: boolean }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this manual transaction and all linked payments?")) return

        setLoading(true)
        try {
            const res = await fetch(`/api/payments/manual?id=${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast.success("Transaction deleted")
                router.refresh()
            } else {
                const errText = await res.text()
                console.error("[DeleteTransactionButton Error]:", errText)
                toast.error(`Failed: ${errText}`)
            }
        } catch (error) {
            console.error("[DeleteTransactionButton Exception]:", error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {showLabel && <span>Delete</span>}
        </Button>
    )
}
