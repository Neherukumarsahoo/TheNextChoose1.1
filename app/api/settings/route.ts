import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canEditSettings } from "@/lib/permissions"

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user || !canEditSettings(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const platformName = formData.get("platformName") as string
        const commission = parseFloat(formData.get("commission") as string)
        const currency = formData.get("currency") as string

        const settings = await prisma.platformSettings.update({
            where: { id: "settings" },
            data: {
                platformName,
                commission,
                currency,
            },
        })

        return NextResponse.redirect(new URL("/settings", request.url))
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
