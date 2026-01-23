"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BulkOperationsProps {
    selectedIds: string[]
    onSelectionChange: (ids: string[]) => void
    entityType: "influencers" | "brands" | "campaigns" | "payments"
}

export function BulkOperations({ selectedIds, onSelectionChange, entityType }: BulkOperationsProps) {
    const router = useRouter()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleBulkDelete = async () => {
        setIsDeleting(true)
        try {
            const response = await fetch(`/api/${entityType}/bulk-delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedIds }),
            })

            if (response.ok) {
                toast.success(`Successfully deleted ${selectedIds.length} items`)
                onSelectionChange([])
                setShowDeleteDialog(false)
                router.refresh()
            } else {
                toast.error("Failed to delete items")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsDeleting(false)
        }
    }

    if (selectedIds.length === 0) return null

    return (
        <>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={true}
                        onCheckedChange={() => onSelectionChange([])}
                    />
                    <span className="font-medium">{selectedIds.length} selected</span>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Selected
                    </Button>
                </div>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedIds.length} items?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the selected items. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBulkDelete}
                            className="bg-destructive text-destructive-foreground"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
