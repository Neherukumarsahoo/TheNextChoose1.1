"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Palette, Type, Layout, Phone, Zap, BookOpen, HelpCircle, MessageSquareQuote, Map, Search, Image as ImageIcon, PanelRightClose, PanelRightOpen, List, CreditCard } from "lucide-react"

import { BlogManager, BlogPost } from "./cms/BlogManager"
import { MediaLibrary, MediaAsset } from "./cms/MediaLibrary"
import { FAQManager, FAQItem } from "./cms/FAQManager"
import { TestimonialManager, Testimonial } from "./cms/TestimonialManager"
import { NavigationManager, NavItem } from "./cms/NavigationManager"
import { SEOManager, SEOConfig } from "./cms/SEOManager"
import { PricingManager, PricingService } from "./cms/PricingManager"

import { LayoutItem } from "./cms/LayoutManager"


const DEFAULT_CONFIG = {
    // Theme
    primaryColor: '#4F46E5',
    secondaryColor: '#10B981',
    backgroundColor: '#FAFAFA',
    headingFont: 'Inter',
    borderRadius: '8',

    // Hero
    heroTitle: 'The Next Gen of Influencer Marketing',
    heroSubtitle: 'Connect with top brands and creators to scale your reach.',
    heroCtaText: 'Get Started',
    heroCtaLink: '/register',
    heroShowStats: true,

    // Services
    servicesSectionTitle: 'Our Expertise',
    servicesSectionDesc: 'Everything you need to grow.',
    servicesGridCols: '4',
    servicesShowPrices: true,

    // Contact
    contactEmail: 'hello@nextchoose.com',
    contactPhone: '+1 555 000 0000',
    footerText: '© 2024 TheNextChoose. All rights reserved.',
    socialInstagram: '',
    socialLinkedin: '',
    socialTwitter: '',

    // Blog
    blogEnabled: true,
    blogTitle: 'Latest Insights',
    blogSubtitle: 'Tips and strategies for your influencer marketing success.',
    blogPostsPerPage: '6',
    blogPosts: [] as BlogPost[],

    // FAQ
    faqEnabled: true,
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Got questions? We have answers.',
    faqItems: [] as FAQItem[],

    // Testimonials
    testimonialsEnabled: true,
    testimonialsTitle: 'Success Stories',
    testimonials: [] as Testimonial[],

    // Navigation
    navLoginText: 'Log In',
    navSignupText: 'Get Started',
    navShowSearch: true,
    navItems: [
        { id: 'home', label: 'Home', href: '/', visible: true, isSystem: true },
        { id: 'Services', label: 'Service', href: '/services', visible: true, isSystem: true },
        { id: 'pricing', label: 'Pricing', href: '/pricing', visible: true, isSystem: true },
        { id: 'blog', label: 'Blog', href: '/blog', visible: true, isSystem: true },
        { id: 'contact', label: 'Contact', href: '/contact', visible: true, isSystem: true },
    ] as NavItem[],
    brandName: 'TheNextChoose',
    
    // SEO
    seoConfig: {
        titleTemplate: '%s | TheNextChoose',
        defaultDescription: 'The ultimate influencer marketing platform.',
        keywords: ['influencer', 'marketing'],
        ogImage: '',
        twitterHandle: '@nextchoose',
        robotsTxt: 'User-agent: *\nAllow: /'
    } as SEOConfig,

    // Media
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    mediaAssets: [] as MediaAsset[],

    // Layout
    layout: [
        { id: 'hero', label: 'Hero Section', visible: true },
        { id: 'services', label: 'Services', visible: true },
        { id: 'testimonials', label: 'Testimonials', visible: true },
        { id: 'blog', label: 'Blog', visible: true },
        { id: 'faq', label: 'FAQ', visible: true },
        { id: 'contact', label: 'Contact', visible: true },
    ] as LayoutItem[],

    // Pricing
    pricingData: [
        {
            id: "influencer",
            title: "Influencer Marketing",
            packages: [
                { name: "Starter", price: 25000, originalPrice: 35000, duration: "per campaign", features: ["5 Micro-Influencers", "Basic Content Strategy", "Performance Tracking", "Email Support"], popular: false },
                { name: "Growth", price: 60000, originalPrice: 85000, duration: "per campaign", features: ["15 Influencers Mix", "Advanced Strategy", "Content Rights", "Dedicated Manager"], popular: true },
                { name: "Enterprise", price: 150000, originalPrice: 200000, duration: "per campaign", features: ["30+ Influencers", "Celebrity Options", "Full Production", "24/7 Priority Support"], popular: false },
            ]
        },
        {
            id: "video",
            title: "Video Editing",
            packages: [
                { name: "Essential", price: 5000, originalPrice: 8000, duration: "per video", features: ["Up to 1 Minute", "Basic Cuts & Transitions", "Color Correction", "2 Revisions"], popular: false },
                { name: "Professional", price: 15000, originalPrice: 22000, duration: "per video", features: ["Up to 5 Minutes", "Advanced VFX & Motion", "Sound Design", "Unlimited Revisions"], popular: true },
                { name: "Series", price: 30000, originalPrice: 45000, duration: "per series (4 vids)", features: ["4 Videos Package", "Thumbnail Design", "SEO Optimization", "Source Files Included"], popular: false },
            ]
        },
        {
            id: "ai",
            title: "AI Automation",
            packages: [
                { name: "Pilot", price: 30000, originalPrice: 50000, duration: "project", features: ["Needs Assessment", "Basic Chatbot", "Email Automation", "1 Week Support"], popular: false },
                { name: "Business", price: 85000, originalPrice: 120000, duration: "project", features: ["Custom AI Workflows", "CRM Integration", "Data Analysis Bot", "1 Month Support"], popular: true },
                { name: "Scale", price: 200000, originalPrice: 300000, duration: "project", features: ["Full Operations Audit", "Multiple AI Agents", "Custom LLM Training", "3 Months Support"], popular: false },
            ]
        },
        {
            id: "web",
            title: "Website Building",
            packages: [
                { name: "Launch", price: 15000, originalPrice: 25000, duration: "project", features: ["5 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO"], popular: false },
                { name: "Growth", price: 40000, originalPrice: 60000, duration: "project", features: ["10-15 Pages", "CMS Integration", "Blog Setup", "Speed Optimization"], popular: true },
                { name: "E-Commerce", price: 100000, originalPrice: 150000, duration: "project", features: ["Full Online Store", "Payment Gateway", "Inventory System", "User Accounts"], popular: false },
            ]
        },
        {
            id: "3d-ads",
            title: "3D Ads Generation",
            packages: [
                { name: "Single", price: 20000, originalPrice: 30000, duration: "per ad", features: ["15s Animation", "Product Focus", "Social Media Size", "1 Revision"], popular: false },
                { name: "Campaign", price: 50000, originalPrice: 75000, duration: "per campaign", features: ["3 Ad Variations", "Storyboarding", "High-End Rendering", "3 Revisions"], popular: true },
                { name: "Broadcast", price: 120000, originalPrice: 180000, duration: "per project", features: ["TV Quality Render", "Full Environment", "Character Animation", "Source Files"], popular: false },
            ]
        },
        {
            id: "3d-real-estate",
            title: "3D Real Estate",
            packages: [
                { name: "Exterior", price: 45000, originalPrice: 60000, duration: "per view", features: ["Photorealistic Exterior", "Day/Night Lighting", "Landscaping", "4K Output"], popular: false },
                { name: "Interior Walkthrough", price: 80000, originalPrice: 110000, duration: "per floor", features: ["Full Floor Tour", "Furniture Staging", "Interactive Points", "VR Ready"], popular: true },
                { name: "Development", price: 150000, originalPrice: 250000, duration: "project", features: ["Complete Complex", "Aerial Views", "Sales Video", "Brochure Images"], popular: false },
            ]
        },
        {
            id: "3d-mockups",
            title: "3D Mockups",
            packages: [
                { name: "Basic", price: 10000, originalPrice: 15000, duration: "per item", features: ["White Background", "High Res Render", "2 Views", "Standard Materials"], popular: false },
                { name: "Scene", price: 25000, originalPrice: 35000, duration: "per item", features: ["Lifestyle Setting", "Custom Materials", "5 Views", "Lighting Setup"], popular: true },
                { name: "Collection", price: 50000, originalPrice: 80000, duration: "per collection", features: ["10 Product Set", "Consistent Style", "Marketing Assets", "360 Spin"], popular: false },
            ]
        },
        {
            id: "3d-configurator",
            title: "3D Configurator",
            packages: [
                { name: "Simple", price: 55000, originalPrice: 80000, duration: "project", features: ["Color Changes", "Spin Viewer", "Web Integration", "Analytics"], popular: false },
                { name: "Advanced", price: 120000, originalPrice: 180000, duration: "project", features: ["Part Swapping", "Texture Changes", "Price Calculation", "AR View"], popular: true },
                { name: "Enterprise", price: 250000, originalPrice: 400000, duration: "project", features: ["Complex Logic", "ERP Integration", "Custom UI/UX", "Multi-Platform"], popular: false },
            ]
        }
    ] as any[],
}

export function WebsiteCMS() {
    const [config, setConfig] = useState(DEFAULT_CONFIG)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch("/api/platform-settings")
            .then(res => res.json())
            .then(data => {
                if (data?.masterConfig) {
                    try {
                        const saved = JSON.parse(data.masterConfig)
                        setConfig({ ...DEFAULT_CONFIG, ...saved })
                    } catch (e) {
                        console.error("Failed to parse masterConfig", e)
                    }
                }
                setLoading(false)
            })
    }, [])

    const handleSave = async () => {
        const res = await fetch("/api/platform-settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ masterConfig: JSON.stringify(config) })
        })

        if (res.ok) {
            toast.success("Website updated successfully!")
        } else {
            toast.error("Failed to update website")
        }
    }

    const handleChange = (key: string, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    if (loading) return <div>Loading CMS...</div>

    return (
        <div className="grid grid-cols-1 gap-8 h-[calc(100vh-6rem)] transition-all duration-300">
            {/* Settings Column */}
            <div className="space-y-6 overflow-y-auto pr-4 pb-20 h-full">
                <div className="flex justify-between items-center bg-white p-4 sticky top-0 z-10 border-b">
                    <div>
                        <h3 className="text-lg font-medium">Website CMS</h3>
                        <p className="text-sm text-muted-foreground">Live edit your public website content.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleSave}>Publish Changes</Button>
                    </div>
                </div>

                <Tabs defaultValue="theme" className="px-1">
                    <TabsList className="flex-wrap h-auto sticky top-[80px] z-10 bg-gray-100/90 backdrop-blur w-full justify-start p-2 border-b">
                        <TabsTrigger value="theme">Theme & Colors</TabsTrigger>

                        <TabsTrigger value="hero">Hero Section</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="pricing">Pricing</TabsTrigger>
                        <TabsTrigger value="contact">Contact & Footer</TabsTrigger>
                        <TabsTrigger value="banner">Announcement Bar</TabsTrigger>
                        <TabsTrigger value="blog">Blog</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                        <TabsTrigger value="navigation">Navigation</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="media">Global Media</TabsTrigger>
                    </TabsList>

                    <TabsContent value="theme" className="space-y-4 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-purple-600" /> Theme Settings
                                </CardTitle>
                                <CardDescription>
                                    Global colors, fonts, and button roundness.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Primary Color</Label>
                                        <div className="flex gap-2">
                                            <Input type="color" className="w-12 h-10 p-1" value={config.primaryColor} onChange={(e) => handleChange('primaryColor', e.target.value)} />
                                            <Input value={config.primaryColor} onChange={(e) => handleChange('primaryColor', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Background Color</Label>
                                        <div className="flex gap-2">
                                            <Input type="color" className="w-12 h-10 p-1" value={config.backgroundColor} onChange={(e) => handleChange('backgroundColor', e.target.value)} />
                                            <Input value={config.backgroundColor} onChange={(e) => handleChange('backgroundColor', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Heading Font</Label>
                                    <Input value={config.headingFont} onChange={(e) => handleChange('headingFont', e.target.value)} placeholder="Inter, Roboto, sans-serif" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Border Radius (px)</Label>
                                    <Input type="number" value={config.borderRadius} onChange={(e) => handleChange('borderRadius', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>



                    <TabsContent value="hero" className="space-y-4 mt-4">
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-600" /> Hero Section
                                </CardTitle>
                                <CardDescription>
                                    Headlines, subtitles, and call-to-action buttons.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Main Title</Label>
                                    <Input value={config.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <Input value={config.heroSubtitle} onChange={(e) => handleChange('heroSubtitle', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Button Text</Label>
                                        <Input value={config.heroCtaText} onChange={(e) => handleChange('heroCtaText', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Button Link</Label>
                                        <Input value={config.heroCtaLink} onChange={(e) => handleChange('heroCtaLink', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Show "10k+ Users" Badge</Label>
                                    <Switch checked={config.heroShowStats} onCheckedChange={(c) => handleChange('heroShowStats', c)} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="services" className="space-y-4 mt-4">
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-blue-600" /> Services Grid
                                </CardTitle>
                                <CardDescription>
                                    Section titles and pricing visibility.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Section Title</Label>
                                    <Input value={config.servicesSectionTitle} onChange={(e) => handleChange('servicesSectionTitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Description</Label>
                                    <Input value={config.servicesSectionDesc} onChange={(e) => handleChange('servicesSectionDesc', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Grid Columns</Label>
                                        <Input type="number" min="2" max="4" value={config.servicesGridCols} onChange={(e) => handleChange('servicesGridCols', e.target.value)} />
                                    </div>
                                    <div className="flex items-center justify-between border p-3 rounded-md mt-6">
                                        <Label>Show Prices</Label>
                                        <Switch checked={config.servicesShowPrices} onCheckedChange={(c) => handleChange('servicesShowPrices', c)} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="pricing" className="space-y-4 mt-4">
                        <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-green-600" /> Pricing Plans
                                </CardTitle>
                                <CardDescription>
                                    Manage your service packages, prices, and discounts.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <PricingManager
                            data={config.pricingData || []}
                            onChange={(data) => handleChange('pricingData', data)}
                        />
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-4 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-green-600" /> Contact Info
                                </CardTitle>
                                <CardDescription>
                                    Contact info and social media links.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Support Email</Label>
                                        <Input value={config.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input value={config.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Footer Copyright Text</Label>
                                    <Input value={config.footerText} onChange={(e) => handleChange('footerText', e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Instagram URL</Label>
                                    <Input value={config.socialInstagram} onChange={(e) => handleChange('socialInstagram', e.target.value)} placeholder="https://instagram.com/..." />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="banner" className="space-y-4 mt-4">
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Type className="w-5 h-5 text-red-600" /> Announcement Bar
                                </CardTitle>
                                <CardDescription>
                                    Top announcement bar text and colors.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Enable Banner</Label>
                                    <Switch checked={config.bannerActive} onCheckedChange={(c) => handleChange('bannerActive', c)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Banner Text</Label>
                                    <Input value={config.bannerText} onChange={(e) => handleChange('bannerText', e.target.value)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Link URL</Label>
                                    <Input value={config.bannerLink} onChange={(e) => handleChange('bannerLink', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Background Color</Label>
                                        <div className="flex gap-2">
                                            <Input type="color" className="w-12 h-10 p-1" value={config.bannerBgColor} onChange={(e) => handleChange('bannerBgColor', e.target.value)} />
                                            <Input value={config.bannerBgColor} onChange={(e) => handleChange('bannerBgColor', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Text Color</Label>
                                        <div className="flex gap-2">
                                            <Input type="color" className="w-12 h-10 p-1" value={config.bannerTextColor} onChange={(e) => handleChange('bannerTextColor', e.target.value)} />
                                            <Input value={config.bannerTextColor} onChange={(e) => handleChange('bannerTextColor', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="blog" className="space-y-4 mt-4">
                        <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-pink-600" /> Blog Settings
                                </CardTitle>
                                <CardDescription>
                                    Configure the visibility and layout of your blog section.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Show Blog Section</Label>
                                    <Switch checked={config.blogEnabled} onCheckedChange={(c) => handleChange('blogEnabled', c)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Title</Label>
                                    <Input value={config.blogTitle} onChange={(e) => handleChange('blogTitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Subtitle</Label>
                                    <Input value={config.blogSubtitle} onChange={(e) => handleChange('blogSubtitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Posts Per Page</Label>
                                    <Input type="number" value={config.blogPostsPerPage} onChange={(e) => handleChange('blogPostsPerPage', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <BlogManager 
                            posts={config.blogPosts || []} 
                            onChange={(posts) => handleChange('blogPosts', posts)} 
                        />
                    </TabsContent>

                    <TabsContent value="faq" className="space-y-4 mt-4">
                         <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-orange-600" /> FAQ Settings
                                </CardTitle>
                                <CardDescription>
                                    Manage the appearance of your FAQ section.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Show FAQ Section</Label>
                                    <Switch checked={config.faqEnabled} onCheckedChange={(c) => handleChange('faqEnabled', c)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Title</Label>
                                    <Input value={config.faqTitle} onChange={(e) => handleChange('faqTitle', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Subtitle</Label>
                                    <Input value={config.faqSubtitle} onChange={(e) => handleChange('faqSubtitle', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <FAQManager 
                            items={config.faqItems || []} 
                            onChange={(items) => handleChange('faqItems', items)} 
                        />
                    </TabsContent>

                    <TabsContent value="testimonials" className="space-y-4 mt-4">
                         <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquareQuote className="w-5 h-5 text-teal-600" /> Testimonial Settings
                                </CardTitle>
                                <CardDescription>
                                    Configure the testimonial section on your landing page.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Show Testimonials</Label>
                                    <Switch checked={config.testimonialsEnabled} onCheckedChange={(c) => handleChange('testimonialsEnabled', c)} />
                                </div>
                                 <div className="space-y-2">
                                    <Label>Section Title</Label>
                                    <Input value={config.testimonialsTitle} onChange={(e) => handleChange('testimonialsTitle', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <TestimonialManager 
                            items={config.testimonials || []} 
                            onChange={(items) => handleChange('testimonials', items)} 
                        />
                    </TabsContent>

                    <TabsContent value="navigation" className="space-y-4 mt-4">
                         <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Map className="w-5 h-5 text-indigo-600" /> Navigation Links
                                </CardTitle>
                                <CardDescription>
                                    Customize the main navigation bar labels and options.
                                </CardDescription>
                            </CardHeader>
                             <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Login Button Text</Label>
                                    <Input value={config.navLoginText} onChange={(e) => handleChange('navLoginText', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Signup Button Text</Label>
                                    <Input value={config.navSignupText} onChange={(e) => handleChange('navSignupText', e.target.value)} />
                                </div>
                                 <div className="flex items-center justify-between border p-3 rounded-md">
                                    <Label>Show Search Bar</Label>
                                    <Switch checked={config.navShowSearch} onCheckedChange={(c) => handleChange('navShowSearch', c)} />
                                </div>
                            </CardContent>
                        </Card>

                        <NavigationManager 
                            items={config.navItems || []} 
                            config={config}
                            onItemsChange={(items) => handleChange('navItems', items)}
                            onConfigChange={handleChange}
                        />
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4 mt-4">
                         <SEOManager 
                            config={config.seoConfig || {
                                titleTemplate: '%s | TheNextChoose',
                                defaultDescription: 'Platform description',
                                keywords: [],
                                ogImage: '',
                                twitterHandle: '',
                                robotsTxt: ''
                            }} 
                            onChange={(seo) => handleChange('seoConfig', seo)} 
                        />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4 mt-4">
                         <Card className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-purple-600" /> Global Media
                                </CardTitle>
                                <CardDescription>
                                    Set your global logo and favicon.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Logo URL</Label>
                                    <Input value={config.logoUrl} onChange={(e) => handleChange('logoUrl', e.target.value)} placeholder="/images/logo.png" />
                                    <p className="text-xs text-muted-foreground">Path to your logo image.</p>
                                </div>
                                 <div className="space-y-2">
                                    <Label>Favicon URL</Label>
                                    <Input value={config.faviconUrl} onChange={(e) => handleChange('faviconUrl', e.target.value)} placeholder="/favicon.ico" />
                                     <p className="text-xs text-muted-foreground">Path to your favicon.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <MediaLibrary
                            assets={config.mediaAssets || []}
                            onChange={(assets) => handleChange('mediaAssets', assets)}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            
            {/* Live Preview Column */}
        </div>
    )
}
