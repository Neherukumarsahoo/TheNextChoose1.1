import { Metadata } from "next"
import { BlogPage } from "@/components/public/BlogPage"

export const metadata: Metadata = {
  title: "Blog | TheNextChoose",
  description: "Stay updated with the latest trends in digital marketing, video editing, AI automation, web development, and 3D visualization",
}

export default function Page() {
  return <BlogPage />
}
