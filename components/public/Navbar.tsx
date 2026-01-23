"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 transition-smooth hover:scale-105">
            <Image
              src="/logo/thenextchooselogo.png"
              alt="TheNextChoose"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              TheNextChoose
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-smooth relative group",
                  pathname === link.href
                    ? "text-[#8B1538] dark:text-[#A91D47]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#A91D47]"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8B1538] to-[#A91D47] transform scale-x-0 group-hover:scale-x-100 transition-transform",
                  pathname === link.href && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-6 py-2 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-medium transition-smooth hover:shadow-lg hover:shadow-[#8B1538]/50 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-white/10 animate-in slide-in-from-top-5">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-smooth",
                  pathname === link.href
                    ? "bg-[#8B1538]/10 text-[#8B1538] dark:text-[#A91D47]"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-medium text-center transition-smooth hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
