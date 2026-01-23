import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "campaign:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        // Get original campaign with influencers
        const originalCampaign = await prisma.campaign.findUnique({
            where: { id },
            include: {
                influencers: true,
            },
        })

        if (!originalCampaign) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
        }

        // Create new campaign with same data
        const newCampaign = await prisma.campaign.create({
            data: {
                name: body.name || `${originalCampaign.name} (Copy)`,
                brandId: originalCampaign.brandId,
                objective: originalCampaign.objective,
                platform: originalCampaign.platform,
                contentType: originalCampaign.contentType,
                startDate: new Date(),
                endDate: originalCampaign.endDate ? new Date(Date.now() + (originalCampaign.endDate.getTime() - originalCampaign.startDate.getTime())) : null,
                totalAmount: originalCampaign.totalAmount,
                status: "DRAFT",
                approved: false,
                influencers: {
                    create: originalCampaign.influencers.map(inf => ({
                        influencerId: inf.influencerId,
                        price: inf.price,
                        deliverables: inf.deliverables,
                        status: "ASSIGNED",
                    })),
                },
            },
        })

        return NextResponse.json(newCampaign, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
