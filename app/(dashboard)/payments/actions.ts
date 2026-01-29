"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function markPaymentAsPaid(paymentId: string) {
    await prisma.payment.update({
        where: { id: paymentId },
        data: { status: "PAID", paidDate: new Date() }
    })
    revalidatePath("/payments")
}
