import { Metadata } from "next"
import { PublicAuthPage } from "@/components/public/PublicAuthPage"

export const metadata: Metadata = {
  title: "Sign Up | TheNextChoose",
  description: "Create your TheNextChoose account",
}

export default function Page() {
  return <PublicAuthPage mode="signup" />
}
