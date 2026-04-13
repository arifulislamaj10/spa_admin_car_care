import { useQuery } from '@tanstack/react-query';
import { usersService, FILTER_TO_API_ROLE } from '../../services/users.service';

interface UseUsersParams {
    defaultFilter: string;   // e.g. 'CUSTOMER', 'MECHANIC', 'GARAGE_OWNER'
    page?: number;
    limit?: number;
    search?: string;
}

export function useUsersQuery({ defaultFilter, page = 1, limit = 20, search }: UseUsersParams) {
    const apiRole = FILTER_TO_API_ROLE[defaultFilter];

    return useQuery({
        queryKey: ['users', defaultFilter, page, search],
        queryFn: () => usersService.getUsers({ role: apiRole, page, limit, search: search || undefined }),
        staleTime: 1000 * 60,
        retry: 1,
        // Don't run query for SUSPENDED — no role param, might need separate handling
        enabled: !!apiRole,
    });
}
