import { Metadata } from "next"
import { PublicAuthPage } from "@/components/public/PublicAuthPage"

export const metadata: Metadata = {
  title: "Login | TheNextChoose",
  description: "Login to your TheNextChoose account",
}

export default function Page() {
  return <PublicAuthPage mode="login" />
}
