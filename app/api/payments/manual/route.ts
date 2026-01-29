import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

        const body = await req.json()
        const { id, influencerId, influencerName, brandId, brandName, totalAmount, payoutAmount, notes } = body

        console.log(`[Manual Pmt POST] ID=${id}, Influencer=${influencerName}, Brand=${brandName}, Total=${totalAmount}`)

        if (totalAmount === undefined || payoutAmount === undefined) {
            return new NextResponse("Missing amount fields", { status: 400 })
        }

        const profit = totalAmount - payoutAmount
        const margin = totalAmount > 0 ? (profit / totalAmount) * 100 : 0

        if (id) {
            // EDIT MODE
            console.log(`[Manual Pmt POST] Entering Edit Mode for ID: ${id}`)
            const existing = await prisma.manualTransaction.findUnique({
                where: { id },
                include: { payments: true }
            })

            if (!existing) {
                console.warn(`[Manual Pmt POST] Transaction ${id} not found`)
                return new NextResponse("Not found", { status: 404 })
            }

            await prisma.$transaction([
                prisma.manualTransaction.update({
                    where: { id },
                    data: {
                        influencerId,
                        influencerName,
                        brandId,
                        brandName,
                        totalAmount,
                        payoutAmount,
                        profit,
                        margin,
                        notes
                    }
                }),
                // Update associated payments
                ...existing.payments.map(p => prisma.payment.update({
                    where: { id: p.id },
                    data: {
                        amount: p.type === "BRAND_PAYMENT" ? totalAmount : payoutAmount,
                        influencerId: influencerId || null,
                        notes: `Manual Entry (${p.type === "BRAND_PAYMENT" ? "Revenue" : "Payout"}) - ${notes}`,
                        updatedAt: new Date()
                    }
                }))
            ])

            console.log(`[Manual Pmt POST] Successfully updated ID: ${id}`)
            return NextResponse.json({ success: true, id })
        }

        // CREATE MODE
        console.log(`[Manual Pmt POST] Entering Create Mode`)
        const manualTx = await prisma.manualTransaction.create({
            data: {
                influencerId,
                influencerName,
                brandId,
                brandName,
                totalAmount,
                payoutAmount,
                profit,
                margin,
                notes,
                payments: {
                    create: [
                        {
                            type: "BRAND_PAYMENT",
                            amount: totalAmount,
                            status: "PAID",
                            paidDate: new Date(),
                            dueDate: new Date(),
                            notes: `Manual Entry (Revenue) - ${notes}`,
                            influencerId: influencerId || null,
                        },
                        {
                            type: "INFLUENCER_PAYOUT",
                            amount: payoutAmount,
                            status: "PENDING",
                            dueDate: new Date(),
                            notes: `Manual Entry (Payout) - ${notes}`,
                            influencerId: influencerId || null,
                        }
                    ]
                }
            }
        })

        console.log(`[Manual Pmt POST] Successfully created ManualTransaction: ${manualTx.id}`)
        return NextResponse.json({ success: true, id: manualTx.id })
    } catch (error) {
        console.error("[Manual Pmt POST Error]:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        console.log(`[Manual Pmt DELETE] Attempting to delete ID: ${id}`)

        if (!id) return new NextResponse("Missing id", { status: 400 })

        // Check if exists first for better logging
        const existing = await prisma.manualTransaction.findUnique({ where: { id } })
        if (!existing) {
            console.warn(`[Manual Pmt DELETE] Transaction ${id} not found`)
            return new NextResponse("Transaction not found", { status: 404 })
        }

        // Prisma schema onDelete: Cascade will handle Payment deletion
        await prisma.manualTransaction.delete({
            where: { id }
        })

        console.log(`[Manual Pmt DELETE] Successfully deleted ID: ${id}`)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Manual Pmt DELETE Error]:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

