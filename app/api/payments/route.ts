import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "payment:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()

        const payment = await prisma.payment.create({
            data: {
                campaignId: body.campaignId,
                type: body.type,
                amount: body.amount,
                advance: body.advance || 0,
                balance: body.balance || 0,
                status: body.status,
                dueDate: new Date(body.dueDate),
                notes: body.notes,
            },
        })

        return NextResponse.json(payment, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "payment:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { id, ...data } = body

        const payment = await prisma.payment.update({
            where: { id },
            data: {
                amount: data.amount,
                advance: data.advance,
                balance: data.balance,
                status: data.status,
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
                notes: data.notes,
            },
        })

        return NextResponse.json(payment)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "payment:edit")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Missing payment ID" }, { status: 400 })
        }

        await prisma.payment.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
