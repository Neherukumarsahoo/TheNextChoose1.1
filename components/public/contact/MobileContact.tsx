"use client"

import { useContactForm } from "@/hooks/useContactForm"
import { cn } from "@/lib/utils"
import { Send, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function MobileContact() {
  const { formData, isSubmitting, handleChange, handleServiceChange, handleBudgetChange, handleSubmit } = useContactForm()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="md:hidden min-h-screen bg-white dark:bg-[#050505] flex flex-col pt-20 pb-24">
      {/* Mobile Header - Simple & Clean */}
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Let's Talk
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
            Tell us about your project and we'll get back to you instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 flex flex-col gap-6">
        
        {/* Step 1: Who are you? */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-sm font-bold text-[#8B1538] uppercase tracking-wider mb-2">01. Your Details</h2>
            <div className="space-y-4">
                <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#8B1538]/20 transition-all placeholder:text-gray-400"
                />
                 <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 text-lg bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#8B1538]/20 transition-all placeholder:text-gray-400"
                />
                 <div className="flex gap-2">
                    <select className="bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-3 outline-none font-medium">
                        <option>+91</option>
                        <option>+1</option>
                    </select>
                    <input 
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="flex-1 p-4 text-lg bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#8B1538]/20 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>
        </div>

        {/* Step 2: What do you need? */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             <h2 className="text-sm font-bold text-[#8B1538] uppercase tracking-wider mb-2">02. Service & Budget</h2>
             
             {/* Horizontal Scroll for Chips */}
             <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
                {['Influencer Marketing', 'Video Editing', 'AI Automation', 'Web Dev'].map(s => (
                    <button 
                        type="button"
                        key={s}
                        onClick={() => handleServiceChange(s)}
                        className={cn(
                            "flex-shrink-0 px-5 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                            formData.service === s 
                                ? "bg-[#8B1538] text-white shadow-lg shadow-[#8B1538]/20" 
                                : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                        )}
                    >
                        {s}
                    </button>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-3">
                 {['₹50k-1L', '₹1L-3L', '₹3L-10L', '₹10L+'].map(b => (
                    <button 
                        type="button"
                        key={b}
                        onClick={() => handleBudgetChange(b)}
                        className={cn(
                            "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                            formData.budget === b
                                ? "bg-black dark:bg-white text-white dark:text-black" 
                                : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                        )}
                    >
                        {b}
                    </button>
                ))}
             </div>
        </div>

        {/* Step 3: Message */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h2 className="text-sm font-bold text-[#8B1538] uppercase tracking-wider mb-2">03. Project Brief</h2>
            <textarea 
                name="message"
                placeholder="Briefly describe your project..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-4 text-base bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#8B1538]/20 transition-all placeholder:text-gray-400 resize-none"
            />
        </div>

        {/* Sticky Submit Button */}
         <div className="mt-4 pb- safe-area-bottom">
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#8B1538] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#8B1538]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                ) : (
                    <>
                        Send Request <Send size={20} />
                    </>
                )}
            </button>
         </div>
      </form>
    </div>
  )
}
