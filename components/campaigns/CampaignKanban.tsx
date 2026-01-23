"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MoreHorizontal } from "lucide-react"

// Types
interface KanbanCampaign {
    id: string
    name: string
    status: string
    totalAmount: number
    startDate: string
    brand: {
        name: string
    }
}

interface Column {
    id: string
    title: string
    campaigns: KanbanCampaign[]
}

const COLUMNS = [
    { id: "DRAFT", title: "Planning" },
    { id: "SOURCING", title: "Sourcing" },
    { id: "ACTIVE", title: "Active" },
    { id: "COMPLETED", title: "Completed" },
]

export function CampaignKanban({ initialCampaigns }: { initialCampaigns: KanbanCampaign[] }) {
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
            campaigns: initialCampaigns.filter(c => c.status === col.id)
        }))
        setColumns(grouped)
    }, [initialCampaigns, mounted])

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        // Optimistic Update
        const sourceColIdx = columns.findIndex(col => col.id === source.droppableId)
        const destColIdx = columns.findIndex(col => col.id === destination.droppableId)

        const sourceCol = columns[sourceColIdx]
        const destCol = columns[destColIdx]

        const sourceCampaigns = [...sourceCol.campaigns]
        const destCampaigns = [...destCol.campaigns]

        const [movedCampaign] = sourceCampaigns.splice(source.index, 1)

        if (source.droppableId === destination.droppableId) {
            sourceCampaigns.splice(destination.index, 0, movedCampaign)
            const newColumns = [...columns]
            newColumns[sourceColIdx] = { ...sourceCol, campaigns: sourceCampaigns }
            setColumns(newColumns)
        } else {
            movedCampaign.status = destination.droppableId
            destCampaigns.splice(destination.index, 0, movedCampaign)
            const newColumns = [...columns]
            newColumns[sourceColIdx] = { ...sourceCol, campaigns: sourceCampaigns }
            newColumns[destColIdx] = { ...destCol, campaigns: destCampaigns }
            setColumns(newColumns)

            // Server Update
            try {
                await fetch(`/api/campaigns/${draggableId}/status`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: destination.droppableId })
                })
            } catch (error) {
                console.error("Failed to update campaign status", error)
            }
        }
    }

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <div key={column.id} className="flex h-full w-[300px] min-w-[300px] flex-col rounded-lg bg-gray-100 dark:bg-gray-800/50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold">{column.title}</h3>
                            <Badge variant="secondary" className="rounded-full">
                                {column.campaigns.length}
                            </Badge>
                        </div>

                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-1 flex-col gap-3 overflow-y-auto"
                                >
                                    {column.campaigns.map((campaign, index) => (
                                        <Draggable key={campaign.id} draggableId={campaign.id} index={index}>
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="cursor-move hover:shadow-md transition-shadow"
                                                >
                                                    <CardContent className="p-4 space-y-3">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <div className="font-medium">{campaign.name}</div>
                                                                <div className="text-sm text-muted-foreground">{campaign.brand.name}</div>
                                                            </div>
                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(campaign.startDate).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="h-3 w-3" />
                                                                {campaign.totalAmount.toLocaleString()}
                                                            </div>
                                                        </div>
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
