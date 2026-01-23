"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return
  
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('submit', 'Form', formName)
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'Button', `${buttonName} - ${location}`)
}

// Track CTA clicks
export const trackCTAClick = (ctaType: string, ctaLocation: string) => {
  trackEvent('click', 'CTA', `${ctaType} - ${ctaLocation}`)
}

// Track service views
export const trackServiceView = (serviceName: string) => {
  trackEvent('view', 'Service', serviceName)
}

// Track portfolio filters
export const trackPortfolioFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter', 'Portfolio', `${filterType}: ${filterValue}`)
}

// Track downloads
export const trackDownload = (resourceName: string) => {
  trackEvent('download', 'Resource', resourceName)
}

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', 'Engagement', `${percentage}%`, percentage)
}

// Analytics Provider Component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initGA()
  }, [])

  return <>{children}</>
}

// Google Analytics Script Component
export function GoogleAnalyticsScript() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
