"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfitChartProps {
    data: {
        name: string
        revenue: number
        payouts: number
        profit: number
    }[]
}

export function ProfitChart({ data }: ProfitChartProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}

                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px' }}
                />
                <Legend />
                <Bar
                    dataKey="revenue"
                    fill="#16a34a"  // Green-600
                    radius={[4, 4, 0, 0]}
                    name="Revenue"
                />
                <Bar
                    dataKey="payouts"
                    fill="#dc2626"  // Red-600
                    radius={[4, 4, 0, 0]}
                    name="Payouts"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
