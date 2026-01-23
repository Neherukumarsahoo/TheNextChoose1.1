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

        const influencers = await prisma.influencer.findMany({
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(influencers)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "influencer:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const influencer = await prisma.influencer.create({
            data: {
                name: body.name,
                instagramId: body.instagramId,
                profileLink: body.profileLink,
                category: body.category,
                city: body.city,
                country: body.country,
                followers: body.followers,
                avgViews: body.avgViews,
                engagementRate: body.engagementRate,
                reelPrice: body.reelPrice,
                storyPrice: body.storyPrice,
                postPrice: body.postPrice,
                active: true,
                approved: false,
            },
        })

        return NextResponse.json(influencer, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
