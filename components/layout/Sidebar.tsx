"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import {
    LayoutDashboard,
    Users,
    Building2,
    Megaphone,
    DollarSign,
    Settings,
    UserCog,
    FileText,
    ChevronLeft,
    ChevronRight,
    Zap,
} from "lucide-react"
import { canManageAdmins, canEditSettings } from "@/lib/permissions"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/influencers", icon: Users, label: "Influencers" },
    { href: "/brands", icon: Building2, label: "Brands" },
    { href: "/campaigns", icon: Megaphone, label: "Campaigns" },
    { href: "/content-review", icon: FileText, label: "Content Review" },
    { href: "/payments", icon: DollarSign, label: "Payments" },
    { href: "/contact-submissions", icon: FileText, label: "Contact Submissions" },
    { href: "/public-users", icon: Users, label: "Public Users" },
    { href: "/newsletter-subscribers", icon: FileText, label: "Newsletter" },
]

interface SidebarProps {
    className?: string
    isMobile?: boolean
    onNavigate?: () => void
}

export function Sidebar({ className, isMobile = false, onNavigate }: SidebarProps) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const userRole = session?.user?.role
    const [collapsed, setCollapsed] = useState(false)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
        if (!isMobile) {
            const stored = localStorage.getItem("sidebar-collapsed")
            if (stored === "true") setCollapsed(true)
        }
    }, [isMobile])

    const toggleSidebar = () => {
        if (isMobile) return
        const newState = !collapsed
        setCollapsed(newState)
        localStorage.setItem("sidebar-collapsed", String(newState))
    }

    if (!mounted) return (
        <div className="flex h-full w-64 flex-col bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800" />
    )

    return (
        <TooltipProvider delayDuration={0}>
            <div className={cn(
                "flex h-full flex-col bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative",
                isMobile ? "w-full border-none" : (collapsed ? "w-20" : "w-64"),
                className
            )}>
                <div className={cn(
                    "flex h-16 items-center border-b border-gray-200 dark:border-gray-800",
                    collapsed ? "justify-center px-0" : "px-6"
                )}>
                    {collapsed ? (
                        <h1 className="text-xl font-bold text-blue-600">N</h1>
                    ) : (
                        <h1 className="text-xl font-bold">TheNextChoose</h1>
                    )}
                </div>

                <nav className="flex-1 space-y-1 px-3 py-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                        if (collapsed) {
                            return (
                                <Tooltip key={item.label}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-center rounded-lg py-2 text-sm font-medium transition-colors h-10 w-10 mx-auto",
                                                isActive
                                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="sr-only">{item.label}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        {item.label}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onNavigate}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        )
                    })}

                    {/* Settings - Super Admin only */}
                    {userRole && canEditSettings(userRole) && (
                        <>
                            <div className="my-4 border-t border-gray-200 dark:border-gray-800" />
                            {collapsed ? (
                                <>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/cms"
                                                className={cn(
                                                    "flex items-center justify-center rounded-lg py-2 text-sm font-medium transition-colors h-10 w-10 mx-auto mb-1",
                                                    pathname === "/cms"
                                                        ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                )}
                                            >
                                                <Zap className="h-5 w-5 text-purple-600" />
                                                <span className="sr-only">Website CMS</span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Website CMS</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/settings"
                                                className={cn(
                                                    "flex items-center justify-center rounded-lg py-2 text-sm font-medium transition-colors h-10 w-10 mx-auto mb-1",
                                                    pathname === "/settings"
                                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                )}
                                            >
                                                <Settings className="h-5 w-5" />
                                                <span className="sr-only">Settings</span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Settings</TooltipContent>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Link
                                            href="/cms"
                                            onClick={onNavigate}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors font-bold",
                                                pathname === "/cms"
                                                    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <Zap className="h-5 w-5 text-purple-600" />
                                            Website CMS
                                        </Link>
                                        <Link
                                            href="/settings"
                                            onClick={onNavigate}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                pathname === "/settings"
                                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <Settings className="h-5 w-5" />
                                            Settings
                                        </Link>
                                        <Link
                                            href="/admin-users"
                                            onClick={onNavigate}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                pathname === "/admin-users"
                                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <UserCog className="h-5 w-5" />
                                            Admin Users
                                        </Link>
                                </>
                            )}
                        </>
                    )}
                </nav>

                {!isMobile && (
                    <div className={cn("p-4 border-t border-gray-200 dark:border-gray-800", collapsed && "flex justify-center")}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("w-full gap-2", collapsed && "w-10 h-10 p-0 justify-center")}
                            onClick={toggleSidebar}
                        >
                            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                            {!collapsed && "Collapse Sidebar"}
                        </Button>
                    </div>
                )}
            </div>
        </TooltipProvider>
    )
}
