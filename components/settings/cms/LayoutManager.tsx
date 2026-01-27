"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GripVertical, Eye, EyeOff } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type LayoutItem = {
    id: string
    label: string
    visible: boolean
}

interface LayoutManagerProps {
    items: LayoutItem[]
    onChange: (items: LayoutItem[]) => void
}

export function LayoutManager({ items, onChange }: LayoutManagerProps) {
    
    const handleDragEnd = (result: any) => {
        if (!result.destination) return

        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        onChange(newItems)
    }

    const toggleVisibility = (id: string) => {
        const newItems = items.map(item => 
            item.id === id ? { ...item, visible: !item.visible } : item
        )
        onChange(newItems)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Homepage Layout</CardTitle>
                <CardDescription>Drag sections to reorder how they appear on your website.</CardDescription>
            </CardHeader>
            <CardContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="layout-list">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={cn(
                                                    "flex items-center justify-between p-3 bg-white border rounded-md shadow-sm transition-all",
                                                    !item.visible && "opacity-50 bg-gray-50 filter grayscale"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div {...provided.dragHandleProps} className="cursor-grab hover:text-gray-900 text-gray-400">
                                                        <GripVertical className="h-5 w-5" />
                                                    </div>
                                                    <span className="font-medium">{item.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                     <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        onClick={() => toggleVisibility(item.id)}
                                                        className={cn("h-8 w-8 p-0", item.visible ? "text-green-600" : "text-gray-400")}
                                                    >
                                                        {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </CardContent>
        </Card>
    )
}
