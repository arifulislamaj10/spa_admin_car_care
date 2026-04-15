import api from '../lib/api';

export interface OfferGarage {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    id: string;
}

export interface OfferServiceImage {
    url: string;
    _id: string;
}

export interface OfferService {
    _id: string;
    serviceName: string;
    serviceCategory: string;
    servicePrice: number;
    serviceImage: OfferServiceImage[];
}

export interface Offer {
    _id: string;
    garageId: OfferGarage;
    service: OfferService;
    offerPercent: number;
    offerPrice: number;
    offerExpiresAt: string;
    offerDescription: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface OffersResponse {
    results: Offer[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

export interface OfferGarageDetail extends OfferGarage {
    myLocation?: { type: string; coordinates: [number, number] };
}

export interface OfferDetail extends Omit<Offer, 'garageId'> {
    garageId: OfferGarageDetail;
    __v: number;
}

export const offersService = {
    getOfferById: async (id: string): Promise<OfferDetail> => {
        const { data } = await api.get<{ success: boolean; data: OfferDetail }>(`/offer/${id}`);
        return data.data;
    },

    getOffers: async (params: { page?: number; limit?: number; status?: string } = {}): Promise<OffersResponse> => {
        const query = new URLSearchParams();
        if (params.page)   query.set('page',   String(params.page));
        if (params.limit)  query.set('limit',  String(params.limit));
        if (params.status) query.set('status', params.status);

        const { data } = await api.get<{
            success: boolean;
            data: OffersResponse;
        }>(`/offer${query.toString() ? `?${query}` : ''}`);

        return data.data;
    },
};
