import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await auth()
    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const permissions = await prisma.rolePermission.findMany()
        return NextResponse.json(permissions)
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
        const { role, resource, action, allowed } = body

        const permission = await prisma.rolePermission.upsert({
            where: {
                role_resource_action: { role, resource, action }
            },
            update: { allowed },
            create: { role, resource, action, allowed }
        })

        return NextResponse.json(permission)
    } catch (error) {
        console.error("Failed to update permission:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
