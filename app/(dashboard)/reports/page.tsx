"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
    const [reportType, setReportType] = useState('revenue')
    const [dateRange, setDateRange] = useState('30d')

    const handleGenerate = () => {
        // In a real app, this would use jspdf to generate a PDF
        alert("Generating PDF Report... (Simulated)")
    }

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Custom Reports</h1>
                    <p className="text-muted-foreground text-lg mt-1">Generate and export detailed analytics reports.</p>
                </div>
                <Button onClick={handleGenerate} className="gap-2">
                    <Download className="w-4 h-4" /> Export PDF
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Report Config</CardTitle>
                        <CardDescription>Select parameters for your report.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Report Type</label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="revenue">Revenue & Profit</SelectItem>
                                    <SelectItem value="influencer">Influencer Performance</SelectItem>
                                    <SelectItem value="campaign">Campaign ROI</SelectItem>
                                    <SelectItem value="audit">System Audit Logs</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date Range</label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7d">Last 7 Days</SelectItem>
                                    <SelectItem value="30d">Last 30 Days</SelectItem>
                                    <SelectItem value="90d">Last Quarter</SelectItem>
                                    <SelectItem value="ytd">Year to Date</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Format</label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 bg-blue-50 border-blue-200 text-blue-700">PDF</Button>
                                <Button variant="outline" className="flex-1">CSV</Button>
                                <Button variant="outline" className="flex-1">Excel</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Preview Panel */}
                <Card className="md:col-span-2 min-h-[500px] flex flex-col justify-center items-center border-dashed bg-gray-50/50">
                    <div className="text-center space-y-4">
                        <div className="bg-white p-4 rounded-full shadow-sm inline-flex">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Report Preview</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                Generating preview for <strong>{reportType.toUpperCase()}</strong> report
                                covering <strong>{dateRange}</strong>.
                            </p>
                        </div>
                        {/* Mock Chart Visualization */}
                        <div className="w-[400px] h-[200px] bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 uppercase tracking-widest font-semibold">
                                [Chart Visualization Placeholder]
                            </div>
                            {/* Decorative bars */}
                            <div className="flex items-end justify-between h-full pt-8 gap-2">
                                {[40, 60, 45, 80, 55, 70, 65, 90, 50, 60].map((h, i) => (
                                    <div key={i} className="w-full bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
