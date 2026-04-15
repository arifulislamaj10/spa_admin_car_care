import { useQuery } from '@tanstack/react-query';
import { offersService } from '../../services/offers.service';

export function useOffersQuery(params: { page?: number; limit?: number; status?: string } = {}) {
    return useQuery({
        queryKey: ['offers', params.page, params.status],
        queryFn: () => offersService.getOffers(params),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
