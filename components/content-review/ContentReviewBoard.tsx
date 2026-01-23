"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, ExternalLink, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

export function ContentReviewBoard() {
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSubmissions = async () => {
        setLoading(true)
        const res = await fetch("/api/content-submissions?status=PENDING")
        if (res.ok) {
            const data = await res.json()
            setSubmissions(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSubmissions()
    }, [])

    const handleReview = async (id: string, status: "APPROVED" | "REJECTED", feedback: string) => {
        const res = await fetch(`/api/content-submissions/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, feedback })
        })

        if (res.ok) {
            toast.success(`Content ${status.toLowerCase()} successfully`)
            fetchSubmissions()
        } else {
            toast.error("Failed to update status")
        }
    }

    if (loading) return <div>Loading submissions...</div>

    return (
        <div className="grid gap-6">
            {submissions.map((sub) => (
                <Card key={sub.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-muted flex items-center justify-center p-4">
                            {sub.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={sub.fileUrl} alt="Content" className="max-h-64 object-contain rounded" />
                            ) : (
                                <div className="text-center space-y-2">
                                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">Preview not available</p>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="gap-2">
                                            <ExternalLink className="h-4 w-4" /> View Full File
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>Content Submission</CardTitle>
                                    <CardDescription className="mt-1">
                                        Campaign: <span className="font-semibold">{sub.campaignInfluencer.campaign.name}</span>
                                    </CardDescription>
                                    <CardDescription>
                                        Influencer: <span className="font-semibold">@{sub.campaignInfluencer.influencer.instagramId}</span>
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">PENDING</Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium">Internal Feedback</p>
                                <Textarea 
                                    placeholder="Add feedback for the influencer..."
                                    className="h-20"
                                    id={`feedback-${sub.id}`}
                                />
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button 
                                    variant="outline" 
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
                                    onClick={() => {
                                        const feedback = (document.getElementById(`feedback-${sub.id}`) as HTMLTextAreaElement).value
                                        handleReview(sub.id, "REJECTED", feedback)
                                    }}
                                >
                                    <XCircle className="h-4 w-4" /> Reject
                                </Button>
                                <Button 
                                    className="bg-green-600 hover:bg-green-700 gap-2"
                                    onClick={() => {
                                        const feedback = (document.getElementById(`feedback-${sub.id}`) as HTMLTextAreaElement).value
                                        handleReview(sub.id, "APPROVED", feedback)
                                    }}
                                >
                                    <CheckCircle className="h-4 w-4" /> Approve
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}

            {submissions.length === 0 && (
                <div className="text-center py-20 bg-muted/20 rounded-lg border-2 border-dashed">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-muted-foreground">No pending content reviews at the moment.</p>
                </div>
            )}
        </div>
    )
}
