import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15, params is a Promise in route handlers in some configs, but usually not unless async. Safe to treat as object in 14, but strict typing might demand Promise in 15.
) {
    // Handling params awaiting if necessary, though standard Next 14 uses object. 
    // Given the user is on Next 16 apparently (from previous turns context, though package.json verification pending), we should await.
    const { id } = await params

    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { stage } = body

        if (!stage) {
            return NextResponse.json({ error: "Stage is required" }, { status: 400 })
        }

        const brand = await prisma.brand.update({
            where: { id },
            data: { pipelineStage: stage }
        })

        return NextResponse.json(brand)
    } catch (error) {
        console.error("Pipeline update error:", error)
        return NextResponse.json({ error: "Failed to update pipeline stage" }, { status: 500 })
    }
}
