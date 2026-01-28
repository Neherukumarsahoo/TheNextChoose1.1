"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useContactForm } from "@/hooks/useContactForm"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@thenextchoose.com",
    link: "mailto:info@thenextchoose.com",
    bg: "from-pink-500/20 to-rose-500/20",
    border: "group-hover:border-pink-500/50"
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (234) 567-890",
    link: "tel:+1234567890",
    bg: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Innovation St, Tech City",
    link: "#",
    bg: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-amber-500/50"
  },
]

export function DesktopContact() {
  const { formData, isSubmitting, handleChange, handleServiceChange, handleBudgetChange, handleSubmit } = useContactForm()
  const [activeField, setActiveField] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.from(".reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      })
      gsap.from(".reveal-card", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      })
      gsap.from(".contact-form-container", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="hidden md:block relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Visuals & Info */}
          <div className="flex flex-col gap-12">
              
              {/* Header */}
              <div className="space-y-6">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B1538]/5 border border-[#8B1538]/10 w-fit reveal-text">
                      <Sparkles className="w-4 h-4 text-[#8B1538]" />
                      <span className="text-xs font-bold text-[#8B1538] uppercase tracking-wider">Let's Create Magic</span>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[0.9] reveal-text">
                      Start Your <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] to-purple-600">Digital Journey</span>
                  </h1>
                  <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed reveal-text">
                      Ready to dominate your industry? We are the growth partners you've been looking for.
                  </p>
              </div>

              {/* Interactive 2D Visual (Abstract Network) */}
                <div className="h-[300px] w-full relative reveal-text flex items-center justify-center">
                    <div className="relative w-64 h-64">
                         {/* Central Pulse */}
                        <div className="absolute inset-0 bg-[#8B1538]/10 rounded-full animate-ping" />
                        <div className="absolute inset-4 bg-[#8B1538]/5 rounded-full animate-pulse" />
                        
                        {/* Core Icon */}
                         <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#8B1538] to-[#A91D47] rounded-full shadow-2xl flex items-center justify-center">
                                <Send className="w-10 h-10 text-white translate-x-1" />
                            </div>
                         </div>
                        
                         {/* Orbiting Nodes */}
                        <div className="absolute inset-0 animate-spin-slow">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-12 h-12 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-100 dark:border-white/10 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-blue-500" />
                            </div>
                        </div>

                         <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 uppercase tracking-widest pointer-events-none">
                            Global Connectivity
                        </div>
                    </div>
                </div>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, i) => {
                      const Icon = info.icon
                      return (
                          <a key={i} href={info.link} className={`reveal-card group relative p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent ${info.border} hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl`}>
                              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                  <Icon className="w-6 h-6 text-gray-900 dark:text-white" />
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">{info.value}</p>
                          </a>
                      )
                  })}
              </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="contact-form-container relative flex flex-col justify-center">
              <div className="relative bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                  {/* Glow Effect */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B1538]/20 to-transparent blur-[80px]" />

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 relative z-10">
                      Project Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                      
                       {/* Name & Email */}
                      <div className="grid md:grid-cols-2 gap-6">
                          <div className="group relative">
                              <label className={cn("absolute left-4 transition-all duration-300 text-gray-400 pointer-events-none", activeField === 'name' || formData.name ? "top-2 text-[10px] font-bold uppercase tracking-wider text-[#8B1538]" : "top-4 text-sm")}>Your Name</label>
                              <input 
                                  type="text" 
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onFocus={() => setActiveField('name')}
                                  onBlur={() => setActiveField(null)}
                                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 pt-7 pb-2 outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition-all"
                              />
                          </div>
                          <div className="group relative">
                              <label className={cn("absolute left-4 transition-all duration-300 text-gray-400 pointer-events-none", activeField === 'email' || formData.email ? "top-2 text-[10px] font-bold uppercase tracking-wider text-[#8B1538]" : "top-4 text-sm")}>Email Address</label>
                              <input 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  onFocus={() => setActiveField('email')}
                                  onBlur={() => setActiveField(null)}
                                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 pt-7 pb-2 outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition-all"
                              />
                          </div>
                      </div>

                       {/* Mobile */}
                      <div className="group relative flex gap-3">
                           <select className="w-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-2 outline-none focus:border-[#8B1538] transition-all text-sm font-medium">
                              <option>+91</option>
                              <option>+1</option>
                              <option>+44</option>
                           </select>
                          <div className="relative flex-1">
                              <label className={cn("absolute left-4 transition-all duration-300 text-gray-400 pointer-events-none", activeField === 'mobile' || formData.mobile ? "top-2 text-[10px] font-bold uppercase tracking-wider text-[#8B1538]" : "top-4 text-sm")}>Mobile Number</label>
                              <input 
                                  type="tel"
                                  name="mobile"
                                  value={formData.mobile}
                                  onChange={handleChange}
                                  onFocus={() => setActiveField('mobile')}
                                  onBlur={() => setActiveField(null)}
                                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 pt-7 pb-2 outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition-all"
                              />
                          </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-3">
                           <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">I'm interested in...</label>
                           <div className="flex flex-wrap gap-2">
                              {['Influencer Marketing', 'Video Editing', 'AI Automation', 'Web Dev', '3D Design'].map(s => (
                                  <button 
                                      type="button"
                                      key={s}
                                      onClick={() => handleServiceChange(s)}
                                      className={cn(
                                          "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300",
                                          formData.service === s 
                                              ? "bg-[#8B1538] border-[#8B1538] text-white shadow-lg shadow-[#8B1538]/20" 
                                              : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-[#8B1538]/50"
                                      )}
                                  >
                                      {s}
                                  </button>
                              ))}
                           </div>
                      </div>

                      {/* Budget */}
                       <div className="space-y-3 pt-2">
                           <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Approx. Budget</label>
                            <div className="grid grid-cols-2 gap-2">
                              {['₹50k - ₹1L', '₹1L - ₹3L', '₹3L - ₹10L', '₹10L+'].map(b => (
                                  <button 
                                      type="button"
                                      key={b}
                                      onClick={() => handleBudgetChange(b)}
                                      className={cn(
                                          "px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300",
                                          formData.budget === b
                                              ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg" 
                                              : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-gray-400"
                                      )}
                                  >
                                      {b}
                                  </button>
                              ))}
                           </div>
                      </div>

                      {/* Message */}
                      <div className="group relative pt-2">
                          <label className={cn("absolute left-4 transition-all duration-300 text-gray-400 pointer-events-none", activeField === 'message' || formData.message ? "top-4 text-[10px] font-bold uppercase tracking-wider text-[#8B1538]" : "top-6 text-sm")}>Project Description</label>
                          <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setActiveField('message')}
                              onBlur={() => setActiveField(null)}
                              rows={4}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 pt-8 pb-2 outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] transition-all resize-none"
                          />
                      </div>

                      {/* Submit Button */}
                      <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full group relative py-4 bg-[#8B1538] text-white rounded-xl font-bold text-lg overflow-hidden shadow-xl shadow-[#8B1538]/20 hover:shadow-[#8B1538]/40 transition-all duration-300 hover:scale-[1.01]"
                      >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                          <span className="flex items-center justify-center gap-2">
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                              {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                          </span>
                      </button>

                  </form>
              </div>
          </div>

      </div>
    </div>
  )
}
