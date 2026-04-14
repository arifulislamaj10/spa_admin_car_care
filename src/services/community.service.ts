import api from '../lib/api';

export interface CommunityUser {
    fullName: string;
    email: string;
    image: string;
    phoneNumber: string;
    address: string;
    id: string;
}

export interface CommunityPost {
    _id: string;
    user: CommunityUser;
    postType: string;
    postDescription: string;
    postTitle: string;
    postImage: string;
    hasTag: string;
    issueType: string;
    isOpen: boolean;
    isDelete: boolean;
    carType: string;
    budget: string;
    likeCount: number;
    commentCount: number;
    offerSend: number;
    urgencyType: 'low' | 'medium' | 'high';
    postHide: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CommunityPostsResponse {
    results: CommunityPost[];
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalItems: number;
}

export const communityService = {
    getPosts: async (params: { page?: number; limit?: number; search?: string } = {}): Promise<CommunityPostsResponse> => {
        const query = new URLSearchParams();
        if (params.page)   query.set('page',   String(params.page));
        if (params.limit)  query.set('limit',  String(params.limit));
        if (params.search) query.set('search', params.search);

        const { data } = await api.get<{
            code: number;
            data: { attributes: CommunityPostsResponse };
        }>(`/community/admin${query.toString() ? `?${query}` : ''}`);

        return data.data.attributes;
    },

    toggleHide: async (id: string): Promise<void> => {
        await api.patch(`/community/admin/${id}/toggle-hide`);
    },
};
