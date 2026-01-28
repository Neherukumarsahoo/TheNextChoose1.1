"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import { NotificationCenter } from "@/components/notifications/NotificationCenter"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { MobileSidebar } from "@/components/layout/MobileSidebar"
import { SessionTimer } from "@/components/auth/SessionTimer"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Header() {
    const { data: session } = useSession()
    const pathname = usePathname()

    const generateBreadcrumbs = () => {
        const segments = pathname.split("/").filter(Boolean)
        return segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
            const isLast = index === segments.length - 1

            return (
                <BreadcrumbItem key={href}>
                    {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                        <>
                            <BreadcrumbLink asChild>
                                <Link href={href}>{label}</Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </>
                    )}
                </BreadcrumbItem>
            )
        })
    }

    return (
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
                <MobileSidebar />
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {generateBreadcrumbs()}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
                <SessionTimer />
                <ThemeToggle />
                <NotificationCenter />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <User className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium hidden sm:inline-block">
                                {session?.user?.name}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{session?.user?.name}</p>
                                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                    {session?.user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/login", redirect: true })} className="text-red-600 focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

