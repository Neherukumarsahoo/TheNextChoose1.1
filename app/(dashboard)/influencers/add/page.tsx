import { InfluencerForm } from "@/components/forms/InfluencerForm"

export default function AddInfluencerPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add New Influencer</h1>
                <p className="text-muted-foreground mt-1">
                    Onboard a new creator to your network
                </p>
            </div>

            <InfluencerForm mode="create" />
        </div>
    )
}
