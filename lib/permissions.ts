import { Role } from "@/lib/enums"

export type Permission =
    | 'influencer:approve'
    | 'influencer:create'
    | 'influencer:edit'
    | 'influencer:view'
    | 'brand:create'
    | 'brand:edit'
    | 'brand:view'
    | 'campaign:create'
    | 'campaign:edit'
    | 'campaign:view'
    | 'campaign:approve'
    | 'payment:create'
    | 'payment:view'
    | 'payment:edit'
    | 'payment:viewProfit'
    | 'settings:edit'
    | 'admin:manage'

const permissions: Record<Role, Permission[]> = {
    SUPER_ADMIN: [
        'influencer:approve',
        'influencer:create',
        'influencer:edit',
        'influencer:view',
        'brand:create',
        'brand:edit',
        'brand:view',
        'campaign:create',
        'campaign:edit',
        'campaign:view',
        'campaign:approve',
        'payment:create',
        'payment:view',
        'payment:edit',
        'payment:viewProfit',
        'settings:edit',
        'admin:manage',
    ],
    ADMIN: [
        'influencer:create',
        'influencer:edit',
        'influencer:view',
        'brand:create',
        'brand:edit',
        'brand:view',
        'campaign:create',
        'campaign:edit',
        'campaign:view',
        'payment:create',
        'payment:view',
        'payment:edit',
    ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
    return permissions[role]?.includes(permission) ?? false
}

export function canApproveInfluencer(role: Role): boolean {
    return hasPermission(role, 'influencer:approve')
}

export function canApproveCampaign(role: Role): boolean {
    return hasPermission(role, 'campaign:approve')
}

export function canViewProfit(role: Role): boolean {
    return hasPermission(role, 'payment:viewProfit')
}

export function canManageAdmins(role: Role): boolean {
    return hasPermission(role, 'admin:manage')
}

export function canEditSettings(role: Role): boolean {
    return hasPermission(role, 'settings:edit')
}
