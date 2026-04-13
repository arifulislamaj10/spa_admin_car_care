import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const offers = [
    { id: 'OFF-001', title: '20% Off First Booking', type: 'Promo Code', code: 'FIRST20', redemptions: 1240, budget: '$5,000', spent: '$3,210', status: 'Active' },
    { id: 'OFF-002', title: 'Free Oil Change Friday', type: 'Flash Sale', code: 'OILFRI', redemptions: 890, budget: '$2,000', spent: '$1,780', status: 'Active' },
    { id: 'OFF-003', title: 'Refer & Earn $25', type: 'Referral', code: 'REFER25', redemptions: 420, budget: '$10,000', spent: '$4,200', status: 'Active' },
    { id: 'OFF-004', title: 'Black Friday 40% Off', type: 'Promo Code', code: 'BF40', redemptions: 0, budget: '$15,000', spent: '$0', status: 'Scheduled' },
];

const sponsoredListings = [
    { id: 'SL-001', garage: 'AutoPro Express', position: '#1 Toronto', cpc: '$0.45', impressions: '12,400', clicks: '560', spend: '$252', period: 'Oct 2026' },
    { id: 'SL-002', garage: "Jay's Smart Garage", position: '#1 Scarborough', cpc: '$0.38', impressions: '8,900', clicks: '420', spend: '$159.60', period: 'Oct 2026' },
    { id: 'SL-003', garage: 'SpeedyLube Pro', position: '#2 Toronto', cpc: '$0.42', impressions: '10,200', clicks: '380', spend: '$159.60', period: 'Oct 2026' },
];

const campaigns = [
    { id: 'CMP-001', name: 'Holiday Season Push', type: 'Email + Push', sent: '24,500', opened: '8,200', converted: '1,240', revenue: '$12,400', status: 'Active' },
    { id: 'CMP-002', name: 'Win-back Inactive Users', type: 'Email', sent: '5,400', opened: '1,620', converted: '180', revenue: '$2,340', status: 'Active' },
    { id: 'CMP-003', name: 'New Year Promo', type: 'Push + SMS', sent: '0', opened: '0', converted: '0', revenue: '$0', status: 'Draft' },
];

export default function Marketing() {
    return (
        <TabPage
            title="📢 Marketing & Ads"
            description="Offers, sponsored listings, boosted garages, and campaign performance."
            tabs={[
                {
                    id: 'offers', label: 'Offers',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Offers', value: '3' },
                                { label: 'Total Redemptions', value: '2,550', trend: '+18%', trendUp: true },
                                { label: 'Budget Utilization', value: '54%' },
                            ]} />
                            <DataTable columns={[
                                { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'title', header: 'Offer', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'type', header: 'Type' },
                                { key: 'code', header: 'Code', render: (v: string) => <span className="font-mono text-accent-purple text-sm">{v}</span> },
                                { key: 'redemptions', header: 'Redemptions', render: (v: number) => <span className="text-sm font-semibold text-white">{v.toLocaleString()}</span> },
                                { key: 'spent', header: 'Spent', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                            ]} data={offers} searchKeys={['title', 'code']} />
                        </div>
                    )
                },
                {
                    id: 'sponsored', label: 'Sponsored Listings',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Listings', value: '12' },
                                { label: 'Total Ad Spend', value: '$4,210', trend: '+22%', trendUp: true },
                                { label: 'Avg CPC', value: '$0.42' },
                            ]} />
                            <DataTable columns={[
                                { key: 'garage', header: 'Garage', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'position', header: 'Position', render: (v: string) => <span className="text-sm font-semibold text-accent-cyan">{v}</span> },
                                { key: 'impressions', header: 'Impressions' },
                                { key: 'clicks', header: 'Clicks' },
                                { key: 'cpc', header: 'CPC' },
                                { key: 'spend', header: 'Spend', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                            ]} data={sponsoredListings} />
                        </div>
                    )
                },
                {
                    id: 'boosted', label: 'Boosted Garages',
                    content: <DataTable columns={[
                        { key: 'garage', header: 'Garage', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'position', header: 'Boosted Position' },
                        { key: 'spend', header: 'Monthly Spend', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                        { key: 'impressions', header: 'Impressions' },
                    ]} data={sponsoredListings} />
                },
                {
                    id: 'campaigns', label: 'Campaign Performance',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Campaigns', value: '2' },
                                { label: 'Total Revenue', value: '$14,740' },
                                { label: 'Avg Open Rate', value: '33.5%' },
                            ]} />
                            <DataTable columns={[
                                { key: 'name', header: 'Campaign', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'type', header: 'Type' },
                                { key: 'sent', header: 'Sent' },
                                { key: 'opened', header: 'Opened' },
                                { key: 'converted', header: 'Converted', render: (v: string) => <span className="text-sm font-semibold text-accent-green">{v}</span> },
                                { key: 'revenue', header: 'Revenue', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-text-muted bg-surface border-border-subtle'}`}>{v}</span> },
                            ]} data={campaigns} />
                        </div>
                    )
                },
                {
                    id: 'billing', label: 'Ad Billing',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Total Billed (MTD)', value: '$8,420' },
                                { label: 'Outstanding', value: '$1,240' },
                                { label: 'Avg Invoice', value: '$702' },
                            ]} />
                            <DataTable columns={[
                                { key: 'garage', header: 'Advertiser', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'spend', header: 'Amount Billed', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'period', header: 'Billing Period' },
                            ]} data={sponsoredListings} />
                        </div>
                    )
                },
            ]}
        />
    );
}
