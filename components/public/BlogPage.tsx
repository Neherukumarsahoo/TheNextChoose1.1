"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"

const categories = ["All", "Trends", "Tutorials", "Case Studies", "News"]

const blogPosts = [
  {
    id: 1,
    title: "The Future of Influencer Marketing in 2024",
    excerpt: "Discover the latest trends and strategies that are shaping the influencer marketing landscape",
    category: "Trends",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "from-purple-400 to-pink-600",
  },
  {
    id: 2,
    title: "How AI is Transforming Video Editing",
    excerpt: "Explore the revolutionary impact of artificial intelligence on post-production workflows",
    category: "Tutorials",
    date: "2024-01-12",
    readTime: "7 min read",
    image: "from-blue-400 to-cyan-600",
  },
  {
    id: 3,
    title: "3D Product Configurators: A Game Changer for E-commerce",
    excerpt: "Learn how interactive 3D experiences are boosting conversion rates and customer satisfaction",
    category: "Case Studies",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "from-green-400 to-emerald-600",
  },
  {
    id: 4,
    title: "Building High-Performance Websites with Next.js",
    excerpt: "A comprehensive guide to modern web development best practices and optimization techniques",
    category: "Tutorials",
    date: "2024-01-08",
    readTime: "10 min read",
    image: "from-yellow-400 to-orange-600",
  },
  {
    id: 5,
    title: "The Rise of Virtual Real Estate Tours",
    excerpt: "How 3D visualization technology is revolutionizing the property industry",
    category: "Trends",
    date: "2024-01-05",
    readTime: "5 min read",
    image: "from-red-400 to-rose-600",
  },
  {
    id: 6,
    title: "Automating Your Business with AI",
    excerpt: "Real-world examples of companies saving time and money through intelligent automation",
    category: "Case Studies",
    date: "2024-01-03",
    readTime: "8 min read",
    image: "from-indigo-400 to-purple-600",
  },
]

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Our Blog
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Insights, tutorials, and industry trends from our experts
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-lg shadow-[#8B1538]/30"
                    : "glass border border-white/20 hover:border-[#8B1538]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              ref={(el) => {cardsRef.current[index] = el}}
              className="group glass-strong rounded-2xl overflow-hidden border border-white/20 hover:shadow-2xl transition-smooth cursor-pointer"
            >
              {/* Featured Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${post.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
                <div className="text-white text-6xl font-bold opacity-20">{post.id}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B1538]/10 text-[#8B1538] dark:text-[#A91D47] rounded-full text-xs font-semibold">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#A91D47] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Date & Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                  </div>
                  <button className="inline-flex items-center gap-1 text-[#8B1538] dark:text-[#A91D47] font-medium text-sm group-hover:gap-2 transition-smooth">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No posts found in this category
            </p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-20 glass-strong rounded-3xl p-12 border border-white/20 text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Stay Updated
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights and industry trends
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
