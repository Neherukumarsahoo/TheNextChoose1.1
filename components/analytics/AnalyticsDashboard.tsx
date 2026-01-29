"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Activity } from "lucide-react"

// Mock Data for Forecast
const historicalData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 49000 },
  { month: 'Apr', revenue: 63000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 71000 },
]

// Simple Linear Projection for demo
const forecastData = [
  { month: 'Jul', revenue: 76000, type: 'predicted' },
  { month: 'Aug', revenue: 82000, type: 'predicted' },
  { month: 'Sep', revenue: 88000, type: 'predicted' },
]

export function AnalyticsDashboard() {
    const [activeVisitors, setActiveVisitors] = useState(124)

    // Feature 12: Real-Time Dashboard Simulation


    return (
        <div className="space-y-6">
            
            {/* Feature 12: Real-Time Header */}
            <div className="flex items-center gap-4">
                <Badge variant="outline" className="animate-pulse bg-green-50 text-green-700 border-green-200 gap-2 px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live System Status
                </Badge>
                <div className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900">{activeVisitors}</span> active visitors currently on platform
                </div>
            </div>

            <Tabs defaultValue="forecast">
                <TabsList>
                    <TabsTrigger value="forecast">10. AI Forecasting</TabsTrigger>
                    <TabsTrigger value="cohorts">11. Cohort Analysis</TabsTrigger>
                </TabsList>

                {/* Feature 10: Predictive Forecasting */}
                <TabsContent value="forecast" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                                Revenue Forecast (AI Model)
                            </CardTitle>
                            <CardDescription>
                                Projected revenue for Q3 based on historical growth trends.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full flex items-end gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/30">
                                {/* Historical Bars */}
                                {historicalData.map((d, i) => (
                                    <div key={d.month} className="flex-1 flex flex-col justify-end group">
                                        <div 
                                            className="w-full bg-gray-900 rounded-t-sm transition-all hover:opacity-80 relative" 
                                            style={{ height: `${(d.revenue / 100000) * 100}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                ${(d.revenue/1000).toFixed(1)}k
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 text-center mt-2">{d.month}</span>
                                    </div>
                                ))}
                                {/* Forecast Bars (Dashed/Lighter) */}
                                {forecastData.map((d, i) => (
                                    <div key={d.month} className="flex-1 flex flex-col justify-end group">
                                        <div 
                                            className="w-full bg-purple-500/50 rounded-t-sm transition-all hover:bg-purple-500 relative pattern-diagonal-lines" 
                                            style={{ height: `${(d.revenue / 100000) * 100}%` }}
                                        >
                                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                ${(d.revenue/1000).toFixed(1)}k
                                            </div>
                                        </div>
                                        <span className="text-xs text-purple-600 font-medium text-center mt-2">{d.month}*</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-900 rounded-sm"></div> Historical
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500/50 rounded-sm"></div> AI Predicted
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Feature 11: Cohort Analysis */}
                <TabsContent value="cohorts">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                User Retention Cohorts
                            </CardTitle>
                            <CardDescription>
                                Percentage of users returning after first month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Cohort</th>
                                            <th className="py-2">Users</th>
                                            <th className="py-2 text-center">Month 1</th>
                                            <th className="py-2 text-center">Month 2</th>
                                            <th className="py-2 text-center">Month 3</th>
                                            <th className="py-2 text-center">Month 4</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { month: 'Jan', users: 1240, ret: [100, 85, 76, 68] },
                                            { month: 'Feb', users: 1560, ret: [100, 82, 70, 0] },
                                            { month: 'Mar', users: 1890, ret: [100, 88, 0, 0] },
                                            { month: 'Apr', users: 2100, ret: [100, 0, 0, 0] },
                                        ].map((row) => (
                                            <tr key={row.month}>
                                                <td className="py-3 font-medium text-gray-900">{row.month} 2024</td>
                                                <td className="py-3 text-gray-500">{row.users}</td>
                                                {row.ret.map((val, i) => (
                                                    <td key={i} className="py-3 text-center">
                                                        {val > 0 ? (
                                                            <div 
                                                                className={`mx-auto w-12 py-1 rounded text-xs font-medium ${
                                                                    val >= 90 ? 'bg-blue-900 text-white' :
                                                                    val >= 80 ? 'bg-blue-700 text-white' :
                                                                    val >= 70 ? 'bg-blue-500 text-white' :
                                                                    'bg-blue-100 text-blue-900'
                                                                }`}
                                                            >
                                                                {val}%
                                                            </div>
                                                        ) : <span className="text-gray-300">-</span>}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
