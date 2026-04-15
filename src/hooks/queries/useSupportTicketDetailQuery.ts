import { useQuery } from '@tanstack/react-query';
import { supportTicketsService } from '../../services/supportTickets.service';

export function useSupportTicketDetailQuery(id: string | null) {
    return useQuery({
        queryKey: ['support-tickets', 'detail', id],
        queryFn: () => supportTicketsService.getTicketById(id!),
        enabled: !!id,
        staleTime: 1000 * 30,
        retry: 1,
    });
}
