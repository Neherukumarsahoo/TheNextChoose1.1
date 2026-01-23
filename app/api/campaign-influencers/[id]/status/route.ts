import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "campaign:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const campaignInfluencer = await prisma.campaignInfluencer.update({
            where: { id },
            data: { status: body.status },
        })

        return NextResponse.json(campaignInfluencer)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
