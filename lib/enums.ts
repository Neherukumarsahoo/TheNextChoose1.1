export const Role = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN"
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const CampaignStatus = {
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED"
} as const;
export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];

export const PaymentStatus = {
    PENDING: "PENDING",
    PAID: "PAID",
    HOLD: "HOLD"
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentType = {
    BRAND_PAYMENT: "BRAND_PAYMENT",
    INFLUENCER_PAYOUT: "INFLUENCER_PAYOUT"
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const InfluencerStatus = {
    ASSIGNED: "ASSIGNED",
    CONTENT_SUBMITTED: "CONTENT_SUBMITTED",
    APPROVED: "APPROVED",
    POSTED: "POSTED"
} as const;
export type InfluencerStatus = (typeof InfluencerStatus)[keyof typeof InfluencerStatus];
