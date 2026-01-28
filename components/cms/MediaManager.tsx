"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Image as ImageIcon, Check, Loader2, Trash } from "lucide-react"
import { toast } from "sonner"

interface MediaManagerProps {
    onSelect: (url: string) => void
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function MediaManager({ onSelect, trigger, open: controlledOpen, onOpenChange: controlledOnOpenChange }: MediaManagerProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("gallery")
    const [images, setImages] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Handle controlled/uncontrolled state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = controlledOnOpenChange || setInternalOpen

    const fetchImages = async () => {
        setLoading(true)
        try {
            // In a real app, you'd have an API to list files. 
            // For now, we'll just try to fetch a list if we had an endpoint, 
            // or rely on what we've uploaded in this session + some hardcoded defaults if needed?
            // Wait, we need a list endpoint to make the gallery useful.
            // Let's implement a simple LIST endpoint next.
            // For now, I'll fetch from a hypothetical /api/media endpoint
            const res = await fetch('/api/media')
            if (res.ok) {
                const data = await res.json()
                setImages(data.files || [])
            }
        } catch (error) {
            console.error("Failed to fetch images", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && activeTab === "gallery") {
            fetchImages()
        }
    }, [isOpen, activeTab])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            toast.success("Image uploaded successfully")
            onSelect(data.url)
            setOpen(false)
            fetchImages() // Refresh gallery
        } catch (error) {
            toast.error("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-3xl h-[600px] flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Media Manager</DialogTitle>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <div className="px-6 border-b">
                        <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-6">
                            <TabsTrigger 
                                value="gallery" 
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0"
                            >
                                Gallery
                            </TabsTrigger>
                            <TabsTrigger 
                                value="upload" 
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0"
                            >
                                Upload New
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="gallery" className="flex-1 p-0 m-0 relative">
                        <ScrollArea className="h-[500px] p-6">
                            {loading ? (
                                <div className="flex items-center justify-center h-48">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : images.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                                    <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                                    <p>No images found</p>
                                    <Button variant="link" onClick={() => setActiveTab('upload')}>Upload your first image</Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {images.map((img, i) => (
                                        <div 
                                            key={i} 
                                            className="group relative aspect-square border rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all"
                                            onClick={() => {
                                                onSelect(img)
                                                setOpen(false)
                                            }}
                                        >
                                            <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Check className="text-white h-8 w-8" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="upload" className="flex-1 p-0 m-0 flex flex-col items-center justify-center">
                        <div className="w-full max-w-md p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-50 transition-colors">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                {uploading ? (
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                ) : (
                                    <Upload className="h-8 w-8 text-primary" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Click to upload</h3>
                                <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                            </div>
                            <Input 
                                type="file" 
                                className="hidden" 
                                id="media-manager-upload"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <Button disabled={uploading} onClick={() => document.getElementById('media-manager-upload')?.click()}>
                                {uploading ? "Uploading..." : "Select File"}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
