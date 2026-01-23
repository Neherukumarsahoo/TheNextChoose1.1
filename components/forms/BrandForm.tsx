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

interface Brand {
    id: string
    name: string
    type: string | null
    industry: string | null
    city: string | null
    country: string | null
    contactPerson: string | null
    email: string | null
    phone: string | null
    instagramId: string | null
    website: string | null
    budgetRange: string | null
    active: boolean
}

interface BrandFormProps {
    brand?: Brand | null
    mode: "create" | "edit"
}

export function BrandForm({ brand, mode }: BrandFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [formData, setFormData] = useState({
        name: brand?.name || "",
        type: brand?.type || "",
        industry: brand?.industry || "",
        city: brand?.city || "",
        country: brand?.country || "",
        contactPerson: brand?.contactPerson || "",
        email: brand?.email || "",
        phone: brand?.phone || "",
        instagramId: brand?.instagramId || "",
        website: brand?.website || "",
        budgetRange: brand?.budgetRange || "",
        active: brand?.active ?? true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const url = mode === "edit" ? `/api/brands/${brand?.id}` : "/api/brands"
            const method = mode === "edit" ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast.success(mode === "edit" ? "Brand updated successfully!" : "Brand added successfully!")
                router.push("/brands")
                router.refresh()
            } else {
                toast.error(`Failed to ${mode === "edit" ? "update" : "add"} brand`)
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!brand?.id) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/brands/${brand.id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                toast.success("Brand deleted successfully!")
                router.push("/brands")
                router.refresh()
            } else {
                toast.error("Failed to delete brand")
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
                    <div>
                        <Label htmlFor="name">Brand Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="type">Brand Type</Label>
                            <Input
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                placeholder="e.g. Startup, Agency, Enterprise"
                            />
                        </div>
                        <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Input
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="e.g. Fashion, Tech, Food"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
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
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone / WhatsApp</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Online Presence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="instagramId">Instagram ID</Label>
                            <Input
                                id="instagramId"
                                name="instagramId"
                                value={formData.instagramId}
                                onChange={handleChange}
                                placeholder="without @"
                            />
                        </div>
                        <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="budgetRange">Budget Range</Label>
                        <Input
                            id="budgetRange"
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleChange}
                            placeholder="e.g. $5000-$10000"
                        />
                    </div>
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
                        {isLoading ? (mode === "edit" ? "Updating..." : "Adding...") : (mode === "edit" ? "Update Brand" : "Add Brand")}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>

                {mode === "edit" && brand && (
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
                                    This will permanently delete the brand "{brand.name}".
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
