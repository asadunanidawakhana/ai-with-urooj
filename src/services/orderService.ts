import { supabase } from '../supabase/client';
import type { Order, PaymentMethod } from '../types';

export const OrderService = {
    async createOrder(planId: string, userId: string, price: number) {
        const { data, error } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: userId,
                    plan_id: planId,
                    total_amount: price,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return data as Order;
    },

    async getOrderById(orderId: string) {
        const { data, error } = await supabase
            .from('orders')
            .select('*, plan:plans(*)')
            .eq('id', orderId)
            .single();

        if (error) throw error;
        return data as Order;
    },

    async getActivePaymentMethods() {
        const { data, error } = await supabase
            .from('payment_methods')
            .select('*')
            .eq('is_active', true);

        if (error) throw error;
        return data as PaymentMethod[];
    },

    async submitPayment(orderId: string, method: string, tid: string, screenshotUrl: string) {
        const { data: { user } } = await supabase.auth.getUser();
        console.log('Submit Payment Debug:', {
            userId: user?.id,
            orderId,
            method,
            tid
        });

        const { data, error } = await supabase
            .from('payments')
            .insert([
                {
                    order_id: orderId,
                    payment_method_id: method, // Fixed column name if needed, assuming schema uses payment_method_id
                    transaction_id: tid,
                    screenshot_url: screenshotUrl,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        // Note: Schema uses 'payment_method_id' but service used 'payment_method'. 
        // My schema has 'payment_method_id UUID REFERENCES...'.
        // The frontend might be sending a UUID.

        if (error) {
            console.error('Supabase Payment Insert Error:', error);
            throw error;
        }
        return data;
    },

    async uploadScreenshot(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('payment_proofs')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('payment_proofs').getPublicUrl(filePath);
        return data.publicUrl;
    },

    async validateCoupon(code: string) {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code)
            .eq('is_active', true)
            //.gte('expires_at', new Date().toISOString()) // Supabase filter
            .single();

        if (error) throw error;

        // Manual date check if needed, or rely on query
        if (data && new Date(data.expires_at) < new Date()) {
            throw new Error('Coupon expired');
        }

        return data;
    }
};
