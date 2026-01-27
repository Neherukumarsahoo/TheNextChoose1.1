"use client"

import { useState } from "react"
import { Search, Plus, Image as ImageIcon, Copy, Trash2, Folder, ExternalLink, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { format } from "date-fns"

export type MediaAsset = {
    id: string
    url: string
    name: string
    alt: string
    size: number
    type: string
    folder: string
    uploadedAt: string
}

interface MediaLibraryProps {
    assets: MediaAsset[]
    onChange: (value: MediaAsset[] | ((prevState: MediaAsset[]) => MediaAsset[])) => void
}

export function MediaLibrary({ assets = [], onChange }: MediaLibraryProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFolder, setSelectedFolder] = useState<string>("All")
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [newAssetUrl, setNewAssetUrl] = useState("")
    const [newAssetName, setNewAssetName] = useState("")

    const folders = ["All", ...Array.from(new Set(assets.map(a => a.folder || "Uncategorized")))]

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFolder = selectedFolder === "All" || (asset.folder || "Uncategorized") === selectedFolder
        return matchesSearch && matchesFolder
    })

    const handleAddAsset = () => {
        if (!newAssetUrl) return toast.error("URL is required")
        
        const newAsset: MediaAsset = {
            id: crypto.randomUUID(),
            url: newAssetUrl,
            name: newAssetName || "New Asset",
            alt: newAssetName || "New Asset",
            size: 0,
            type: "image",
            folder: "Uploads",
            uploadedAt: new Date().toISOString()
        }

        onChange([newAsset, ...assets])
        setNewAssetUrl("")
        setNewAssetName("")
        setIsAddOpen(false)
        toast.success("Asset added to library")
    }

    const handleDelete = (id: string) => {
        if (confirm("Delete this asset?")) {
            onChange(assets.filter(a => a.id !== id))
            toast.success("Asset deleted")
        }
    }

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
        toast.success("URL copied to clipboard")
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files))
        }
    }

    const processFiles = (files: File[]) => {
        files.forEach(file => {
            if (!file.type.startsWith('image/')) return

            const reader = new FileReader()
            reader.onloadend = () => {
                const newAsset: MediaAsset = {
                    id: crypto.randomUUID(),
                    url: reader.result as string,
                    name: file.name,
                    alt: file.name,
                    size: file.size,
                    type: file.type,
                    folder: selectedFolder === "All" ? "Uploads" : selectedFolder,
                    uploadedAt: new Date().toISOString()
                }
                onChange(prev => [newAsset, ...prev])
            }
            reader.readAsDataURL(file)
        })
        toast.success(`${files.length} file(s) processed`)
        setIsAddOpen(false)
    }

    return (
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] border rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-gray-50/50 dark:bg-slate-950 p-4 space-y-4">
                <Button className="w-full justify-start gap-2" variant="secondary" onClick={() => setIsAddOpen(true)}>
                    <Plus className="h-4 w-4" /> Add Asset
                </Button>
                
                <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-muted-foreground px-2 mb-2 uppercase tracking-wider">Folders</h4>
                    {folders.map(folder => (
                        <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                selectedFolder === folder 
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            }`}
                        >
                            <Folder className={`h-4 w-4 ${selectedFolder === folder ? "text-blue-500" : "text-gray-400"}`} />
                            {folder}
                            <span className="ml-auto text-xs opacity-50">
                                {folder === "All" ? assets.length : assets.filter(a => (a.folder || "Uncategorized") === folder).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background">
                <div className="p-4 border-b flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search assets..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredAssets.map(asset => (
                            <div key={asset.id} className="group relative border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 hover:ring-2 ring-blue-500 transition-all">
                                <div className="aspect-square relative flex items-center justify-center bg-chess-board bg-[length:20px_20px]">
                                    <img src={asset.url} alt={asset.alt} className="max-w-full max-h-full object-contain" />
                                    
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" onClick={() => copyUrl(asset.url)} title="Copy URL">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => handleDelete(asset.id)} title="Delete">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-2 bg-background border-t">
                                    <p className="text-xs font-medium truncate" title={asset.name}>{asset.name}</p>
                                    <p className="text-[10px] text-muted-foreground truncate">{format(new Date(asset.uploadedAt), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {filteredAssets.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                            <p>No assets found</p>
                            <Button variant="link" onClick={() => setIsAddOpen(true)}>Add your first asset</Button>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Upload Media</DialogTitle>
                        <DialogDescription>
                            Drag and drop images here, or paste a URL.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-6 py-4">
                        {/* Drag and Drop Zone */}
                        <div 
                            className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('media-upload-input')?.click()}
                        >
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 dark:bg-blue-900/20">
                                <ImageIcon className="h-8 w-8" />
                            </div>
                            <h3 className="font-medium mb-1">Click or drag images here</h3>
                            <p className="text-sm text-muted-foreground">Supports JPG, PNG, GIF, WEBP</p>
                            <input 
                                id="media-upload-input"
                                type="file" 
                                className="hidden" 
                                multiple 
                                accept="image/*"
                                onChange={(e) => e.target.files && processFiles(Array.from(e.target.files))}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or add by URL</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                             <Input 
                                value={newAssetUrl} 
                                onChange={(e) => setNewAssetUrl(e.target.value)} 
                                placeholder="https://example.com/image.png" 
                             />
                             <Button onClick={handleAddAsset} disabled={!newAssetUrl}>Add URL</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
