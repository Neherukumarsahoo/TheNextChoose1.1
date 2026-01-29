"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

import { useLoading } from "@/components/providers/LoadingProvider"

interface Influencer {
    id: string
    name: string
    instagramId: string
    profileLink: string | null
    serviceType: string // Added
    category: string
    city: string | null
    country: string | null
    followers: number
    avgViews: number | null
    engagementRate: number | null
    reelPrice: number
    storyPrice: number
    postPrice: number
    active: boolean
}

interface InfluencerFormProps {
    influencer?: Influencer | null
    mode: "create" | "edit"
}

export function InfluencerForm({ influencer, mode }: InfluencerFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [formData, setFormData] = useState({
        name: influencer?.name || "",
        instagramId: influencer?.instagramId || "",
        profileLink: influencer?.profileLink || "",
        serviceType: influencer?.serviceType || "Influencer Marketing",
        category: influencer?.category || "",
        city: influencer?.city || "",
        country: influencer?.country || "",
        followers: influencer?.followers?.toString() || "",
        avgViews: influencer?.avgViews?.toString() || "",
        engagementRate: influencer?.engagementRate?.toString() || "",
        reelPrice: influencer?.reelPrice?.toString() || "",
        storyPrice: influencer?.storyPrice?.toString() || "",
        postPrice: influencer?.postPrice?.toString() || "",
        active: influencer?.active ?? true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { startLoading, stopLoading } = useLoading()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        startLoading()

        try {
            const url = mode === "edit" ? `/api/influencers/${influencer?.id}` : "/api/influencers"
            const method = mode === "edit" ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    followers: parseInt(formData.followers),
                    avgViews: formData.avgViews ? parseInt(formData.avgViews) : null,
                    engagementRate: formData.engagementRate ? parseFloat(formData.engagementRate) : null,
                    reelPrice: parseFloat(formData.reelPrice),
                    storyPrice: parseFloat(formData.storyPrice),
                    postPrice: parseFloat(formData.postPrice),
                }),
            })

            if (response.ok) {
                toast.success(mode === "edit" ? "Influencer updated successfully!" : "Influencer added successfully!")
                stopLoading()
                setIsLoading(false)
                router.push("/influencers")
            } else {
                toast.error(`Failed to ${mode === "edit" ? "update" : "add"} influencer`)
                stopLoading()
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("An error occurred")
            stopLoading()
            setIsLoading(false)
        }
        // No finally block to stop loading on success
    }

    const handleDelete = async () => {
        if (!influencer?.id) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/influencers/${influencer.id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                toast.success("Influencer deleted successfully!")
                router.push("/influencers")
                router.refresh()
            } else {
                toast.error("Failed to delete influencer")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="instagramId">Instagram Username *</Label>
                            <Input
                                id="instagramId"
                                name="instagramId"
                                value={formData.instagramId}
                                onChange={handleChange}
                                placeholder="without @"
                                required
                            />
                        </div>
                    </div>

                    {/* New Service Type Dropdown */}
                    <div>
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select
                            value={formData.serviceType}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Influencer Marketing">Influencer Marketing</SelectItem>
                                <SelectItem value="Video Production">Video Production</SelectItem>
                                <SelectItem value="Web Development">Web Development</SelectItem>
                                <SelectItem value="AI Automation">AI Automation</SelectItem>
                                <SelectItem value="3D Ads">3D Ads</SelectItem>
                                <SelectItem value="Real Estate 3D">Real Estate 3D</SelectItem>
                                <SelectItem value="3D Mockups">3D Mockups</SelectItem>
                                <SelectItem value="3D Configurator">3D Configurator</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="profileLink">Profile Link</Label>
                        <Input
                            id="profileLink"
                            name="profileLink"
                            value={formData.profileLink}
                            onChange={handleChange}
                            placeholder="https://instagram.com/username"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category *</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Fashion, Tech, Lifestyle"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="followers">Followers *</Label>
                            <Input
                                id="followers"
                                name="followers"
                                type="number"
                                value={formData.followers}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="avgViews">Avg Views</Label>
                            <Input
                                id="avgViews"
                                name="avgViews"
                                type="number"
                                value={formData.avgViews}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="engagementRate">Engagement Rate (%)</Label>
                            <Input
                                id="engagementRate"
                                name="engagementRate"
                                type="number"
                                step="0.01"
                                value={formData.engagementRate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="reelPrice">Reel Price (₹) *</Label>
                            <Input
                                id="reelPrice"
                                name="reelPrice"
                                type="number"
                                step="0.01"
                                value={formData.reelPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="storyPrice">Story Price (₹) *</Label>
                            <Input
                                id="storyPrice"
                                name="storyPrice"
                                type="number"
                                step="0.01"
                                value={formData.storyPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="postPrice">Post Price (₹) *</Label>
                            <Input
                                id="postPrice"
                                name="postPrice"
                                type="number"
                                step="0.01"
                                value={formData.postPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor="active">Active Status</Label>
                        <Select
                            value={formData.active.toString()}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, active: value === "true" }))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-4 justify-between">
                <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (mode === "edit" ? "Updating..." : "Adding...") : (mode === "edit" ? "Update Influencer" : "Add Influencer")}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>

                {mode === "edit" && influencer && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive" disabled={isDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete the influencer "{influencer.name}".
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </form>
    )
}
