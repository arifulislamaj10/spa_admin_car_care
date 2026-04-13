import api from '../lib/api';

/* ─── Response Types ─── */

export interface DashboardStatsResponse {
    totalCompletedBookings: {
        count: number;
        weeklyChange: string;
        thisWeek: number;
        lastWeek: number;
    };
    totalActiveGarages: {
        count: number;
        weeklyChange: string;
        thisWeek: number;
        lastWeek: number;
    };
    totalRevenue: {
        amount: number;
        weeklyChange: string;
        thisWeek: number;
        lastWeek: number;
    };
    customerRating: {
        average: number;
        totalReviews: number;
    };
}

// Normalized shape the chart always receives
export interface RevenueChartPoint {
    name: string;
    value: number;   // primary (revenue / thisMonth / today)
    value2?: number; // secondary when API provides comparison (lastMonth / lastWeek)
}

export interface RevenueOverviewResponse {
    period: string;
    data: RevenueChartPoint[];
    totalRevenue: number;
}

export interface BookingDistributionItem {
    _id: string;
    categoryName: string;
    categoryImage: string;
    count: number;
    percentage: number;
}

export interface BookingDistributionResponse {
    totalBookings: number;
    distribution: BookingDistributionItem[];
}

export interface TopGarageItem {
    _id: string;
    garageName: string;
    garageEmail: string;
    garageLogo: string;
    totalBookings: number;
    completedBookings: number;
    successRate: number;
    averageRating: number;
    reviewCount: number;
}

export interface TopGaragesResponse {
    topGarages: TopGarageItem[];
}

/* ─── Period mapping: UI ("7D") → API ("7d") ─── */
type UIPeriod = '7D' | '1M' | '3M' | '1Y';
const PERIOD_MAP: Record<UIPeriod, string> = {
    '7D': '7d',
    '1M': '1m',
    '3M': '3m',
    '1Y': '1y',
};

/* ─── Service ─── */
export const dashboardService = {
    getStats: async (): Promise<DashboardStatsResponse> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: DashboardStatsResponse };
        }>('/super-admin/dashboard');
        return data.data.attributes;
    },

    getRevenueOverview: async (period: UIPeriod): Promise<RevenueOverviewResponse> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: { period: string; data: any[]; totalRevenue: number } };
        }>(`/super-admin/dashboard/revenue-overview?period=${PERIOD_MAP[period]}`);

        const raw = data.data.attributes;

        // Normalize different API shapes into { name, value, value2? }
        const normalized: RevenueChartPoint[] = raw.data.map((d: any) => {
            // 1Y / 7D shape: { label, revenue, year? }
            if ('revenue' in d) {
                return { name: d.label, value: d.revenue ?? 0 };
            }
            // 1M shape: { label, thisMonth, lastMonth }
            if ('thisMonth' in d) {
                return { name: d.label, value: d.thisMonth ?? 0, value2: d.lastMonth ?? 0 };
            }
            // 3M shape: { label, thisQuarter/revenue/amount } — fallback
            const primaryKey = Object.keys(d).find(k => k !== 'label' && k !== 'year') ?? 'revenue';
            const secondaryKey = Object.keys(d).filter(k => k !== 'label' && k !== 'year' && k !== primaryKey)[0];
            return {
                name: d.label,
                value: d[primaryKey] ?? 0,
                ...(secondaryKey ? { value2: d[secondaryKey] ?? 0 } : {}),
            };
        });

        return { period: raw.period, data: normalized, totalRevenue: raw.totalRevenue };
    },

    getBookingDistribution: async (): Promise<BookingDistributionResponse> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: BookingDistributionResponse };
        }>('/super-admin/dashboard/booking-distribution');
        return data.data.attributes;
    },

    getTopGarages: async (): Promise<TopGaragesResponse> => {
        const { data } = await api.get<{
            code: number;
            data: { attributes: TopGaragesResponse };
        }>('/super-admin/dashboard/top-garages');
        return data.data.attributes;
    },
};
