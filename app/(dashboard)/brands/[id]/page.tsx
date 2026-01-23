import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { BrandForm } from "@/components/forms/BrandForm"

interface PageProps {
    params: Promise<{ id: string }>
}

async function getBrand(id: string) {
    const brand = await prisma.brand.findUnique({
        where: { id },
    })

    if (!brand) {
        notFound()
    }

    return brand
}

export default async function EditBrandPage({ params }: PageProps) {
    const { id } = await params
    const brand = await getBrand(id)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Brand</h1>
                <p className="text-muted-foreground mt-1">
                    Update brand information
                </p>
            </div>

            <BrandForm brand={brand} mode="edit" />
        </div>
    )
}
