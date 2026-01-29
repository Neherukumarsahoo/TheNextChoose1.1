import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url)
        const type = searchParams.get("type") // "brand" or "influencer"
        const query = searchParams.get("query") || ""

        console.log(`[Suggestions API] Fetching: type=${type}, query="${query}"`)

        if (type === "brand") {
            const brands = await prisma.brand.findMany({
                where: {
                    name: { contains: query }
                },
                select: { id: true, name: true },
                take: 5
            })
            console.log(`[Suggestions API] Found ${brands.length} brands`)
            return NextResponse.json(brands)
        } else if (type === "influencer") {
            const influencers = await prisma.influencer.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { instagramId: { contains: query } }
                    ]
                },
                select: { id: true, name: true, instagramId: true },
                take: 5
            })
            console.log(`[Suggestions API] Found ${influencers.length} influencers`)
            return NextResponse.json(influencers)
        }

        return NextResponse.json([])
    } catch (error) {
        console.error("[Suggestions API Error]:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
