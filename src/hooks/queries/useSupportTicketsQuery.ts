import { useQuery } from '@tanstack/react-query';
import { supportTicketsService } from '../../services/supportTickets.service';
import type { TicketStatus, TicketPriority } from '../../services/supportTickets.service';

export function useSupportTicketsQuery(params: {
    page?: number;
    limit?: number;
    status?: TicketStatus | '';
    priority?: TicketPriority | '';
} = {}) {
    return useQuery({
        queryKey: ['support-tickets', params.page, params.status, params.priority],
        queryFn: () => supportTicketsService.getTickets(params),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
