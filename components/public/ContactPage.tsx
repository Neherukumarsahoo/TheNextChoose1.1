"use client"

import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { DesktopContact } from "./contact/DesktopContact"
import { MobileContact } from "./contact/MobileContact"

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-[#8B1538] selection:text-white">
      <Navbar />

      {/* Decorative Background Elements handled within DesktopContact for Desktop, and Mobile uses standard bg */}


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
