"use client"

import { useEffect, useState } from "react"
import { Users, Mail, Phone, Calendar, Shield, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

interface PublicUser {
  id: string
  name: string
  email: string
  countryCode: string
  mobile: string
  provider: string
  providerId: string | null
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: string
  updatedAt: string
}

export function PublicUsersPanel() {
  const [users, setUsers] = useState<PublicUser[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all") // all, email, google, phone

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/public-users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(u => 
    filter === "all" || u.provider === filter
  )

  const stats = {
    total: users.length,
    email: users.filter(u => u.provider === "email").length,
    google: users.filter(u => u.provider === "google").length,
    phone: users.filter(u => u.provider === "phone").length,
    verified: users.filter(u => u.emailVerified || u.phoneVerified).length,
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
    </div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Public Website Users</h2>
          <p className="text-muted-foreground">
            {users.length} registered users
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-maroon text-white rounded-lg hover:bg-maroon/90 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-card rounded-xl border border-border">
          <Users className="w-5 h-5 text-maroon mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Total Users</div>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <Mail className="w-5 h-5 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.email}</div>
          <div className="text-xs text-muted-foreground">Email Signups</div>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <svg className="w-5 h-5 mb-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          </svg>
          <div className="text-2xl font-bold text-foreground">{stats.google}</div>
          <div className="text-xs text-muted-foreground">Google</div>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <Phone className="w-5 h-5 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.phone}</div>
          <div className="text-xs text-muted-foreground">Phone</div>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border">
          <Shield className="w-5 h-5 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.verified}</div>
          <div className="text-xs text-muted-foreground">Verified</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {["all", "email", "google", "phone"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === f
                ? "bg-maroon text-white"
                : "bg-card hover:bg-accent"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && ` (${users.filter(u => u.provider === f).length})`}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Provider</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Verified</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.id}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">{user.countryCode} {user.mobile}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    user.provider === 'google' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    user.provider === 'phone' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}>
                    {user.provider}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    {user.emailVerified ? (
                      <span title="Email verified"><CheckCircle className="w-4 h-4 text-green-500" /></span>
                    ) : (
                        <span title="Email not verified"><XCircle className="w-4 h-4 text-gray-400" /></span>
                    )}
                    {user.phoneVerified ? (
                      <span title="Phone verified"><CheckCircle className="w-4 h-4 text-green-500" /></span>
                    ) : (
                        <span title="Phone not verified"><XCircle className="w-4 h-4 text-gray-400" /></span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  )
}
