import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const influencer = await prisma.influencer.findUnique({
            where: { id },
        })

        if (!influencer) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        return NextResponse.json(influencer)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "influencer:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const influencer = await prisma.influencer.update({
            where: { id },
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
                active: body.active,
            },
        })

        return NextResponse.json(influencer)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "influencer:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await prisma.influencer.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
