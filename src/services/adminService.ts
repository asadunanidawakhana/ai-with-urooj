import { supabase } from '../supabase/client';
import type { Plan, Coupon, PaymentMethod, UserProfile } from '../types';

export const AdminService = {
    // Dashboard Stats
    async getDashboardStats() {
        const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

        // Revenue calculation
        const { data: approvedOrders } = await supabase.from('orders').select('final_price').eq('status', 'approved');
        const revenue = approvedOrders?.reduce((acc, curr) => acc + Number(curr.final_price), 0) || 0;

        const { count: pendingOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending');

        return {
            users: usersCount || 0,
            orders: ordersCount || 0,
            revenue,
            pending: pendingOrders || 0,
        };
    },

    // Plans Management
    async getAllPlans() {
        const { data, error } = await supabase.from('plans').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as Plan[];
    },

    async updatePlan(id: string, updates: Partial<Plan>) {
        const { error } = await supabase.from('plans').update(updates).eq('id', id);
        if (error) throw error;
    },

    async createPlan(plan: Omit<Plan, 'id' | 'created_at'>) {
        const { data, error } = await supabase.from('plans').insert([plan]).select();
        if (error) throw error;
        return data;
    },

    // Orders Management
    async getOrders(status?: string) {
        let query = supabase.from('orders').select('*, plan:plans(*), user:profiles(*)').order('created_at', { ascending: false });
        if (status) {
            query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data; // Types might need adjustment if using joined tables
    },

    async getOrderDetails(orderId: string) {
        const { data, error } = await supabase
            .from('orders')
            .select('*, plan:plans(*), user:profiles(*), payments(*)')
            .eq('id', orderId)
            .single();
        if (error) throw error;
        return data;
    },

    async updateOrderStatus(orderId: string, status: 'approved' | 'rejected' | 'pending') {
        const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
        if (error) throw error;

        // Also update payment status if exists
        if (status === 'approved' || status === 'rejected') {
            await supabase.from('payments').update({ status }).eq('order_id', orderId);
        }
    },

    // Coupons
    async getCoupons() {
        const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as Coupon[];
    },

    async createCoupon(coupon: Omit<Coupon, 'id' | 'created_at'>) {
        const { data, error } = await supabase.from('coupons').insert([coupon]).select();
        if (error) throw error;
        return data;
    },

    async deleteCoupon(id: string) {
        const { error } = await supabase.from('coupons').delete().eq('id', id);
        if (error) throw error;
    },

    // Users
    async getUsers() {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as UserProfile[];
    },

    // Payment Methods
    async getPaymentMethods() {
        const { data, error } = await supabase.from('payment_methods').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        return data as PaymentMethod[];
    },

    async updatePaymentMethod(id: string, updates: Partial<PaymentMethod>) {
        const { error } = await supabase.from('payment_methods').update(updates).eq('id', id);
        if (error) throw error;
    },

    async createPaymentMethod(method: Omit<PaymentMethod, 'id' | 'created_at'>) {
        const { error } = await supabase.from('payment_methods').insert([method]);
        if (error) throw error;
    }
};
