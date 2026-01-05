import { create } from 'zustand';
import { supabase } from '../supabase/client';
import type { UserProfile } from '../types';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
    user: Session['user'] | null;
    profile: UserProfile | null;
    loading: boolean;
    itemLoading: boolean;
    checkSession: () => Promise<void>;
    signIn: () => Promise<{ error: string }>;
    signOut: () => Promise<void>;
    fetchProfile: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: null,
    loading: true,
    itemLoading: false,

    checkSession: async () => {
        set({ loading: true });
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                set({ user: session.user });
                await useAuthStore.getState().fetchProfile(session.user.id);
            } else {
                set({ user: null, profile: null, loading: false });
            }
        } catch (error) {
            console.error('Session check failed', error);
            set({ user: null, profile: null, loading: false });
        }
    },

    fetchProfile: async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                set({ profile: null, loading: false });
            } else {
                console.log('Fetched Profile:', data);
                set({ profile: data, loading: false });
            }
        } catch (error) {
            console.error('Exception fetching profile:', error);
            set({ profile: null, loading: false });
        }
    },

    signIn: async () => {
        // This is a placeholder for Magic Link for simplicity, or we use Password?
        // User requested "Login" and "Register", implying email/password usually.
        // I will assume Email/Password for now as Supabase default.
        return { error: 'Use direct supabase auth calls in components for now to handle errors better' };
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
    },
}));
