"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.7)",
      })

      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      })

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.out",
      })

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#8B1538]/5 dark:from-gray-900 dark:via-black dark:to-[#8B1538]/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8B1538]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#A91D47]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Floating Logo */}
        <div ref={logoRef} className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538] to-[#A91D47] blur-2xl opacity-50 animate-pulse" />
            <Image
              src="/logo/thenextchooselogo.png"
              alt="TheNextChoose"
              width={120}
              height={120}
              className="relative object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#8B1538] via-[#A91D47] to-[#8B1538] bg-clip-text text-transparent animate-gradient bg-300%">
            Transform Your Vision
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">
            Into Reality
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#8B1538]" />
            8 cutting-edge digital services
          </span>
          <br className="hidden sm:block" />
          <span className="text-[#8B1538] dark:text-[#A91D47] font-semibold">One platform</span>
          {" · "}
          <span className="text-[#8B1538] dark:text-[#A91D47] font-semibold">Infinite possibilities</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/services"
            className="group px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-full font-semibold text-lg transition-smooth hover:shadow-2xl hover:shadow-[#8B1538]/50 hover:scale-105 inline-flex items-center gap-2"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="group px-8 py-4 glass border-2 border-[#8B1538]/30 text-[#8B1538] dark:text-[#A91D47] rounded-full font-semibold text-lg transition-smooth hover:border-[#8B1538] hover:shadow-xl inline-flex items-center gap-2"
          >
            View Portfolio
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20">
          <div className="w-6 h-10 border-2 border-[#8B1538]/30 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#8B1538] to-transparent rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
