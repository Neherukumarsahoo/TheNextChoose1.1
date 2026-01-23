import { Metadata } from "next"
import { ProfilePage } from "@/components/public/ProfilePage"

export const metadata: Metadata = {
  title: "Profile | TheNextChoose",
  description: "Manage your profile information",
}

export default function Page() {
  return <ProfilePage />
}
