import { Metadata } from "next"
import { ServiceComparisonPage } from "@/components/public/ServiceComparisonPage"

export const metadata: Metadata = {
  title: "Compare Services | TheNextChoose",
  description: "Compare our digital services side-by-side to find the perfect match for your business needs",
}

export default function Page() {
  return <ServiceComparisonPage />
}
