import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { InvoiceTemplate } from "@/components/payments/InvoiceTemplate"
import { redirect } from "next/navigation"

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user) redirect("/login")

    const { id } = await params

    const payment = await prisma.payment.findUnique({
        where: { id },
        include: {
            campaign: {
                include: {
                    brand: true
                }
            }
        }
    })

    if (!payment) return <div>Invoice not found</div>

    const brand = payment.campaign?.brand

    const invoiceData = {
        invoiceNumber: `INV-${payment.id.slice(-6).toUpperCase()}`,
        date: payment.createdAt.toLocaleDateString(),
        dueDate: payment.dueDate.toLocaleDateString(),
        brandName: brand?.name || "N/A",
        brandAddress: brand?.city ? `${brand.city}, ${brand.country || ''}` : undefined,
        items: [
            {
                description: payment.campaign
                    ? `Campaign Payment: ${payment.campaign.name} (${payment.type})`
                    : `Payment: ${payment.type}`,
                quantity: 1,
                price: payment.amount
            }
        ],
        total: payment.amount
    }

    return <InvoiceTemplate data={invoiceData} />
}
