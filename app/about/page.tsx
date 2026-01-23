import { Metadata } from "next"
import { AboutPage } from "@/components/public/AboutPage"

export const metadata: Metadata = {
  title: "About Us | TheNextChoose",
  description: "Learn about TheNextChoose's mission, vision, team, and the cutting-edge technologies we use to deliver exceptional digital solutions",
}

export default function Page() {
  return <AboutPage />
}
