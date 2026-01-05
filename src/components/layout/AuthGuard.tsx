import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAdmin = false }) => {
    const { user, profile, loading } = useAuthStore();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && profile?.role !== 'admin') {
        console.warn('AuthGuard: Access denied. RequireAdmin: true', {
            userEmail: user?.email,
            profileRole: profile?.role,
            profileId: profile?.id
        });
        return <Navigate to="/user/dashboard" replace />;
    }

    return <>{children}</>;
};
