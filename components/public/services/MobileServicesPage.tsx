"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "./data"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function MobileServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Vertical Carousel Animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.to(card, {
          scale: 0.93, // Subtle scale
          opacity: 0.7,
          y: -30, // Reduced movement
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            end: "bottom top",
            scrub: 0.5, // Smooth scrubbing
            toggleActions: "play reverse play reverse",
          },
        })
        
        // Very Simple Parallax
        const img = card.querySelector("img")
        if (img) {
            gsap.to(img, {
                y: "10%", // Just simple Y movement, no scale
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="md:hidden flex flex-col gap-6 pb-24 px-4 pt-24 bg-gray-50 dark:bg-black overflow-hidden">
      
      {/* Unique Mobile Header */}
      <div className="px-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-[0.9] mb-4">
          What We <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] to-orange-500">Do Best.</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
          Select a category to see how we can elevate your brand today.
        </p>
      </div>

      {services.map((service, index) => (
        <div
          key={service.id}
          ref={(el) => { cardsRef.current[index] = el }}
          className="sticky top-28 min-h-[60vh] rounded-[2rem] overflow-hidden bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 flex flex-col transform"
          style={{ 
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" // Simple, strong shadow
          }}
        >
          {/* Full Height Image Background */}
          <div className="absolute inset-0 z-0">
             <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 2}
            />
            {/* Simple Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/90`} />
          </div>

          {/* Icon Badge */}
          <div className="absolute top-6 right-6 z-10">
             <div className="p-3 rounded-full bg-black/40 border border-white/10 shadow-lg">
                <service.icon className="w-5 h-5 text-white" />
             </div>
          </div>

          {/* Content Overlaid at Bottom */}
          <div className="relative z-10 mt-auto p-6 flex flex-col items-start gap-4">
            
            <div className="inline-block px-3 py-1 rounded-full bg-[#8B1538] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                {service.benefits.split(' ').slice(0, 3).join(' ')}...
            </div>

            <div>
                <h2 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-md">
                    {service.title}
                </h2>
                <div className="w-12 h-1 bg-white/50 rounded-full mb-3" />
                <p className="text-gray-200 text-sm font-medium leading-relaxed line-clamp-3 drop-shadow-sm">
                    {service.description}
                </p>
            </div>

            {/* Actions & Pricing Row */}
            <div className="w-full grid grid-cols-[1.5fr,1fr] gap-3 mt-2">
                 <a 
                    href="/contact"
                    className="py-3.5 px-6 rounded-xl bg-white text-gray-900 font-bold text-center shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                    Start Project
                    <ArrowRight className="w-4 h-4" />
                </a>

                {/* Pricing Block - No Blur */}
                 <a 
                    href={`/pricing#${service.id}`}
                    className="py-2.5 px-3 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center backdrop-filter-none"
                >
                    <span className="text-[10px] text-gray-300 font-medium tracking-wide lowercase opacity-80">starts from</span>
                    <span className="text-base font-bold text-white tracking-tight leading-none mt-0.5">
                        {(service as any).price || '₹10,000'}
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5 opacity-60">PRICE</span>
                </a>
            </div>
          </div>
        </div>
      ))}

      {/* spacer */}
      <div className="h-24" />
    </div>
  )
}
