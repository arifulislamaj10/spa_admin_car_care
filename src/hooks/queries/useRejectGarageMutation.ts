import { useMutation, useQueryClient } from '@tanstack/react-query';
import { garagesService } from '../../services/garages.service';

export function useRejectGarageMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
            garagesService.reject(id, rejectionReason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['garages', 'pending'] });
            queryClient.invalidateQueries({ queryKey: ['garages', 'all'] });
        },
    });
}
