import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

        const body = await req.json()
        const { amount, reason, description, date } = body

        if (!amount || !reason || !date) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const investment = await prisma.investment.create({
            data: {
                amount: parseFloat(amount),
                reason,
                description,
                date: new Date(date),
                createdBy: session.user.id
            }
        })

        return NextResponse.json(investment)
    } catch (error) {
        console.error("Investment create error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
