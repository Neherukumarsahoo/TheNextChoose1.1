import { prisma } from "@/lib/db"
import { notFound, redirect } from "next/navigation"
import { InfluencerForm } from "@/components/forms/InfluencerForm"

interface PageProps {
    params: Promise<{ id: string }>
}

async function getInfluencer(id: string) {
    const influencer = await prisma.influencer.findUnique({
        where: { id },
    })

    if (!influencer) {
        notFound()
    }

    return influencer
}

export default async function EditInfluencerPage({ params }: PageProps) {
    const { id } = await params
    const influencer = await getInfluencer(id)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Influencer</h1>
                <p className="text-muted-foreground mt-1">
                    Update influencer information
                </p>
            </div>

            <InfluencerForm influencer={influencer} mode="edit" />
        </div>
    )
}
