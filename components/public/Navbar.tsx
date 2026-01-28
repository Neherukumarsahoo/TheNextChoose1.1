
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Briefcase, CreditCard, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCMS } from "@/components/cms/CMSProvider"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const config = useCMS()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const logoTextRef = useRef<HTMLSpanElement>(null)

  // Use config items or default if empty
  const navItems = config?.navItems?.filter((item: any) => item.visible) || [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ]

  // Refs to access latest state inside GSAP callback without re-running effect
  const isCompactRef = useRef(true)
  const isMenuOpenRef = useRef(mobileMenuOpen)

  // Sync ref with state
  useEffect(() => {
    isMenuOpenRef.current = mobileMenuOpen
  }, [mobileMenuOpen])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Only Animation
      mm.add("(min-width: 768px)", () => {
        // 1. Initial Load Animation (Expand from Pill)
        const tl = gsap.timeline({
          onComplete: () => { isCompactRef.current = false }
        })

        // Set initial state
        gsap.set(navRef.current, { width: 50, borderRadius: 9999 })
        gsap.set(linksRef.current, { opacity: 0, scale: 0.9, display: "none" })
        gsap.set(logoTextRef.current, { opacity: 0, width: 0, overflow: 'hidden' })

        // Expansion Sequence
        tl.to(navRef.current, {
          width: "auto",
          minWidth: 50,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.2
        })
          .to(linksRef.current, {
            display: "flex",
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.8")
          .to(logoTextRef.current, {
            width: "auto",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.8")


        // 2. Scroll Triggers for Shape Shifting
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const isScrollDown = self.direction === 1
            const isScrollUp = self.direction === -1
        // const isScrolledPast = self.scroll() > 50

            if (isScrollDown && !isCompactRef.current) {
              toCompact()
            } else if (isScrollUp && isCompactRef.current) {
              toExpanded()
            }
          }
        })
      });

      function toCompact() {
        if (isMenuOpenRef.current) return

        // 1. Shrink container to "Pill" shape (Make it bigger/wider as requested)
        gsap.to(navRef.current, {
          width: "auto",
          paddingLeft: 40, // More padding for bigger look
          paddingRight: 40,
          duration: 1, // Slower, smoother
          ease: "power4.inOut" // Smooth, premium feel
        })

        // 2. Hide links smoothly
        gsap.to(linksRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          overwrite: true,
          onComplete: () => {
            gsap.set(linksRef.current, { display: "none" })
          }
        })

        // 3. Show centered text sequence
        gsap.to(logoTextRef.current, {
          width: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2 // Wait for container to start shrinking
        })
        isCompactRef.current = true
      }

      function toExpanded() {
        // 1. Prepare elements
        gsap.set(linksRef.current, { display: "flex", opacity: 0, scale: 0.95 })

        // 2. Expand container Width FIRST (Smoothest expansion)
        gsap.to(navRef.current, {
          width: "100%", // Go back to full width first
          paddingLeft: 24,
          paddingRight: 24,
          duration: 1.2, // Luxurious slow expansion
          ease: "power4.inOut",
          force3D: true,
          overwrite: "auto"
        })

        // 3. Reveal Links naturally as it expands
        gsap.to(linksRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4, // Wait for width to open up a bit
          ease: "power2.out",
          force3D: true
        })

        // 4. Reset Logo Text (back to left)
        gsap.to(logoTextRef.current, {
          width: "auto", // Keep it visible or hide? User said "move to left side". 
          // Actually, in expanded mode, usually logo is icon only or icon+text?
          // Looking at previous state, it seems we want to keep it visible but maybe adjust positional context?
          // Existing code had width: "auto" opacity 1. Let's keep that but ensure it doesn't jump.
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        })
        isCompactRef.current = false
      }

    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Main Top Navbar (Logo + Desktop Links) */}
    <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-strong border border-white/20 shadow-2xl flex items-center justify-between overflow-hidden h-16 box-content will-change-[width,padding] 
                 w-[95vw] md:w-auto px-4 md:px-0 rounded-2xl md:rounded-[9999px]"
        style={{ minWidth: 50 }}
    >
      {/* Logo Container */}
        <div className="flex items-center gap-2 flex-shrink-0 mx-auto md:mx-0">
          <Link href="/" className="flex items-center gap-2">
            <div className={cn("relative flex items-center justify-center", config?.logoType === 'image_only' ? "w-8 h-8" : "w-10 h-10")}>
              {config?.logoUrl ? (
                <img src={config.logoUrl} alt={config.brandName || "Brand"} className="object-contain w-full h-full" />
              ) : (
                <Image src="/logo/thenextchooselogo.png" alt="TheNextChoose" width={32} height={32} className="object-contain" />
              )}
            </div>
            <span
              ref={logoTextRef}
              className={cn(
                "text-lg font-bold whitespace-nowrap",
                !config?.brandColor && "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent"
              )}
              style={{ fontFamily: config?.headingFont, color: config?.brandColor }}
            >
              {config?.brandName || "TheNextChoose"}
            </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div ref={linksRef} className="hidden md:flex items-center gap-1 mx-4">
        {navItems.map((link: any) => (
              <Link
            key={link.id || link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-black/5 dark:hover:bg-white/10",
                  pathname === link.href
                    ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/10"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
            {link.label}
              </Link>
            ))}
      </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl p-2 flex justify-around items-center gap-1 px-2">
        {[
          { href: "/", label: "Home", icon: Home },
          { href: "/services", label: "Services", icon: Briefcase },
          { href: "/pricing", label: "Pricing", icon: CreditCard },
          { href: "/contact", label: "Contact", icon: Mail }
        ].map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link 
              key={link.label}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-300 w-16",
                isActive ? "bg-black/5 text-[#8B1538]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} className={cn("w-5 h-5 mb-0.5 transition-transform", isActive && "scale-110")} />
              <span className={cn("text-[8px] font-bold uppercase tracking-wide", isActive ? "opacity-100" : "opacity-0 scale-0 h-0 w-0 overflow-hidden")}>
                {isActive ? link.label : ""}
              </span>
              {/* Alternative: If user wants text always visible but small */}
              {/* <span className={cn("text-[9px] font-medium leading-none", isActive ? "font-bold" : "")}>{link.label}</span> */}
            </Link>
          )
        })}
      </div>
    </>
  )
}
