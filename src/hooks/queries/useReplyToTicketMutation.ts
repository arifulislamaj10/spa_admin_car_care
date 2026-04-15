import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supportTicketsService } from '../../services/supportTickets.service';

export function useReplyToTicketMutation(ticketId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (message: string) => supportTicketsService.replyToTicket(ticketId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['support-tickets', 'detail', ticketId] });
            queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
        },
    });
}
