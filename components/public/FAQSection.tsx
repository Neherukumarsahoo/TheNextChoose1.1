"use client"

import { useCMS } from "@/components/cms/CMSProvider"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
    const config = useCMS()
    const faqs = config?.faqItems || []

    if (!config?.faqEnabled || faqs.length === 0) return null

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{config.faqTitle || "FAQ"}</h2>
                    <p className="text-muted-foreground">{config.faqSubtitle || "Got questions?"}</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item: any) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
