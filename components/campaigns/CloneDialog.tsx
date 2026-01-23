"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { toast } from "sonner"

interface Campaign {
    id: string
    name: string
    brandId: string
    objective: string | null
    platform: string
    contentType: string
    startDate: Date
    endDate: Date | null
}

interface CampaignCloneDialogProps {
    campaign: Campaign
}

export function CampaignCloneDialog({ campaign }: CampaignCloneDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(`${campaign.name} (Copy)`)
    const [isCloning, setIsCloning] = useState(false)

    const handleClone = async () => {
        setIsCloning(true)
        try {
            const response = await fetch(`/api/campaigns/${campaign.id}/clone`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            if (response.ok) {
                const newCampaign = await response.json()
                toast.success("Campaign cloned successfully!")
                setOpen(false)
                router.push(`/campaigns/${newCampaign.id}`)
                router.refresh()
            } else {
                toast.error("Failed to clone campaign")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsCloning(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Clone Campaign
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clone Campaign</DialogTitle>
                    <DialogDescription>
                        Create a copy of this campaign with a new name. All influencer assignments and settings will be duplicated.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="name">New Campaign Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter campaign name"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleClone} disabled={isCloning || !name}>
                        {isCloning ? "Cloning..." : "Clone Campaign"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
