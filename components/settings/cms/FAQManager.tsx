"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export type FAQItem = {
    id: string
    question: string
    answer: string
}

interface FAQManagerProps {
    items: FAQItem[]
    onChange: (items: FAQItem[]) => void
}

export function FAQManager({ items = [], onChange }: FAQManagerProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentItem, setCurrentItem] = useState<FAQItem | null>(null)

    const handleCreate = () => {
        setCurrentItem({
            id: crypto.randomUUID(),
            question: "",
            answer: ""
        })
        setIsEditing(true)
    }

    const handleEdit = (item: FAQItem) => {
        setCurrentItem({ ...item })
        setIsEditing(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            onChange(items.filter(i => i.id !== id))
            toast.success("FAQ deleted")
        }
    }

    const handleSave = () => {
        if (!currentItem) return
        if (!currentItem.question || !currentItem.answer) return toast.error("Question and Answer are required")

        if (items.some(i => i.id === currentItem.id)) {
            onChange(items.map(i => i.id === currentItem.id ? currentItem : i))
        } else {
            onChange([...items, currentItem])
        }
        setIsEditing(false)
        setCurrentItem(null)
        toast.success("FAQ saved")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Manage Questions</h4>
                    <p className="text-xs text-muted-foreground">Add questions that users frequently ask.</p>
                </div>
                <Button onClick={handleCreate} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Add FAQ
                </Button>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-10 border rounded-lg border-dashed text-muted-foreground">
                    <HelpCircle className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No FAQs added yet.</p>
                </div>
            ) : (
                <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden bg-white dark:bg-slate-950">
                    {items.map((item, index) => (
                        <AccordionItem key={item.id} value={item.id} className="px-4 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <div className="flex items-center justify-between w-full py-4">
                                <div className="flex-1 text-left font-medium pr-4">
                                    <span className="text-muted-foreground mr-2">Q{index + 1}.</span>
                                    {item.question}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}>
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground pb-4 pl-8 border-t pt-2 mt-0">
                                {item.answer}
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentItem?.id && items.find(i => i.id === currentItem.id) ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Question</Label>
                            <Input 
                                value={currentItem?.question} 
                                onChange={(e) => setCurrentItem(prev => prev ? ({...prev, question: e.target.value}) : null)} 
                                placeholder="e.g. How do I reset my password?" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Answer</Label>
                            <Textarea 
                                value={currentItem?.answer} 
                                onChange={(e) => setCurrentItem(prev => prev ? ({...prev, answer: e.target.value}) : null)} 
                                placeholder="Enter the answer here..." 
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save FAQ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
