import { Metadata } from "next"
import { NewsletterSubscribersPanel } from "@/components/newsletter/NewsletterSubscribersPanel"

export const metadata: Metadata = {
  title: "Newsletter Subscribers | Admin",
  description: "View and manage newsletter subscribers",
}

export default function Page() {
  return <NewsletterSubscribersPanel />
}
