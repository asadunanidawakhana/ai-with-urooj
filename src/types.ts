export interface User {
    id: string;
    email?: string;
    role?: 'admin' | 'user';
}

export interface UserProfile {
    id: string;
    full_name: string;
    email?: string;
    whatsapp?: string; // Updated from phone
    role: 'admin' | 'user';
    created_at: string;
}

export interface Plan {
    id: string;
    name: string;
    title?: string; // Legacy support
    description: string;
    price: number;
    price_monthly?: number; // Legacy
    price_yearly?: number; // Legacy
    interval: string;
    features: string[];
    is_active: boolean;
    is_popular?: boolean;
}

export interface Coupon {
    id: string;
    code: string;
    discount_percent: number;
    discount_value?: number; // Legacy
    discount_type?: string; // Legacy
    max_uses: number;
    current_uses: number;
    expires_at: string;
    is_active: boolean;
}

export interface Order {
    id: string;
    user_id: string;
    plan_id: string;
    total_amount: number;
    final_price?: number; // Legacy
    status: 'pending' | 'completed' | 'cancelled' | 'approved' | 'rejected';
    billing_cycle?: string;
    payment_details?: any; // Legacy
    created_at: string;
    // Relations
    profiles?: UserProfile;
    plans?: Plan;
    payments?: Payment[]; // New relation
}

export interface PaymentMethod {
    id: string;
    method_name: string;
    account_number: string;
    account_name: string;
    instructions?: string;
    is_active: boolean;
}

export interface Payment {
    id: string;
    order_id: string;
    payment_method_id: string;
    transaction_id: string;
    screenshot_url: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at: string;
}
