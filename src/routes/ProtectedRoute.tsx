import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { canAccessRoute, ROLE_META } from '../lib/permissions';
import type { Role } from '../lib/permissions';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

/* ─── Access Denied Page ─── */
const AccessDenied = ({ userRole }: { userRole: Role }) => {
    const meta = ROLE_META[userRole];
    return (
        <div className="h-full flex items-center justify-center animate-scale-in p-6">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-10 h-10 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                    Your current role does not have permission to access this section.
                </p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${meta.bgColor} ${meta.color}`}>
                    <span>{meta.icon}</span>
                    {meta.label}
                </div>
                <p className="text-text-muted text-xs mt-4">
                    Contact your Super Admin to request elevated access.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-sm text-text-secondary hover:text-white hover:bg-surface-hover transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user) return null;

    // SUPER_ADMIN always passes
    if (user.role === 'SUPER_ADMIN') {
        return <>{children}</>;
    }

    // Check explicit allowedRoles prop
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <AccessDenied userRole={user.role} />;
    }

    // Check route-based permissions
    if (!canAccessRoute(user.role, location.pathname)) {
        return <AccessDenied userRole={user.role} />;
    }

    return <>{children}</>;
};
