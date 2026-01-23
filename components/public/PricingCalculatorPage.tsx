"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Calculator, DollarSign, Clock, Users, Download } from "lucide-react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

const services = [
  { id: "influencer", name: "Influencer Marketing", basePrice: 2000, multiplier: 1.5 },
  { id: "video", name: "Video Editing", basePrice: 1500, multiplier: 1.3 },
  { id: "ai", name: "AI Automation", basePrice: 3000, multiplier: 2.0 },
  { id: "web", name: "Website Building", basePrice: 5000, multiplier: 1.8 },
  { id: "3d-ads", name: "3D Ads Generation", basePrice: 2500, multiplier: 1.6 },
  { id: "3d-real-estate", name: "3D Real Estate", basePrice: 4000, multiplier: 1.7 },
  { id: "3d-mockups", name: "3D Mockups", basePrice: 1800, multiplier: 1.4 },
  { id: "3d-configurator", name: "3D Product Configurator", basePrice: 6000, multiplier: 2.2 },
]

const scopes = [
  { id: "small", name: "Small", multiplier: 1.0, description: "Basic features, quick turnaround" },
  { id: "medium", name: "Medium", multiplier: 1.5, description: "Standard features, moderate timeline" },
  { id: "large", name: "Large", multiplier: 2.0, description: "Advanced features, extensive scope" },
  { id: "enterprise", name: "Enterprise", multiplier: 3.0, description: "Custom solution, full support" },
]

export function PricingCalculatorPage() {
  const [selectedService, setSelectedService] = useState(services[0])
  const [selectedScope, setSelectedScope] = useState(scopes[1])
  const [timeline, setTimeline] = useState(4) // weeks
  const [estimate, setEstimate] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const basePrice = selectedService.basePrice
    const scopeMultiplier = selectedScope.multiplier
    const serviceMultiplier = selectedService.multiplier
    const timelineMultiplier = timeline < 2 ? 1.5 : timeline > 8 ? 0.9 : 1.0

    const calculated = Math.round(basePrice * scopeMultiplier * serviceMultiplier * timelineMultiplier)
    setEstimate(calculated)
  }, [selectedService, selectedScope, timeline])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="w-16 h-16 mx-auto mb-4 text-[#8B1538] dark:text-[#A91D47]" />
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Pricing Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get an instant estimate for your project
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Selection */}
            <div className="glass-strong rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-[#8B1538] dark:text-[#A91D47]" />
                Select Service
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-xl text-left transition-smooth ${
                      selectedService.id === service.id
                        ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-xl"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-sm opacity-80">From ${service.basePrice}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Selection */}
            <div className="glass-strong rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#8B1538] dark:text-[#A91D47]" />
                Project Scope
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {scopes.map((scope) => (
                  <button
                    key={scope.id}
                    onClick={() => setSelectedScope(scope)}
                    className={`p-4 rounded-xl text-left transition-smooth ${
                      selectedScope.id === scope.id
                        ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white shadow-xl"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-semibold">{scope.name}</div>
                    <div className="text-sm opacity-80">{scope.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="glass-strong rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#8B1538] dark:text-[#A91D47]" />
                Timeline: {timeline} Weeks
              </h3>
              <input
                type="range"
                min="1"
                max="12"
                value={timeline}
                onChange={(e) => setTimeline(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>Rush (1 week)</span>
                <span>Standard (6 weeks)</span>
                <span>Extended (12 weeks)</span>
              </div>
              {timeline < 2 && (
                <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
                  ⚡ Rush projects incur a 50% premium
                </p>
              )}
            </div>
          </div>

          {/* Estimate Card */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-8 border border-white/20 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Project Estimate
              </h3>

              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Service</div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedService.name}</div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scope</div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedScope.name}</div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Timeline</div>
                <div className="font-semibold text-gray-900 dark:text-white">{timeline} Weeks</div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Cost</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
                  ${estimate.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  *Final pricing may vary based on specific requirements
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105 mb-3">
                Request Quote
              </button>

              <button className="w-full py-3 border-2 border-[#8B1538] text-[#8B1538] dark:text-[#A91D47] rounded-lg font-semibold transition-smooth hover:bg-[#8B1538] hover:text-white dark:hover:bg-[#A91D47] flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Export Estimate
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
