"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus } from "lucide-react"

// Types
interface PipelineBrand {
    id: string
    name: string
    pipelineStage: string
    budgetRange?: string
}

interface Column {
    id: string
    title: string
    brands: PipelineBrand[]
}

const COLUMNS = [
    { id: "lead", title: "Leads" },
    { id: "contacted", title: "Contacted" },
    { id: "negotiation", title: "Negotiation" },
    { id: "signed", title: "Signed" },
    { id: "churned", title: "Churned" },
]

export function BrandPipeline({ initialBrands }: { initialBrands: PipelineBrand[] }) {
    // Group brands by columns
    const [columns, setColumns] = useState<Column[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const grouped = COLUMNS.map(col => ({
            id: col.id,
            title: col.title,
            brands: initialBrands.filter(b => b.pipelineStage === col.id)
        }))
        setColumns(grouped)
    }, [initialBrands, mounted])

    if (!mounted) {
        return <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {COLUMNS.map((column) => (
                <div key={column.id} className="flex h-full w-[300px] min-w-[300px] flex-col rounded-lg bg-gray-100 dark:bg-gray-800/50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">{column.title}</h3>
                        <Badge variant="secondary" className="rounded-full">0</Badge>
                    </div>
                </div>
            ))}
        </div>
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) return

        // If dropped in same column and same index
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        // Optimistic Update
        const sourceColIdx = columns.findIndex(col => col.id === source.droppableId)
        const destColIdx = columns.findIndex(col => col.id === destination.droppableId)

        const sourceCol = columns[sourceColIdx]
        const destCol = columns[destColIdx]

        const sourceBrands = [...sourceCol.brands]
        const destBrands = [...destCol.brands]

        const [movedBrand] = sourceBrands.splice(source.index, 1)

        if (source.droppableId === destination.droppableId) {
            // Reordering within same column (if implemented on backend)
            sourceBrands.splice(destination.index, 0, movedBrand)
            const newColumns = [...columns]
            newColumns[sourceColIdx] = { ...sourceCol, brands: sourceBrands }
            setColumns(newColumns)
        } else {
            // Moving between columns
            movedBrand.pipelineStage = destination.droppableId
            destBrands.splice(destination.index, 0, movedBrand)
            const newColumns = [...columns]
            newColumns[sourceColIdx] = { ...sourceCol, brands: sourceBrands }
            newColumns[destColIdx] = { ...destCol, brands: destBrands }
            setColumns(newColumns)

            // Server Update
            try {
                await fetch(`/api/brands/${draggableId}/pipeline`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stage: destination.droppableId })
                })
            } catch (error) {
                console.error("Failed to update pipeline stage", error)
                // Revert or show toast (omitted for brevity)
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <div key={column.id} className="flex h-full w-[300px] min-w-[300px] flex-col rounded-lg bg-gray-100 dark:bg-gray-800/50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold">{column.title}</h3>
                            <Badge variant="secondary" className="rounded-full">
                                {column.brands.length}
                            </Badge>
                        </div>

                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-1 flex-col gap-3 overflow-y-auto"
                                >
                                    {column.brands.map((brand, index) => (
                                        <Draggable key={brand.id} draggableId={brand.id} index={index}>
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="cursor-move hover:shadow-md transition-shadow"
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex justify-between items-start">
                                                            <div className="font-medium">{brand.name}</div>
                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        {brand.budgetRange && (
                                                            <div className="mt-2 text-xs text-muted-foreground">
                                                                {brand.budgetRange}
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    )
}
