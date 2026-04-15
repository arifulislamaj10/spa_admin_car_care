import api from '../lib/api';

export type TicketStatus   = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface TicketUser {
    _id: string;
    fullName: string;
    role: string;
}

export interface TicketReply {
    _id: string;
    user: TicketUser;
    message: string;
    isAdminReply: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SupportTicket {
    _id: string;
    user: TicketUser;
    subject: string;
    message: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignedTo: string | null;
    isDeleted: boolean;
    replies: TicketReply[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SupportTicketsResponse {
    results: SupportTicket[];
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalItems: number;
}

export const supportTicketsService = {
    getTickets: async (params: {
        page?: number;
        limit?: number;
        status?: TicketStatus | '';
        priority?: TicketPriority | '';
        sortBy?: string;
    } = {}): Promise<SupportTicketsResponse> => {
        const query = new URLSearchParams();
        if (params.page)     query.set('page',     String(params.page));
        if (params.limit)    query.set('limit',    String(params.limit));
        if (params.status)   query.set('status',   params.status);
        if (params.priority) query.set('priority', params.priority);
        if (params.sortBy)   query.set('sortBy',   params.sortBy);

        const { data } = await api.get<{
            code: number;
            data: { attributes: SupportTicketsResponse };
        }>(`/support-tickets${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },

    getTicketById: async (id: string): Promise<SupportTicket> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: SupportTicket };
        }>(`/support-tickets/${id}`);
        return data.data.attributes;
    },

    replyToTicket: async (id: string, message: string): Promise<void> => {
        await api.post(`/support-tickets/${id}/reply`, { message });
    },

    updateStatus: async (id: string, status: TicketStatus): Promise<void> => {
        await api.patch(`/support-tickets/${id}/status`, { status });
    },
};
