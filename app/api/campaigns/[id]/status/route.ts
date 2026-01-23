import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { status } = body

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 })
        }

        const campaign = await prisma.campaign.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json(campaign)
    } catch (error) {
        console.error("Campaign status update error:", error)
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
    }
}
