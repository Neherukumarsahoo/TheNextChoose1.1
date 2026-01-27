"use client"

import { useState, useEffect } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Search, RotateCw, Filter, Download } from "lucide-react"

interface ActivityLog {
    id: string
    user: {
        name: string
        email: string
        role: string
    }
    action: string
    entityType: string
    entityName: string | null
    oldValue: string | null
    newValue: string | null
    ipAddress: string | null
    createdAt: string
}

export function ActivityLogTable() {
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    
    // Filters
    const [filterType, setFilterType] = useState("all")
    const [filterAction, setFilterAction] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchLogs()
    }, [filterType, filterAction])

    const fetchLogs = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams()
            if (filterType !== 'all') params.append('entityType', filterType)
            if (filterAction !== 'all') params.append('action', filterAction)
            
            const res = await fetch(`/api/activity-logs?${params.toString()}`)
            if (res.ok) {
                const data = await res.json()
                setLogs(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getActionColor = (action: string) => {
        if (action.includes("CREATE")) return "bg-green-100 text-green-800 border-green-200"
        if (action.includes("UPDATE")) return "bg-blue-100 text-blue-800 border-blue-200"
        if (action.includes("DELETE")) return "bg-red-100 text-red-800 border-red-200"
        if (action.includes("APPROVE")) return "bg-purple-100 text-purple-800 border-purple-200"
        return "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1 w-full">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search entities or users..." 
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Entity Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Entities</SelectItem>
                            <SelectItem value="Brand">Brand</SelectItem>
                            <SelectItem value="Influencer">Influencer</SelectItem>
                            <SelectItem value="Campaign">Campaign</SelectItem>
                            <SelectItem value="Payment">Payment</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterAction} onValueChange={setFilterAction}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Action" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Actions</SelectItem>
                            <SelectItem value="CREATE">Create</SelectItem>
                            <SelectItem value="UPDATE">Update</SelectItem>
                            <SelectItem value="DELETE">Delete</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" onClick={fetchLogs}>
                        <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                    
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="w-[180px]">Timestamp</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-right">Changes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                    No logs found matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            logs.map((log) => (
                                <TableRow key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{log.user.name}</span>
                                            <span className="text-xs text-muted-foreground">{log.ipAddress}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`font-mono text-[10px] uppercase tracking-wider ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[10px]">
                                                {log.entityType}
                                            </Badge>
                                            <span className="text-sm font-medium truncate max-w-[150px]">
                                                {log.entityName || log.entityId}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px]">
                                        {/* Simple change summary */}
                                        <span className="text-xs text-gray-500 truncate block">
                                            {log.newValue ? 'Value updated' : 'Action performed'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* Diff View Dialog */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                                    View Diff
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                                <DialogHeader>
                                                    <DialogTitle>Change Details</DialogTitle>
                                                    <DialogDescription>
                                                        Reviewing changes made by {log.user.name} to {log.entityType}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                
                                                <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-xs">
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold text-red-600 bg-red-50 p-2 rounded">Old Value</h4>
                                                        <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                                            {log.oldValue ? JSON.stringify(JSON.parse(log.oldValue), null, 2) : 'null'}
                                                        </pre>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold text-green-600 bg-green-50 p-2 rounded">New Value</h4>
                                                        <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                                            {log.newValue ? JSON.stringify(JSON.parse(log.newValue), null, 2) : 'null'}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
