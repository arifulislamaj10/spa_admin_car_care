import { useMutation, useQueryClient } from '@tanstack/react-query';
import { communityService } from '../../services/community.service';

export function useToggleHidePostMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => communityService.toggleHide(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['community', 'posts'] });
        },
    });
}
