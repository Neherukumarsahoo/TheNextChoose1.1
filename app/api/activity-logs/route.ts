import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
    const session = await auth()

    // Allow any authenticated user to log activity
    // But verify they are an admin/influencer/brand if needed
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { action, entityType, entityId, entityName, oldValue, newValue } = body

        await prisma.activityLog.create({
            data: {
                userId: session.user.id,
                action,
                entityType,
                entityId,
                entityName,
                oldValue: typeof oldValue === 'object' ? JSON.stringify(oldValue) : oldValue,
                newValue: typeof newValue === 'object' ? JSON.stringify(newValue) : newValue,
                ipAddress: request.headers.get("x-forwarded-for") || "unknown",
                userAgent: request.headers.get("user-agent"),
            }
        })

        return new NextResponse("Log created", { status: 201 })
    } catch (error) {
        console.error("Failed to create log:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    const session = await auth()

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get("entityType")
    const action = searchParams.get("action")
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const whereClause: any = {}

    if (entityType && entityType !== 'all') whereClause.entityType = entityType
    if (action && action !== 'all') whereClause.action = { contains: action }
    if (userId && userId !== 'all') whereClause.userId = userId

    if (startDate || endDate) {
        whereClause.createdAt = {}
        if (startDate) whereClause.createdAt.gte = new Date(startDate)
        if (endDate) whereClause.createdAt.lte = new Date(endDate)
    }

    try {
        const logs = await prisma.activityLog.findMany({
            where: whereClause,
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
            take: 100,
        })

        return NextResponse.json(logs)
    } catch (error) {
        console.error("Failed to fetch logs:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
