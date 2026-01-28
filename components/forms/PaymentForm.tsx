"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface Payment {
    id?: string
    campaignId?: string
    type: "BRAND_PAYMENT" | "INFLUENCER_PAYOUT"
    amount: string
    advance: string
    balance: string
    status: "PENDING" | "PAID" | "HOLD"
    dueDate: string
    dueDate: string
    method?: string
    transactionId?: string
    dueDate: string
    method?: string
    transactionId?: string
    notes: string
}

interface PaymentFormProps {
    payment?: Payment | null
    mode: "create" | "edit"
    campaigns?: Array<{ id: string; name: string; brand: { name: string } }>
}

export function PaymentForm({ payment, mode, campaigns = [] }: PaymentFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<Payment>({
        campaignId: payment?.campaignId || "",
        type: payment?.type || "BRAND_PAYMENT",
        amount: payment?.amount?.toString() || "",
        advance: payment?.advance?.toString() || "0",
        balance: payment?.balance?.toString() || "0",
        status: payment?.status || "PENDING",
        dueDate: payment?.dueDate || new Date().toISOString().split('T')[0],
        method: payment?.method || "",
        transactionId: payment?.transactionId || "",
        dueDate: payment?.dueDate || new Date().toISOString().split('T')[0],
        method: payment?.method || "",
        transactionId: payment?.transactionId || "",
        notes: payment?.notes || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newData = { ...prev, [name]: value }

            // Auto-calculate balance if amount or advance changes
            if (name === "amount" || name === "advance") {
                const total = parseFloat(name === "amount" ? value : prev.amount) || 0
                const adv = parseFloat(name === "advance" ? value : prev.advance) || 0
                newData.balance = (total - adv).toString()
            }

            return newData
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const url = mode === "edit" && payment?.id ? `/api/payments/${payment.id}` : "/api/payments"
            const method = mode === "edit" ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount) || 0,
                    advance: parseFloat(formData.advance) || 0,
                    balance: parseFloat(formData.balance) || 0,
                }),
            })

            if (response.ok) {
                toast.success(mode === "edit" ? "Payment updated successfully!" : "Payment created successfully!")
                router.push("/payments")
                router.refresh()
            } else {
                toast.error(`Failed to ${mode === "edit" ? "update" : "create"} payment`)
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="type">Payment Type *</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BRAND_PAYMENT">Brand Payment (Incoming)</SelectItem>
                                <SelectItem value="INFLUENCER_PAYOUT">Influencer Payout (Outgoing)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="campaignId">Campaign *</Label>
                        <Select
                            value={formData.campaignId}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, campaignId: value }))}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select campaign" />
                            </SelectTrigger>
                            <SelectContent>
                                {campaigns.map((campaign) => (
                                    <SelectItem key={campaign.id} value={campaign.id}>
                                        {campaign.name} - {campaign.brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="amount">Total Amount (₹) *</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {formData.type === "BRAND_PAYMENT" && (
                            <>
                                <div>
                                    <Label htmlFor="advance">Advance Paid (₹)</Label>
                                    <Input
                                        id="advance"
                                        name="advance"
                                        type="number"
                                        step="0.01"
                                        value={formData.advance}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="balance">Balance Due (₹)</Label>
                                    <Input
                                        id="balance"
                                        name="balance"
                                        type="number"
                                        step="0.01"
                                        value={formData.balance}
                                        readOnly
                                        className="bg-muted"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <Label htmlFor="dueDate">Due Date *</Label>
                            <Input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="status">Status *</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PAID">Paid</SelectItem>
                                <SelectItem value="HOLD">On Hold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Add any relevant notes..."
                            rows={4}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (mode === "edit" ? "Updating..." : "Creating...") : (mode === "edit" ? "Update Payment" : "Create Payment")}
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
    )
}
