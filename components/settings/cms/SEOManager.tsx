"use client"

import { useState } from "react"
import { Globe, Search, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type SEOConfig = {
    titleTemplate: string
    defaultDescription: string
    keywords: string[]
    ogImage: string
    twitterHandle: string
    robotsTxt: string
}

interface SEOManagerProps {
    config: SEOConfig
    onChange: (config: SEOConfig) => void
}

export function SEOManager({ config, onChange }: SEOManagerProps) {
    const handleChange = (key: keyof SEOConfig, value: any) => {
        onChange({ ...config, [key]: value })
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-blue-600" /> General SEO
                        </CardTitle>
                        <CardDescription>
                            Configure how your site appears in search engines.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title Template</Label>
                            <Input 
                                value={config.titleTemplate} 
                                onChange={(e) => handleChange('titleTemplate', e.target.value)} 
                                placeholder="%s | My Site" 
                            />
                            <p className="text-xs text-muted-foreground">Use %s as a placeholder for the page title.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Default Description</Label>
                            <Textarea 
                                value={config.defaultDescription} 
                                onChange={(e) => handleChange('defaultDescription', e.target.value)} 
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Keywords (comma separated)</Label>
                            <Input 
                                value={config.keywords?.join(', ')} 
                                onChange={(e) => handleChange('keywords', e.target.value.split(',').map(k => k.trim()))} 
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-purple-600" /> Social Sharing (Open Graph)
                        </CardTitle>
                        <CardDescription>
                            Control how links look when shared on social media.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label>Default OG Image URL</Label>
                            <Input 
                                value={config.ogImage} 
                                onChange={(e) => handleChange('ogImage', e.target.value)} 
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Twitter Handle</Label>
                            <Input 
                                value={config.twitterHandle} 
                                onChange={(e) => handleChange('twitterHandle', e.target.value)} 
                                placeholder="@username"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5 text-slate-600" /> Advanced
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Robots.txt Content</Label>
                            <Textarea 
                                className="font-mono text-xs"
                                value={config.robotsTxt || "User-agent: *\nAllow: /"} 
                                onChange={(e) => handleChange('robotsTxt', e.target.value)} 
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="sticky top-6">
                     <h4 className="text-sm font-medium mb-4 text-muted-foreground">Live Previews</h4>
                    
                    {/* Google Preview */}
                    <Card className="mb-6 overflow-hidden">
                        <div className="bg-white p-4">
                            <div className="flex flex-col gap-1 max-w-[600px]">
                                <div className="flex items-center gap-2 text-sm text-[#202124]">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                                         <span className="text-[10px]">L</span>
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-[#202124]">example.com</span>
                                        <span className="text-[#5f6368] text-xs">https://example.com › home</span>
                                    </div>
                                    <div className="ml-auto text-slate-400">
                                        <span className="text-[10px]">⋮</span>
                                    </div>
                                </div>
                                <h3 className="text-[#1a0dab] text-xl font-normal hover:underline cursor-pointer truncate">
                                    {(config.titleTemplate || "Page Title").replace('%s', 'Home')}
                                </h3>
                                <p className="text-[#4d5156] text-sm leading-6 line-clamp-2">
                                    {config.defaultDescription || "This is how your website description will appear in Google search results. Make it catchy and relevant to improve click-through rates."}
                                </p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 border-t text-xs text-center text-muted-foreground">
                            Google Search Result Preview
                        </div>
                    </Card>

                    {/* Twitter/Facebook Preview */}
                    <Card className="overflow-hidden">
                        <div className="aspect-[1.91/1] bg-slate-100 relative group">
                            {config.ogImage ? (
                                <img src={config.ogImage} alt="OG" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Globe className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                        <div className="p-3 bg-[#f0f2f5] dark:bg-slate-800 border-t">
                             <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">EXAMPLE.COM</p>
                             <p className="font-bold text-sm leading-tight mb-1 truncate">{(config.titleTemplate || "Page Title").replace('%s', 'Home')}</p>
                             <p className="text-xs text-muted-foreground line-clamp-1">{config.defaultDescription}</p>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 border-t text-xs text-center text-muted-foreground">
                            Social Media Card Preview
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    )
}
