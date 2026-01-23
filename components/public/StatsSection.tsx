"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const stats = [
  { value: "500+", label: "Projects Completed", suffix: "" },
  { value: "200+", label: "Happy Clients", suffix: "" },
  { value: "50+", label: "Team Members", suffix: "" },
  { value: "24/7", label: "Support Available", suffix: "" },
]

export function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats counters
      countersRef.current.forEach((counter, index) => {
        if (!counter) return
        
        const finalValue = parseInt(stats[index].value.replace(/\D/g, ""))
        const hasPlusSign = stats[index].value.includes("+")
        
        gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          onUpdate: function() {
            const currentValue = Math.ceil(this.targets()[0].textContent)
            counter.textContent = currentValue + (hasPlusSign ? "+" : "")
          }
        })
      })
    }, statsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={statsRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by Hundreds
          </h2>
          <p className="text-xl text-white/80">
            Our numbers speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center glass-strong rounded-2xl p-8 transform hover:scale-105 transition-smooth hover:bg-white/10"
            >
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                <span ref={(el) => {countersRef.current[index] = el}}>
                  {stat.value}
                </span>
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
