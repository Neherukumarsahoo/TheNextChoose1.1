import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const chains = await prisma.approvalChain.findMany({
            orderBy: { createdAt: "desc" }
        })
        return NextResponse.json(chains)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const chain = await prisma.approvalChain.create({
            data: {
                entityType: body.entityType,
                threshold: body.threshold || 0,
                requiredRoles: body.requiredRoles,
                active: true
            }
        })
        return NextResponse.json(chain)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        if (!id) return new NextResponse("Missing ID", { status: 400 })

        await prisma.approvalChain.delete({ where: { id } })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
