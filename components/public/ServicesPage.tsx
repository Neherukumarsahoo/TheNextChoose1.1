"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import Image from "next/image"
import { Users, Video, Zap, Globe, Box, Building, Package, ShoppingCart, ArrowRight, Check } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: "influencer",
    icon: Users,
    title: "Influencer Marketing",
    tagline: "Connect with Creators, Amplify Your Brand",
    description: "Strategic influencer partnerships that deliver measurable ROI and authentic brand connections",
    features: [
      "Creator matchmaking & vetting",
      "Campaign strategy & execution",
      "Performance tracking & analytics",
      "Contract management",
      "Content rights management",
    ],
    benefits: "Average 3.5x ROI on influencer campaigns",
    color: "from-purple-500 to-pink-500",
    image: "/services/service_influencer_1769254567416.png",
  },
  {
    id: "video",
    icon: Video,
    title: "Video Editing",
    tagline: "Professional Post-Production Excellence",
    description: "Transform raw footage into compelling visual stories that captivate and convert",
    features: [
      "Commercial & corporate videos",
      "Social media content optimization",
      "Motion graphics & VFX",
      "Color grading & audio mixing",
      "Multi-platform formatting",
    ],
    benefits: "Delivered 10,000+ hours of edited content",
    color: "from-blue-500 to-cyan-500",
    image: "/services/service_video_editing_1769254583423.png",
  },
  {
    id: "ai",
    icon: Zap,
    title: "AI Automation",
    tagline: "Intelligent Workflows, Maximum Efficiency",
    description: "Leverage cutting-edge AI to streamline operations and unlock new possibilities",
    features: [
      "Custom chatbot development",
      "Workflow automation",
      "Predictive analytics",
      "Natural language processing",
      "Computer vision solutions",
    ],
    benefits: "Reduce operational costs by up to 60%",
    color: "from-yellow-500 to-orange-500",
    image: "/services/service_ai_automation_1769254601186.png",
  },
  {
    id: "web",
    icon: Globe,
    title: "Website Building",
    tagline: "Custom Web Solutions That Convert",
    description: "Beautiful, fast, and scalable websites built with modern technologies",
    features: [
      "Custom CMS development",
      "E-commerce platforms",
      "Progressive Web Apps",
      "API integrations",
      "Performance optimization",
    ],
    benefits: "99.9% uptime across all client sites",
    color: "from-green-500 to-emerald-500",
    image: "/services/service_web_dev_1769254617586.png",
  },
  {
    id: "3d-ads",
    icon: Box,
    title: "3D Ads Generation",
    tagline: "Immersive Advertising Experiences",
    description: "Stand out with stunning 3D advertisements that capture attention and drive engagement",
    features: [
      "3D product visualization",
      "Interactive ad campaigns",
      "AR/VR ready content",
      "Cross-platform compatibility",
      "Real-time rendering",
    ],
    benefits: "250% higher engagement vs traditional ads",
    color: "from-red-500 to-rose-500",
    image: "/services/service_3d_ads_1769254643486.png",
  },
  {
    id: "3d-real-estate",
    icon: Building,
    title: "3D Real Estate",
    tagline: "Virtual Tours That Sell Properties",
    description: "Bring properties to life with photorealistic 3D visualization and virtual tours",
    features: [
      "Interactive virtual tours",
      "Photorealistic rendering",
      "VR walkthroughs",
      "Floor plan visualization",
      "Day/night lighting scenarios",
    ],
    benefits: "Reduce time-to-sale by 40%",
    color: "from-indigo-500 to-purple-500",
    image: "/services/service_3d_real_estate_1769254659892.png",
  },
  {
    id: "3d-mockups",
    icon: Package,
    title: "3D Mockups",
    tagline: "Product Visualization Perfected",
    description: "Showcase products in stunning detail before they're even manufactured",
    features: [
      "Photorealistic product renders",
      "Material & texture simulation",
      "Dynamic lighting setups",
      "Multiple angle variations",
      "Quick iteration cycles",
    ],
    benefits: "75% faster product approval process",
    color: "from-teal-500 to-cyan-500",
    image: "/services/service_3d_mockups_1769254678174.png",
  },
  {
    id: "3d-configurator",
    icon: ShoppingCart,
    title: "3D Product Configurator",
    tagline: "Interactive Shopping Experiences",
    description: "Let customers customize products in real-time with seamless Shopify integration",
    features: [
      "Real-time product customization",
      "Shopify & WooCommerce integration",
      "Mobile-optimized 3D viewer",
      "Color & material options",
      "Cart integration",
    ],
    benefits: "Increase conversion rates by 65%",
    color: "from-pink-500 to-rose-500",
    image: "/services/service_3d_configurator_1769254692497.png",
  },
]

export function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation only (Cards handled by CSS sticky)
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black/50 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] to-[#A91D47]">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Crafting digital excellence with precision and creativity.
          </p>
        </div>
      </div>

      {/* Services Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Services Stack */}
        <div className="relative space-y-20 lg:space-y-0">
          {services.map((service, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={service.id} 
                className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:flex lg:items-center lg:justify-center"
                style={{ zIndex: index }}
              >
                {/* Mobile View - Minimalist Card */}
                <div className="lg:hidden bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                  <div className="relative h-48 sm:h-64 w-full bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
                      <service.icon className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <div className="text-xs font-medium text-[#8B1538] dark:text-[#A91D47] bg-[#8B1538]/5 dark:bg-[#A91D47]/10 p-2 rounded-lg">
                        ⚡ {service.benefits}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a href="/contact" className="flex-1 py-3 text-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-sm">
                        Get Started
                      </a>
                      <a href={`/pricing#${service.id}`} className="flex-1 py-3 text-center border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold text-sm">
                        Pricing
                      </a>
                    </div>
                  </div>
                </div>

                {/* Desktop View - Sticky Stack Card */}
                <div className="hidden lg:flex w-full max-w-6xl mx-auto bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 relative">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 mix-blend-overlay pointer-events-none`} />

                  <div className="flex w-full h-full min-h-[600px]">
                    {/* Content Side */}
                    <div className="flex-1 p-16 flex flex-col justify-center">
                      <div className={`inline-flex self-start p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-8 shadow-lg`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>

                      <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                        {service.title}
                      </h2>

                      <p className="text-xl text-[#8B1538] dark:text-[#A91D47] font-medium mb-6">
                        {service.tagline}
                      </p>

                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="grid grid-cols-2 gap-4 mb-10">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B1538]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        <a href="/contact" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:bg-[#8B1538] dark:hover:bg-[#A91D47] dark:hover:text-white transition-all transform hover:-translate-y-1">
                          Get Started
                        </a>
                        <a href={`/pricing#${service.id}`} className="px-8 py-4 border-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-full font-bold hover:border-[#8B1538] hover:text-[#8B1538] transition-all">
                          Check Pricing
                        </a>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 relative bg-gray-50 dark:bg-[#111] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                      />
                      {/* Overlay Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none`} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to transform your vision?</h3>
          <a href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Start Your Project
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

