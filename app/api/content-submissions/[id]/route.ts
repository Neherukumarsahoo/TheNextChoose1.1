import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

    const { id } = await params

    try {
        const body = await request.json()
        const { status, feedback } = body

        if (!status || !["APPROVED", "REJECTED"].includes(status)) {
            return new NextResponse("Invalid status", { status: 400 })
        }

        const submission = await prisma.contentSubmission.update({
            where: { id },
            data: { status, feedback }
        })

        return NextResponse.json(submission)
    } catch (error) {
        console.error("Failed to update submission:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
