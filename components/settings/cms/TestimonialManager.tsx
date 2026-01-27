"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Star, User, MessageSquareQuote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Slider } from "@/components/ui/slider"

export type Testimonial = {
    id: string
    name: string
    role: string
    company: string
    content: string
    avatar: string
    rating: number
}

interface TestimonialManagerProps {
    items: Testimonial[]
    onChange: (items: Testimonial[]) => void
}

export function TestimonialManager({ items = [], onChange }: TestimonialManagerProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentItem, setCurrentItem] = useState<Testimonial | null>(null)

    const handleCreate = () => {
        setCurrentItem({
            id: crypto.randomUUID(),
            name: "",
            role: "",
            company: "",
            content: "",
            avatar: "",
            rating: 5
        })
        setIsEditing(true)
    }

    const handleEdit = (item: Testimonial) => {
        setCurrentItem({ ...item })
        setIsEditing(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Delete this testimonial?")) {
            onChange(items.filter(i => i.id !== id))
            toast.success("Testimonial deleted")
        }
    }

    const handleSave = () => {
        if (!currentItem) return
        if (!currentItem.name || !currentItem.content) return toast.error("Name and Content are required")

        if (items.some(i => i.id === currentItem.id)) {
            onChange(items.map(i => i.id === currentItem.id ? currentItem : i))
        } else {
            onChange([...items, currentItem])
        }
        setIsEditing(false)
        setCurrentItem(null)
        toast.success("Testimonial saved")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Manage Testimonials</h4>
                    <p className="text-xs text-muted-foreground">Showcase social proof from your happy customers.</p>
                </div>
                <Button onClick={handleCreate} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Testimonial
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <Card key={item.id} className="relative group overflow-hidden">
                        <CardContent className="p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm leading-none">{item.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.role} @ {item.company}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex text-yellow-500 text-xs">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-3.5 w-3.5 ${i < item.rating ? "fill-current" : "text-slate-200"}`} />
                                ))}
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 italic">
                                "{item.content}"
                            </p>

                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-md p-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(item)}>
                                    <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                
                {items.length === 0 && (
                    <div className="col-span-full text-center py-10 border rounded-lg border-dashed text-muted-foreground flex flex-col items-center">
                        <MessageSquareQuote className="h-10 w-10 mb-2 opacity-20" />
                        <p>No testimonials yet.</p>
                        <Button variant="link" onClick={handleCreate}>Add your first review</Button>
                    </div>
                )}
            </div>

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{currentItem?.id && items.find(i => i.id === currentItem.id) ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Client Name</Label>
                                <Input 
                                    value={currentItem?.name} 
                                    onChange={(e) => setCurrentItem(prev => prev ? ({...prev, name: e.target.value}) : null)} 
                                    placeholder="Jane Doe" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input 
                                    value={currentItem?.role} 
                                    onChange={(e) => setCurrentItem(prev => prev ? ({...prev, role: e.target.value}) : null)} 
                                    placeholder="CEO" 
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input 
                                    value={currentItem?.company} 
                                    onChange={(e) => setCurrentItem(prev => prev ? ({...prev, company: e.target.value}) : null)} 
                                    placeholder="Acme Inc." 
                                />
                            </div>
                             <div className="space-y-2">
                                <Label>Avatar URL</Label>
                                <Input 
                                    value={currentItem?.avatar} 
                                    onChange={(e) => setCurrentItem(prev => prev ? ({...prev, avatar: e.target.value}) : null)} 
                                    placeholder="https://..." 
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between">
                                <Label>Rating</Label>
                                <span className="text-sm font-medium">{currentItem?.rating} / 5</span>
                            </div>
                            <Slider 
                                value={[currentItem?.rating || 5]} 
                                max={5} 
                                min={1} 
                                step={1}
                                onValueChange={(vals) => setCurrentItem(prev => prev ? ({...prev, rating: vals[0]}) : null)} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Review Content</Label>
                            <Textarea 
                                value={currentItem?.content} 
                                onChange={(e) => setCurrentItem(prev => prev ? ({...prev, content: e.target.value}) : null)} 
                                placeholder="What did they say?" 
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Testimonial</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
