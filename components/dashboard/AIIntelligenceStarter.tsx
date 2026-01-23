"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, ShieldAlert, CheckCircle, Search } from "lucide-react"
import { toast } from "sonner"

export function AIIntelligenceStarter() {
    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState<any>(null)

    const simulateScan = () => {
        setScanning(true)
        setResult(null)
        setTimeout(() => {
            setScanning(false)
            setResult({
                status: "WARNING",
                score: 72,
                findings: [
                    "High follower-to-like disparity detected (850:1)",
                    "Comment patterns show recursive sentiment (likely bot activity)",
                    "Sharp peaks in follower growth on Tuesday"
                ]
            })
            toast.warning("AI Scan complete: Action recommended")
        }, 3000)
    }

    return (
        <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-indigo-600" />
                    <CardTitle>AI Fraud Guard</CardTitle>
                </div>
                <CardDescription>Predictive analysis of influencer engagement and follower health.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!result && !scanning && (
                    <div className="text-center py-6">
                        <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">Select an influencer to begin deep-scan analysis.</p>
                        <Button onClick={simulateScan} className="mt-4 bg-indigo-600 hover:bg-indigo-700">Run Global Audit</Button>
                    </div>
                )}

                {scanning && (
                    <div className="text-center py-6 space-y-4">
                        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm animate-pulse font-medium text-indigo-600">AI Engine analyzing metadata patterns...</p>
                    </div>
                )}

                {result && (
                    <div className="space-y-4 animate-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="h-5 w-5 text-amber-600" />
                                <div>
                                    <p className="font-bold text-lg text-amber-700 dark:text-amber-400">{result.score}% Risk Score</p>
                                    <p className="text-xs text-amber-600">Abnormal engagement detected</p>
                                </div>
                            </div>
                            <Badge variant="destructive">HIGH RISK</Badge>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Key Findings:</p>
                            {result.findings.map((f: string, i: number) => (
                                <div key={i} className="flex gap-2 text-xs text-muted-foreground p-2 border-l-2 border-indigo-200 bg-muted/20">
                                    <div className="h-1 w-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                    {f}
                                </div>
                            ))}
                        </div>
                        
                        <Button variant="outline" onClick={() => setResult(null)} className="w-full">Dismiss Results</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
