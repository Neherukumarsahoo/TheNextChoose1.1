"use client"

import { useState, useEffect } from "react"
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
import { toast } from "sonner"

interface Brand {
    id: string
    name: string
}

interface Influencer {
    id: string
    name: string
    instagramId: string
    reelPrice: number
    storyPrice: number
    postPrice: number
    approved: boolean
}

export default function CreateCampaignPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [brands, setBrands] = useState<Brand[]>([])
    const [influencers, setInfluencers] = useState<Influencer[]>([])
    const [selectedInfluencers, setSelectedInfluencers] = useState<{ influencerId: string; price: number }[]>([])

    const [formData, setFormData] = useState({
        name: "",
        brandId: "",
        objective: "",
        platform: "INSTAGRAM",
        contentType: "REEL",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        fetchBrands()
        fetchInfluencers()
    }, [])

    const fetchBrands = async () => {
        const res = await fetch("/api/brands")
        if (res.ok) {
            setBrands(await res.json())
        }
    }

    const fetchInfluencers = async () => {
        const res = await fetch("/api/influencers")
        if (res.ok) {
            const data = await res.json()
            setInfluencers(data.filter((inf: Influencer) => inf.approved))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAddInfluencer = (inf: Influencer) => {
        const defaultPrice = formData.contentType === "REEL" ? inf.reelPrice :
            formData.contentType === "STORY" ? inf.storyPrice : inf.postPrice

        setSelectedInfluencers(prev => [...prev, { influencerId: inf.id, price: defaultPrice }])
    }

    const handleRemoveInfluencer = (index: number) => {
        setSelectedInfluencers(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (selectedInfluencers.length === 0) {
            toast.error("Please add at least one influencer")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/campaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    influencers: selectedInfluencers,
                }),
            })

            if (response.ok) {
                toast.success("Campaign created successfully!")
                router.push("/campaigns")
            } else {
                toast.error("Failed to create campaign")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const availableInfluencers = influencers.filter(
        inf => !selectedInfluencers.some(si => si.influencerId === inf.id)
    )

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Create New Campaign</h1>
                <p className="text-muted-foreground mt-1">
                    Set up a new influencer marketing campaign
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Campaign Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="brandId">Brand *</Label>
                            <Select
                                value={formData.brandId}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, brandId: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="platform">Platform</Label>
                                <Select
                                    value={formData.platform}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                                        <SelectItem value="YOUTUBE">YouTube</SelectItem>
                                        <SelectItem value="TIKTOK">TikTok</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="contentType">Content Type *</Label>
                                <Select
                                    value={formData.contentType}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="REEL">Reel</SelectItem>
                                        <SelectItem value="STORY">Story</SelectItem>
                                        <SelectItem value="POST">Post</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="startDate">Start Date *</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="objective">Objective</Label>
                            <Input
                                id="objective"
                                name="objective"
                                value={formData.objective}
                                onChange={handleChange}
                                placeholder="e.g. Brand Awareness, Product Launch"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Assign Influencers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {selectedInfluencers.length > 0 ? (
                            <div className="space-y-2">
                                <h3 className="font-medium">Selected Influencers:</h3>
                                {selectedInfluencers.map((si, index) => {
                                    const inf = influencers.find(i => i.id === si.influencerId)
                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{inf?.name}</p>
                                                <p className="text-sm text-muted-foreground">@{inf?.instagramId}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="number"
                                                    className="w-32"
                                                    value={si.price}
                                                    onChange={(e) => {
                                                        const newSelected = [...selectedInfluencers]
                                                        newSelected[index].price = parseFloat(e.target.value)
                                                        setSelectedInfluencers(newSelected)
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleRemoveInfluencer(index)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No influencers selected yet.</p>
                        )}

                        {availableInfluencers.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-medium mb-2">Add Influencers:</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {availableInfluencers.map((inf) => (
                                        <div key={inf.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{inf.name}</p>
                                                <p className="text-sm text-muted-foreground">@{inf.instagramId}</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddInfluencer(inf)}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Campaign"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}
