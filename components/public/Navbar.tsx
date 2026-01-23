"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { useSession, signOut } from "next-auth/react"

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
  const { data: session, status } = useSession()

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

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ) : session ? (
              // Logged in - show circular user avatar
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white font-bold text-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/auth/login' })}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                // Logged out - show ONLY Login button + Get Started
                <>
                    <Link
                      href="/auth/login"
                      className="px-6 py-2 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-medium transition-smooth hover:shadow-lg hover:shadow-[#8B1538]/50 hover:scale-105"
                    >
                      Login
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-2 border-2 border-[#8B1538] text-[#8B1538] dark:text-[#A91D47] rounded-lg font-medium transition-smooth hover:bg-[#8B1538] hover:text-white dark:hover:bg-[#A91D47]"
                    >
                      Get Started
                    </Link>
              </>
            )}
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
            {!session && (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-medium text-center transition-smooth hover:shadow-lg"
              >
                Login
              </Link>
            )}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 border-2 border-[#8B1538] text-[#8B1538] dark:text-[#A91D47] rounded-lg font-medium text-center transition-smooth"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
