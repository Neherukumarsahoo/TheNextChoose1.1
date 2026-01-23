import { Metadata } from "next"
import { PublicUsersPanel } from "@/components/users/PublicUsersPanel"

export const metadata: Metadata = {
  title: "Public Users | Admin",
  description: "View and manage public website users",
}

export default function Page() {
  return <PublicUsersPanel />
}
