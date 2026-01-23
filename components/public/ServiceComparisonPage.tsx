"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Check, X, Download, ArrowRight } from "lucide-react"

const services = [
  {
    id: "influencer",
    name: "Influencer Marketing",
    features: {
      "Campaign Strategy": true,
      "Creator Matching": true,
      "Performance Analytics": true,
      "Contract Management": true,
      "ROI Tracking": true,
      "Content Rights": true,
      "Multi-Platform": true,
      "Dedicated Manager": false,
    },
    price: "$2,000+",
    timeline: "2-4 weeks",
    bestFor: "Brand awareness & reach",
  },
  {
    id: "video",
    name: "Video Editing",
    features: {
      "Campaign Strategy": false,
      "Creator Matching": false,
      "Performance Analytics": true,
      "Contract Management": false,
      "ROI Tracking": true,
      "Content Rights": true,
      "Multi-Platform": true,
      "Dedicated Manager": true,
    },
    price: "$1,500+",
    timeline: "1-3 weeks",
    bestFor: "Visual content creation",
  },
  {
    id: "ai",
    name: "AI Automation",
    features: {
      "Campaign Strategy": true,
      "Creator Matching": false,
      "Performance Analytics": true,
      "Contract Management": true,
      "ROI Tracking": true,
      "Content Rights": false,
      "Multi-Platform": true,
      "Dedicated Manager": true,
    },
    price: "$3,000+",
    timeline: "3-6 weeks",
    bestFor: "Process optimization",
  },
  {
    id: "web",
    name: "Website Building",
    features: {
      "Campaign Strategy": false,
      "Creator Matching": false,
      "Performance Analytics": true,
      "Contract Management": false,
      "ROI Tracking": true,
      "Content Rights": true,
      "Multi-Platform": true,
      "Dedicated Manager": true,
    },
    price: "$5,000+",
    timeline: "4-8 weeks",
    bestFor: "Online presence",
  },
]

const allFeatures = [
  "Campaign Strategy",
  "Creator Matching",
  "Performance Analytics",
  "Contract Management",
  "ROI Tracking",
  "Content Rights",
  "Multi-Platform",
  "Dedicated Manager",
]

export function ServiceComparisonPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([services[0].id, services[1].id])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(prev => prev.filter(id => id !== serviceId))
      }
    } else {
      if (selectedServices.length < 4) {
        setSelectedServices(prev => [...prev, serviceId])
      }
    }
  }

  const selectedServiceData = services.filter(s => selectedServices.includes(s.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Compare Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find the perfect service for your needs
          </p>

          {/* Service Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`px-6 py-3 rounded-full font-medium transition-smooth ${
                  selectedServices.includes(service.id)
                    ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-xl"
                    : "glass border border-white/20 hover:border-[#8B1538]/50"
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select 2-4 services to compare
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Comparison Table */}
        <div className="glass-strong rounded-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  {selectedServiceData.map((service) => (
                    <th key={service.id} className="p-4 text-center font-semibold min-w-[200px]">
                      {service.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-semibold">Starting Price</td>
                  {selectedServiceData.map((service) => (
                    <td key={service.id} className="p-4 text-center font-bold text-[#8B1538] dark:text-[#A91D47]">
                      {service.price}
                    </td>
                  ))}
                </tr>

                {/* Timeline Row */}
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <td className="p-4 font-semibold">Timeline</td>
                  {selectedServiceData.map((service) => (
                    <td key={service.id} className="p-4 text-center">
                      {service.timeline}
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-semibold">Best For</td>
                  {selectedServiceData.map((service) => (
                    <td key={service.id} className="p-4 text-center text-sm">
                      {service.bestFor}
                    </td>
                  ))}
                </tr>

                {/* Features */}
                {allFeatures.map((feature, index) => (
                  <tr
                    key={feature}
                    className={`border-b border-gray-200 dark:border-gray-800 ${
                      index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : ""
                    }`}
                  >
                    <td className="p-4">{feature}</td>
                    {selectedServiceData.map((service) => (
                      <td key={service.id} className="p-4 text-center">
                        {service.features[feature as keyof typeof service.features] ? (
                          <Check className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-gray-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Export Comparison
          </button>
          <a
            href="/contact"
            className="px-8 py-4 border-2 border-[#8B1538] text-[#8B1538] dark:text-[#A91D47] rounded-lg font-semibold transition-smooth hover:bg-[#8B1538] hover:text-white dark:hover:bg-[#A91D47] flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
