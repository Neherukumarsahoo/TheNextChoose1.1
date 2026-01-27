"use client"

import { useCMS } from "@/components/cms/CMSProvider"
import { Star, MessageSquareQuote } from "lucide-react"

export function TestimonialsSection() {
    const config = useCMS()
    const testimonials = config?.testimonials || []

    if (!config?.testimonialsEnabled || testimonials.length === 0) return null

    return (
        <section className="py-24 bg-gray-50 dark:bg-black/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[var(--brand-primary)] font-semibold tracking-wide uppercase text-sm">Testimonials</span>
                    <h2 className="mt-3 text-4xl font-bold">{config.testimonialsTitle || "Success Stories"}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t: any) => (
                        <div key={t.id} className="glass p-8 rounded-2xl border border-white/20 hover:-translate-y-1 transition-transform duration-300">
                             <div className="flex text-yellow-500 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed relative z-10">
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    {t.avatar ? (
                                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[var(--brand-primary)] text-white text-xs font-bold">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role} {t.company && `at ${t.company}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
