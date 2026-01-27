"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// --- Lightweight 3D Assets ---

const WireframeGlobe = () => (
  <div className="w-full h-full relative animate-spin-slow opacity-60">
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B1538]">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="50" cy="50" rx="48" ry="20" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse" />
      <ellipse cx="50" cy="50" rx="48" ry="40" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="50" cy="50" rx="20" ry="48" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse delay-75" />
      <ellipse cx="50" cy="50" rx="40" ry="48" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
)

const GlassPrism = () => (
  <div className="w-full h-full relative [transform-style:preserve-3d] animate-[spin_8s_linear_infinite]">
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md [transform:translateZ(30px)]" />
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-bl from-white/10 to-transparent backdrop-blur-md [transform:rotateY(90deg)translateZ(30px)]" />
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-md [transform:rotateY(180deg)translateZ(30px)]" />
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-tl from-white/10 to-transparent backdrop-blur-md [transform:rotateY(-90deg)translateZ(30px)]" />
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md [transform:rotateX(90deg)translateZ(30px)]" />
    <div className="absolute inset-0 border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md [transform:rotateX(-90deg)translateZ(30px)]" />
  </div>
)

const LiveStatCard = () => (
  <div className="w-full h-full glass-strong p-5 rounded-2xl border border-white/20 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-[#8B1538]/10 rounded-lg">
          <TrendingUp className="w-4 h-4 text-[#8B1538]" />
        </div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Revenue</span>
      </div>
      <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded-full">+24%</span>
    </div>
    <div className="flex items-end gap-2 h-full pb-1">
      {[40, 65, 45, 90, 75, 100].map((h, i) => (
        <div key={i} className="flex-1 bg-gradient-to-t from-[#8B1538] to-[#A91D47] rounded-sm transition-all duration-300 hover:opacity-80"
          style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
)

import { useCMS } from "@/components/cms/CMSProvider"

export function HeroSection() {
  const config = useCMS()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ... GSAP Logic remains same ...
    const ctx = gsap.context(() => {
      // 1. Blob Animation (Liquid Effect)
      const blobs = document.querySelectorAll('.liquid-blob')
      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          scale: "random(0.8, 1.2)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })

      // 2. Scroll Parallax Objects
      const scrollObjects = document.querySelectorAll('.scroll-object')
      scrollObjects.forEach((obj, i) => {
        const speed = (i + 1) * 50 // Different speeds
        gsap.to(obj, {
          y: -speed,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        })
      })

      // 3. Entrance Animations
      const tl = gsap.timeline()
      tl.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-[120vh] flex flex-col justify-start pt-32 lg:pt-48 overflow-hidden bg-gray-50 dark:bg-[#050505]">

      {/* Liquid Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="liquid-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#8B1538]/20 mix-blend-multiply filter blur-[80px] rounded-full animate-blob" />
        <div className="liquid-blob absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#A91D47]/20 mix-blend-multiply filter blur-[80px] rounded-full animate-blob animation-delay-2000" />
        <div className="liquid-blob absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-purple-500/10 mix-blend-multiply filter blur-[80px] rounded-full animate-blob animation-delay-4000" />
      </div>

      {/* Floating Scroll Objects (Parallax) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Object 1: Abstract Sphere (Wireframe) */}
        <div className="scroll-object absolute top-[15%] left-[5%] w-48 h-48">
          <WireframeGlobe />
        </div>

        {/* Object 2: Glass Card (Live Stat) */}
        <div className="scroll-object absolute top-[40%] right-[8%] w-56 h-40 transform rotate-[-5deg]">
          <LiveStatCard />
        </div>

        {/* Object 3: Code Cube (Glass Prism) */}
        <div className="scroll-object absolute bottom-[20%] left-[15%] w-24 h-24">
          <GlassPrism />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-content">
        {/* Badge */}
        {config.heroShowStats && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#8B1538]/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#8B1538]" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">The Future of Digital Agencies</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white leading-[0.9]">
          {config.heroTitle}<br />
          {/* We keep "Dominate" static or hardcoded for effect, or maybe generic? Let's genericize slightly or leave as accent */}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {config.heroSubtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/services"
            className="group relative px-10 py-5 bg-[#0F0F0F] dark:bg-white text-white dark:text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8B1538] to-[#A91D47] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Explore Services <ArrowRight className="w-5 h-5" />
            </span>
          </Link>

          <Link
            href={config.heroCtaLink}
            className="px-10 py-5 glass border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          >
            {config.heroCtaText}
          </Link>
        </div>

        {/* Social Proof Text (Replaces the big widget) */}
        <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-white/10 w-full max-w-sm mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Trusted by 500+ fast-growing brands
          </p>
          <div className="flex -space-x-3 justify-center mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-black" />
            ))}
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 border-2 border-white dark:border-black flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
              +500
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

