import { useMutation, useQueryClient } from '@tanstack/react-query';
import { garagesService } from '../../services/garages.service';

export function useApproveGarageMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => garagesService.approve(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['garages', 'pending'] });
            queryClient.invalidateQueries({ queryKey: ['garages', 'all'] });
        },
    });
}
