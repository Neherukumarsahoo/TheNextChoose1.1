import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { action, entityType, entityId, entityName, oldValue, newValue } = body

        // Get IP and user agent from headers
        const ipAddress = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown"
        const userAgent = request.headers.get("user-agent") || "unknown"

        await prisma.activityLog.create({
            data: {
                userId: session.user.id,
                action,
                entityType,
                entityId,
                entityName,
                oldValue: oldValue ? JSON.stringify(oldValue) : null,
                newValue: newValue ? JSON.stringify(newValue) : null,
                ipAddress,
                userAgent,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Activity log error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const entityType = searchParams.get("entityType")
        const entityId = searchParams.get("entityId")
        const limit = parseInt(searchParams.get("limit") || "50")

        const where: any = {}
        if (entityType) where.entityType = entityType
        if (entityId) where.entityId = entityId

        const logs = await prisma.activityLog.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
        })

        return NextResponse.json(logs)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
