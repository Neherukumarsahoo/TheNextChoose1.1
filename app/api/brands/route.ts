import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const brands = await prisma.brand.findMany({
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(brands)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "brand:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const brand = await prisma.brand.create({
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
                active: true,
            },
        })

        return NextResponse.json(brand, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
