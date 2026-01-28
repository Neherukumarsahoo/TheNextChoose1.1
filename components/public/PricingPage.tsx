"use client"

import { useState, useEffect } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Check, IndianRupee } from "lucide-react"
import { useCMS } from "@/components/cms/CMSProvider"

export function PricingPage() {
  const config = useCMS()

  const DEFAULT_PRICING = [
    {
      id: "influencer",
      title: "Influencer Marketing",
      packages: [
        { name: "Starter", price: 25000, originalPrice: 35000, duration: "per campaign", features: ["5 Micro-Influencers", "Basic Content Strategy", "Performance Tracking", "Email Support"], popular: false },
        { name: "Growth", price: 60000, originalPrice: 85000, duration: "per campaign", features: ["15 Influencers Mix", "Advanced Strategy", "Content Rights", "Dedicated Manager"], popular: true },
        { name: "Enterprise", price: 150000, originalPrice: 200000, duration: "per campaign", features: ["30+ Influencers", "Celebrity Options", "Full Production", "24/7 Priority Support"], popular: false },
      ]
    },
    {
      id: "video",
      title: "Video Editing",
      packages: [
        { name: "Essential", price: 5000, originalPrice: 8000, duration: "per video", features: ["Up to 1 Minute", "Basic Cuts & Transitions", "Color Correction", "2 Revisions"], popular: false },
        { name: "Professional", price: 15000, originalPrice: 22000, duration: "per video", features: ["Up to 5 Minutes", "Advanced VFX & Motion", "Sound Design", "Unlimited Revisions"], popular: true },
        { name: "Series", price: 30000, originalPrice: 45000, duration: "per series (4 vids)", features: ["4 Videos Package", "Thumbnail Design", "SEO Optimization", "Source Files Included"], popular: false },
      ]
    },
    {
      id: "ai",
      title: "AI Automation",
      packages: [
        { name: "Pilot", price: 30000, originalPrice: 50000, duration: "project", features: ["Needs Assessment", "Basic Chatbot", "Email Automation", "1 Week Support"], popular: false },
        { name: "Business", price: 85000, originalPrice: 120000, duration: "project", features: ["Custom AI Workflows", "CRM Integration", "Data Analysis Bot", "1 Month Support"], popular: true },
        { name: "Scale", price: 200000, originalPrice: 300000, duration: "project", features: ["Full Operations Audit", "Multiple AI Agents", "Custom LLM Training", "3 Months Support"], popular: false },
      ]
    },
    {
      id: "web",
      title: "Website Building",
      packages: [
        { name: "Launch", price: 15000, originalPrice: 25000, duration: "project", features: ["5 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO"], popular: false },
        { name: "Growth", price: 40000, originalPrice: 60000, duration: "project", features: ["10-15 Pages", "CMS Integration", "Blog Setup", "Speed Optimization"], popular: true },
        { name: "E-Commerce", price: 100000, originalPrice: 150000, duration: "project", features: ["Full Online Store", "Payment Gateway", "Inventory System", "User Accounts"], popular: false },
      ]
    },
    {
      id: "3d-ads",
      title: "3D Ads Generation",
      packages: [
        { name: "Single", price: 20000, originalPrice: 30000, duration: "per ad", features: ["15s Animation", "Product Focus", "Social Media Size", "1 Revision"], popular: false },
        { name: "Campaign", price: 50000, originalPrice: 75000, duration: "per campaign", features: ["3 Ad Variations", "Storyboarding", "High-End Rendering", "3 Revisions"], popular: true },
        { name: "Broadcast", price: 120000, originalPrice: 180000, duration: "per project", features: ["TV Quality Render", "Full Environment", "Character Animation", "Source Files"], popular: false },
      ]
    },
    {
          id: "3d-real-estate",
          title: "3D Real Estate",
          packages: [
        { name: "Exterior", price: 45000, originalPrice: 60000, duration: "per view", features: ["Photorealistic Exterior", "Day/Night Lighting", "Landscaping", "4K Output"], popular: false },
        { name: "Interior Walkthrough", price: 80000, originalPrice: 110000, duration: "per floor", features: ["Full Floor Tour", "Furniture Staging", "Interactive Points", "VR Ready"], popular: true },
        { name: "Development", price: 150000, originalPrice: 250000, duration: "project", features: ["Complete Complex", "Aerial Views", "Sales Video", "Brochure Images"], popular: false },
      ]
    },
    {
      id: "3d-mockups",
      title: "3D Mockups",
      packages: [
        { name: "Basic", price: 10000, originalPrice: 15000, duration: "per item", features: ["White Background", "High Res Render", "2 Views", "Standard Materials"], popular: false },
        { name: "Scene", price: 25000, originalPrice: 35000, duration: "per item", features: ["Lifestyle Setting", "Custom Materials", "5 Views", "Lighting Setup"], popular: true },
        { name: "Collection", price: 50000, originalPrice: 80000, duration: "per collection", features: ["10 Product Set", "Consistent Style", "Marketing Assets", "360 Spin"], popular: false },
      ]
    },
    {
          id: "3d-configurator",
          title: "3D Configurator",
          packages: [
            { name: "Simple", price: 55000, originalPrice: 80000, duration: "project", features: ["Color Changes", "Spin Viewer", "Web Integration", "Analytics"], popular: false },
            { name: "Advanced", price: 120000, originalPrice: 180000, duration: "project", features: ["Part Swapping", "Texture Changes", "Price Calculation", "AR View"], popular: true },
            { name: "Enterprise", price: 250000, originalPrice: 400000, duration: "project", features: ["Complex Logic", "ERP Integration", "Custom UI/UX", "Multi-Platform"], popular: false },
          ]
    }
  ];

  // Use configured pricing if available and not empty, otherwise fall back to defaults
  const pricingData = (config.pricingData && config.pricingData.length > 0) ? config.pricingData : DEFAULT_PRICING
  const [selectedService, setSelectedService] = useState(pricingData[0] || null)

  useEffect(() => {
    // Check URL hash to auto-select service
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const service = pricingData.find((s: any) => s.id === hash)
      if (service) {
        setSelectedService(service)
      }
    } else if (pricingData.length > 0 && !selectedService) {
      setSelectedService(pricingData[0])
    }
  }, [pricingData, selectedService])


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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-7xl mx-auto mb-12 pl-6">
            Choose the perfect plan for your needs. All prices in Indian Rupees (₹)
          </p>

          {/* Service Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 mt-6">
            {pricingData.map((service: any) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${selectedService?.id === service.id
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
          {selectedService?.packages.map((pkg: any) => (
            <div
              key={pkg.name}
              className={`glass-strong rounded-3xl p-8 border ${pkg.popular
                ? "border-[#8B1538] ring-4 ring-[#8B1538]/20 scale-105"
                : "border-white/20"
                } hover:shadow-2xl transition-smooth relative transform hover:-translate-y-2 duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.name}
                </h3>

                {/* Pricing Display with Discount */}
                <div className="flex flex-col items-center">
                  {pkg.originalPrice > pkg.price && (
                    <div className="flex items-center gap-1 text-gray-400 line-through text-lg mb-1">
                      <IndianRupee className="w-4 h-4" />
                      {pkg.originalPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <IndianRupee className="w-6 h-6 text-[#8B1538] dark:text-[#A91D47]" />
                    <span className="text-4xl font-bold text-[#8B1538] dark:text-[#A91D47]">
                      {pkg.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {pkg.duration}
                </p>

                {pkg.originalPrice > pkg.price && (
                  <div className="mt-2 inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                    Save ₹{(pkg.originalPrice - pkg.price).toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature: string) => (
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
