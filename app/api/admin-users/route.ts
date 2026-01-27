import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canManageAdmins } from "@/lib/permissions"
import bcrypt from "bcryptjs"

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

export async function POST(request: NextRequest) {
    const session = await auth()

    if (!session?.user || !canManageAdmins(session.user.role)) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await request.json()
        const { name, email, password, role } = body

        if (!name || !email || !password || !role) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const existingUser = await prisma.adminUser.findUnique({
            where: { email }
        })

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.adminUser.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                active: true
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        })

        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        console.error("Failed to create admin user:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
