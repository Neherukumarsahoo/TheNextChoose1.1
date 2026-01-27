"use client"

import { useState, useEffect } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Check, IndianRupee } from "lucide-react"

const pricingData = [
  {
    id: "influencer",
    title: "Influencer Marketing",
    packages: [
      {
        name: "Starter",
        price: 15000,
        duration: "per campaign",
        features: [
          "5 micro-influencers",
          "Basic strategy",
          "Performance tracking",
          "Email support",
        ],
      },
      {
        name: "Professional",
        price: 45000,
        duration: "per campaign",
        features: [
          "15 influencers (micro + macro)",
          "Advanced strategy",
          "Detailed analytics",
          "Content rights",
          "Priority support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 120000,
        duration: "per campaign",
        features: [
          "30+ influencers",
          "Full management",
          "Real-time dashboard",
          "Dedicated manager",
          "Celebrity access",
        ],
      },
    ],
  },
  {
    id: "video",
    title: "Video Editing",
    packages: [
      {
        name: "Basic",
        price: 3000,
        duration: "per video",
        features: [
          "Up to 1 min",
          "Basic cuts & trims",
          "Simple transitions",
          "1 revision",
        ],
      },
      {
        name: "Professional",
        price: 8000,
        duration: "per video",
        features: [
          "Up to 5 mins",
          "Color correction",
          "Sound design",
          "Motion graphics",
          "3 revisions",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: 20000,
        duration: "per video",
        features: [
          "Unlimited length",
          "Advanced VFX",
          "Cinema-grade grading",
          "Unlimited revisions",
          "Source files",
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "AI Automation",
    packages: [
      {
        name: "Starter",
        price: 25000,
        duration: "one-time",
        features: [
          "Single workflow",
          "Basic integration",
          "Setup guide",
          "1 week support",
        ],
      },
      {
        name: "Business",
        price: 60000,
        duration: "one-time",
        features: [
          "3 workflows",
          "Custom AI logic",
          "API integration",
          "1 month support",
          "Training session",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 150000,
        duration: "one-time",
        features: [
          "Full system automation",
          "Custom model training",
          "On-premise option",
          "3 months support",
          "Dedicated engineer",
        ],
      },
    ],
  },
  {
    id: "web",
    title: "Website Building",
    packages: [
      {
        name: "Basic",
        price: 15000,
        duration: "one-time",
        features: [
          "3-page site",
          "Mobile responsive",
          "Contact form",
          "Basic SEO",
        ],
      },
      {
        name: "Business",
        price: 35000,
        duration: "one-time",
        features: [
          "10-page site",
          "CMS integration",
          "Blog setup",
          "Social integration",
          "Speed optimization",
        ],
        popular: true,
      },
      {
        name: "E-Commerce",
        price: 80000,
        duration: "one-time",
        features: [
          "Online store",
          "Payment gateway",
          "Inventory management",
          "Advanced security",
          "1 year support",
        ],
      },
    ],
  },
  {
    id: "3d",
    title: "3D Services",
    description: "Ads, Real Estate, Mockups & Product Configurators",
    packages: [
      {
        name: "Basic",
        price: 10000,
        duration: "per asset",
        features: [
          "Simple model",
          "Standard texture",
          "HD render",
          "1 revision",
        ],
      },
      {
        name: "Professional",
        price: 30000,
        duration: "per project",
        features: [
          "complex modeling",
          "Photorealistic textures",
          "4K render",
          "Lighting setup",
          "3 revisions",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: 80000,
        duration: "per project",
        features: [
          "High-end scene",
          "Animation ready",
          "Physics simulation",
          "Commercial rights",
          "Source files",
        ],
      },
    ],
  },
]

export function PricingPage() {
  const [selectedService, setSelectedService] = useState(pricingData[0])

  useEffect(() => {
    // Check URL hash to auto-select service
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const service = pricingData.find(s => s.id === hash)
      if (service) {
        setSelectedService(service)
      }
    }
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your needs. All prices in Indian Rupees (₹)
          </p>

          {/* Service Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {pricingData.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                  selectedService.id === service.id
                    ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-xl"
                    : "glass border border-white/20 hover:border-[#8B1538]/50"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {selectedService.packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`glass-strong rounded-3xl p-8 border ${
                pkg.popular
                  ? "border-[#8B1538] ring-4 ring-[#8B1538]/20 scale-105"
                  : "border-white/20"
              } hover:shadow-2xl transition-smooth relative`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <IndianRupee className="w-6 h-6 text-[#8B1538] dark:text-[#A91D47]" />
                  <span className="text-4xl font-bold text-[#8B1538] dark:text-[#A91D47]">
                    {pkg.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {pkg.duration}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105">
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <div className="mt-16 glass-strong rounded-3xl p-12 border border-white/20 text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Need a Custom Solution?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Contact us for enterprise packages and custom pricing
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-semibold text-lg transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105"
          >
            Request Custom Quote
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
