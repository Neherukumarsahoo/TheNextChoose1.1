"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Video, Zap, Globe, Users, Box, Building, Package, ShoppingCart } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Users,
    title: "Influencer Marketing",
    description: "Connect with top creators and amplify your brand reach",
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/50",
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional post-production for stunning visual content",
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/50",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Streamline workflows with intelligent automation",
    color: "from-yellow-500 to-orange-500",
    shadow: "shadow-yellow-500/50",
  },
  {
    icon: Globe,
    title: "Website Building",
    description: "Custom web solutions that convert visitors to customers",
    color: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/50",
  },
  {
    icon: Box,
    title: "3D Ads Generation",
    description: "Immersive advertising experiences that captivate",
    color: "from-red-500 to-rose-500",
    shadow: "shadow-red-500/50",
  },
  {
    icon: Building,
    title: "3D Real Estate",
    description: "Virtual property tours bringing spaces to life",
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/50",
  },
  {
    icon: Package,
    title: "3D Mockups",
    description: "Photorealistic product visualization and prototyping",
    color: "from-teal-500 to-cyan-500",
    shadow: "shadow-teal-500/50",
  },
  {
    icon: ShoppingCart,
    title: "3D Product Configurator",
    description: "Interactive Shopify integration for dynamic products",
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/50",
  },
]

export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={gridRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            End-to-end digital solutions designed to elevate your brand
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {cardsRef.current[index] = el}}
                className="group relative"
              >
                <Link href="/services" className="block h-full">
                  <div className="glass-strong rounded-2xl p-6 h-full transition-smooth hover:scale-105 hover:shadow-2xl cursor-pointer border border-white/20">
                    {/* Icon with Gradient */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-smooth`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#8B1538] dark:group-hover:text-[#A91D47] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10 bg-gradient-to-br ${service.color}`} />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-semibold text-lg transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105"
          >
            View All Services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
