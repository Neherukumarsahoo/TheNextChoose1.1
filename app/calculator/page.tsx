import { Metadata } from "next"
import { PricingCalculatorPage } from "@/components/public/PricingCalculatorPage"

export const metadata: Metadata = {
  title: "Pricing Calculator | TheNextChoose",
  description: "Get an instant estimate for your digital service needs. Calculate pricing for influencer marketing, video editing, AI automation, web development, and 3D services",
}

export default function Page() {
  return <PricingCalculatorPage />
}
