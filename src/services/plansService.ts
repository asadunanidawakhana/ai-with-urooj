import { supabase } from '../supabase/client';
import type { Plan } from '../types';

export const PlansService = {
    async getActivePlans() {
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('is_active', true)
            .order('price', { ascending: true });

        if (error) throw error;
        return data as Plan[];
    },

    async getPlanById(id: string) {
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Plan;
    },
};
