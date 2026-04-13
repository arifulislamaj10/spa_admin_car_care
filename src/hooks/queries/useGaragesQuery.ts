import { useQuery } from '@tanstack/react-query';
import { garagesService } from '../../services/garages.service';

export function useGaragesQuery(params: { page?: number; limit?: number; search?: string } = {}) {
    return useQuery({
        queryKey: ['garages', 'all', params.page, params.search],
        queryFn: () => garagesService.getAll(params),
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
}
