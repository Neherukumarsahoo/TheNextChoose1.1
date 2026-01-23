import { Metadata } from "next"
import { ContactPage } from "@/components/public/ContactPage"

export const metadata: Metadata = {
  title: "Contact Us | TheNextChoose",
  description: "Get in touch with TheNextChoose for your digital service needs. Contact us for influencer marketing, video editing, AI automation, web development, and 3D services",
}

export default function Page() {
  return <ContactPage />
}
