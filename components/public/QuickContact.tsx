"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { Send, CheckCircle2 } from "lucide-react"
// import { useScrollTrigger } from "@/hooks/useScrollTrigger" // Assuming a hook or use simple useEffect
import { useContactForm } from "@/hooks/useContactForm"

export function QuickContact() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { formData, isSubmitting, handleChange, handleSubmit } = useContactForm()
    
    // Simple animation on scroll
    // (Implementation details for GSAP entrance)

    return (
        <section className="py-24 px-4 bg-white dark:bg-black relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                     <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        Ready to Start?
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        Drop your details below and we'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                         <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                                <input 
                                    type="tel" 
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Service Interest</label>
                                <select 
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange} // Note: check if handleChange handles select
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">Select Service</option>
                                    <option value="Influencer Marketing">Influencer Marketing</option>
                                    <option value="Video Editing">Video Editing</option>
                                    <option value="AI Automation">AI Automation</option>
                                    <option value="Web Development">Web Development</option>
                                </select>
                            </div>
                        </div>

                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Budget Range</label>
                            <select 
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select Budget</option>
                                <option value="< ₹1L">&lt; ₹1L</option>
                                <option value="₹1L - 5L">₹1L - 5L</option>
                                <option value="₹5L - 20L">₹5L - 20L</option>
                                <option value="₹20L+">₹20L+</option>
                            </select>
                        </div>

                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                            <textarea 
                                name="message"
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                                placeholder="Tell us a bit about your project..."
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Request'}
                            {!isSubmitting && <Send className="w-5 h-5" />}
                        </button>
                     </form>
                </div>
            </div>
        </section>
    )
}
