"use client"

import { useState } from "react"
import { 
  Building2, Search, Filter, Plus, MoreHorizontal, 
  ArrowUpRight, Users, Video, Globe, Box, LayoutTemplate, 
  Smartphone, BarChart3, Calendar, CheckCircle2, AlertCircle, Clock
} from "lucide-react"
import Link from "next/link"

// Define Unified Project Types
type ProjectType = 
  | 'influencer' 
  | 'video' 
  | 'web' 
  | 'ai' 
  | 'ads_3d' 
  | 'real_estate' 
  | 'mockup' 
  | 'configurator';

type ProjectStatus = 'active' | 'pending' | 'completed' | 'draft';

interface Project {
  id: string;
  name: string;
  client: string;
  type: ProjectType;
  status: ProjectStatus;
  budget: string;
  deadline: string;
  progress: number;
}

// Mock Data for Demo
const projects: Project[] = [
  { id: '1', name: 'Summer Fashion Launch', client: 'StyleCo', type: 'influencer', status: 'active', budget: '$15,000', deadline: '2024-06-30', progress: 65 },
  { id: '2', name: 'Product Reveal Teaser', client: 'TechNova', type: 'video', status: 'pending', budget: '$4,500', deadline: '2024-05-15', progress: 10 },
  { id: '3', name: 'Corporate Website Redesign', client: 'GlobalCorp', type: 'web', status: 'active', budget: '$25,000', deadline: '2024-08-01', progress: 40 },
  { id: '4', name: 'Customer Support Bot', client: 'ServiceFirst', type: 'ai', status: 'completed', budget: '$8,000', deadline: '2024-04-20', progress: 100 },
  { id: '5', name: 'Shoe Configurator', client: 'SneakerHead', type: 'configurator', status: 'active', budget: '$12,000', deadline: '2024-07-10', progress: 85 },
  { id: '6', name: 'Luxury Villa Tour', client: 'EstatePrime', type: 'real_estate', status: 'draft', budget: '$3,000', deadline: 'TBD', progress: 0 },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<ProjectType | 'all'>('all')

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedIds.length === projects.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(projects.map(p => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleBulkAction = (action: string) => {
    alert(`${action} ${selectedIds.length} items`)
    setSelectedIds([])
  }

  const getServiceIcon = (type: ProjectType) => {
    switch(type) {
      case 'influencer': return <Users className="w-4 h-4 text-purple-600" />;
      case 'video': return <Video className="w-4 h-4 text-blue-600" />;
      case 'web': return <Globe className="w-4 h-4 text-green-600" />;
      case 'ai': return <BarChart3 className="w-4 h-4 text-yellow-600" />;
      case 'ads_3d': return <Box className="w-4 h-4 text-red-600" />;
      case 'real_estate': return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'mockup': return <LayoutTemplate className="w-4 h-4 text-teal-600" />;
      case 'configurator': return <Smartphone className="w-4 h-4 text-pink-600" />;
      default: return <Box className="w-4 h-4 text-gray-600" />;
    }
  }

  const getServiceLabel = (type: ProjectType) => {
    switch(type) {
      case 'influencer': return 'Influencer Marketing';
      case 'video': return 'Video Production';
      case 'web': return 'Web Development';
      case 'ai': return 'AI Automation';
      case 'ads_3d': return '3D Ads';
      case 'real_estate': return 'Real Estate 3D';
      case 'mockup': return '3D Mockups';
      case 'configurator': return '3D Configurator';
      default: return type;
    }
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch(status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Project Manager</h1>
          <p className="text-gray-500 mt-1">Manage all active services and deliverables.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Project
            </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Clock className="w-5 h-5"/></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertCircle className="w-5 h-5"/></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Completed (This Month)</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle2 className="w-5 h-5"/></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">$124k</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Building2 className="w-5 h-5"/></div>
         </div>
      </div>

      {/* Unified Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search projects, clients..." 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" 
                />
            </div>
            
            {/* Service Type Tabs */}
            <div className="flex gap-2 p-1 bg-gray-200/50 rounded-lg">
                <button className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-900 rounded-md shadow-sm">All</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">Creative</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">Tech</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">3D</button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="w-12 px-6 py-3">
                            <input 
                                type="checkbox" 
                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                checked={selectedIds.length === projects.length && projects.length > 0}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Type</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {projects.map((project) => (
                        <tr key={project.id} className={`hover:bg-gray-50/50 transition-colors group ${selectedIds.includes(project.id) ? 'bg-blue-50/50' : ''}`}>
                             <td className="px-6 py-4">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                    checked={selectedIds.includes(project.id)}
                                    onChange={() => toggleSelect(project.id)}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-900">{project.name}</span>
                                    <span className="text-xs text-gray-500">{project.client}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border bg-white shadow-sm`}>
                                    {getServiceIcon(project.type)}
                                    <span className="text-gray-700">{getServiceLabel(project.type)}</span>
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="w-full max-w-[140px]">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div 
                                            className="bg-gray-900 h-1.5 rounded-full transition-all duration-500" 
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {project.deadline}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {project.budget}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

       {/* Floating Action Bar */}
       {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
            <span className="text-sm font-medium text-gray-900">
                {selectedIds.length} items selected
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => handleBulkAction('Delete')}
                    className="text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    Delete
                </button>
                <button 
                    onClick={() => handleBulkAction('Archive')}
                    className="text-sm font-medium text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    Archive
                </button>
                <button 
                    onClick={() => handleBulkAction('Mark Completed')}
                    className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                    Mark Completed
                </button>
            </div>
        </div>
      )}

    </div>
  )
}
