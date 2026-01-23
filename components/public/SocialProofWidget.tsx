"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { TrendingUp, Users, Zap, Award } from "lucide-react"

export function SocialProofWidget() {
  const [projectCount, setProjectCount] = useState(500)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate real-time project counter
    const interval = setInterval(() => {
      setProjectCount(prev => prev + 1)
    }, 30000) // Increment every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top 80%",
        },
      })
    }, widgetRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    {
      icon: TrendingUp,
      value: projectCount,
      label: "Projects Completed",
      suffix: "+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      value: 200,
      label: "Happy Clients",
      suffix: "+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      value: 98,
      label: "Success Rate",
      suffix: "%",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      value: 4.9,
      label: "Average Rating",
      suffix: "/5",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div ref={widgetRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time stats from our growing community
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-xl transition-smooth"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Live Activity Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live updates • Last project completed 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
