import { prisma } from "@/lib/db"
import { PaymentForm } from "@/components/forms/PaymentForm"

async function getCampaigns() {
    return await prisma.campaign.findMany({
        select: {
            id: true,
            name: true,
            brand: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            status: {
                in: ["ACTIVE", "COMPLETED"],
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })
}

export default async function CreatePaymentPage() {
    const campaigns = await getCampaigns()

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Create Payment</h1>
                <p className="text-muted-foreground mt-1">
                    Record a new payment transaction
                </p>
            </div>

            <PaymentForm mode="create" campaigns={campaigns} />
        </div>
    )
}
