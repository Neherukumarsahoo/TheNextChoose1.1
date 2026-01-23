import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || "PENDING"

    try {
        const submissions = await prisma.contentSubmission.findMany({
            where: { status },
            include: {
                campaignInfluencer: {
                    include: {
                        campaign: { include: { brand: true } },
                        influencer: true
                    }
                }
            },
            orderBy: { submittedAt: "desc" }
        })

        return NextResponse.json(submissions)
    } catch (error) {
        console.error("Failed to fetch submissions:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await request.json()
        const { campaignInfluencerId, fileUrl } = body

        if (!campaignInfluencerId || !fileUrl) {
            return new NextResponse("Missing fields", { status: 400 })
        }

        const submission = await prisma.contentSubmission.create({
            data: {
                campaignInfluencerId,
                fileUrl,
                status: "PENDING"
            }
        })

        return NextResponse.json(submission)
    } catch (error) {
        console.error("Failed to create submission:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
