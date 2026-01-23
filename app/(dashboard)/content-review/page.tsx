import { auth } from "@/lib/auth"
import { ContentReviewBoard } from "@/components/content-review/ContentReviewBoard"
import { redirect } from "next/navigation"

export default async function ContentReviewPage() {
    const session = await auth()
    if (!session?.user) redirect("/login")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Content Review Board</h1>
                <p className="text-muted-foreground mt-1 text-lg">
                    Approve or suggest changes to influencer content submissions.
                </p>
            </div>

            <ContentReviewBoard />
        </div>
    )
}
