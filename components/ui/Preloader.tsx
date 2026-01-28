"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { useCMS } from "@/components/cms/CMSProvider"
import { cn } from "@/lib/utils"

export function Preloader() {
  const [percent, setPercent] = useState(0)
  const [complete, setComplete] = useState(false)
  const [hidden, setHidden] = useState(false)
  const config = useCMS()
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if checkSession is needed?
    // User requested: "when i switch tab then within mili second it will load"
    // This implies per-session or per-load. Let's do per-load for now as requested "load of this website".
    
    // Disable scroll
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
        // Timeline for percentage
        const updateProgress = { val: 0 }
        
        gsap.to(updateProgress, {
            val: 100,
            duration: 2.5, // fast but noticeable
            ease: "expo.inOut",
            onUpdate: () => {
                setPercent(Math.round(updateProgress.val))
            },
            onComplete: () => {
                setComplete(true)
                finishAnimation()
            }
        })
        
        // Logo Pulse
        gsap.fromTo(logoRef.current, 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)" }
        )

    }, containerRef)

    function finishAnimation() {
        if (!containerRef.current) return

        const tl = gsap.timeline({
            onComplete: () => {
                setHidden(true)
                document.body.style.overflow = ""
            }
        })

        // Fade out components
        tl.to([logoRef.current, textRef.current], {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        })
        // Slide/Fade away container
        .to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut"
        }, "-=0.2")
    }

    return () => { 
        ctx.revert()
        document.body.style.overflow = ""
    }
  }, [])

  if (hidden) return null

  return (
    <div 
        ref={containerRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#050505]"
    >
        <div ref={logoRef} className="relative mb-12">
            {/* Increased logo size */}
            <div className={cn("relative flex items-center justify-center filter drop-shadow-2xl", config?.logoType === 'image_only' ? "w-64 h-64" : "w-48 h-48")}>
                {config?.logoUrl ? (
                    <img src={config.logoUrl} alt="Brand" className="object-contain w-full h-full" />
                ) : (
                    <Image src="/logo/thenextchooselogo.png" alt="Logo" width={192} height={192} className="object-contain" />
                )}
            </div>
        </div>

        <div ref={textRef} className="flex flex-col items-center gap-2">
            {/* Removed Percentage Text */}
            <div className="h-1.5 w-48 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
                <div 
                    className="h-full bg-[#8B1538] transition-all duration-100 ease-linear"
                    style={{ width: `${percent}%` }} 
                />
            </div>
        </div>
    </div>
  )
}
