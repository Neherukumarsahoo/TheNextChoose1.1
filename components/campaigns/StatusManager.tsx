"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Influencer {
    id: string
    name: string
    instagramId: string
}

interface CampaignInfluencer {
    id: string
    price: number
    status: string
    deliverables: string | null
    submissions?: {
        id: string
        fileUrl: string
        status: string
        feedback: string | null
        submittedAt: Date
    }[]
}

interface Props {
    campaignInfluencer: CampaignInfluencer
    influencer: Influencer
}

export function CampaignInfluencerStatusManager({ campaignInfluencer, influencer }: Props) {
    const router = useRouter()
    const [status, setStatus] = useState(campaignInfluencer.status)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true)
        try {
            const response = await fetch(`/api/campaign-influencers/${campaignInfluencer.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            })

            if (response.ok) {
                setStatus(newStatus)
                toast.success("Status updated successfully!")
                router.refresh()
            } else {
                toast.error("Failed to update status")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsUpdating(false)
        }
    }

    const getStatusColor = (s: string) => {
        switch (s) {
            case "ASSIGNED": return "border-yellow-200 bg-yellow-50"
            case "CONTENT_SUBMITTED": return "border-blue-200 bg-blue-50"
            case "APPROVED": return "border-green-200 bg-green-50"
            case "POSTED": return "border-purple-200 bg-purple-50"
            default: return "border-gray-200"
        }
    }

    return (
        <Card className={`p-4 ${getStatusColor(status)}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">{influencer.name}</h3>
                    <p className="text-sm text-muted-foreground">@{influencer.instagramId}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold">₹{campaignInfluencer.price.toLocaleString()}</p>
                    </div>
                    <div className="w-48">
                        <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ASSIGNED">Assigned</SelectItem>
                                <SelectItem value="CONTENT_SUBMITTED">Content Submitted</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                                <SelectItem value="POSTED">Posted</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {campaignInfluencer.submissions && campaignInfluencer.submissions.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium mb-2">Content Submissions</p>
                    <div className="flex flex-wrap gap-2">
                        {campaignInfluencer.submissions.map((sub) => (
                            <div key={sub.id} className="flex items-center gap-2 p-2 border rounded-md bg-white dark:bg-black/20">
                                <Link 
                                    href={sub.fileUrl} 
                                    target="_blank" 
                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    View Draft
                                </Link>
                                <Badge variant={
                                    sub.status === "APPROVED" ? "default" :
                                    sub.status === "REJECTED" ? "destructive" : "outline"
                                } className="text-[10px] px-1 h-4">
                                    {sub.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}
