
"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useCMS } from "@/components/cms/CMSProvider"

const footerLinks = {
  services: [
    { label: "Influencer Marketing", href: "/services#influencer" },
    { label: "Video Editing", href: "/services#video" },
    { label: "AI Automation", href: "/services#ai" },
    { label: "Website Building", href: "/services#web" },
    { label: "3D Services", href: "/services#3d" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
}

export function Footer() {
  const config = useCMS()

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" }, // Default placeholders if empty?
    { icon: Twitter, href: config.socialTwitter || "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: config.socialInstagram || "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: config.socialLinkedin || "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.brandName || "Brand"}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                  <Image
                    src="/logo/thenextchooselogo.png"
                    alt="TheNextChoose"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
              )}
              <span className="text-xl font-bold text-white">
                {config.brandName || "TheNextChoose"}
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Transforming visions into reality with cutting-edge digital solutions. 
              Your one-stop platform for creative and technical excellence.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{config.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{config.contactPhone}</span>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                if (!social.href) return null
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#8B1538] transition-smooth hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 lg:mt-0">
            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#8B1538] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#8B1538] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#8B1538] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        {/* Copyright */}
          <div className="lg:col-span-5 text-center text-sm text-gray-500 border-t border-gray-800 pt-8 mt-8">
            <p>{config.footerText}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

