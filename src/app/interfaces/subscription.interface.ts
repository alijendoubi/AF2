export interface Subscription {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    paymentMethod?: PaymentMethod;
}

export enum SubscriptionPlan {
    FREE = 'free',
    BASIC = 'basic',
    PRO = 'pro',
    ENTERPRISE = 'enterprise'
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
    PENDING = 'pending'
}

export interface PaymentMethod {
    id: string;
    type: 'credit_card' | 'paypal';
    lastFour?: string;
    expiryDate?: string;
}

