"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PlusCircle, Calculator, Loader2 } from "lucide-react"

interface Influencer {
    id: string
    name: string
    instagramId: string
}

interface Brand {
    id: string
    name: string
}

interface ManualPaymentDialogProps {
    initialData?: any
    trigger?: React.ReactNode
}

export function ManualPaymentDialog({ initialData, trigger }: ManualPaymentDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetchingSuggestions, setFetchingSuggestions] = useState(false)
    
    // Form State
    const [influencerQuery, setInfluencerQuery] = useState("")
    const [influencerId, setInfluencerId] = useState("")
    const [brandQuery, setBrandQuery] = useState("")
    const [brandId, setBrandId] = useState("")
    
    const [totalAmount, setTotalAmount] = useState("")
    const [payoutAmount, setPayoutAmount] = useState("")
    const [notes, setNotes] = useState("")

    // Synchronize form when initialData or open changes
    useEffect(() => {
        if (open) {
            setInfluencerQuery(initialData?.influencerName || "")
            setInfluencerId(initialData?.influencerId || "")
            setBrandQuery(initialData?.brandName || "")
            setBrandId(initialData?.brandId || "")
            setTotalAmount(initialData?.totalAmount?.toString() || "")
            setPayoutAmount(initialData?.payoutAmount?.toString() || "")
            setNotes(initialData?.notes || "")
        }
    }, [initialData, open])

    // Suggestions State
    const [influencerSuggestions, setInfluencerSuggestions] = useState<Influencer[]>([])
    const [brandSuggestions, setBrandSuggestions] = useState<Brand[]>([])
    const [showInfluencerSuggs, setShowInfluencerSuggs] = useState(false)
    const [showBrandSuggs, setShowBrandSuggs] = useState(false)

    const router = useRouter()

    const fetchSuggestions = async (type: "brand" | "influencer", query: string) => {
        if (query.length < 2) {
            type === "brand" ? setBrandSuggestions([]) : setInfluencerSuggestions([])
            return
        }
        setFetchingSuggestions(true)
        try {
            const res = await fetch(`/api/suggestions?type=${type}&query=${encodeURIComponent(query)}`)
            if (res.ok) {
                const data = await res.json()
                type === "brand" ? setBrandSuggestions(data) : setInfluencerSuggestions(data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setFetchingSuggestions(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (showBrandSuggs && brandQuery.length >= 2) fetchSuggestions("brand", brandQuery)
        }, 300)
        return () => clearTimeout(timer)
    }, [brandQuery, showBrandSuggs])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (showInfluencerSuggs && influencerQuery.length >= 2) fetchSuggestions("influencer", influencerQuery)
        }, 300)
        return () => clearTimeout(timer)
    }, [influencerQuery, showInfluencerSuggs])

    const profit = (parseFloat(totalAmount) || 0) - (parseFloat(payoutAmount) || 0)
    const margin = totalAmount ? ((profit / parseFloat(totalAmount)) * 100).toFixed(1) : "0"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!totalAmount || !payoutAmount) {
            toast.error("Please fill required amounts")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/payments/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: initialData?.id,
                    influencerId,
                    influencerName: influencerQuery,
                    brandId,
                    brandName: brandQuery,
                    totalAmount: parseFloat(totalAmount),
                    payoutAmount: parseFloat(payoutAmount),
                    notes
                })
            })

            if (res.ok) {
                toast.success(initialData ? "Transaction updated!" : "Manual transaction recorded!")
                setOpen(false)
                router.refresh()
            } else {
                const err = await res.text()
                toast.error(`Failed: ${err}`)
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Manual Entry
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Transaction" : "Record Manual Transaction"}</DialogTitle>
                    <DialogDescription>
                        Manually record a deal, calculating platform profit instantly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Brand Input */}
                        <div className="space-y-2 relative">
                            <Label>Brand (Search or Type)</Label>
                            <Input 
                                placeholder="Type brand name..." 
                                value={brandQuery}
                                onChange={(e) => {
                                    setBrandQuery(e.target.value)
                                    setBrandId("")
                                    setShowBrandSuggs(true)
                                }}
                                onFocus={() => setShowBrandSuggs(true)}
                                onBlur={() => setTimeout(() => setShowBrandSuggs(false), 200)}
                            />
                            {showBrandSuggs && (brandSuggestions.length > 0 || fetchingSuggestions) && (
                                <div className="absolute z-50 w-full bg-white dark:bg-slate-900 border rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                                    {fetchingSuggestions && brandSuggestions.length === 0 && (
                                        <div className="p-2 text-xs text-muted-foreground">Searching...</div>
                                    )}
                                    {brandSuggestions.map(b => (
                                        <div 
                                            key={b.id} 
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm"
                                            onMouseDown={(e) => {
                                                e.preventDefault() // Prevent onBlur from firing before this
                                                setBrandQuery(b.name)
                                                setBrandId(b.id)
                                                setShowBrandSuggs(false)
                                            }}
                                        >
                                            {b.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Influencer Input */}
                        <div className="space-y-2 relative">
                            <Label>Influencer (Search or Type)</Label>
                            <Input 
                                placeholder="Type name or ID..." 
                                value={influencerQuery}
                                onChange={(e) => {
                                    setInfluencerQuery(e.target.value)
                                    setInfluencerId("")
                                    setShowInfluencerSuggs(true)
                                }}
                                onFocus={() => setShowInfluencerSuggs(true)}
                                onBlur={() => setTimeout(() => setShowInfluencerSuggs(false), 200)}
                            />
                            {showInfluencerSuggs && (influencerSuggestions.length > 0 || fetchingSuggestions) && (
                                <div className="absolute z-50 w-full bg-white dark:bg-slate-900 border rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                                    {fetchingSuggestions && influencerSuggestions.length === 0 && (
                                        <div className="p-2 text-xs text-muted-foreground">Searching...</div>
                                    )}
                                    {influencerSuggestions.map(i => (
                                        <div 
                                            key={i.id} 
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm font-medium"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                setInfluencerQuery(i.name)
                                                setInfluencerId(i.id)
                                                setShowInfluencerSuggs(false)
                                            }}
                                        >
                                            {i.name} <span className="text-xs text-muted-foreground ml-1">@{i.instagramId}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total Deal Value (Revenue)</Label>
                            <div className="relative">
                                <span className="absolute left-2 top-2.5 text-gray-500">₹</span>
                                <Input 
                                    type="number" 
                                    className="pl-6" 
                                    placeholder="0"
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Influencer Payout (Cost)</Label>
                            <div className="relative">
                                <span className="absolute left-2 top-2.5 text-gray-500">₹</span>
                                <Input 
                                    type="number" 
                                    className="pl-6" 
                                    placeholder="0"
                                    value={payoutAmount}
                                    onChange={(e) => setPayoutAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Live Profit Calculation */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg flex items-center justify-between border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calculator className="h-4 w-4" />
                            <span className="text-sm font-medium">Estimated Profit</span>
                        </div>
                        <div className="text-right">
                            <div className={`text-lg font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ₹{profit.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">{margin}% margin</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes (Optional)</Label>
                        <Input 
                            placeholder="e.g. Direct Instagram DM Deal" 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {initialData ? "Update Transaction" : "Record Transaction"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


