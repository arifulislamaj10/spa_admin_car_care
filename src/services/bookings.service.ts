import api from '../lib/api';

export interface BookingUser {
    fullName: string;
    email: string;
    image?: string;
    phoneNumber: string;
    address?: string;
    id: string;
    myLocation?: { type: string; coordinates: [number, number] };
}

export interface BookingGarage {
    fullName: string;
    email: string;
    phoneNumber: string;
    address?: string;
    id: string;
    myLocation?: { type: string; coordinates: [number, number] };
}

export interface BookingServiceImage {
    url: string;
    _id: string;
}

export interface BookingService {
    _id?: string;
    id?: string;
    serviceName: string;
    servicePrice: number;
    serviceDuration: number;
    serviceDetails: string;
    serviceImage: BookingServiceImage[];
    isFixedPrice: boolean;
    averageRating: number;
    reviewCount: number;
}

export interface BookingItem {
    _id: string;
    user: BookingUser;
    garage: BookingGarage;
    service: BookingService;
    vehicle: null | object;
    bookingType: string;
    servicePrice: number;
    discount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    scheduledDate: string;
    scheduledTime: string;
    status: 'pending' | 'confirmed' | 'inprogress' | 'completed' | 'cancelled' | 'noshow';
    paymentStatus: 'paid' | 'unpaid' | 'pending';
    paymentMethod: string;
    assignedMechanic: null | object;
    cancellationReason: string | null;
    cancelledBy: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface BookingsResponse {
    results: BookingItem[];
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalItems: number;
}

export const bookingsService = {
    getAll: async (params: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
    } = {}): Promise<BookingsResponse> => {
        const query = new URLSearchParams();
        if (params.page)   query.set('page',   String(params.page));
        if (params.limit)  query.set('limit',  String(params.limit));
        if (params.status && params.status !== 'ALL') query.set('status', params.status);
        if (params.search) query.set('search', params.search);

        const { data } = await api.get<{
            code: number;
            data: { attributes: BookingsResponse };
        }>(`/bookings${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },

    getById: async (id: string): Promise<BookingItem> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: BookingItem };
        }>(`/bookings/${id}`);

        return data.data.attributes;
    },

    reschedule: async (id: string, payload: { scheduledDate: string; scheduledTime: string }): Promise<void> => {
        await api.patch(`/admin/bookings/${id}/reschedule`, payload);
    },

    cancel: async (id: string, payload: { cancellationReason: string; refund: boolean }): Promise<void> => {
        await api.patch(`/admin/bookings/${id}/cancel`, payload);
    },
};
