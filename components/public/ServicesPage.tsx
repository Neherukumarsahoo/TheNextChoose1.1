"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import Image from "next/image"
import { services } from "./services/data"
import { MobileServicesPage } from "./services/MobileServicesPage"

gsap.registerPlugin(ScrollTrigger)

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

      {/* Hero Header (Desktop Only) */}
      <div className="hidden md:block pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black/50 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto text-center" ref={headerRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] to-[#A91D47]">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-5xl mx-auto font-light">
            Crafting digital excellence with precision and creativity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* --- MOBILE VIEW (New Unique Design) --- */}
        <MobileServicesPage />

        {/* --- DESKTOP VIEW (Existing Sticky Stack) --- */}
        <div className="hidden lg:block relative space-y-0">
          {services.map((service, index) => {
            return (
              <div
                key={service.id}
                className="sticky top-32 h-[calc(100vh-8rem)] flex items-center justify-center"
                style={{ zIndex: index }}
              >
                {/* Desktop View - Sticky Stack Card */}
                <div className="w-full max-w-6xl mx-auto bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 relative">
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

        {/* Bottom CTA (Shared) */}
        <div className="hidden lg:block mt-32 text-center">
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

