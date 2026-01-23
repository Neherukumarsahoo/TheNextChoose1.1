"use client"

import { useState } from "react"
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
        price: 80000,
        duration: "per campaign",
        features: [
          "5-10 micro-influencers",
          "Campaign strategy",
          "Basic analytics",
          "1 month support",
          "Social media management",
        ],
      },
      {
        name: "Professional",
        price: 200000,
        duration: "per campaign",
        features: [
          "10-25 influencers (micro + macro)",
          "Advanced campaign strategy",
          "Detailed analytics & reporting",
          "3 months support",
          "Content rights management",
          "Multi-platform campaigns",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 500000,
        duration: "per campaign",
        features: [
          "25+ influencers (all tiers)",
          "Full campaign management",
          "Real-time analytics dashboard",
          "6 months support",
          "Dedicated account manager",
          "Celebrity collaborations",
          "International reach",
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
        price: 15000,
        duration: "per video",
        features: [
          "Up to 3 minutes",
          "Color grading",
          "Basic transitions",
          "2 revisions",
          "HD export (1080p)",
        ],
      },
      {
        name: "Professional",
        price: 40000,
        duration: "per video",
        features: [
          "Up to 10 minutes",
          "Advanced color grading",
          "Motion graphics",
          "Sound design",
          "5 revisions",
          "4K export",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: 100000,
        duration: "per video",
        features: [
          "Unlimited length",
          "Cinema-grade color grading",
          "Advanced VFX",
          "Professional sound design",
          "Unlimited revisions",
          "8K export",
          "Dedicated editor",
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
        price: 120000,
        duration: "one-time",
        features: [
          "Single workflow automation",
          "Basic AI integration",
          "Documentation",
          "1 month support",
          "Email support",
        ],
      },
      {
        name: "Business",
        price: 300000,
        duration: "one-time",
        features: [
          "Multiple workflow automation",
          "Advanced AI integration",
          "Custom training",
          "3 months support",
          "Priority support",
          "Performance optimization",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 800000,
        duration: "one-time",
        features: [
          "Complete business automation",
          "Custom AI models",
          "On-premise deployment",
          "12 months support",
          "24/7 dedicated support",
          "Scalability planning",
          "Integration with existing systems",
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
        price: 50000,
        duration: "one-time",
        features: [
          "5-page website",
          "Responsive design",
          "Basic SEO",
          "Contact form",
          "1 month support",
        ],
      },
      {
        name: "Business",
        price: 150000,
        duration: "one-time",
        features: [
          "10-page website",
          "Custom design",
          "Advanced SEO",
          "CMS integration",
          "E-commerce ready",
          "3 months support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 400000,
        duration: "one-time",
        features: [
          "Unlimited pages",
          "Custom functionality",
          "Advanced integrations",
          "Performance optimization",
          "Security hardening",
          "12 months support",
          "Dedicated developer",
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
        price: 60000,
        duration: "per project",
        features: [
          "Simple 3D model",
          "Basic rendering",
          "2 revisions",
          "Standard quality",
          "1 week delivery",
        ],
      },
      {
        name: "Professional",
        price: 180000,
        duration: "per project",
        features: [
          "Complex 3D models",
          "Photorealistic rendering",
          "5 revisions",
          "High quality",
          "Interactive elements",
          "2 week delivery",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: 500000,
        duration: "per project",
        features: [
          "Ultra-detailed models",
          "Cinema-grade rendering",
          "Unlimited revisions",
          "Ultra-high quality",
          "Full interactivity",
          "VR/AR ready",
          "Priority delivery",
        ],
      },
    ],
  },
]

export function PricingPage() {
  const [selectedService, setSelectedService] = useState(pricingData[0])

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
