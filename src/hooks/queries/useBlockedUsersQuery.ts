import { useQuery } from '@tanstack/react-query';
import { usersService } from '../../services/users.service';

export function useBlockedUsersQuery(page = 1, limit = 20) {
    return useQuery({
        queryKey: ['users', 'blocked', page],
        queryFn: () => usersService.getBlockedUsers({ page, limit }),
        staleTime: 1000 * 60,
        retry: 1,
    });
}
