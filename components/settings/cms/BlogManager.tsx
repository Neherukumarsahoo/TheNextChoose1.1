"use client"

import { useState } from "react"
import { Plus, Search, Edit2, Trash2, Settings, Image as ImageIcon, Sparkles, X, Eye } from "lucide-react"
import { RichTextEditor } from "@/components/cms/RichTextEditor"
import { MediaManager } from "@/components/cms/MediaManager"
import { SEOPreview } from "@/components/cms/SEOPreview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { format } from "date-fns"

export type BlogPost = {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    coverImage: string
    author: string
    publishedAt: string
    status: 'draft' | 'published'
    tags: string[]
    seo: {
        title: string
        description: string
    }
}

interface BlogManagerProps {
    posts: BlogPost[]
    onChange: (posts: BlogPost[]) => void
}

export function BlogManager({ posts = [], onChange }: BlogManagerProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCreate = () => {
        setCurrentPost({
            id: crypto.randomUUID(),
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            coverImage: "",
            author: "Admin",
            publishedAt: new Date().toISOString(),
            status: 'draft',
            tags: [],
            seo: { title: "", description: "" }
        })
        setIsEditing(true)
    }

    const handleEdit = (post: BlogPost) => {
        setCurrentPost({ ...post })
        setIsEditing(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            onChange(posts.filter(p => p.id !== id))
            toast.success("Post deleted")
        }
    }

    const handleSave = () => {
        if (!currentPost) return
        if (!currentPost.title) return toast.error("Title is required")

        if (posts.some(p => p.id === currentPost.id)) {
            onChange(posts.map(p => p.id === currentPost.id ? currentPost : p))
        } else {
            onChange([currentPost, ...posts])
        }
        setIsEditing(false)
        setCurrentPost(null)
        toast.success("Blog post saved")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search posts..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus className="h-4 w-4" /> New Post
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                    <Card key={post.id} className="group overflow-hidden hover:shadow-md transition-all">
                        <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
                            {post.coverImage ? (
                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="h-10 w-10 opacity-20" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                    {post.status}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-2 text-xs mt-1">
                                {post.excerpt || "No excerpt..."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(post.publishedAt), 'MMM dd, yyyy')} • {post.author}
                                </span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(post)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(post.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                    <ScrollArea className="flex-1 p-6 h-full">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <DialogTitle>
                                    {currentPost?.id && posts.find(p => p.id === currentPost.id) ? 'Edit Post' : 'Create New Post'}
                                </DialogTitle>
                                <div className="flex items-center gap-2">
                                    <Label>Status</Label>
                                    <Select 
                                        value={currentPost?.status} 
                                        onValueChange={(v: any) => setCurrentPost(prev => prev ? ({...prev, status: v}) : null)}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input 
                                        value={currentPost?.title} 
                                        onChange={(e) => setCurrentPost(prev => prev ? ({...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')}) : null)} 
                                        placeholder="Enter amazing title..." 
                                        className="text-lg font-medium"
                                    />
                                    <p className="text-xs text-muted-foreground">Slug: {currentPost?.slug}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <Label>Author</Label>
                                        <Input 
                                            value={currentPost?.author} 
                                            onChange={(e) => setCurrentPost(prev => prev ? ({...prev, author: e.target.value}) : null)} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Input 
                                            type="date"
                                            value={currentPost?.publishedAt?.split('T')[0]} 
                                            onChange={(e) => setCurrentPost(prev => prev ? ({...prev, publishedAt: new Date(e.target.value).toISOString()}) : null)} 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Excerpt</Label>
                                    <Textarea 
                                        value={currentPost?.excerpt} 
                                        onChange={(e) => setCurrentPost(prev => prev ? ({...prev, excerpt: e.target.value}) : null)} 
                                        rows={2}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Sort Tags (comma separated)</Label>
                                    <Input 
                                        value={currentPost?.tags?.join(', ')} 
                                        onChange={(e) => setCurrentPost(prev => prev ? ({...prev, tags: e.target.value.split(',').map(t => t.trim())}) : null)} 
                                        placeholder="marketing, tips, design"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Cover Image</Label>
                                    <div className="flex gap-2">
                                        <Input 
                                            value={currentPost?.coverImage} 
                                            onChange={(e) => setCurrentPost(prev => prev ? ({...prev, coverImage: e.target.value}) : null)} 
                                            placeholder="https://... or upload" 
                                        />
                                        <MediaManager
                                            onSelect={(url) => setCurrentPost(prev => prev ? ({ ...prev, coverImage: url }) : null)}
                                            trigger={
                                                <Button variant="outline" className="whitespace-nowrap">
                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                    Library
                                                </Button>
                                            }
                                        />
                                    </div>
                                </div>



                                <div className="space-y-2">
                                    <Label>Content (Rich Text Supported)</Label>
                                    <RichTextEditor
                                        content={currentPost?.content || ''}
                                        onChange={(content) => setCurrentPost(prev => prev ? ({...prev, content}) : null)}
                                    />
                                </div>

                                <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900 space-y-4">
                                    <h4 className="font-medium flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-purple-600" /> SEO Settings
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Meta Title</Label>
                                            <Input
                                                value={currentPost?.seo.title}
                                                onChange={(e) => setCurrentPost(prev => prev ? ({ ...prev, seo: { ...prev.seo, title: e.target.value } }) : null)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Meta Description</Label>
                                            <Textarea
                                                value={currentPost?.seo.description}
                                                onChange={(e) => setCurrentPost(prev => prev ? ({ ...prev, seo: { ...prev.seo, description: e.target.value } }) : null)}
                                                rows={2}
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <Label className="text-xs text-muted-foreground mb-2 block">Search Result Preview</Label>
                                            <SEOPreview
                                                title={currentPost?.seo.title || currentPost?.title || ""}
                                                description={currentPost?.seo.description || currentPost?.excerpt || ""}
                                                slug={currentPost?.slug || ""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t bg-background flex justify-between items-center">
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Post</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
