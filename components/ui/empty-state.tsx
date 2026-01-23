import { FileQuestion, Users, Building2, Megaphone, DollarSign } from "lucide-react"

interface EmptyStateProps {
    type: "influencers" | "brands" | "campaigns" | "payments" | "general"
    title?: string
    description?: string
    action?: React.ReactNode
}

export function EmptyState({ type, title, description, action }: EmptyStateProps) {
    const configs = {
        influencers: {
            icon: Users,
            defaultTitle: "No influencers yet",
            defaultDescription: "Get started by adding your first influencer to the network",
        },
        brands: {
            icon: Building2,
            defaultTitle: "No brands yet",
            defaultDescription: "Add your first client brand to start creating campaigns",
        },
        campaigns: {
            icon: Megaphone,
            defaultTitle: "No campaigns yet",
            defaultDescription: "Create your first campaign to start working with influencers",
        },
        payments: {
            icon: DollarSign,
            defaultTitle: "No payments yet",
            defaultDescription: "Payments will appear here once campaigns are active",
        },
        general: {
            icon: FileQuestion,
            defaultTitle: "No data found",
            defaultDescription: "Try adjusting your filters or search criteria",
        },
    }

    const config = configs[type]
    const Icon = config.icon

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
                <Icon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
                {title || config.defaultTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
                {description || config.defaultDescription}
            </p>
            {action}
        </div>
    )
}
