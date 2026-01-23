import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { active: true },
            orderBy: { createdAt: "desc" }
        })
        return NextResponse.json(announcements)
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
        const announcement = await prisma.announcement.create({
            data: {
                message: body.message,
                type: body.type || "info",
                active: true
            }
        })
        return NextResponse.json(announcement)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { id, active } = body
        const announcement = await prisma.announcement.update({
            where: { id },
            data: { active }
        })
        return NextResponse.json(announcement)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
