import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const revenueRows = [
    { id: 1, source: 'Booking Commission (20%)', amount: '$28,578', period: 'Oct 2026', change: '+12.5%', trend: true },
    { id: 2, source: 'Booking Commission (20%)', amount: '$25,410', period: 'Sep 2026', change: '+8.2%', trend: true },
    { id: 3, source: 'Booking Commission (20%)', amount: '$23,480', period: 'Aug 2026', change: '+6.1%', trend: true },
];

const subscriptionRows = [
    { id: 1, plan: 'Premium', garages: 187, mrr: '$27,863', churn: '2.1%' },
    { id: 2, plan: 'Enterprise', garages: 66, mrr: '$26,334', churn: '0.8%' },
    { id: 3, plan: 'Basic', garages: 89, mrr: '$4,361', churn: '5.4%' },
];

const adRows = [
    { id: 1, garage: 'AutoPro Express', type: 'Sponsored Listing', spend: '$450', clicks: '2,340', ctr: '3.2%', period: 'Oct 2026' },
    { id: 2, garage: "Jay's Smart Garage", type: 'Boosted Profile', spend: '$280', clicks: '1,890', ctr: '4.1%', period: 'Oct 2026' },
    { id: 3, garage: 'SpeedyLube Pro', type: 'Sponsored Listing', spend: '$320', clicks: '1,560', ctr: '2.8%', period: 'Oct 2026' },
];

const franchiseRows = [
    { id: 1, franchise: 'AutoPro Express', locations: 8, royalty: '$12,400', period: 'Oct 2026', status: 'Active' },
    { id: 2, franchise: 'SpeedyLube Pro', locations: 5, royalty: '$7,800', period: 'Oct 2026', status: 'Active' },
    { id: 3, franchise: 'MechMaster Hub', locations: 3, royalty: '$4,200', period: 'Oct 2026', status: 'Negotiating' },
];

export default function RevenueEngine() {
    return (
        <TabPage
            title="💰 Revenue Engine"
            description="Commission, subscription, advertising, and franchise revenue streams."
            tabs={[
                {
                    id: 'commission', label: 'Commission',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Commission Revenue (MTD)', value: '$28,578', trend: '+12.5%', trendUp: true },
                                { label: 'Avg Commission Rate', value: '18.2%' },
                                { label: 'Bookings Processed', value: '3,847' },
                            ]} />
                            <DataTable columns={[
                                { key: 'source', header: 'Revenue Source', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'amount', header: 'Amount', render: (v: string) => <span className="text-sm font-bold text-accent-green">{v}</span> },
                                { key: 'period', header: 'Period' },
                                { key: 'change', header: 'Change', render: (v: string) => <span className="text-sm font-semibold text-accent-green">{v}</span> },
                            ]} data={revenueRows} />
                        </div>
                    )
                },
                {
                    id: 'subscription', label: 'Subscription',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Total MRR', value: '$58,558', trend: '+6.8%', trendUp: true },
                                { label: 'Subscribers', value: '342' },
                                { label: 'Avg Churn', value: '2.8%', trend: '-0.3%', trendUp: true },
                            ]} />
                            <DataTable columns={[
                                { key: 'plan', header: 'Plan', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'garages', header: 'Garages', render: (v: number) => <span className="text-sm font-semibold text-white">{v}</span> },
                                { key: 'mrr', header: 'MRR', render: (v: string) => <span className="text-sm font-bold text-accent-cyan">{v}</span> },
                                { key: 'churn', header: 'Churn Rate' },
                            ]} data={subscriptionRows} />
                        </div>
                    )
                },
                {
                    id: 'ads', label: 'Ad Revenue',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Ad Revenue (MTD)', value: '$4,210', trend: '+22%', trendUp: true },
                                { label: 'Active Campaigns', value: '12' },
                                { label: 'Avg CTR', value: '3.4%' },
                            ]} />
                            <DataTable columns={[
                                { key: 'garage', header: 'Advertiser', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'type', header: 'Type' },
                                { key: 'spend', header: 'Spend', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'clicks', header: 'Clicks' },
                                { key: 'ctr', header: 'CTR', render: (v: string) => <span className="text-sm font-semibold text-accent-cyan">{v}</span> },
                            ]} data={adRows} />
                        </div>
                    )
                },
                {
                    id: 'franchise', label: 'Franchise',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Franchise Revenue', value: '$24,400', trend: '+18%', trendUp: true },
                                { label: 'Active Franchises', value: '3' },
                                { label: 'Total Locations', value: '16' },
                            ]} />
                            <DataTable columns={[
                                { key: 'franchise', header: 'Franchise', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'locations', header: 'Locations', render: (v: number) => <span className="text-sm font-semibold text-white">{v}</span> },
                                { key: 'royalty', header: 'Monthly Royalty', render: (v: string) => <span className="text-sm font-bold text-accent-green">{v}</span> },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{v}</span> },
                            ]} data={franchiseRows} />
                        </div>
                    )
                },
            ]}
        />
    );
}
