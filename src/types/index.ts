export type UserRole = 'admin' | 'user';

export interface UserProfile {
    id: string;
    full_name: string | null;
    whatsapp_number: string | null;
    phone?: string; // Derived or alias for whatsapp_number
    role: UserRole;
    created_at: string;
}

export interface Plan {
    id: string;
    title: string;
    description: string | null;
    price_monthly: number;
    price_yearly: number;
    features: string[];
    is_active: boolean;
    created_at: string;
}

export interface Coupon {
    id: string;
    code: string;
    discount_type: 'flat' | 'percentage';
    discount_value: number;
    expiry_date: string | null;
    is_active: boolean;
    usage_count: number;
}

export interface Order {
    id: string;
    user_id: string;
    plan_id: string;
    final_price: number;
    first_name?: string;
    last_name?: string;
    total_amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    created_at: string;
    billing_cycle?: string;
    payment_details?: string | object;
    plan?: Plan; // Joined
    user?: UserProfile; // Joined
}

export interface PaymentMethod {
    id: string;
    method_name: string;
    account_number: string;
    account_name: string;
    is_active: boolean;
    instructions: string | null;
}
