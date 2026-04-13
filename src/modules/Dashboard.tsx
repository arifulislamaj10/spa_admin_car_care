import { useState } from 'react';
import {
    ArrowUpRight, ArrowDownRight,
    ScrollText, Star,
    Download, CheckCircle2,
    X, Activity, AlertCircle, Info, Loader2,
} from 'lucide-react';
import {
    AreaChart, Area,
    BarChart, Bar,
    PieChart, Pie, Cell,
    ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { useAuthStore } from '../store/useAuthStore';
import {
    useDashboardStats,
    useDashboardRevenueOverview,
    useDashboardBookingDistribution,
    useDashboardTopGarages,
    type RevPeriod,
} from '../hooks/queries/useDashboardQueries';
import '../App.css';

/* ─── Fallback spark data ─── */
const SPARK: Record<string, { v: number }[]> = {
    bookings: [{ v: 30 }, { v: 45 }, { v: 35 }, { v: 50 }, { v: 40 }, { v: 55 }, { v: 48 }, { v: 60 }, { v: 52 }, { v: 65 }],
    garages:  [{ v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 }, { v: 35 }, { v: 32 }, { v: 40 }, { v: 38 }, { v: 42 }],
    revenue:  [{ v: 15 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }, { v: 55 }, { v: 50 }, { v: 65 }],
    rating:   [{ v: 40 }, { v: 42 }, { v: 38 }, { v: 44 }, { v: 43 }, { v: 50 }, { v: 48 }, { v: 52 }, { v: 50 }, { v: 55 }],
};

const RANK_COLORS = ['#00d4aa', '#3b82f6', '#a855f7', '#f97316', '#ec4899'];

const DIST_COLORS = ['#00d4aa', '#22c55e', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#eab308'];

const recentLogs = [
    { id: 1, time: '10:42 AM', type: 'info',    message: 'User Auth: Token refreshed for admin@carcare.com',       ip: '192.168.1.1'  },
    { id: 2, time: '10:38 AM', type: 'warning', message: 'Rate Limit Warning: Payment Gateway API (Stripe)',        ip: '10.0.0.45'    },
    { id: 3, time: '10:15 AM', type: 'error',   message: 'Failed Webhook: Payout #4821 signature mismatch',        ip: '104.22.3.11'  },
    { id: 4, time: '09:55 AM', type: 'info',    message: 'System: Database backup completed automatically',         ip: 'localhost'    },
    { id: 5, time: '09:12 AM', type: 'info',    message: 'User Action: Pricing tier updated for Garage ID 88',     ip: '192.168.1.5'  },
    { id: 6, time: '08:45 AM', type: 'warning', message: 'High Latency: Search API took 1200ms',                   ip: '10.0.1.22'    },
    { id: 7, time: '08:30 AM', type: 'info',    message: 'Service Started: Email Notification Worker',              ip: 'localhost'    },
];

const barColors = ['#f97316','#eab308','#84cc16','#22c55e','#14b8a6','#06b6d4','#0ea5e9','#3b82f6','#6366f1','#8b5cf6','#a855f7','#00d4aa'];

/* ─── Helpers ─── */
function formatRevenue(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
}

function isTrendUp(change: string): boolean {
    return change.trim().startsWith('+');
}

/* ─── Sparkline ─── */
const SparklineChart = ({ data, color }: { data: { v: number }[]; color: string }) => (
    <ResponsiveContainer width="100%" height={50}>
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0}   />
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2}
                fill={`url(#spark-${color.replace('#', '')})`} dot={false}
                isAnimationActive animationDuration={1500} />
        </AreaChart>
    </ResponsiveContainer>
);

/* ─── Stat Card ─── */
const StatCard = ({ title, value, trend, trendUp, sparkKey, color, index, loading }: {
    title: string; value: string; trend: string; trendUp: boolean;
    sparkKey: keyof typeof SPARK; color: string; index: number; loading: boolean;
}) => (
    <div className={`card-glow bg-surface-card rounded-2xl p-4 sm:p-5 border border-border-subtle relative overflow-hidden animate-fade-in-up delay-${index + 1}`}>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-semibold text-text-muted tracking-wider uppercase">{title}</span>
            {loading ? (
                <div className="w-14 h-4 bg-surface-hover rounded-full animate-pulse" />
            ) : (
                <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${trendUp ? 'trend-badge-up' : 'trend-badge-down'}`}>
                    {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            )}
        </div>
        {loading ? (
            <div className="w-24 h-8 bg-surface-hover rounded-lg animate-pulse mb-3" />
        ) : (
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 sm:mb-3 animate-count-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                {value}
            </h3>
        )}
        <div className="sparkline-container">
            {loading
                ? <div className="w-full h-[50px] bg-surface-hover/40 rounded animate-pulse" />
                : <SparklineChart data={SPARK[sparkKey]} color={color} />
            }
        </div>
    </div>
);

/* ─── Bar Tooltip ─── */
const SERIES_LABELS: Record<string, string> = {
    value:  'This Period',
    value2: 'Last Period',
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface-card border border-border-subtle rounded-lg p-3 shadow-2xl min-w-[140px]">
            <p className="text-xs text-text-muted mb-2 font-medium">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex justify-between gap-4" style={{ color: p.fill ?? p.color }}>
                    <span>{SERIES_LABELS[p.dataKey] ?? p.name}</span>
                    <span>{formatRevenue(p.value)}</span>
                </p>
            ))}
        </div>
    );
};

/* ═══════════════════════════════════════════
   Dashboard
═══════════════════════════════════════════ */
const Dashboard = () => {
    const { user } = useAuthStore();
    const [revPeriod, setRevPeriod]       = useState<RevPeriod>('1Y');
    const [exportState, setExportState]   = useState<'idle' | 'loading' | 'success'>('idle');
    const [showLogs, setShowLogs]         = useState(false);

    /* ── Queries ── */
    const statsQuery        = useDashboardStats();
    const revenueQuery      = useDashboardRevenueOverview(revPeriod);
    const distributionQuery = useDashboardBookingDistribution();
    const topGaragesQuery   = useDashboardTopGarages();

    const now      = new Date();
    const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';
    const dateStr  = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const handleExport = () => {
        if (exportState !== 'idle') return;
        setExportState('loading');
        setTimeout(() => { setExportState('success'); setTimeout(() => setExportState('idle'), 2500); }, 1500);
    };

    /* ── Stat card data from API ── */
    const s = statsQuery.data;
    const statCards = [
        {
            title:    'TOTAL BOOKINGS',
            value:    s ? s.totalCompletedBookings.count.toLocaleString() : '—',
            trend:    s ? s.totalCompletedBookings.weeklyChange : '0%',
            trendUp:  s ? isTrendUp(s.totalCompletedBookings.weeklyChange) : true,
            sparkKey: 'bookings' as const,
            color:    '#00d4aa',
        },
        {
            title:    'ACTIVE GARAGES',
            value:    s ? s.totalActiveGarages.count.toLocaleString() : '—',
            trend:    s ? s.totalActiveGarages.weeklyChange : '0%',
            trendUp:  s ? isTrendUp(s.totalActiveGarages.weeklyChange) : true,
            sparkKey: 'garages' as const,
            color:    '#22c55e',
        },
        {
            title:    'REVENUE (GMV)',
            value:    s ? formatRevenue(s.totalRevenue.amount) : '—',
            trend:    s ? s.totalRevenue.weeklyChange : '0%',
            trendUp:  s ? isTrendUp(s.totalRevenue.weeklyChange) : true,
            sparkKey: 'revenue' as const,
            color:    '#a855f7',
        },
        {
            title:    'CUSTOMER RATING',
            value:    s ? (s.customerRating.average > 0 ? s.customerRating.average.toFixed(2) : 'N/A') : '—',
            trend:    s ? `${s.customerRating.totalReviews} reviews` : '0',
            trendUp:  true,
            sparkKey: 'rating' as const,
            color:    '#ec4899',
        },
    ];

    /* ── Revenue chart data from API (already normalized in service) ── */
    const revenueChartData = revenueQuery.data?.data ?? [];
    const hasComparison    = revenueChartData.some((d) => d.value2 !== undefined);

    /* ── Booking distribution from API ── */
    const distributionData = distributionQuery.data?.distribution.map((d, i) => ({
        name:       d.categoryName,
        value:      d.percentage,
        count:      d.count,
        color:      DIST_COLORS[i % DIST_COLORS.length],
        image:      d.categoryImage,
    })) ?? [];

    const revLabel =
        revPeriod === '7D' ? 'Daily revenue — last 7 days' :
        revPeriod === '1M' ? 'Weekly revenue — last month' :
        revPeriod === '3M' ? 'Monthly revenue — last 3 months' :
                             'Monthly revenue — last 12 months';

    return (
        <div className="space-y-4 sm:space-y-6 relative">

            {/* ── Greeting Banner ── */}
            <div className="bg-gradient-to-r from-surface-card via-surface-raised to-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-accent-purple/5 pointer-events-none" />
                <div className="relative flex flex-col gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">{greeting}, {user?.firstName || 'Admin'}</h1>
                        <p className="text-xs sm:text-sm text-text-muted mt-1">Here's your platform overview for {dateStr}</p>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 sm:self-end sm:flex-row sm:absolute sm:top-6 sm:right-6">
                        <button onClick={handleExport} disabled={exportState !== 'idle'}
                            className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[140px] ${
                                exportState === 'success' ? 'border-accent-green/40 text-accent-green bg-accent-green/10' :
                                exportState === 'loading' ? 'border-accent-cyan/40 text-accent-cyan/70' :
                                'border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10'}`}>
                            {exportState === 'loading' ? <><div className="w-4 h-4 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />Generating…</>
                            : exportState === 'success' ? <><CheckCircle2 className="w-4 h-4" />Exported!</>
                            : <><Download className="w-4 h-4" />Export Report</>}
                        </button>
                        <button onClick={() => setShowLogs(true)}
                            className="px-3 sm:px-4 py-2 bg-white text-surface rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                            <ScrollText className="w-4 h-4" />View Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* ── API Error notice ── */}
            {statsQuery.isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Could not reach dashboard API — check your backend connection.
                </div>
            )}

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {statCards.map((card, i) => (
                    <StatCard key={card.title} {...card} index={i} loading={statsQuery.isLoading} />
                ))}
            </div>

            {/* ── Revenue Overview ── */}
            <div className="bg-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up delay-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">Revenue Overview</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[11px] sm:text-xs text-text-muted">{revLabel}</p>
                            {revenueQuery.data && (
                                <span className="text-[10px] font-semibold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full">
                                    Total: {formatRevenue(revenueQuery.data.totalRevenue)}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex bg-surface rounded-lg border border-border-subtle p-0.5">
                        {(['7D', '1M', '3M', '1Y'] as RevPeriod[]).map((p) => (
                            <button key={p} onClick={() => setRevPeriod(p)}
                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-md transition-all ${
                                    revPeriod === p
                                        ? 'bg-accent-cyan text-surface shadow-sm shadow-accent-cyan/20'
                                        : 'text-text-muted hover:text-text-primary'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {revenueQuery.isLoading ? (
                    <div className="w-full h-[220px] sm:h-[280px] bg-surface-hover/30 rounded-xl animate-pulse flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
                    </div>
                ) : revenueChartData.length === 0 ? (
                    <div className="w-full h-[220px] sm:h-[280px] flex items-center justify-center text-text-muted text-sm">
                        No revenue data for this period.
                    </div>
                ) : (
                    <>
                    {/* Comparison legend — shown only when API returns two series (e.g. 1M) */}
                    {hasComparison && (
                        <div className="flex items-center gap-4 mb-3 text-[11px] text-text-muted">
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-sm bg-accent-cyan inline-block" /> This Period
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-sm bg-accent-cyan/30 inline-block" /> Last Period
                            </span>
                        </div>
                    )}

                    <div className="-mx-2 sm:mx-0">
                        <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
                            <BarChart data={revenueChartData} barCategoryGap="20%" barGap={2}
                                margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#21283b" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11 }}
                                    tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`} />
                                <Tooltip content={<CustomBarTooltip />}
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }} />

                                {/* Primary bar — coloured per bar for single series, solid cyan for comparison */}
                                <Bar dataKey="value" name="This Period" radius={[4, 4, 0, 0]}
                                    isAnimationActive animationDuration={1200}
                                    fill="#00d4aa">
                                    {!hasComparison && revenueChartData.map((_e, i) => (
                                        <Cell key={`cell-${i}`} fill={barColors[i % barColors.length]} />
                                    ))}
                                </Bar>

                                {/* Secondary bar — only rendered when API returns value2 */}
                                {hasComparison && (
                                    <Bar dataKey="value2" name="Last Period" radius={[4, 4, 0, 0]}
                                        fill="#00d4aa" opacity={0.3}
                                        isAnimationActive animationDuration={1400} />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    </>
                )}
            </div>

            {/* ── Bottom Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

                {/* Booking Distribution */}
                <div className="bg-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up delay-6">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">Booking Distribution</h3>
                    <p className="text-[11px] sm:text-xs text-text-muted mb-4 sm:mb-5">
                        By service category
                        {distributionQuery.data && (
                            <span className="ml-2 text-accent-cyan font-medium">
                                — {distributionQuery.data.totalBookings} total bookings
                            </span>
                        )}
                    </p>

                    {distributionQuery.isLoading ? (
                        <div className="w-full h-44 bg-surface-hover/30 rounded-xl animate-pulse" />
                    ) : distributionData.length === 0 ? (
                        <div className="h-44 flex items-center justify-center text-text-muted text-sm">No booking data yet.</div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            {/* Donut */}
                            <div className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={distributionData} cx="50%" cy="50%"
                                            innerRadius={40} outerRadius={60} paddingAngle={3}
                                            dataKey="value" stroke="none"
                                            isAnimationActive animationDuration={1500} animationBegin={400}>
                                            {distributionData.map((entry, i) => (
                                                <Cell key={`cell-${i}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 space-y-2.5 w-full">
                                {distributionData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                                style={{ background: item.color }} />
                                            <span className="text-xs sm:text-sm text-text-secondary truncate">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-[11px] text-text-muted">{item.count} jobs</span>
                                            <span className="text-xs sm:text-sm font-semibold text-white w-12 text-right">
                                                {item.value.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Top Performing Garages */}
                <div className="bg-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up delay-7">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-5">Top Performing Garages</h3>

                    {topGaragesQuery.isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                                    <div className="w-9 h-9 rounded-xl bg-surface-hover animate-pulse flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="w-32 h-3.5 bg-surface-hover rounded animate-pulse" />
                                        <div className="w-20 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                    </div>
                                    <div className="w-12 h-8 bg-surface-hover rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : !topGaragesQuery.data?.topGarages.length ? (
                        <div className="h-40 flex items-center justify-center text-text-muted text-sm">
                            No garage data yet.
                        </div>
                    ) : (
                        <div className="space-y-2 sm:space-y-3">
                            {topGaragesQuery.data.topGarages.map((g, i) => {
                                const color = RANK_COLORS[i % RANK_COLORS.length];
                                return (
                                    <div key={g._id} className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-surface-hover/50 transition-colors group">

                                        {/* Rank badge or logo */}
                                        {g.garageLogo ? (
                                            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-border-subtle">
                                                <img src={g.garageLogo} alt={g.garageName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
                                                style={{ background: `${color}20`, color }}>
                                                {i + 1}
                                            </div>
                                        )}

                                        {/* Name & email */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                                                    style={{ background: `${color}20`, color }}>
                                                    #{i + 1}
                                                </span>
                                                <p className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-accent-cyan transition-colors">
                                                    {g.garageName}
                                                </p>
                                            </div>
                                            <p className="text-[11px] sm:text-xs text-text-muted truncate mt-0.5">{g.garageEmail}</p>
                                        </div>

                                        {/* Stats */}
                                        <div className="text-right flex-shrink-0 space-y-1">
                                            {/* Rating */}
                                            <div className="flex items-center justify-end gap-1 text-amber-400">
                                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                                                <span className="text-xs sm:text-sm font-bold">
                                                    {g.averageRating > 0 ? g.averageRating.toFixed(1) : 'N/A'}
                                                </span>
                                            </div>
                                            {/* Success rate */}
                                            <div className="flex items-center justify-end gap-1.5">
                                                <div className="w-12 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full"
                                                        style={{ width: `${g.successRate}%`, background: color }} />
                                                </div>
                                                <span className="text-[10px] sm:text-[11px] text-text-muted whitespace-nowrap">
                                                    {g.successRate}%
                                                </span>
                                            </div>
                                            {/* Bookings */}
                                            <p className="text-[10px] text-text-muted">
                                                {g.completedBookings}/{g.totalBookings} jobs
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Logs Modal ── */}
            {showLogs && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogs(false)} />
                    <div className="relative bg-[#0d1117] border border-border-subtle rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-scale-in" style={{ animationDuration: '0.2s' }}>
                        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-subtle bg-surface-card/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-cyan/10 rounded-lg text-accent-cyan">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white leading-tight">System Logs</h2>
                                    <p className="text-xs text-text-muted mt-0.5">Real-time system activity and events</p>
                                </div>
                            </div>
                            <button onClick={() => setShowLogs(false)}
                                className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[60vh] sm:max-h-[500px]">
                            <div className="divide-y divide-border-subtle">
                                {recentLogs.map((log) => (
                                    <div key={log.id} className="p-4 hover:bg-surface-hover/30 transition-colors flex gap-4">
                                        <div className="mt-0.5 flex-shrink-0">
                                            {log.type === 'info'    && <Info        className="w-4 h-4 text-accent-cyan" />}
                                            {log.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500"   />}
                                            {log.type === 'error'   && <X           className="w-4 h-4 text-red-500"     />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-1">
                                                <p className={`text-sm font-medium ${log.type === 'error' ? 'text-red-400' : log.type === 'warning' ? 'text-amber-400' : 'text-text-primary'}`}>
                                                    {log.message}
                                                </p>
                                                <span className="text-xs text-text-muted whitespace-nowrap">{log.time}</span>
                                            </div>
                                            <p className="text-[11px] text-text-muted font-mono tracking-wide">IP: {log.ip}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 border-t border-border-subtle bg-surface-card/30 flex justify-between items-center">
                            <span className="text-[11px] text-text-muted flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" /> Live updates active
                            </span>
                            <button className="text-[12px] font-semibold text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                                Download Full Trace →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
