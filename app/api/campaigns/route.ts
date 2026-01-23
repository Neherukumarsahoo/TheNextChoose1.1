import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const campaigns = await prisma.campaign.findMany({
            include: {
                brand: true,
                influencers: {
                    include: {
                        influencer: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(campaigns)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "campaign:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const totalAmount = body.influencers.reduce(
            (sum: number, inf: any) => sum + inf.price,
            0
        )

        const campaign = await prisma.campaign.create({
            data: {
                name: body.name,
                brandId: body.brandId,
                objective: body.objective,
                platform: body.platform,
                contentType: body.contentType,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                totalAmount,
                status: "DRAFT",
                approved: false,
                influencers: {
                    create: body.influencers.map((inf: any) => ({
                        influencerId: inf.influencerId,
                        price: inf.price,
                        status: "ASSIGNED",
                    })),
                },
            },
            include: {
                influencers: true,
            },
        })

        return NextResponse.json(campaign, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
