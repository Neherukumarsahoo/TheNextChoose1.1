"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
    const { data: session } = useSession()
    const [adminUsers, setAdminUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        const res = await fetch("/api/admin-users")
        if (res.ok) {
            const data = await res.json()
            setAdminUsers(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <div>Loading...</div>
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return <div>Unauthorized</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Admin Users</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage admin panel access (Super Admin only)
                    </p>
                </div>
                <Link href="/admin-users/add">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Admin
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Admin Users ({adminUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Name</th>
                                    <th className="text-left p-3">Email</th>
                                    <th className="text-left p-3">Role</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Created</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="p-3 font-medium">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === "SUPER_ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                                }`}>
                                                {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                                                }`}>
                                                {user.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3">
                                            {session.user.id !== user.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={async () => {
                                                        if (confirm(`Are you sure you want to delete admin ${user.name}? This action cannot be undone.`)) {
                                                            const res = await fetch(`/api/admin-users/${user.id}`, { method: "DELETE" })
                                                            if (res.ok) {
                                                                window.location.reload()
                                                            } else {
                                                                alert("Failed to delete admin")
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
