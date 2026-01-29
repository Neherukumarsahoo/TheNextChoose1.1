"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Mail, Phone, MapPin, Send, ArrowRight, Star, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useContactForm } from "@/hooks/useContactForm"

export function DesktopContact() {
  const { formData, isSubmitting, handleChange, handleServiceChange, handleBudgetChange, handleSubmit } = useContactForm()
  const [activeField, setActiveField] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Background Animation
        gsap.to(".bg-orb", {
            y: "20%",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 2
      })

        // Content Entrance
        gsap.from(".reveal-up", {
            y: 60,
        opacity: 0,
            duration: 1.2,
        stagger: 0.1,
            ease: "power3.out"
      })

        gsap.from(".reveal-scale", {
            scale: 0.9,
        opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
      <div ref={containerRef} className="hidden md:flex min-h-screen relative items-center justify-center p-8 lg:p-12 overflow-hidden bg-white">

          {/* Premium CSS Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-200/40 rounded-full blur-[120px] bg-orb" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#8B1538]/10 rounded-full blur-[100px] bg-orb" />
              <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] bg-blue-200/30 rounded-full blur-[80px] bg-orb" />

              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
          </div>

          <div className="relative z-10 w-full max-w-7xl grid grid-cols-12 gap-12 items-center">

              {/* Left: Brand & Info */}
              <div className="col-span-5 space-y-12 reveal-up">
                  <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 backdrop-blur-md">
                          <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Accepting New Projects</span>
                      </div>

                      <h1 className="text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                          Let's Build <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] via-purple-600 to-blue-600">The Future.</span>
                      </h1>

                      <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                          We help ambitious brands define the next generation of digital experiences. Ready to start yours?
                      </p>
                  </div>

                  <div className="space-y-6">
                      <a href="mailto:hello@nextchoose.com" className="group flex items-center gap-6 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-[#8B1538] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                              <Mail className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email Us</p>
                              <p className="text-lg text-gray-900 font-medium">hello@nextchoose.com</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B1538] group-hover:translate-x-1 transition-all ml-auto" />
                      </a>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                              <Globe className="w-6 h-6 text-blue-600 mb-3" />
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Global Reach</p>
                              <p className="text-sm text-gray-900 font-medium">Serving clients worldwide</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                              <Star className="w-6 h-6 text-yellow-500 mb-3" />
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Excellence</p>
                              <p className="text-sm text-gray-900 font-medium">Award-winning team</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right: Floating Glass Form */}
              <div className="col-span-7 reveal-scale">
                  <div className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-10 shadow-2xl shadow-purple-900/5">
                      <form onSubmit={handleSubmit} className="space-y-8">

                          <div className="grid grid-cols-2 gap-8">
                              <div className="group relative">
                                  <input
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleChange}
                                      placeholder=" "
                                      className="peer w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-transparent focus:border-[#8B1538] focus:outline-none transition-colors"
                                  />
                                  <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8B1538] transition-all cursor-text">
                                      Your Name
                                  </label>
                              </div>
                              <div className="group relative">
                                  <input
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      placeholder=" "
                                      className="peer w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-transparent focus:border-[#8B1538] focus:outline-none transition-colors"
                                  />
                                  <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8B1538] transition-all cursor-text">
                                      Email Address
                                  </label>
                              </div>
                          </div>

                          <div className="space-y-4">
                              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Service Interest</label>
                              <div className="flex flex-wrap gap-2">
                                  {['Influencer Marketing', 'Video Production', 'AI Solutions', 'Web Development', '3D Design'].map(s => (
                                      <button
                                          key={s}
                                          type="button"
                                          onClick={() => handleServiceChange(s)}
                                          className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                        formData.service === s
                                            ? "bg-[#8B1538] text-white shadow-lg shadow-[#8B1538]/25 scale-105"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                    )}
                                      >
                                          {s}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="space-y-4">
                              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Project Budget</label>
                              <div className="grid grid-cols-4 gap-2">
                                  {['< ₹1L', '₹1L - 5L', '₹5L - 20L', '₹20L+'].map(b => (
                                      <button
                                          key={b}
                                          type="button"
                                          onClick={() => handleBudgetChange(b)}
                                          className={cn(
                                        "px-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 border",
                                        formData.budget === b
                                            ? "bg-gray-900 text-white border-transparent shadow-lg scale-105"
                                            : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                                    )}
                                      >
                                          {b}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="group relative mt-8">
                              <textarea
                                  name="message"
                                  rows={3}
                                  value={formData.message}
                                  onChange={handleChange}
                                  placeholder=" "
                                  className="peer w-full bg-transparent border-b border-gray-200 py-3 text-gray-900 placeholder-transparent focus:border-[#8B1538] focus:outline-none transition-colors resize-none"
                              />
                              <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8B1538] transition-all cursor-text">
                                  Tell us about your project
                              </label>
                          </div>

                          <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-5 bg-[#050505] text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors shadow-xl flex items-center justify-center gap-2 group"
                          >
                              {isSubmitting ? "Sending..." : "Send Message"}
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#8B1538]" />
                          </button>

                      </form>
                  </div>
              </div>

      </div>
    </div>
  )
}

