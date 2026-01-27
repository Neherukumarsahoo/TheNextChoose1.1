"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage({ params }: { params: { type: string } }) {
    const isBrand = params.type === 'brand'
    const [step, setStep] = useState('form') // form, success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            setStep('success')
            toast.success("Application submitted successfully!")
        }, 1000)
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                 <Card className="max-w-md w-full text-center p-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Received!</h2>
                    <p className="text-gray-600 mb-8">
                        Thanks for applying to join our network. Our team will review your details and get back to you within 24 hours.
                    </p>
                    <Link href="/">
                        <Button className="w-full">Return to Home</Button>
                    </Link>
                 </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 shadow-2xl rounded-2xl bg-white overflow-hidden">
                {/* Left Side: Hero */}
                <div className="bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute inset-0 pattern-grid opacity-10"></div>
                     <div className="relative z-10">
                         <div className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">
                             Join The Network
                         </div>
                         <h1 className="text-4xl font-bold mb-4">
                             {isBrand ? "Scale Your Brand" : "Monetize Your Influence"}
                         </h1>
                         <p className="text-gray-300 text-lg leading-relaxed">
                             Access premium campaigns, automated payments, and exclusive tools designed for {isBrand ? 'modern brands' : 'top-tier creators'}.
                         </p>
                     </div>
                     <div className="relative z-10 space-y-4">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">1</div>
                             <span className="font-medium">Create your profile</span>
                         </div>
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">2</div>
                             <span className="font-medium">Get verified in 24h</span>
                         </div>
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">3</div>
                             <span className="font-medium">Start {isBrand ? 'launching' : 'earning'}</span>
                         </div>
                     </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                        <p className="text-gray-500">Fill in your details below.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" required />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <Input id="email" type="email" required />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="handle">{isBrand ? 'Company Name' : 'Instagram Handle'}</Label>
                            <Input id="handle" required />
                        </div>

                        <Button type="submit" className="w-full mt-4 h-11 text-base group">
                            Submit Application 
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        
                        <p className="text-xs text-center text-gray-400 mt-4">
                            By clicking submit, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
