"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Download, BookOpen, FileText, Video, Code } from "lucide-react"
import { toast } from "sonner"

const categories = ["All", "E-books", "Templates", "Guides", "Videos", "Case Studies"]

const resources = [
  {
    id: 1,
    title: "The Complete Guide to Influencer Marketing",
    description: "Learn how to build successful influencer campaigns from scratch",
    category: "E-books",
    icon: BookOpen,
    fileSize: "2.5 MB",
    pages: 45,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Video Editing Best Practices 2024",
    description: "Professional tips and techniques for stunning video content",
    category: "Guides",
    icon: Video,
    fileSize: "1.8 MB",
    pages: 28,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "AI Automation Starter Template",
    description: "Ready-to-use workflows for business automation",
    category: "Templates",
    icon: Code,
    fileSize: "500 KB",
    pages: 15,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    title: "3D Product Showcase Case Study",
    description: "How we increased e-commerce conversion by 65%",
    category: "Case Studies",
    icon: FileText,
    fileSize: "3.2 MB",
    pages: 12,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Social Media Content Calendar",
    description: "Plan your content 90 days in advance",
    category: "Templates",
    icon: FileText,
    fileSize: "800 KB",
    pages: 8,
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    title: "ROI Calculation Worksheet",
    description: "Measure the success of your digital campaigns",
    category: "Templates",
    icon: FileText,
    fileSize: "450 KB",
    pages: 6,
    color: "from-indigo-500 to-purple-500",
  },
]

export function ResourceLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [email, setEmail] = useState("")
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const filteredResources = selectedCategory === "All"
    ? resources
    : resources.filter(r => r.category === selectedCategory)

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
    })

    return () => ctx.revert()
  }, [selectedCategory])

  const handleDownload = (resourceId: number, resourceTitle: string) => {
    if (!email) {
      toast.error("Please enter your email to download")
      return
    }
    
    // Here you would typically send email to backend
    toast.success(`Download link sent to ${email}!`)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-[#8B1538] dark:text-[#A91D47]" />
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Resource Library
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Free guides, templates, and tools to grow your business
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-xl"
                    : "glass border border-white/20 hover:border-[#8B1538]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Email Gate */}
        <div className="glass-strong rounded-2xl p-8 border border-white/20 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Enter your email to download resources
            </h3>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
              />
              <button
                onClick={() => email && toast.success("Email saved! Click any resource to download")}
                className="px-6 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.id}
                ref={(el) => {cardsRef.current[index] = el}}
                className="glass-strong rounded-2xl overflow-hidden border border-white/20 hover:shadow-2xl transition-smooth group"
              >
                <div className={`h-48 bg-gradient-to-br ${resource.color} flex items-center justify-center relative`}>
                  <Icon className="w-24 h-24 text-white opacity-20" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm font-semibold">
                    {resource.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#A91D47] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <span>{resource.pages} pages</span>
                    <span>{resource.fileSize}</span>
                  </div>

                  <button
                    onClick={() => handleDownload(resource.id, resource.title)}
                    className="w-full py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Free
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
