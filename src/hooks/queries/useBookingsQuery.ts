import { useQuery } from '@tanstack/react-query';
import { bookingsService } from '../../services/bookings.service';

export function useBookingsQuery(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
} = {}) {
    return useQuery({
        queryKey: ['bookings', 'all', params.page, params.status, params.search],
        queryFn: () => bookingsService.getAll(params),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
