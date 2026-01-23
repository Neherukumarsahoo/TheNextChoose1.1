import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canManageAdmins } from "@/lib/permissions"

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    const { id } = await params

    if (!session?.user || !canManageAdmins(session.user.role)) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Protect super admin from deleting themselves
    if (session.user.id === id) {
        return new NextResponse("Cannot delete yourself", { status: 400 })
    }

    try {
        await prisma.adminUser.delete({
            where: { id },
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error("Failed to delete admin:", error)
        return new NextResponse("Failed to delete admin user", { status: 500 })
    }
}
