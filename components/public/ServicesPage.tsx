"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Users, Video, Zap, Globe, Box, Building, Package, ShoppingCart, ArrowRight, Check } from "lucide-react"

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
  },
]

export function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      // Stagger cards animation
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to transform your business
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={service.id}
                id={service.id}
                ref={(el) => {cardsRef.current[index] = el}}
                className={`glass-strong rounded-3xl p-8 sm:p-12 border border-white/20 hover:shadow-2xl transition-smooth ${
                  isEven ? "lg:mr-12" : "lg:ml-12"
                }`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven && "lg:grid-flow-dense"}`}>
                  {/* Content */}
                  <div className={!isEven ? "lg:col-start-2" : ""}>
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                    
                    <p className="text-xl text-[#8B1538] dark:text-[#A91D47] font-semibold mb-4">
                      {service.tagline}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#8B1538] dark:text-[#A91D47] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#8B1538]/10 to-[#A91D47]/10 rounded-xl p-4 mb-6">
                      <p className="text-sm font-semibold text-[#8B1538] dark:text-[#A91D47]">
                        ⚡ {service.benefits}
                      </p>
                    </div>

                    <button className="group px-6 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105 inline-flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Visual Placeholder */}
                  <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className={`aspect-square rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <Icon className="w-32 h-32 text-white opacity-30" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-strong rounded-3xl p-12 border border-white/20">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Let's discuss how we can help transform your business
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-semibold text-lg transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
