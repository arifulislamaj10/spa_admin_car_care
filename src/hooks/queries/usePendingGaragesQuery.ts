import { useQuery } from '@tanstack/react-query';
import { garagesService } from '../../services/garages.service';

export function usePendingGaragesQuery(params: { page?: number; limit?: number } = {}) {
    return useQuery({
        queryKey: ['garages', 'pending', params.page],
        queryFn: () => garagesService.getPending(params),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
