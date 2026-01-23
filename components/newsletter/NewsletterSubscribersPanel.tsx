"use client"

import { useEffect, useState } from "react"
import { Mail, Calendar } from "lucide-react"
import { toast } from "sonner"

interface Subscriber {
  id: string
  email: string
  subscribed: boolean
  createdAt: string
  updatedAt: string
}

export function NewsletterSubscribersPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/newsletter')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data)
      }
    } catch (error) {
      toast.error("Failed to fetch subscribers")
    } finally {
      setLoading(false)
    }
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
          <h2 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
          <p className="text-muted-foreground">
            {subscribers.length} total subscribers
          </p>
        </div>
        <button
          onClick={fetchSubscribers}
          className="px-4 py-2 bg-maroon text-white rounded-lg hover:bg-maroon/90 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 p-4 bg-card rounded-xl border border-border">
        <Mail className="w-5 h-5 text-maroon mb-2" />
        <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
        <div className="text-xs text-muted-foreground">Active Subscribers</div>
      </div>

      {/* Subscribers List */}
      <div className="space-y-3">
        {subscribers.map((subscriber) => (
          <div
            key={subscriber.id}
            className="p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-maroon" />
                <div>
                  <p className="font-medium text-foreground">{subscriber.email}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                Active
              </div>
            </div>
          </div>
        ))}

        {subscribers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No subscribers yet
          </div>
        )}
      </div>
    </div>
  )
}
