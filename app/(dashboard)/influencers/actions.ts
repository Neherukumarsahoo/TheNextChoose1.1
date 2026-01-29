"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function approveInfluencer(id: string) {
    await prisma.influencer.update({
        where: { id },
        data: { approved: true }
    })
    revalidatePath("/influencers")
}
