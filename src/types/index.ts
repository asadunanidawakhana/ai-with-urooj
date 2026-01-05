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
    name: string;
    description: string | null;
    price: number;
    interval: string;
    features: string[];
    image_url?: string;
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
    // first_name/last_name might be legacy or part of user joined data
    total_amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    created_at: string;
    billing_cycle?: string; // Legacy
    payment_details?: any; // Legacy

    // Relations
    plan?: Plan;
    user?: UserProfile;
    payments?: Payment[];
}

export interface PaymentMethod {
    id: string;
    method_name: string;
    account_number: string;
    account_name: string;
    is_active: boolean;
    instructions: string | null;
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
