import api from '../lib/api';

export interface BlockedBy {
    fullName: string;
    email: string;
    id: string;
}

export interface ApiUserItem {
    _id?: string;
    id?: string;
    fullName: string;
    userName: string;
    email: string;
    role: string;
    image: string;
    phoneNumber: string;
    callingCode: string | null;
    isProfileCompleted: boolean;
    blockedBy: BlockedBy | string | null;
    blockedAt: string | null;
    blockReason: string | null;
    createdAt: string;
    myWallet: number;
    earnedPoints: number;
    address?: string;
    garageProfile: string | null;
    mechanicProfile: string | null;
}

// Normalise _id / id across both endpoints
export function getUserId(u: ApiUserItem): string {
    return u._id ?? u.id ?? '';
}

export interface UsersPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface UsersResponse {
    users: ApiUserItem[];
    pagination: UsersPagination;
}

// Blocked endpoint uses a different pagination shape
export interface BlockedUsersResponse {
    users: ApiUserItem[];
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalItems: number;
}

// Maps the UI defaultFilter to the API role param value
export const FILTER_TO_API_ROLE: Record<string, string> = {
    CUSTOMER:     'user',
    MECHANIC:     'mechanic',
    GARAGE_OWNER: 'garage',
    FLEET:        'fleet',
    SUPER_ADMIN:  'superAdmin',
};

export const usersService = {
    getUsers: async (params: {
        role?: string;
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<UsersResponse> => {
        const query = new URLSearchParams();
        if (params.role)   query.set('role',   params.role);
        if (params.page)   query.set('page',   String(params.page));
        if (params.limit)  query.set('limit',  String(params.limit));
        if (params.search) query.set('search', params.search);

        const { data } = await api.get<{
            code: number;
            data: { attributes: UsersResponse };
        }>(`/admin/users?${query.toString()}`);

        return data.data.attributes;
    },

    // Token is auto-attached by axios interceptor
    getBlockedUsers: async (params: { page?: number; limit?: number } = {}): Promise<BlockedUsersResponse> => {
        const query = new URLSearchParams();
        if (params.page)  query.set('page',  String(params.page));
        if (params.limit) query.set('limit', String(params.limit));

        const { data } = await api.get<{
            code: number;
            data: { attributes: BlockedUsersResponse };
        }>(`/admin/users/blocked${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },
};
