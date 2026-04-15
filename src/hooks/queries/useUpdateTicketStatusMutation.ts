import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supportTicketsService } from '../../services/supportTickets.service';
import type { TicketStatus } from '../../services/supportTickets.service';

export function useUpdateTicketStatusMutation(ticketId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: TicketStatus) => supportTicketsService.updateStatus(ticketId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['support-tickets', 'detail', ticketId] });
            queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
        },
    });
}
