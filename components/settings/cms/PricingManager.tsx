import { useState } from "react"
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

export type PricingPackage = {
    name: string
    price: number
    originalPrice: number
    duration: string
    features: string[]
    popular: boolean
}

export type PricingService = {
    id: string
    title: string
    packages: PricingPackage[]
}

interface PricingManagerProps {
    data: PricingService[]
    onChange: (data: PricingService[]) => void
}

export function PricingManager({ data = [], onChange }: PricingManagerProps) {
    const [expandedService, setExpandedService] = useState<string | null>(null)

    const handleAddService = () => {
        const newService: PricingService = {
            id: `service-${Date.now()}`,
            title: "New Service Category",
            packages: [
                { name: "Basic", price: 1000, originalPrice: 2000, duration: "one-time", features: ["Feature 1"], popular: false }
            ]
        }
        onChange([...data, newService])
        setExpandedService(newService.id)
    }

    const handleUpdateService = (index: number, field: string, value: any) => {
        const newData = [...data]
        if (field === "title") newData[index].title = value
        onChange(newData)
    }

    const handleDeleteService = (index: number) => {
        if (confirm("Delete this entire service category?")) {
            const newData = [...data]
            newData.splice(index, 1)
            onChange(newData)
        }
    }

    const handleAddPackage = (serviceIndex: number) => {
        const newData = [...data]
        newData[serviceIndex].packages.push({
            name: "New Plan",
            price: 5000,
            originalPrice: 8000,
            duration: "per project",
            features: ["New Feature"],
            popular: false
        })
        onChange(newData)
    }

    const handleUpdatePackage = (serviceIndex: number, pkgIndex: number, field: keyof PricingPackage, value: any) => {
        const newData = [...data]
        // @ts-ignore
        newData[serviceIndex].packages[pkgIndex][field] = value
        onChange(newData)
    }

    const handleFeaturesChange = (serviceIndex: number, pkgIndex: number, value: string) => {
        const features = value.split('\n').filter(f => f.trim() !== '')
        const newData = [...data]
        newData[serviceIndex].packages[pkgIndex].features = features
        onChange(newData)
    }

    const handleDeletePackage = (serviceIndex: number, pkgIndex: number) => {
        if (confirm("Delete this package?")) {
            const newData = [...data]
            newData[serviceIndex].packages.splice(pkgIndex, 1)
            onChange(newData)
        }
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const newData = Array.from(data)
        const [reorderedItem] = newData.splice(result.source.index, 1)
        newData.splice(result.destination.index, 0, reorderedItem)
        onChange(newData)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                     <h3 className="text-lg font-medium">Pricing Management</h3>
                     <p className="text-sm text-muted-foreground">Manage service categories and their pricing plans.</p>
                </div>
                <Button onClick={handleAddService} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                </Button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="pricing-services">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {data.map((service, sIndex) => (
                                <Draggable key={service.id} draggableId={service.id} index={sIndex}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-t-lg">
                                                <div {...provided.dragHandleProps} className="cursor-move text-gray-400">
                                                    <GripVertical className="h-5 w-5" />
                                                </div>
                                                <Collapsible 
                                                    open={expandedService === service.id} 
                                                    onOpenChange={() => setExpandedService(expandedService === service.id ? null : service.id)}
                                                    className="flex-1"
                                                >
                                                     <div className="flex items-center gap-4 w-full">
                                                        <CollapsibleTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                                                                {expandedService === service.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                            </Button>
                                                        </CollapsibleTrigger>
                                                        <div className="flex-1">
                                                            <Input 
                                                                value={service.title} 
                                                                onChange={(e) => handleUpdateService(sIndex, 'title', e.target.value)}
                                                                className="font-bold text-lg border-transparent hover:border-input bg-transparent"
                                                            />
                                                        </div>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteService(sIndex)} className="text-red-500 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                     </div>
                                                </Collapsible>
                                            </div>

                                            {expandedService === service.id && (
                                                <div className="p-4 space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                        {service.packages.map((pkg, pIndex) => (
                                                            <Card key={pIndex} className={`relative ${pkg.popular ? 'border-[#8B1538] ring-1 ring-[#8B1538]' : ''}`}>
                                                                <CardHeader className="pb-3">
                                                                    <div className="flex justify-between items-start">
                                                                         <Input 
                                                                            value={pkg.name} 
                                                                            onChange={(e) => handleUpdatePackage(sIndex, pIndex, 'name', e.target.value)}
                                                                            className="font-bold border-transparent hover:border-input p-0 h-auto text-lg mb-2"
                                                                            placeholder="Plan Name"
                                                                        />
                                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-500" onClick={() => handleDeletePackage(sIndex, pIndex)}>
                                                                            <Trash2 className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                    <div className="flex gap-2 items-center">
                                                                        <div className="flex-1">
                                                                            <Label className="text-xs text-muted-foreground">Current Price (₹)</Label>
                                                                            <Input 
                                                                                type="number" 
                                                                                value={pkg.price} 
                                                                                onChange={(e) => handleUpdatePackage(sIndex, pIndex, 'price', Number(e.target.value))}
                                                                                className="h-8"
                                                                            />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <Label className="text-xs text-muted-foreground">Original Price (₹)</Label>
                                                                             <Input 
                                                                                type="number" 
                                                                                value={pkg.originalPrice} 
                                                                                onChange={(e) => handleUpdatePackage(sIndex, pIndex, 'originalPrice', Number(e.target.value))}
                                                                                className="h-8 text-muted-foreground"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-3 pt-0">
                                                                    <div className="space-y-1">
                                                                         <Label className="text-xs text-muted-foreground">Duration Label</Label>
                                                                         <Input 
                                                                            value={pkg.duration} 
                                                                            onChange={(e) => handleUpdatePackage(sIndex, pIndex, 'duration', e.target.value)}
                                                                            className="h-8"
                                                                            placeholder="e.g. per month"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <Label className="text-xs text-muted-foreground">Features (one per line)</Label>
                                                                        <textarea 
                                                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                                            value={pkg.features.join('\n')}
                                                                            onChange={(e) => handleFeaturesChange(sIndex, pIndex, e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center justify-between pt-2">
                                                                        <Label className="text-xs">Highlight as Popular</Label>
                                                                        <Switch 
                                                                            checked={pkg.popular} 
                                                                            onCheckedChange={(c) => handleUpdatePackage(sIndex, pIndex, 'popular', c)} 
                                                                        />
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                        
                                                        {/* Add Package Button */}
                                                        <button 
                                                            onClick={() => handleAddPackage(sIndex)}
                                                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl p-6 h-full min-h-[200px] hover:border-[#8B1538] hover:bg-[#8B1538]/5 transition-colors group"
                                                        >
                                                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-[#8B1538] group-hover:text-white transition-colors mb-2">
                                                                <Plus className="h-5 w-5" />
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-500 group-hover:text-[#8B1538]">Add Package</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
