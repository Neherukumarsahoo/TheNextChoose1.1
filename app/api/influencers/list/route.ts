import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    const influencers = await prisma.influencer.findMany({
        where: { active: true },
        select: { id: true, name: true, instagramId: true },
        orderBy: { name: 'asc' }
    })

    return NextResponse.json(influencers)
}
