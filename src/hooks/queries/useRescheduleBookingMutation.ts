import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '../../services/bookings.service';

export function useRescheduleBookingMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, scheduledDate, scheduledTime }: { id: string; scheduledDate: string; scheduledTime: string }) =>
            bookingsService.reschedule(id, { scheduledDate, scheduledTime }),
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['bookings', 'all'] });
            queryClient.invalidateQueries({ queryKey: ['bookings', 'detail', id] });
        },
    });
}
