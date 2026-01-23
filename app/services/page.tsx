import { Metadata } from "next"
import { ServicesPage } from "@/components/public/ServicesPage"

export const metadata: Metadata = {
  title: "Our Services | TheNextChoose",
  description: "Explore our 8 cutting-edge digital services: Influencer Marketing, Video Editing, AI Automation, Website Building, and 3D Services",
}

export default function Page() {
  return <ServicesPage />
}
