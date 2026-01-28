"use client"

import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface SEOPreviewProps {
    title: string
    description: string
    slug: string
}

export function SEOPreview({ title, description, slug }: SEOPreviewProps) {
    // Truncate logic to mimic Google
    const displayTitle = title.length > 60 ? title.substring(0, 60) + '...' : title
    const displayDesc = description.length > 160 ? description.substring(0, 160) + '...' : description
    const displayUrl = `https://thenextchoose.com/blog/${slug || 'your-slug-here'}`

    return (
        <Card className="p-4 bg-white dark:bg-slate-900 border overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground border-b pb-2">
                <Globe className="h-4 w-4" /> Google Search Preview
            </div>
            
            <div className="font-sans max-w-[600px]">
                {/* URL Part */}
                <div className="flex items-center gap-1.5 mb-1 cursor-pointer group">
                    <div className="h-7 w-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-500 overflow-hidden">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm text-[#202124] dark:text-[#dadce0]">TheNextChoose</span>
                        <span className="text-xs text-[#5f6368] dark:text-[#bdc1c6] truncate">{displayUrl}</span>
                    </div>
                </div>

                {/* Title Part */}
                <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate font-normal">
                    {displayTitle || "Your Page Title Goes Here"}
                </h3>

                {/* Description Part */}
                <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed mt-1">
                    {displayDesc || "This is how your description will appear in search results. Make it catchy and relevant to improve your click-through rate."}
                </p>
            </div>
        </Card>
    )
}
