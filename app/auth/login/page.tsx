import { Metadata } from "next"
import { LoginPage } from "@/components/public/LoginPage"

export const metadata: Metadata = {
  title: "Login | TheNextChoose",
  description: "Login to your TheNextChoose account",
}

export default function Page() {
  return <LoginPage />
}
