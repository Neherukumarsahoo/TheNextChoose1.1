import { Metadata } from "next"
import { PortfolioPage } from "@/components/public/PortfolioPage"

export const metadata: Metadata = {
  title: "Portfolio | TheNextChoose",
  description: "Explore our portfolio of successful projects across influencer marketing, video editing, AI automation, website building, and 3D services",
}

export default function Page() {
  return <PortfolioPage />
}
