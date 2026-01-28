"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useCMS } from "@/components/cms/CMSProvider"
import { cn } from "@/lib/utils"

export function MobileHeroSection() {
  const config = useCMS()

  return (
    <div className="md:hidden relative min-h-[90vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* 1. Simple, Attractive Background (Gradient + Noise) */}
      {/* 1. Vibrant Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] via-[#5b0e25] to-[#1a050b] animate-gradient bg-300% opacity-90" />
        
        {/* Overlay Gradients for Depth */}
        <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] bg-purple-600/30 rounded-full blur-[80px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-amber-500/20 rounded-full blur-[80px] mix-blend-screen animate-blob animation-delay-2000" />
        
        {/* Subtle Texture */}
        <div className="absolute inset-0 bg-[url('/bg/noise.svg')] opacity-[0.08] mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 text-center flex flex-col items-center">
        
        {/* Badge */}
        {config.heroShowStats && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 animate-fade-in-up shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-medium text-white/90">The Future of Digital</span>
          </div>
        )}

        {/* Title */}
        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-white leading-[1.1] animate-fade-in-up delay-100 drop-shadow-lg">
          {config.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/80 mb-8 max-w-sm mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-md">
          {config.heroSubtitle}
        </p>

        {/* CTAs - Stacked for Mobile */}
        <div className="flex flex-col w-full max-w-xs gap-3 animate-fade-in-up delay-300">
          <Link
            href="/services"
            className="group relative w-full py-4 bg-white text-black rounded-full font-bold text-base flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
          >
             {/* Subtle shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-200/50 to-transparent -translate-x-full group-hover:animate-shine" />
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={config.heroCtaLink}
            className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-base flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            {config.heroCtaText}
          </Link>
        </div>

        {/* Mobile Only: Simple Stats Row */}
        <div className="mt-12 w-full grid grid-cols-3 gap-2 border-t border-white/10 pt-8 animate-fade-in-up delay-500">
            <div className="text-center">
                <div className="text-xl font-bold text-white">98%</div>
                <div className="text-[10px] uppercase font-semibold text-white/60">Satisfaction</div>
            </div>
             <div className="text-center">
                <div className="text-xl font-bold text-white">24/7</div>
                <div className="text-[10px] uppercase font-semibold text-white/60">Support</div>
            </div>
             <div className="text-center">
                <div className="text-xl font-bold text-white">50+</div>
                <div className="text-[10px] uppercase font-semibold text-white/60">Projects</div>
            </div>
        </div>

      </div>
    </div>
  )
}
