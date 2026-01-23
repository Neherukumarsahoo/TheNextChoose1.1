"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    image: "from-purple-400 to-pink-600",
    rating: 5,
    content: "TheNextChoose transformed our influencer marketing strategy. We saw a 350% ROI in just 3 months. Their team's expertise and attention to detail is unmatched.",
  },
  {
    id: 2,
    name: "Ranu Kaur",
    role: "CEO",
    company: "Fashion Forward",
    image: "from-blue-400 to-cyan-600",
    rating: 5,
    content: "The video editing quality exceeded our expectations. Every frame was perfect. They delivered ahead of schedule and the final product went viral with 2M+ views.",
  },
  {
    id: 3,
    name: "Abhinash Devorkonda",
    role: "Operations Manager",
    company: "AutoFlow Solutions",
    image: "from-green-400 to-emerald-600",
    rating: 5,
    content: "Their AI automation solution cut our operational costs by 60%. The team understood our needs perfectly and delivered a custom solution that just works.",
  },
  {
    id: 4,
    name: "David steer",
    role: "Product Lead",
    company: "Sopify Editor",
    image: "from-yellow-400 to-orange-600",
    rating: 5,
    content: "The 3D product configurator revolutionized our e-commerce platform. Conversion rates jumped 65% and customer engagement tripled. Best investment we've made.",
  },
  {
    id: 5,
    name: "Madhab Yadav",
    role: "Real Estate Developer",
    company: "Prime Properties",
    image: "from-red-400 to-rose-600",
    rating: 5,
    content: "Virtual 3D tours reduced our time-to-sale by 40%. Buyers can now explore properties from anywhere. TheNextChoose's technology is truly game-changing.",
  },
  {
    id: 6,
    name: "Bharath Kumar",
    role: "CTO",
    company: "Digital Dynamics",
    image: "from-indigo-400 to-purple-600",
    rating: 5,
    content: "Our new website built by TheNextChoose is lightning-fast and beautiful. 99.9% uptime, perfect mobile experience, and SEO rankings improved dramatically.",
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(carouselRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
        },
      })
    }, carouselRef)

    return () => ctx.revert()
  }, [])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div ref={carouselRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#8B1538] to-[#A91D47] bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients say about working with us.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Card */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out"
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={(el) => {cardRefs.current[index] = el}}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="glass-strong rounded-3xl p-8 sm:p-12 border border-white/20 hover:shadow-2xl transition-smooth">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      {/* Avatar */}
                      <div className={`relative flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br ${testimonial.image} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Quote Icon */}
                        <Quote className="w-12 h-12 text-[#8B1538]/20 dark:text-[#A91D47]/20 mb-4 mx-auto md:mx-0" />

                        {/* Rating */}
                        <div className="flex gap-1 mb-4 justify-center md:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#8B1538] text-[#8B1538] dark:fill-[#A91D47] dark:text-[#A91D47]" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                          "{testimonial.content}"
                        </p>

                        {/* Author Info */}
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-[#8B1538] dark:text-[#A91D47] font-medium">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-[#8B1538] hover:to-[#A91D47] hover:text-white transition-smooth"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-[#8B1538] hover:to-[#A91D47] hover:text-white transition-smooth"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-smooth",
                currentIndex === index
                  ? "bg-gradient-to-r from-[#8B1538] to-[#A91D47] w-8"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 font-semibold">
            Trusted by Leading Brands
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity">
            {testimonials.map((t) => (
              <div key={t.id} className="text-center font-bold text-gray-700 dark:text-gray-300">
                {t.company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
