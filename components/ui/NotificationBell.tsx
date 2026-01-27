"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function NotificationBell() {
    // Mock Notifications for now (API can be connected later)
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Campaign Approved', message: 'Summer Launch campaign was approved by Super Admin.', time: '2 mins ago', read: false },
        { id: 2, title: 'New Influencer', message: 'Sarah Smith applied to join the network.', time: '1 hour ago', read: false },
        { id: 3, title: 'Payment Failed', message: 'Transaction ID #9902 failed processing.', time: '3 hours ago', read: true },
    ])
    
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <span className="text-xs font-normal text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="cursor-pointer">
                        <div className={`flex flex-col gap-1 w-full ${!notification.read ? 'bg-blue-50/50 -mx-2 px-2 py-2 rounded' : 'py-2'}`}>
                            <div className="flex justify-between items-start">
                                <span className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                    {notification.title}
                                </span>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {notification.message}
                            </p>
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center cursor-pointer justify-center text-xs text-muted-foreground">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
