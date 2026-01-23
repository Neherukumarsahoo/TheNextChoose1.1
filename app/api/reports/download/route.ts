import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
    const session = await auth()
    if (!session?.user) { // Add role check if needed
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type")

    let data = ""
    let filename = `report-${type}-${new Date().toISOString().split('T')[0]}.csv`

    try {
        if (type === "influencers") {
            const influencers = await prisma.influencer.findMany()
            const header = "ID,Name,Instagram,Category,Followers,Rating,Status\n"
            const rows = influencers.map(i => 
                `"${i.id}","${i.name}","${i.instagramId}","${i.category}",${i.followers},${i.rating},${i.active ? 'Active' : 'Inactive'}`
            ).join("\n")
            data = header + rows
        } else if (type === "campaigns") {
            const campaigns = await prisma.campaign.findMany({ include: { brand: true } })
            const header = "ID,Name,Brand,Platform,Status,Start Date,Total Amount\n"
            const rows = campaigns.map(c => 
                `"${c.id}","${c.name}","${c.brand.name}","${c.platform}","${c.status}","${c.startDate.toISOString()}",${c.totalAmount}`
            ).join("\n")
            data = header + rows
        } else {
            return new NextResponse("Invalid report type", { status: 400 })
        }

        return new NextResponse(data, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="${filename}"`
            }
        })
    } catch (error) {
        console.error("Report generation error:", error)
        return new NextResponse("Failed to generate report", { status: 500 })
    }
}
