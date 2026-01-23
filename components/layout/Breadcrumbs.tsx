"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
    const pathname = usePathname()

    const pathSegments = pathname.split("/").filter(Boolean)

    const breadcrumbs = [
        { name: "Home", href: "/dashboard" }
    ]

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`

        // Convert segment to readable name
        let name = segment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")

        // Handle special cases
        if (segment === "dashboard") name = "Dashboard"
        if (segment === "influencers") name = "Influencers"
        if (segment === "brands") name = "Brands"
        if (segment === "campaigns") name = "Campaigns"
        if (segment === "payments") name = "Payments"
        if (segment === "settings") name = "Settings"
        if (segment === "admin-users") name = "Admin Users"
        if (segment === "add") name = "Add New"
        if (segment === "create") name = "Create New"

        // Don't show IDs in breadcrumbs
        if (segment.length > 20) {
            name = "Details"
        }

        breadcrumbs.push({
            name,
            href: currentPath
        })
    })

    if (breadcrumbs.length <= 1) return null

    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground flex items-center">
                <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.slice(1).map((crumb, index) => (
                <div key={crumb.href} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4" />
                    {index === breadcrumbs.length - 2 ? (
                        <span className="font-medium text-foreground">{crumb.name}</span>
                    ) : (
                        <Link href={crumb.href} className="hover:text-foreground">
                            {crumb.name}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}
