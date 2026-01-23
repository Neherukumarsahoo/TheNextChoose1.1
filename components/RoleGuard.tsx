"use client"

import { Role } from "@/lib/enums"
import { useSession } from "next-auth/react"
import { hasPermission, Permission } from "@/lib/permissions"

interface RoleGuardProps {
    children: React.ReactNode
    permission?: Permission
    fallback?: React.ReactNode
}

export function RoleGuard({ children, permission, fallback = null }: RoleGuardProps) {
    const { data: session } = useSession()

    if (!session?.user) {
        return <>{fallback}</>
    }

    if (permission && !hasPermission(session.user.role, permission)) {
        return <>{fallback}</>
    }

    return <>{children}</>
}

export function useHasPermission(permission: Permission): boolean {
    const { data: session } = useSession()

    if (!session?.user) {
        return false
    }

    return hasPermission(session.user.role, permission)
}

export function useIsSuperAdmin(): boolean {
    const { data: session } = useSession()
    return session?.user?.role === "SUPER_ADMIN"
}
