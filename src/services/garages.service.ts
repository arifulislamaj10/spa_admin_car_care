import api from '../lib/api';

export interface GarageOwner {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export interface ApprovedBy {
    _id: string;
    fullName: string;
    email: string;
}

export interface GarageItem {
    _id: string;
    garageUser: GarageOwner;
    description: string;
    garageLogo: string;
    insuranceAndCertificate: string;
    businessLicense: string;
    myLocation: { type: string; coordinates: [number, number] };
    approvalStatus: 'approved' | 'pending' | 'rejected';
    approvedBy: ApprovedBy | null;
    approvedAt: string | null;
    rejectionReason: string | null;
    adminNotes: string | null;
    specializations: string[];
    yearsInBusiness: number | null;
    numberOfMacanics: number;
    certifications: string[];
    taxId: string | null;
    createdAt: string;
}

export interface GaragesResponse {
    results: GarageItem[];
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalItems: number;
}

export const garagesService = {
    getAll: async (params: { page?: number; limit?: number; search?: string } = {}): Promise<GaragesResponse> => {
        const query = new URLSearchParams();
        if (params.page)   query.set('page',   String(params.page));
        if (params.limit)  query.set('limit',  String(params.limit));
        if (params.search) query.set('search', params.search);

        const { data } = await api.get<{
            code: number;
            data: { attributes: GaragesResponse };
        }>(`/garage-verification/garages${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },

    getPending: async (params: { page?: number; limit?: number } = {}): Promise<GaragesResponse> => {
        const query = new URLSearchParams();
        if (params.page)  query.set('page',  String(params.page));
        if (params.limit) query.set('limit', String(params.limit));

        const { data } = await api.get<{
            code: number;
            data: { attributes: GaragesResponse };
        }>(`/garage-verification/pending${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },

    approve: async (id: string): Promise<void> => {
        await api.patch(`/garage-verification/${id}/approve`);
    },

    reject: async (id: string, rejectionReason: string): Promise<void> => {
        await api.patch(
            `/garage-verification/${id}/reject`,
            { reason: rejectionReason, rejectionReason },
            { headers: { 'Content-Type': 'application/json' } },
        );
    },
};
