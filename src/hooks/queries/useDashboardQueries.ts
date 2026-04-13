import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboard.service';

export type RevPeriod = '7D' | '1M' | '3M' | '1Y';

export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: () => dashboardService.getStats(),
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
}

export function useDashboardRevenueOverview(period: RevPeriod) {
    return useQuery({
        queryKey: ['dashboard', 'revenue', period],
        queryFn: () => dashboardService.getRevenueOverview(period),
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
}

export function useDashboardBookingDistribution() {
    return useQuery({
        queryKey: ['dashboard', 'booking-distribution'],
        queryFn: () => dashboardService.getBookingDistribution(),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function useDashboardTopGarages() {
    return useQuery({
        queryKey: ['dashboard', 'top-garages'],
        queryFn: () => dashboardService.getTopGarages(),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
