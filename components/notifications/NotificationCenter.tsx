"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
    id: string
    title: string
    message: string
    type: "info" | "success" | "warning" | "error"
    read: boolean
    createdAt: Date
}

// Mock notifications - in production, fetch from API
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "New influencer pending approval",
        message: "John Doe has been added and needs approval",
        type: "info",
        read: false,
        createdAt: new Date(Date.now() - 3600000),
    },
    {
        id: "2",
        title: "Campaign completed",
        message: "Summer Fashion campaign has been marked as completed",
        type: "success",
        read: false,
        createdAt: new Date(Date.now() - 7200000),
    },
    {
        id: "3",
        title: "Payment pending",
        message: "Influencer payout of $5,000 is pending approval",
        type: "warning",
        read: true,
        createdAt: new Date(Date.now() - 86400000),
    },
]

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "info": return "text-blue-600"
            case "success": return "text-green-600"
            case "warning": return "text-yellow-600"
            case "error": return "text-red-600"
            default: return "text-gray-600"
        }
    }

    const formatTime = (date: Date) => {
        const diff = Date.now() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        return `${days}d ago`
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-3 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Mark all read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-96">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-3 border-b hover:bg-muted/50 cursor-pointer ${!notification.read ? "bg-blue-50 dark:bg-blue-950/20" : ""
                                    }`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-medium text-sm ${getTypeColor(notification.type)}`}>
                                            {notification.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatTime(notification.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {!notification.read && (
                                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteNotification(notification.id)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
