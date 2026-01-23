"use client"

import { useState } from "react"
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CalendarCampaign {
    id: string
    name: string
    startDate: Date
    endDate: Date | null
    status: string
}

export function CampaignCalendar({ campaigns }: { campaigns: CalendarCampaign[] }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
    const today = () => setCurrentDate(new Date())

    const getCampaignsForDay = (day: Date) => {
        return campaigns.filter(campaign => {
            const start = new Date(campaign.startDate)
            const end = campaign.endDate ? new Date(campaign.endDate) : start
            return isWithinInterval(day, { start, end })
        })
    }

    return (
        <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={today}>
                        Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-7 grid-rows-[auto_1fr]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium border-b border-r last:border-r-0">
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, dayIdx) => {
                    const dayCampaigns = getCampaignsForDay(day)
                    const isCurrentMonth = isSameMonth(day, monthStart)

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "min-h-[100px] p-2 border-b border-r last:border-r-0 flex flex-col gap-1",
                                !isCurrentMonth && "bg-gray-50/50 dark:bg-gray-900/50 text-muted-foreground"
                            )}
                        >
                            <div className={cn(
                                "text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1",
                                isSameDay(day, new Date()) && "bg-blue-600 text-white"
                            )}>
                                {format(day, "d")}
                            </div>

                            <div className="flex flex-col gap-1">
                                {dayCampaigns.map(campaign => (
                                    <div
                                        key={campaign.id}
                                        className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded truncate font-medium",
                                            campaign.status === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                campaign.status === "COMPLETED" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" :
                                                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        )}
                                        title={campaign.name}
                                    >
                                        {campaign.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
