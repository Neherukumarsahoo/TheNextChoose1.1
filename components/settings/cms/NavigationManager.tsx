import { useState } from "react"
import { Plus, Edit2, Trash2, Link as LinkIcon, Menu, GripVertical, Check, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

export type NavItem = {
    id: string
    label: string
    href: string
    visible: boolean
    isSystem: boolean
}

interface NavigationManagerProps {
    items: NavItem[]
    config: any
    onItemsChange: (items: NavItem[]) => void
    onConfigChange: (key: string, value: any) => void
}

export function NavigationManager({ items = [], config, onItemsChange, onConfigChange }: NavigationManagerProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentItem, setCurrentItem] = useState<NavItem | null>(null)

    const fontOptions = [
        { value: "Inter", label: "Inter (Modern)" },
        { value: "Roboto", label: "Roboto (Classic)" },
        { value: "Outfit", label: "Outfit (Trendy)" },
        { value: "Playfair Display", label: "Playfair (Elegant)" },
        { value: "Space Grotesk", label: "Space Grotesk (Tech)" },
    ]

    const handleCreate = () => {
        setCurrentItem({
            id: crypto.randomUUID(),
            label: "",
            href: "",
            visible: true,
            isSystem: false
        })
        setIsEditing(true)
    }

    const handleEdit = (item: NavItem) => {
        setCurrentItem({ ...item })
        setIsEditing(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Delete this link?")) {
            onItemsChange(items.filter(i => i.id !== id))
            toast.success("Link deleted")
        }
    }

    const handleSave = () => {
        if (!currentItem) return
        if (!currentItem.label || !currentItem.href) return toast.error("Label and Link are required")

        if (items.some(i => i.id === currentItem.id)) {
            onItemsChange(items.map(i => i.id === currentItem.id ? currentItem : i))
        } else {
            onItemsChange([...items, currentItem])
        }
        setIsEditing(false)
        setCurrentItem(null)
        toast.success("Navigation item saved")
    }

    const toggleVisibility = (id: string, current: boolean) => {
        onItemsChange(items.map(i => i.id === id ? { ...i, visible: !current } : i))
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        onItemsChange(newItems)
    }

    return (
        <div className="space-y-8">
            {/* Branding Section */}
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-4 border p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <h4 className="font-medium flex items-center gap-2">
                        <Menu className="h-4 w-4" /> Branding & Logo
                    </h4>
                    
                    <div className="space-y-2">
                        <Label>Brand Name</Label>
                        <Input value={config.brandName || ""} onChange={(e) => onConfigChange('brandName', e.target.value)} placeholder="TheNextChoose" />
                    </div>

                    <div className="space-y-2">
                        <Label>Font Family</Label>
                        <Select value={config.headingFont} onValueChange={(v) => onConfigChange('headingFont', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                {fontOptions.map(f => (
                                    <SelectItem key={f.value} value={f.value}>
                                        <span style={{ fontFamily: f.value }}>{f.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                         <Label>Logo</Label>
                         <div className="flex gap-2">
                            <Input value={config.logoUrl || ""} onChange={(e) => onConfigChange('logoUrl', e.target.value)} placeholder="/logo.png" />
                            <Input
                                type="file"
                                className="hidden"
                                id="logo-upload"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            onConfigChange('logoUrl', reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                            <Button 
                                variant="outline" 
                                onClick={() => document.getElementById('logo-upload')?.click()}
                                className="whitespace-nowrap"
                            >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                         </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center border p-6 rounded-lg bg-white dark:bg-black relative overflow-hidden">
                    <p className="text-xs text-muted-foreground absolute top-2 left-2">Preview</p>
                    <nav className="flex items-center gap-6 w-full max-w-sm border-b pb-4">
                        <div className="font-bold text-xl" style={{ fontFamily: config.headingFont || 'Inter' }}>
                            {config.logoUrl ? (
                                <img src={config.logoUrl} alt="Logo" className="h-8 object-contain" />
                            ) : (
                                config.brandName || "Brand"
                            )}
                        </div>
                        <div className="flex-1" />
                        <div className="flex gap-3 text-sm text-slate-600">
                             <div className="h-2 w-12 bg-slate-200 rounded"></div>
                             <div className="h-2 w-12 bg-slate-200 rounded"></div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Menu Items Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-medium">Menu Items</h4>
                        <p className="text-xs text-muted-foreground">Manage the main navigation links. Drag to rearrange.</p>
                    </div>
                    <Button onClick={handleCreate} size="sm" className="gap-2">
                        <Plus className="h-4 w-4" /> Add Link
                    </Button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="nav-items">
                        {(provided) => (
                            <div 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                className="space-y-2"
                            >
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="flex items-center gap-3 p-3 border rounded-md bg-card hover:shadow-sm transition-all"
                                            >
                                                <div {...provided.dragHandleProps} className="cursor-move text-slate-400 hover:text-slate-600">
                                                    <GripVertical className="h-4 w-4" />
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm flex items-center gap-2">
                                                        {item.label}
                                                        {item.isSystem && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-wider">System</span>}
                                                        {!item.visible && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Hidden</span>}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground font-mono">{item.href}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Switch checked={item.visible} onCheckedChange={() => toggleVisibility(item.id, item.visible)} />
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}>
                                                        <Edit2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="h-3.5 w-3.5" />
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
            </div>

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentItem?.id && items.find(i => i.id === currentItem.id) ? 'Edit Link' : 'Add Link'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input 
                                value={currentItem?.label} 
                                onChange={(e) => setCurrentItem(prev => prev ? ({...prev, label: e.target.value}) : null)} 
                                placeholder="e.g. Portfolio" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link URL</Label>
                            <Input 
                                value={currentItem?.href} 
                                onChange={(e) => setCurrentItem(prev => prev ? ({...prev, href: e.target.value}) : null)} 
                                placeholder="/portfolio or https://..." 
                            />
                            {currentItem?.isSystem && <p className="text-[10px] text-muted-foreground text-amber-600">Caution: Changing system paths may affect functionality.</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Link</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
