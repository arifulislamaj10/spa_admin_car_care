import { useQuery } from '@tanstack/react-query';
import { offersService } from '../../services/offers.service';

export function useOfferDetailQuery(id: string | null) {
    return useQuery({
        queryKey: ['offers', 'detail', id],
        queryFn: () => offersService.getOfferById(id!),
        enabled: !!id,
        staleTime: 1000 * 60,
        retry: 1,
    });
}
