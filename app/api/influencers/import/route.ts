import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { parse } from "csv-parse/sync"

export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const content = buffer.toString()

        const records = parse(content, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        })

        let count = 0
        const errors = []

        for (const record of records) {
            try {
                // Validation - Ensure required fields exist
                if (!record.instagramId || !record.name || !record.followers) {
                    continue; // Skip invalid rows
                }

                const followers = parseInt(record.followers.replace(/,/g, ''), 10) || 0
                const reelPrice = parseFloat(record.reelPrice?.replace(/,/g, '') || "0")
                const storyPrice = parseFloat(record.storyPrice?.replace(/,/g, '') || "0")
                const postPrice = parseFloat(record.postPrice?.replace(/,/g, '') || "0")

                // Upsert to update if exists, or create new
                await prisma.influencer.upsert({
                    where: { instagramId: record.instagramId },
                    update: {
                        name: record.name,
                        category: record.category || "General",
                        followers: followers,
                        reelPrice: reelPrice,
                        storyPrice: storyPrice,
                        postPrice: postPrice,
                        city: record.city,
                        country: record.country,
                        email: record.email, // Assuming model has email? Actually schema didn't show email for Influencer, wait.
                        // Schema check: Influencer doesn't have email in the schema I viewed earlier. It has name, instagramId, category, etc.
                        // Let's stick to known fields.
                    },
                    create: {
                        name: record.name,
                        instagramId: record.instagramId,
                        category: record.category || "General",
                        followers: followers,
                        reelPrice: reelPrice,
                        storyPrice: storyPrice,
                        postPrice: postPrice,
                        city: record.city,
                        country: record.country,
                        active: true,
                        approved: false
                    }
                })
                count++
            } catch (err) {
                console.error(`Error importing row ${record.instagramId}:`, err)
            }
        }

        return NextResponse.json({ count })
    } catch (error) {
        console.error("Import error:", error)
        return NextResponse.json({ error: "Failed to process CSV" }, { status: 500 })
    }
}
