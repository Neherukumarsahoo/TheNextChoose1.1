
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
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

      function toCompact() {
        if (isMenuOpenRef.current) return // Don't shrink if menu open

        gsap.to(navRef.current, {
          width: 50,
          paddingLeft: 5,
          paddingRight: 5,
          duration: 0.8,
          ease: "expo.inOut"
        })
        gsap.to(linksRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          overwrite: true,
          onComplete: () => {
            if (navRef.current && gsap.getProperty(navRef.current, "width") <= 60) {
              gsap.set(linksRef.current, { display: "none" })
            }
          }
        })
        gsap.to(logoTextRef.current, {
          width: 0,
          opacity: 0,
          duration: 0.4
        })
        isCompactRef.current = true
      }

      function toExpanded() {
        gsap.set(linksRef.current, { display: "flex" })

        gsap.to(navRef.current, {
          width: "auto",
          minWidth: 50,
          paddingLeft: 24,
          paddingRight: 24,
          duration: 0.8,
          ease: "expo.out"
        })
        gsap.to(linksRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.1
        })
        gsap.to(logoTextRef.current, {
          width: "auto",
          opacity: 1,
          duration: 0.6
        })
        isCompactRef.current = false
      }

    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-strong border border-white/20 shadow-2xl flex items-center justify-between overflow-hidden h-16 box-content"
      style={{ borderRadius: 9999, minWidth: 50 }}
    >
      {/* Logo Container */}
      <div className="flex items-center gap-2 pl-1 pr-1 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {config?.logoUrl ? (
              <img
                src={config.logoUrl}
                alt={config.brandName || "Brand"}
                className="object-contain w-8 h-8"
              />
            ) : (
              <Image
                src="/logo/thenextchooselogo.png"
                alt="TheNextChoose"
                  width={32}
                  height={32}
                  className="object-contain"
                />
            )}
          </div>
          <span ref={logoTextRef} className="text-lg font-bold bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent whitespace-nowrap" style={{ fontFamily: config?.headingFont }}>
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

      {/* Mobile Menu Toggle (Always visible in expanded, compact hides text) */}
      <div className="md:hidden pr-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white dark:bg-[#111] rounded-3xl p-4 shadow-xl border border-gray-100 dark:border-white/10 flex flex-col gap-2 min-w-[300px] animate-in fade-in slide-in-from-top-4">
          {navItems.map((link: any) => (
            <Link
              key={link.id || link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
