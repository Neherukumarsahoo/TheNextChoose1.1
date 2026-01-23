import { Metadata } from "next"
import { ResourceLibraryPage } from "@/components/public/ResourceLibraryPage"

export const metadata: Metadata = {
  title: "Resource Library | TheNextChoose",
  description: "Download free e-books, templates, guides, and case studies to help grow your business",
}

export default function Page() {
  return <ResourceLibraryPage />
}
