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

    const invoiceData = {
        invoiceNumber: `INV-${payment.id.slice(-6).toUpperCase()}`,
        date: payment.createdAt.toLocaleDateString(),
        dueDate: payment.dueDate.toLocaleDateString(),
        brandName: payment.campaign.brand.name,
        brandAddress: payment.campaign.brand.city ? `${payment.campaign.brand.city}, ${payment.campaign.brand.country || ''}` : undefined,
        items: [
            {
                description: `Campaign Payment: ${payment.campaign.name} (${payment.type})`,
                quantity: 1,
                price: payment.amount
            }
        ],
        total: payment.amount
    }

    return <InvoiceTemplate data={invoiceData} />
}
