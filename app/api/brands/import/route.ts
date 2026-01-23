import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { hasPermission } from "@/lib/permissions"
import { parse } from "csv-parse/sync"

interface BrandRecord {
    name: string
    type?: string
    industry?: string
    city?: string
    country?: string
    contactPerson?: string
    email?: string
    phone?: string
    instagramId?: string
    website?: string
    budgetRange?: string
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !hasPermission(session.user.role, "brand:create")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        const text = await file.text()
        const records = parse(text, {
            columns: true,
            skip_empty_lines: true,
        })

        let created = 0
        const errors: string[] = []

        for (const record of records as BrandRecord[]) {
            try {
                await prisma.brand.create({
                    data: {
                        name: record.name,
                        type: record.type || null,
                        industry: record.industry || null,
                        city: record.city || null,
                        country: record.country || null,
                        contactPerson: record.contactPerson || null,
                        email: record.email || null,
                        phone: record.phone || null,
                        instagramId: record.instagramId || null,
                        website: record.website || null,
                        budgetRange: record.budgetRange || null,
                        active: true,
                    },
                })
                created++
            } catch (error) {
                errors.push(`Failed to import ${record.name}: ${error}`)
            }
        }

        return NextResponse.json({
            count: created,
            total: records.length,
            errors: errors.length > 0 ? errors : undefined
        })
    } catch (error) {
        return NextResponse.json({
            error: "Failed to process CSV",
            message: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}
