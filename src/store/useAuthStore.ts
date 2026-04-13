import { create } from 'zustand';
import type { Role, Permission } from '../lib/permissions';
import { hasPermission as baseHasPermission } from '../lib/permissions';
export type { Role } from '../lib/permissions';

export interface CustomRole {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    createdAt: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role | string;
    title?: string;
    avatar?: string;
    lastLogin?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    customRoles: CustomRole[];

    // Auth actions
    login: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;

    // Custom Role actions
    createCustomRole: (role: Omit<CustomRole, 'id' | 'createdAt'>) => void;
    updateCustomRole: (id: string, updates: Partial<CustomRole>) => void;
    deleteCustomRole: (id: string) => void;

    // Permission wrapper
    checkPermission: (permission: Permission) => boolean;
}

function loadPersistedUser(): User | null {
    try {
        const raw = localStorage.getItem('auth_user');
        const token = localStorage.getItem('access_token');
        if (raw && token) return JSON.parse(raw) as User;
    } catch {
        // corrupted storage — clear it
        localStorage.removeItem('auth_user');
        localStorage.removeItem('access_token');
    }
    return null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: loadPersistedUser(),
    isAuthenticated: !!localStorage.getItem('access_token'),
    customRoles: [],

    login: (user, accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('auth_user', JSON.stringify(user));
        set({ user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_user');
        set({ user: null, isAuthenticated: false });
    },

    createCustomRole: (roleData) => set((state) => ({
        customRoles: [...state.customRoles, {
            ...roleData,
            id: `usr_role_${Date.now()}`,
            createdAt: new Date().toISOString()
        }]
    })),

    updateCustomRole: (id, updates) => set((state) => ({
        customRoles: state.customRoles.map(r => r.id === id ? { ...r, ...updates } : r)
    })),

    deleteCustomRole: (id) => set((state) => ({
        customRoles: state.customRoles.filter(r => r.id !== id)
    })),

    checkPermission: (permission: Permission) => {
        const { user, customRoles } = get();
        if (!user) return false;
        if (user.role === 'SUPER_ADMIN') return true;

        const customRole = customRoles.find(r => r.name === user.role || r.id === user.role);
        if (customRole) return customRole.permissions.includes(permission);

        return baseHasPermission(user.role as Role, permission);
    }
}));
