import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '../../services/bookings.service';

export function useCancelBookingMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, cancellationReason, refund }: { id: string; cancellationReason: string; refund: boolean }) =>
            bookingsService.cancel(id, { cancellationReason, refund }),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['bookings', 'all'] });
            queryClient.invalidateQueries({ queryKey: ['bookings', 'detail', id] });
        },
    });
}
