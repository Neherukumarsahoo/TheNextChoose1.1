"use client"

import { createContext, useContext, ReactNode } from "react"

export interface CMSConfig {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    headingFont: string
    borderRadius: string
    heroTitle: string
    heroSubtitle: string
    heroCtaText: string
    heroCtaLink: string
    heroShowStats: boolean
    servicesSectionTitle: string
    servicesSectionDesc: string
    servicesGridCols: string
    servicesShowPrices: boolean
    contactEmail: string
    contactPhone: string
    footerText: string
    socialInstagram: string
    socialLinkedin: string
    socialTwitter: string
    bannerActive: boolean
    bannerText: string
    bannerLink: string
    bannerBgColor: string
    bannerTextColor: string

    // New Fields
    logoUrl?: string
    faviconUrl?: string
    brandName?: string
    brandColor?: string
    logoType?: 'image_only' | 'image_with_text' | 'text_only'
    
    blogEnabled?: boolean
    blogTitle?: string
    blogSubtitle?: string
    blogPosts?: any[]
    
    faqEnabled?: boolean
    faqTitle?: string
    faqSubtitle?: string
    faqItems?: any[]

    testimonialsEnabled?: boolean
    testimonialsTitle?: string
    testimonials?: any[]

    navLoginText?: string
    navSignupText?: string
    navShowSearch?: boolean
    navItems?: any[]

    seoConfig?: any
    mediaAssets?: any[]
    pricingData?: any[]
}

const DEFAULT_CMS_CONFIG: CMSConfig = {
    primaryColor: '#f91a05ff',
    secondaryColor: '#991e03ff',
    backgroundColor: '#FAFAFA',
    headingFont: 'Inter',
    borderRadius: '8',
    heroTitle: 'The Next Gen of Influencer Marketing',
    heroSubtitle: 'Connect with top brands and creators to scale your reach.',
    heroCtaText: 'Get Started',
    heroCtaLink: '/register',
    heroShowStats: true,
    servicesSectionTitle: 'Our Expertise',
    servicesSectionDesc: 'Everything you need to grow.',
    servicesGridCols: '4',
    servicesShowPrices: true,
    contactEmail: 'hello@nextchoose.com',
    contactPhone: '+1 555 000 0000',
    footerText: '© 2024 TheNextChoose. All rights reserved.',
    socialInstagram: '',
    socialLinkedin: '',
    socialTwitter: '',
    bannerActive: true,
    bannerText: 'Launch Sale: 50% Off Plans!',
    bannerLink: '/pricing',
    bannerBgColor: '#000000',
    bannerTextColor: '#FFFFFF',
}

const CMSContext = createContext<CMSConfig>(DEFAULT_CMS_CONFIG)

export function CMSProvider({ children, config }: { children: ReactNode, config: CMSConfig | null }) {
    return (
        <CMSContext.Provider value={config || DEFAULT_CMS_CONFIG}>
            {children}
            {/* Inject Dynamic CSS Variables */}
            <style jsx global>{`
                :root {
                    --brand-primary: ${config?.primaryColor || DEFAULT_CMS_CONFIG.primaryColor};
                    --brand-secondary: ${config?.secondaryColor || DEFAULT_CMS_CONFIG.secondaryColor};
                    --brand-bg: ${config?.backgroundColor || DEFAULT_CMS_CONFIG.backgroundColor};
                    --radius: ${config?.borderRadius || DEFAULT_CMS_CONFIG.borderRadius}px;
                }
                body {
                    background-color: var(--brand-bg);
                }
            `}</style>
        </CMSContext.Provider>
    )
}

export const useCMS = () => useContext(CMSContext)
