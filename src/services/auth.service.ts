import api from '../lib/api';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ApiUser {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    role: string;
    image: string;
    phoneNumber: string;
    callingCode: string;
    address: string;
    myWallet: number;
    earnedPoints: number;
    isProfileCompleted: boolean;
    createdAt: string;
}

export interface LoginResponse {
    code: number;
    message: string;
    data: {
        attributes: {
            user: ApiUser;
            tokens: {
                access: { token: string; expires: string };
                refresh: { token: string; expires: string };
            };
        };
    };
}

export interface ForgotPasswordResponse {
    code: number;
    message: string;
    data: {
        attributes: {
            access: { token: string; expires: string };
            refresh: { token: string; expires: string };
        };
    };
}

// verify-email response shape is the same as login (user + tokens)
export type VerifyEmailResponse = LoginResponse;

export const authService = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>('/auth/login', payload);
        return data;
    },

    forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
        const { data } = await api.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
        return data;
    },

    // accessToken = the temp token returned by forgotPassword
    verifyEmail: async (code: string, accessToken: string): Promise<VerifyEmailResponse> => {
        const { data } = await api.post<VerifyEmailResponse>(
            '/auth/verify-email',
            { code },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return data;
    },

    // accessToken = the token returned by verifyEmail
    resetPassword: async (password: string, accessToken: string): Promise<{ code: number; message: string }> => {
        const { data } = await api.post(
            '/auth/reset-password',
            { password },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return data;
    },

    // Uses the current session token (interceptor attaches it automatically)
    changePassword: async (oldPassword: string, newPassword: string): Promise<{ code: number; message: string }> => {
        const { data } = await api.post('/auth/change-password', { oldPassword, newPassword });
        return data;
    },
};
