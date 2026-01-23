"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, MessageSquare, Calendar, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { toast } from "sonner"

interface ContactSubmission {
  id: string
  name: string
  email: string
  countryCode: string
  mobile: string
  service: string
  budget: string
  message: string
  status: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export function ContactSubmissionsPanel() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all") // all, new, contacted, closed

  useEffect(() => {
    fetchSubmissions()
    
    // Poll for new submissions every 30 seconds
    const interval = setInterval(fetchSubmissions, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact-submissions')
      if (res.ok) {
        const data = await res.json()
        
        // Check for new submissions and show toast
        if (submissions.length > 0) {
          const newSubmissions = data.filter((s: ContactSubmission) => 
            !submissions.find(existing => existing.id === s.id)
          )
          newSubmissions.forEach((s: ContactSubmission) => {
            toast.success(`New contact form submission from ${s.name}`, {
              description: s.email,
              duration: 5000,
            })
          })
        }
        
        setSubmissions(data)
      }
    } catch (error) {
      toast.error("Failed to fetch submissions")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: true }),
      })
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? {...s, isRead: true} : s))
        toast.success("Marked as read")
      }
    } catch (error) {
      toast.error("Failed to update")
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? {...s, status} : s))
        toast.success("Status updated")
      }
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  const filteredSubmissions = submissions.filter(s => 
    filter === "all" || s.status === filter
  )

  const unreadCount = submissions.filter(s => !s.isRead).length

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
    </div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Contact Submissions</h2>
          <p className="text-muted-foreground">
            {submissions.length} total submissions
            {unreadCount > 0 && ` • ${unreadCount} unread`}
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 bg-maroon text-white rounded-lg hover:bg-maroon/90 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {["all", "new", "contacted", "closed"].map((f) => (
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
            {f !== "all" && ` (${submissions.filter(s => s.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className={`p-6 rounded-xl border transition-all ${
              submission.isRead
                ? "bg-card border-border"
                : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-500/50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{submission.name}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {submission.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {submission.countryCode} {submission.mobile}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {!submission.isRead && (
                <button
                  onClick={() => markAsRead(submission.id)}
                  className="text-sm px-3 py-1 bg-maroon/10 text-maroon rounded-lg hover:bg-maroon/20 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Mark as Read
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Service:</span>
                <span className="ml-2 font-medium text-foreground">{submission.service || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <span className="ml-2 font-medium text-foreground">{submission.budget || 'Not specified'}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                <p className="text-foreground">{submission.message}</p>
              </div>
            </div>

            {/* Status Actions */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(submission.id, "new")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    submission.status === "new"
                      ? "bg-blue-500 text-white"
                      : "bg-card hover:bg-accent"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  New
                </button>
                <button
                  onClick={() => updateStatus(submission.id, "contacted")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    submission.status === "contacted"
                      ? "bg-yellow-500 text-white"
                      : "bg-card hover:bg-accent"
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  Contacted
                </button>
                <button
                  onClick={() => updateStatus(submission.id, "closed")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    submission.status === "closed"
                      ? "bg-green-500 text-white"
                      : "bg-card hover:bg-accent"
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  Closed
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No submissions found
          </div>
        )}
      </div>
    </div>
  )
}
