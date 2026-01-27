import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    try {
        const settings = await prisma.platformSettings.findFirst()
        return NextResponse.json(settings)
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
        const settings = await prisma.platformSettings.findFirst()
        
        const updated = await prisma.platformSettings.upsert({
            where: { id: settings?.id || "default" },
            update: body,
            create: {
                id: "default",
                platformName: "TheNextChoose",
                commission: 10,
                currency: "INR",
                ...body
            }
        })
        



        return NextResponse.json(updated)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
