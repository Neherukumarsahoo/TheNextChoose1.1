import { Metadata } from "next"
import { PricingPage } from "@/components/public/PricingPage"

export const metadata: Metadata = {
  title: "Pricing | TheNextChoose",
  description: "Transparent pricing for all our services. Choose from Starter, Professional, or Enterprise packages tailored to your needs.",
}

export default function Page() {
  return <PricingPage />
}
