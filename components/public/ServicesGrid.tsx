"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Video, Zap, Globe, Users, Box, Building, Package, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Users,
    title: "Influencer Marketing",
    description: "Connect with top creators and amplify your brand reach. We manage end-to-end campaigns with data-driven ROI.",
    color: "#7e22ce", // Darker Purple
    type: "network",
    price: "₹25,000"
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional post-production for stunning visual content. From social clips to cinematic production.",
    color: "#2563eb", // Darker Blue
    type: "timeline",
    price: "₹5,000"
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Streamline workflows with intelligent automation. Custom bots, CRM integration, and efficiency scaling.",
    color: "#ca8a04", // Darker Yellow
    type: "neural",
    price: "₹30,000"
  },
  {
    icon: Globe,
    title: "Website Building",
    description: "Custom web solutions that convert visitors to customers. High-performance Next.js sites with premium design.",
    color: "#059669", // Darker Green
    type: "wireframe",
    price: "₹15,000"
  },
  {
    icon: Box,
    title: "3D Ads Generation",
    description: "Immersive advertising experiences that captivate. Stop the scroll with impossible 3D visuals.",
    color: "#dc2626", // Darker Red
    type: "ads",
    price: "₹20,000"
  },
  {
    icon: Building,
    title: "3D Real Estate",
    description: "Virtual property tours bringing spaces to life. Interactive walk-throughs for developers and agents.",
    color: "#4f46e5", // Darker Indigo
    type: "real_estate",
    price: "₹45,000"
  },
  {
    icon: Package,
    title: "3D Mockups",
    description: "Photorealistic product visualization and prototyping. See your product before it exists.",
    color: "#0d9488", // Darker Teal
    type: "mockup",
    price: "₹10,000"
  },
  {
    icon: ShoppingCart,
    title: "3D Configurator",
    description: "Interactive Shopify integration for dynamic products. Let customers build their perfect version.",
    color: "#db2777", // Darker Pink
    type: "configurator",
    price: "₹55,000"
  },
]

// --- Visual Components (Optimized & Unique) ---
const NetworkGraph = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <line x1="50" y1="50" x2="100" y2="20" stroke={color} strokeWidth="2" strokeOpacity="0.3" />
    <line x1="50" y1="50" x2="100" y2="80" stroke={color} strokeWidth="2" strokeOpacity="0.3" />
    <line x1="100" y1="20" x2="150" y2="50" stroke={color} strokeWidth="2" strokeOpacity="0.3" />
    <line x1="100" y1="80" x2="150" y2="50" stroke={color} strokeWidth="2" strokeOpacity="0.3" />

    <circle cx="50" cy="50" r="8" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" className="animate-pulse" />
    <circle cx="100" cy="20" r="6" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" className="animate-pulse delay-75" />
    <circle cx="100" cy="80" r="6" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" className="animate-pulse delay-75" />
    <circle cx="150" cy="50" r="8" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" className="animate-pulse delay-150" />
  </svg>
)

const TimelineEditor = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <rect x="20" y="30" width="160" height="10" rx="2" fill="black" fillOpacity="0.05" />
    <rect x="20" y="50" width="160" height="10" rx="2" fill="black" fillOpacity="0.05" />
    <rect x="20" y="70" width="160" height="10" rx="2" fill="black" fillOpacity="0.05" />

    <rect x="30" y="30" width="40" height="10" rx="2" fill={color} fillOpacity="0.8" />
    <rect x="80" y="50" width="60" height="10" rx="2" fill={color} fillOpacity="0.6" />
    <rect x="50" y="70" width="30" height="10" rx="2" fill={color} fillOpacity="0.7" />

    <line x1="90" y1="20" x2="90" y2="90" stroke="black" strokeWidth="2" strokeOpacity="0.2" className="animate-[slide-x_3s_linear_infinite]" />
  </svg>
)

const NeuralPulse = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <circle cx="100" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" className="animate-ping" strokeOpacity="0.2" />
    <circle cx="100" cy="50" r="15" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="50" r="8" fill={color} />
    <text x="60" y="55" fill={color} fontSize="10" opacity="0.8">1</text>
    <text x="130" y="45" fill={color} fontSize="10" opacity="0.8">0</text>
  </svg>
)

const WireframeStack = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <rect x="70" y="30" width="80" height="50" rx="2" stroke="black" strokeWidth="1" fill="none" opacity="0.1" />
    <rect x="65" y="25" width="80" height="50" rx="2" stroke="black" strokeWidth="1" fill="none" opacity="0.2" />
    <rect x="60" y="20" width="80" height="50" rx="2" stroke={color} strokeWidth="2" fill="white" fillOpacity="0.5" />
    <line x1="65" y1="30" x2="135" y2="30" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
  </svg>
)

const AdsVisual = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <rect x="80" y="30" width="40" height="40" fill="none" stroke="black" strokeWidth="1" opacity="0.1" />
    <line x1="80" y1="30" x2="100" y2="20" stroke="black" strokeWidth="1" opacity="0.1" />
    <line x1="120" y1="30" x2="140" y2="20" stroke="black" strokeWidth="1" opacity="0.1" />
    <line x1="120" y1="70" x2="140" y2="60" stroke="black" strokeWidth="1" opacity="0.1" />
    <rect x="100" y="20" width="40" height="40" fill="white" stroke={color} strokeWidth="2" fillOpacity="0.5" />
    <line x1="140" y1="40" x2="160" y2="40" stroke={color} strokeWidth="1" />
    <circle cx="160" cy="40" r="3" fill={color} />
    <text x="165" y="43" fill="black" fontSize="10" opacity="0.6">Ad</text>
  </svg>
)

const RealEstateVisual = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <path d="M70,70 L70,40 L100,20 L130,40 L130,70 L70,70" fill="white" fillOpacity="0.5" stroke={color} strokeWidth="2" />
    <line x1="70" y1="40" x2="130" y2="40" stroke="black" strokeWidth="1" opacity="0.1" />
    <line x1="100" y1="20" x2="100" y2="70" stroke="black" strokeWidth="1" opacity="0.1" />
    <rect x="90" y="50" width="20" height="20" fill={color} fillOpacity="0.2" />
  </svg>
)

const MockupVisual = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <path d="M60,40 L100,20 L140,40 L100,60 L60,40" fill="none" stroke="black" strokeWidth="1" opacity="0.1" />
    <path d="M60,40 L60,80 L100,100 L140,80 L140,40" fill="white" stroke={color} strokeWidth="2" fillOpacity="0.5" />
    <line x1="100" y1="60" x2="100" y2="100" stroke={color} strokeWidth="2" />
    <path d="M60,40 L100,60 L140,40" fill={color} fillOpacity="0.1" />
  </svg>
)

const ConfiguratorVisual = ({ color }: { color: string }) => (
  <svg className="w-full h-full" viewBox="0 0 200 100">
    <circle cx="120" cy="50" r="20" fill="white" stroke={color} strokeWidth="2" fillOpacity="0.5" />
    <line x1="40" y1="30" x2="80" y2="30" stroke="black" strokeWidth="2" strokeOpacity="0.1" />
    <circle cx="50" cy="30" r="4" fill={color} />
    <line x1="40" y1="50" x2="80" y2="50" stroke="black" strokeWidth="2" strokeOpacity="0.1" />
    <circle cx="70" cy="50" r="4" fill={color} />
    <line x1="40" y1="70" x2="80" y2="70" stroke="black" strokeWidth="2" strokeOpacity="0.1" />
    <circle cx="60" cy="70" r="4" fill={color} />
  </svg>
)

const ServiceVisual = ({ type, color }: { type: string, color: string }) => {
  switch (type) {
    case 'network': return <NetworkGraph color={color} />
    case 'timeline': return <TimelineEditor color={color} />
    case 'neural': return <NeuralPulse color={color} />
    case 'wireframe': return <WireframeStack color={color} />
    case 'ads': return <AdsVisual color={color} />
    case 'real_estate': return <RealEstateVisual color={color} />
    case 'mockup': return <MockupVisual color={color} />
    case 'configurator': return <ConfiguratorVisual color={color} />
    default: return <WireframeStack color={color} />
  }
}

import { useCMS } from "@/components/cms/CMSProvider"

export function ServicesGrid() {
  const config = useCMS()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // useLayoutEffect is preferred for GSAP to avoid layout shifts
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

  // --- Desktop Animation (Horizontal Scroll) ---
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (track && container) {
        // Recalculate width to be safe
        const scrollLength = track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: -scrollLength,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollLength + 500}`, // Functional end value for responsiveness
            invalidateOnRefresh: true, // Recalculate on resize
            anticipatePin: 1
          }
        });
      }
    });

    // --- Mobile Animation (Vertical Grid Stagger) ---
    mm.add("(max-width: 1023px)", () => {
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        });
      }
    });

    // --- Common Animations ---
    if (bgRef.current && containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 20%",
        scrub: 1,
        animation: gsap.to(bgRef.current, { opacity: 1, ease: "none" })
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen py-24 flex flex-col justify-center overflow-hidden">

      {/* Background Logic */}
      <div
        ref={bgRef}
        className="fixed inset-0 -z-10 opacity-0 pointer-events-none will-change-opacity"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/bg/services-bg.png')` }}
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 w-full z-10">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-bold text-[#8B1538] mb-2 tracking-tight">
            {config.servicesSectionTitle}
          </h2>
          <p className="text-lg text-gray-500">
            {config.servicesSectionDesc}
          </p>
        </div>
      </div>

      {/* --- DESKTOP TRACK (Horizontal) --- */}
      <div
        ref={trackRef}
        className="hidden lg:flex gap-8 px-12 items-stretch w-max"
      >
        {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="
                        w-[28vw] min-w-[350px] max-w-[450px] h-[60vh] 
                        bg-white border-2 border-transparent hover:border-[color:var(--brand-color)]
                        shadow-xl rounded-[2rem] 
                        p-8 flex flex-col
                        transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                        group relative overflow-hidden
                    "
                style={{ '--brand-color': service.color } as React.CSSProperties}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-[color:var(--brand-color)] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-8 h-8 transition-colors duration-300" style={{ color: 'inherit' }} />
                    </div>
                    <span className="text-5xl font-black text-gray-100 select-none group-hover:text-[color:var(--brand-color)] group-hover:opacity-10 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[color:var(--brand-color)] transition-colors">
                    {service.title}
                  </h3>

                  {config.servicesShowPrices && (
                    <div className="mb-2 text-sm font-semibold text-[color:var(--brand-color)] opacity-80">
                      Starting at {service.price}
                    </div>
                  )}

                  <p className="text-base text-gray-500 leading-relaxed mb-auto line-clamp-none">
                    {service.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                      href="/services"
                      className="
                                    flex items-center justify-between w-full p-4 rounded-xl 
                                    bg-gray-50 group-hover:bg-[color:var(--brand-color)] 
                                    text-gray-900 group-hover:text-white
                                    font-semibold transition-all duration-300
                                "
                    >
                      Explore
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Simple Background Decoration */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                  <ServiceVisual type={service.type} color={service.color} />
                </div>
              </div>
            )
        })}
      </div>

      {/* --- MOBILE GRID (Vertical 2-Col) --- */}
      <div className="lg:hidden grid grid-cols-2 gap-4 px-4 w-full">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="
                        bg-white border border-gray-100 rounded-2xl p-4 shadow-sm
                        flex flex-col h-full
                    "
            >
              <div className="mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" style={{ color: service.color }} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight min-h-[2.5rem]">
                  {service.title}
                </h3>
              </div>

              <Link
                href="/services" 
                className="
                            mt-auto w-full py-2 px-3 rounded-lg 
                            text-[10px] font-bold uppercase tracking-wider text-center
                            border border-gray-200 text-gray-600
                            hover:bg-gray-50 active:scale-95 transition-all
                            flex items-center justify-center gap-1
                        "
              >
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )
        })}
      </div>

    </div>
  )
}
