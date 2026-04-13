import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

export default function AnalyticsDashboard() {
    return (
        <TabPage
            title="📊 Analytics"
            description="Revenue analytics, user growth, booking trends, and conversion funnels."
            tabs={[
                {
                    id: 'revenue', label: 'Revenue Analytics',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Total Revenue (MTD)', value: '$142,580', trend: '+18.5%', trendUp: true },
                                { label: 'Gross Margin', value: '72.4%', trend: '+2.1%', trendUp: true },
                                { label: 'ARPU', value: '$16.80', trend: '+5.2%', trendUp: true },
                                { label: 'LTV', value: '$284', trend: '+12%', trendUp: true },
                            ]} />
                            <DataTable columns={[
                                { key: 'month', header: 'Month', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'revenue', header: 'Revenue', render: (v: string) => <span className="text-sm font-bold text-accent-green">{v}</span> },
                                { key: 'bookings', header: 'Bookings' },
                                { key: 'growth', header: 'Growth', render: (v: string) => <span className="text-sm font-semibold text-accent-green">{v}</span> },
                            ]} data={[
                                { id: 1, month: 'October 2026', revenue: '$142,580', bookings: '4,240', growth: '+18.5%' },
                                { id: 2, month: 'September 2026', revenue: '$120,210', bookings: '3,890', growth: '+12.1%' },
                                { id: 3, month: 'August 2026', revenue: '$107,240', bookings: '3,420', growth: '+8.4%' },
                                { id: 4, month: 'July 2026', revenue: '$98,930', bookings: '3,110', growth: '+6.2%' },
                            ]} />
                        </div>
                    )
                },
                {
                    id: 'growth', label: 'User Growth',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Total Users', value: '12,482', trend: '+847', trendUp: true },
                                { label: 'New Users (30d)', value: '847', trend: '+22%', trendUp: true },
                                { label: 'DAU', value: '2,140' },
                                { label: 'MAU', value: '8,420' },
                            ]} />
                            <DataTable columns={[
                                { key: 'segment', header: 'Segment', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'count', header: 'Users', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'growth', header: '30d Growth', render: (v: string) => <span className="text-sm font-semibold text-accent-green">{v}</span> },
                                { key: 'retention', header: '90d Retention' },
                            ]} data={[
                                { id: 1, segment: 'Customers', count: '10,240', growth: '+680', retention: '68%' },
                                { id: 2, segment: 'Mechanics', count: '845', growth: '+42', retention: '89%' },
                                { id: 3, segment: 'Garage Owners', count: '342', growth: '+24', retention: '94%' },
                                { id: 4, segment: 'Fleet Accounts', count: '55', growth: '+8', retention: '96%' },
                            ]} />
                        </div>
                    )
                },
                {
                    id: 'bookings', label: 'Booking Trends',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Bookings (MTD)', value: '4,240', trend: '+9%', trendUp: true },
                                { label: 'Avg Value', value: '$142' },
                                { label: 'Completion Rate', value: '91.8%' },
                                { label: 'Peak Day', value: 'Wednesday' },
                            ]} />
                            <DataTable columns={[
                                { key: 'service', header: 'Service', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'bookings', header: 'Bookings', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'revenue', header: 'Revenue', render: (v: string) => <span className="text-sm font-bold text-accent-green">{v}</span> },
                                { key: 'share', header: 'Market Share' },
                            ]} data={[
                                { id: 1, service: 'Oil Change', bookings: '1,280', revenue: '$41,600', share: '30.2%' },
                                { id: 2, service: 'Brake Service', bookings: '680', revenue: '$38,760', share: '16%' },
                                { id: 3, service: 'Tire Service', bookings: '540', revenue: '$14,580', share: '12.7%' },
                                { id: 4, service: 'Diagnostics', bookings: '420', revenue: '$25,200', share: '9.9%' },
                                { id: 5, service: 'AC Service', bookings: '380', revenue: '$22,800', share: '8.9%' },
                            ]} />
                        </div>
                    )
                },
                {
                    id: 'retention', label: 'Retention',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: '30d Retention', value: '82%', trend: '+3%', trendUp: true },
                                { label: '90d Retention', value: '68%', trend: '+5%', trendUp: true },
                                { label: 'Churn Rate', value: '4.2%', trend: '-0.8%', trendUp: true },
                                { label: 'Reactivated (30d)', value: '240' },
                            ]} />
                            <DataTable columns={[
                                { key: 'cohort', header: 'Cohort', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'size', header: 'Cohort Size' },
                                { key: 'day7', header: 'Day 7' },
                                { key: 'day30', header: 'Day 30' },
                                { key: 'day90', header: 'Day 90' },
                            ]} data={[
                                { id: 1, cohort: 'Oct 2026', size: '847', day7: '89%', day30: '—', day90: '—' },
                                { id: 2, cohort: 'Sep 2026', size: '694', day7: '86%', day30: '78%', day90: '—' },
                                { id: 3, cohort: 'Aug 2026', size: '580', day7: '84%', day30: '76%', day90: '65%' },
                                { id: 4, cohort: 'Jul 2026', size: '512', day7: '82%', day30: '72%', day90: '62%' },
                            ]} />
                        </div>
                    )
                },
                {
                    id: 'conversion', label: 'Conversion',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Signup → Booking', value: '34.2%' },
                                { label: 'Search → Book', value: '12.8%' },
                                { label: 'Cart Abandonment', value: '28%', trend: '-4%', trendUp: true },
                            ]} />
                            <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 space-y-4">
                                <h3 className="text-lg font-bold text-white mb-4">Conversion Funnel</h3>
                                {[
                                    { stage: 'App Visits', value: '45,200', pct: '100%', width: '100%' },
                                    { stage: 'Sign Ups', value: '8,420', pct: '18.6%', width: '60%' },
                                    { stage: 'Search / Browse', value: '6,100', pct: '13.5%', width: '45%' },
                                    { stage: 'Add to Cart', value: '2,450', pct: '5.4%', width: '25%' },
                                    { stage: 'Booking Confirmed', value: '1,760', pct: '3.9%', width: '18%' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-sm text-text-secondary w-36 shrink-0">{s.stage}</span>
                                        <div className="flex-1 h-8 bg-surface rounded-lg overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-accent-cyan/60 to-accent-cyan/20 rounded-lg flex items-center px-3" style={{ width: s.width }}>
                                                <span className="text-xs font-bold text-white whitespace-nowrap">{s.value}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-accent-cyan w-16 text-right">{s.pct}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                },
                {
                    id: 'heatmaps', label: 'Heatmaps',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Top Region', value: 'Ontario' },
                                { label: 'Highest Demand', value: 'Toronto, ON' },
                                { label: 'Growth Region', value: 'Manitoba (+32%)' },
                            ]} />
                            <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
                                <div className="p-5 border-b border-border-subtle">
                                    <h3 className="text-lg font-bold text-white">Demand by Region</h3>
                                </div>
                                <div className="divide-y divide-border-subtle">
                                    {[
                                        { region: 'Toronto, ON', bookings: 1240, intensity: 'Very High' },
                                        { region: 'Calgary, AB', bookings: 680, intensity: 'High' },
                                        { region: 'Vancouver, BC', bookings: 540, intensity: 'High' },
                                        { region: 'Montreal, QC', bookings: 280, intensity: 'Medium' },
                                        { region: 'Winnipeg, MB', bookings: 120, intensity: 'Growing' },
                                        { region: 'Edmonton, AB', bookings: 189, intensity: 'Medium' },
                                    ].map((r) => (
                                        <div key={r.region} className="p-4 px-6 flex items-center justify-between hover:bg-surface-hover/30 transition-colors">
                                            <span className="text-sm font-medium text-white">{r.region}</span>
                                            <div className="flex items-center gap-6">
                                                <span className="text-sm text-text-secondary">{r.bookings} bookings</span>
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${r.intensity === 'Very High' ? 'text-red-400 bg-red-500/10 border-red-500/20' : r.intensity === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : r.intensity === 'Growing' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{r.intensity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                },
            ]}
        />
    );
}
