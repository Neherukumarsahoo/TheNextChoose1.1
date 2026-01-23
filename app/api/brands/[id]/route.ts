import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "brand:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const brand = await prisma.brand.update({
            where: { id },
            data: {
                name: body.name,
                type: body.type,
                industry: body.industry,
                city: body.city,
                country: body.country,
                contactPerson: body.contactPerson,
                email: body.email,
                phone: body.phone,
                instagramId: body.instagramId,
                website: body.website,
                budgetRange: body.budgetRange,
                active: body.active,
            },
        })

        return NextResponse.json(brand)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "brand:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await prisma.brand.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
