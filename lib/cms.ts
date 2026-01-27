import { prisma } from "@/lib/db"

export async function getCMSConfig() {
    try {
        const settings = await prisma.platformSettings.findFirst()
        if (settings?.masterConfig) {
            return JSON.parse(settings.masterConfig)
        }
    } catch (error) {
        console.error("Failed to load CMS config", error)
    }
    return null
}
