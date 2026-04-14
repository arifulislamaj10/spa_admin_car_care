import { useQuery } from '@tanstack/react-query';
import { communityService } from '../../services/community.service';

export function useCommunityPostsQuery(params: { page?: number; limit?: number; search?: string } = {}) {
    return useQuery({
        queryKey: ['community', 'posts', params.page, params.search],
        queryFn: () => communityService.getPosts(params),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
