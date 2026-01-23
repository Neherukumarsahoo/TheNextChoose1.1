import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canManageAdmins } from "@/lib/permissions"

export async function GET(request: NextRequest) {
    const session = await auth()

    if (!session?.user || !canManageAdmins(session.user.role)) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const users = await prisma.adminUser.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                active: true,
                createdAt: true
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error("Failed to fetch admin users:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
