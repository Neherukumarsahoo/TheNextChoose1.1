"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { ShieldAlert } from "lucide-react"

const resources = [
    { id: "influencers", label: "Influencers" },
    { id: "brands", label: "Brands" },
    { id: "campaigns", label: "Campaigns" },
    { id: "payments", label: "Payments (Financials)" },
    { id: "admin_users", label: "Admin Management" }
]

const actions = [
    { id: "view", label: "View" },
    { id: "create", label: "Create/Edit" },
    { id: "delete", label: "Delete" }
]

const roles = ["ADMIN", "MANAGER", "VIEWER"]

export function RBACEditor() {
    const [permissions, setPermissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/rbac")
            .then(res => res.json())
            .then(data => {
                setPermissions(data)
                setLoading(false)
            })
    }, [])

    const isAllowed = (role: string, resource: string, action: string) => {
        const perm = permissions.find(p => p.role === role && p.resource === resource && p.action === action)
        return perm ? perm.allowed : true // Default to true if not defined
    }

    const togglePermission = async (role: string, resource: string, action: string) => {
        const current = isAllowed(role, resource, action)
        const res = await fetch("/api/rbac", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role, resource, action, allowed: !current })
        })

        if (res.ok) {
            const updated = await res.json()
            setPermissions(prev => {
                const filtered = prev.filter(p => !(p.role === role && p.resource === resource && p.action === action))
                return [...filtered, updated]
            })
            toast.success(`Permission updated for ${role}`)
        }
    }

    if (loading) return <div>Loading permissions matrix...</div>

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                    <CardTitle>Role Permissions Matrix</CardTitle>
                </div>
                <CardDescription>Define granular access for different admin tiers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Resource / Action</TableHead>
                                {roles.map(role => (
                                    <TableHead key={role} className="text-center">{role}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resources.map(res => (
                                <>
                                    <TableRow key={res.id} className="bg-muted/50 font-semibold text-xs">
                                        <TableCell colSpan={roles.length + 1}>{res.label}</TableCell>
                                    </TableRow>
                                    {actions.map(action => (
                                        <TableRow key={`${res.id}-${action.id}`}>
                                            <TableCell className="pl-6 text-sm italic">{action.label}</TableCell>
                                            {roles.map(role => (
                                                <TableCell key={role} className="text-center">
                                                    <Checkbox 
                                                        checked={isAllowed(role, res.id, action.id)}
                                                        onCheckedChange={() => togglePermission(role, res.id, action.id)}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
