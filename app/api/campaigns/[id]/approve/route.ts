import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canApproveCampaign } from "@/lib/permissions"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !canApproveCampaign(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const campaign = await prisma.campaign.update({
            where: { id },
            data: {
                approved: true,
                status: "ACTIVE",
            },
        })

        return NextResponse.redirect(new URL(`/campaigns/${id}`, request.url))
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
