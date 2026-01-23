"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Target, Eye, Users, Zap, Globe, Code, Palette, Cpu } from "lucide-react"

const timeline = [
  { year: "2020", title: "Founded", description: "Started with a vision to transform digital marketing" },
  { year: "2021", title: "Expansion", description: "Added video editing and AI automation services" },
  { year: "2022", title: "3D Services", description: "Launched comprehensive 3D visualization suite" },
  { year: "2023", title: "Global Reach", description: "Expanded to serve clients in 50+ countries" },
  { year: "2024", title: "Innovation", description: "Leading the industry with cutting-edge solutions" },
]

const team = [
  { role: "Designers", count: 15, icon: Palette, color: "from-purple-500 to-pink-500" },
  { role: "Developers", count: 20, icon: Code, color: "from-blue-500 to-cyan-500" },
  { role: "3D Artists", count: 10, icon: Zap, color: "from-yellow-500 to-orange-500" },
  { role: "Marketing Experts", count: 12, icon: Globe, color: "from-green-500 to-emerald-500" },
]

const technologies = [
  "Next.js", "React", "Three.js", "TensorFlow", "Python",
  "Node.js", "Unity", "Blender", "After Effects", "GSAP",
  "AWS", "Docker", "PostgreSQL", "Redis", "Shopify"
]

export function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(timelineRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      })

      gsap.from(teamRef.current?.children || [], {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            We're a team of creative professionals and technical experts dedicated to transforming visions into reality through cutting-edge digital solutions.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 border border-white/20 hover:shadow-2xl transition-smooth">
            <Target className="w-12 h-12 text-[#8B1538] dark:text-[#A91D47] mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To empower businesses with innovative digital solutions that drive growth, enhance engagement, and deliver measurable results. We believe in the power of creativity combined with technology to solve complex challenges.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-8 sm:p-12 border border-white/20 hover:shadow-2xl transition-smooth">
            <Eye className="w-12 h-12 text-[#8B1538] dark:text-[#A91D47] mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To become the world's leading platform for integrated digital services, where creativity meets technology and innovation knows no bounds. We envision a future where businesses of all sizes can access enterprise-level solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
            Our Journey
          </span>
        </h2>
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B1538] to-[#A91D47]" />
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pl-20">
                {/* Dot */}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-[#8B1538] to-[#A91D47] border-4 border-white dark:border-gray-900" />
                
                <div className="glass-strong rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-smooth">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl font-bold text-[#8B1538] dark:text-[#A91D47]">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-[#8B1538] dark:text-[#A91D47]" />
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Our Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            50+ passionate professionals driving innovation
          </p>
        </div>

        <div ref={teamRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => {
            const Icon = member.icon
            return (
              <div key={member.role} className="glass-strong rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-smooth text-center">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${member.color} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#8B1538] dark:text-[#A91D47] mb-2">
                  {member.count}+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  {member.role}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-strong rounded-3xl p-12 border border-white/20">
          <div className="text-center mb-8">
            <Cpu className="w-16 h-16 mx-auto mb-4 text-[#8B1538] dark:text-[#A91D47]" />
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Cutting-edge tools and frameworks we use
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-gradient-to-r hover:from-[#8B1538] hover:to-[#A91D47] hover:text-white transition-smooth cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
