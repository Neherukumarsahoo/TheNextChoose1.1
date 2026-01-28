"use client"

import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { DesktopContact } from "./contact/DesktopContact"
import { MobileContact } from "./contact/MobileContact"

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-[#8B1538] selection:text-white">
      <Navbar />

      {/* Decorative Background Elements (Shared) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('/bg/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        <div className="hidden md:block absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="hidden md:block absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#8B1538]/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <DesktopContact />
      <MobileContact />

      <div className="hidden md:block">
        <Footer />
      </div>
      {/* Mobile Footer is hidden or purely accessible via bottom nav, but standard footer often hidden on mobile forms for focus */}
      <div className="md:hidden pb-20">
        <Footer />
      </div>
    </div>
  )
}
