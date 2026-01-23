import { Metadata } from "next"
import { ContactSubmissionsPanel } from "@/components/contact/ContactSubmissionsPanel"

export const metadata: Metadata = {
  title: "Contact Submissions | Admin",
  description: "Manage contact form submissions",
}

export default function Page() {
  return <ContactSubmissionsPanel />
}
