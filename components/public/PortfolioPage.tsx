"use client"

import { useState,useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { TrendingUp, Eye, Filter, X } from "lucide-react"

const categories = ["All", "Influencer", "Video", "AI", "Web", "3D"]
const industries = ["All", "Fashion", "Tech", "Real Estate", "E-commerce", "Healthcare"]
const budgets = ["All", "Under $5K", "$5K-$20K", "$20K-$50K", "$50K+"]

const projects = [
  {
    id: 1,
    title: "Fashion Brand Campaign",
    category: "Influencer",
    industry: "Fashion",
    budget: "$5K-$20K",
    description: "Collaborated with 50+ fashion influencers for a global campaign",
    metrics: { reach: "5M+", engagement: "12%", roi: "4.2x" },
    image: "from-purple-400 to-pink-600",
  },
  {
    id: 2,
    title: "Tech Product Launch Video",
    category: "Video",
    industry: "Tech",
    budget: "Under $5K",
    description: "90-second product launch video with motion graphics",
    metrics: { views: "2M+", retention: "85%", conversion: "18%" },
    image: "from-blue-400 to-cyan-600",
  },
  {
    id: 3,
    title: "E-commerce Chatbot",
    category: "AI",
    industry: "E-commerce",
    budget: "$20K-$50K",
    description: "AI-powered customer support reducing response time by 90%",
    metrics: { queries: "100K+/month", satisfaction: "94%", cost_saving: "60%" },
    image: "from-yellow-400 to-orange-600",
  },
  {
    id: 4,
    title: "SaaS Platform Development",
    category: "Web",
    industry: "Tech",
    budget: "$50K+",
    description: "Full-stack web application with 50K+ active users",
    metrics: { users: "50K+", uptime: "99.9%", load_time: "1.2s" },
    image: "from-green-400 to-emerald-600",
  },
  {
    id: 5,
    title: "Luxury Car 3D Ad",
    category: "3D",
    industry: "Fashion",
    budget: "$20K-$50K",
    description: "Photorealistic 3D advertisement for premium automobile brand",
    metrics: { impressions: "10M+", engagement: "25%", ctr: "8%" },
    image: "from-red-400 to-rose-600",
  },
  {
    id: 6,
    title: "Real Estate Virtual Tour",
    category: "3D",
    industry: "Real Estate",
    budget: "$5K-$20K",
    description: "Interactive 3D tour for luxury residential complex",
    metrics: { views: "50K+", inquiries: "+40%", time_saved: "65%" },
    image: "from-indigo-400 to-purple-600",
  },
  {
    id: 7,
    title: "Healthcare System Automation",
    category: "AI",
    industry: "Healthcare",
    budget: "$50K+",
    description: "Patient management AI reducing administrative work",
    metrics: { efficiency: "+75%", errors: "-90%", satisfaction: "96%" },
    image: "from-pink-400 to-rose-600",
  },
  {
    id: 8,
    title: "E-commerce Store Redesign",
    category: "Web",
    industry: "E-commerce",
    budget: "$20K-$50K",
    description: "Complete UI/UX overhaul with performance optimization",
    metrics: { conversion: "+180%", bounce_rate: "-45%", sessions: "+220%" },
    image: "from-teal-400 to-cyan-600",
  },
]

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedBudget, setSelectedBudget] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const filteredProjects = projects.filter(p => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory
    const industryMatch = selectedIndustry === "All" || p.industry === selectedIndustry
    const budgetMatch = selectedBudget === "All" || p.budget === selectedBudget
    return categoryMatch && industryMatch && budgetMatch
  })

  const activeFiltersCount = [selectedCategory, selectedIndustry, selectedBudget].filter(f => f !== "All").length

  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedIndustry("All")
    setSelectedBudget("All")
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [filteredProjects])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Showcasing successful projects that drive real results
          </p>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-medium transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/30"
          >
            <Filter className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-white text-[#8B1538] rounded-full text-sm font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="glass-strong rounded-2xl p-6 border border-white/20 animate-in slide-in-from-top-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filter Projects</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#8B1538] dark:text-[#A91D47] font-semibold hover:underline flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Service Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Industry
                </label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        selectedIndustry === industry
                          ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setSelectedBudget(budget)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        selectedBudget === budget
                          ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {cardsRef.current[index] = el}}
              className="group glass-strong rounded-2xl overflow-hidden border border-white/20 hover:shadow-2xl transition-smooth cursor-pointer"
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${project.image} flex items-center justify-center relative`}>
                <div className="text-white text-6xl font-bold opacity-20">{project.id}</div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-semibold">
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#A91D47] transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-bold text-[#8B1538] dark:text-[#A91D47]">
                        {value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace("_", " ")}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 border-2 border-[#8B1538]/30 text-[#8B1538] dark:text-[#A91D47] rounded-lg font-medium transition-smooth hover:bg-[#8B1538] hover:text-white dark:hover:bg-[#A91D47] group-hover:border-[#8B1538] flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No projects match your filters. Try adjusting them.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-strong rounded-3xl p-12 border border-white/20 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-[#8B1538] dark:text-[#A91D47]" />
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Create Your Success Story?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join hundreds of satisfied clients who've achieved remarkable results
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-semibold text-lg transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105"
          >
            Start Your Project
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
