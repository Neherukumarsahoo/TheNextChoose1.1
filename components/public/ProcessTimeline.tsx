"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Rocket, Search, Handshake, BarChart3, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const steps = [
    {
        icon: Search,
        title: "Discover",
        description: "Filter 12k+ verified creators.",
    },
    {
        icon: Handshake,
        title: "Connect",
        description: "Instant-book or send proposals.",
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "Approve drafts and go live.",
    },
    {
        icon: BarChart3,
        title: "Scale",
        description: "Track ROI and boost posts.",
    }
]

export function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRefs.current.filter(Boolean), 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative py-28 px-4 bg-gradient-to-b from-white to-gray-50">
           
            {/* Ambient Background Glow (Maroon) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B1538]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                
                {/* Header */}
                <div className="text-center mb-20">
                     <div className="inline-block mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#8B1538]/10 text-[#8B1538] text-xs font-bold uppercase tracking-wider">
                            How It Works
                        </span>
                     </div>
                     <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                        The <span className="text-[#8B1538]">NextChoose</span> Workflow
                     </h2>
                     <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Designed for brands that move fast.
                     </p>
                </div>

                {/* 2x2 Grid with Connector styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            ref={el => {cardRefs.current[index] = el as HTMLDivElement}}
                            className="group relative bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#8B1538]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                             {/* Maroon Gradient Splash on Hover */}
                             <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                             
                             {/* Top Line decoration */}
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B1538] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                             <div className="relative z-10 flex flex-col h-full justify-between">
                                 <div className="flex justify-between items-start mb-6">
                                     <div className="w-16 h-16 rounded-2xl bg-[#8B1538] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                         <step.icon className="w-7 h-7" />
                                     </div>
                                     <span className="text-5xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                         0{index + 1}
                                     </span>
                                 </div>
                                 
                                 <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#8B1538] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed group-hover:text-slate-700">
                                        {step.description}
                                    </p>
                                 </div>
                                 
                                 <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-[#8B1538] transition-colors">
                                     Learn More <ArrowUpRight className="w-4 h-4" />
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
