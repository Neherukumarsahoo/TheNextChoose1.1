"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Copy, Check } from "lucide-react"
import { toast } from "sonner"

export function CampaignBriefGenerator() {
    const [open, setOpen] = useState(false)
    const [platform, setPlatform] = useState("")
    const [goal, setGoal] = useState("")
    const [generatedBrief, setGeneratedBrief] = useState("")
    const [copied, setCopied] = useState(false)

    const generateBrief = () => {
        if (!platform || !goal) return

        const templates: Record<string, string> = {
            Instagram: `**Campaign Brief: Instagram Collaboration**

**Goal:** ${goal}

**Deliverables:**
- 1x Instagram Reel (30-60s)
- 2x Instagram Stories (with Link Sticker)

**Key Messaging:**
- Focus on authenticity and personal experience.
- Use the hashtag #TheNextChoose.
- Call to Action: "Check the link in my bio!"

**Do's:**
- Show the product in use.
- Tag the brand account.

**Don'ts:**
- Mention competitor brands.
- Use copyrighted music without license.`,

            YouTube: `**Campaign Brief: YouTube Integration**

**Goal:** ${goal}

**Deliverables:**
- 1x 60s Integration dedicated segment.
- Link in description (top 3 lines).

**Key Points:**
- Hook the audience within the first 5 seconds of the segment.
- Clearly explain the value proposition.
- Detailed walk-through of the feature.

**CTA:** "Click the link in the description to get started."`,

            TikTok: `**Campaign Brief: TikTok Campaign**

**Goal:** ${goal}

**Concept:** 
High energy, viral-style content focusing on ${goal}.

**Requirements:**
- Use trending audio (if applicable).
- Text overlays for accessibility.
- Fast cuts and engaging transitions.

**Hashtags:** #Ad #TheNextChoose`
        }

        const template = templates[platform] || `**Campaign Brief**\n\n**Goal:** ${goal}\n\n[Insert Details Here]`
        setGeneratedBrief(template)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedBrief)
        setCopied(true)
        toast.success("Brief copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    AI Brief Generator
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Generate Campaign Brief</DialogTitle>
                    <DialogDescription>
                        Create a structured brief for your influencers in seconds.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Platform</Label>
                            <Select onValueChange={setPlatform}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Instagram">Instagram</SelectItem>
                                    <SelectItem value="YouTube">YouTube</SelectItem>
                                    <SelectItem value="TikTok">TikTok</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Campaign Goal</Label>
                            <Input
                                placeholder="e.g. Brand Awareness, Sales..."
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button onClick={generateBrief} disabled={!platform || !goal} className="w-full">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Brief
                    </Button>

                    {generatedBrief && (
                        <div className="relative mt-4">
                            <Label className="mb-2 block">Generated Result</Label>
                            <Textarea
                                className="min-h-[200px] font-mono text-sm"
                                value={generatedBrief}
                                readOnly
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-8 right-2 h-8 w-8"
                                onClick={copyToClipboard}
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
