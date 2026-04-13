import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const servicePool = [
    { id: 1, category: 'Oil Change', records: '24,500', garages: 287, avgPrice: '$72.40', lastUpdated: 'Oct 24, 2026' },
    { id: 2, category: 'Brake Replacement', records: '18,200', garages: 245, avgPrice: '$285.00', lastUpdated: 'Oct 24, 2026' },
    { id: 3, category: 'Tire Rotation', records: '12,800', garages: 198, avgPrice: '$45.00', lastUpdated: 'Oct 23, 2026' },
    { id: 4, category: 'Diagnostics', records: '8,400', garages: 156, avgPrice: '$120.00', lastUpdated: 'Oct 22, 2026' },
    { id: 5, category: 'AC Service', records: '6,200', garages: 134, avgPrice: '$180.00', lastUpdated: 'Oct 22, 2026' },
];

const exportRequests = [
    { id: 'EXP-001', requestor: 'Data Analyst Team', dataset: 'Booking Trends Q3', format: 'CSV', records: '45,000', date: 'Oct 24, 2026', status: 'Processing' },
    { id: 'EXP-002', requestor: 'Finance Dept', dataset: 'Revenue by Region', format: 'Excel', records: '12,000', date: 'Oct 23, 2026', status: 'Completed' },
    { id: 'EXP-003', requestor: 'External Partner', dataset: 'Service Price Index', format: 'JSON API', records: '8,000', date: 'Oct 20, 2026', status: 'Completed' },
];

const licensingClients = [
    { id: 'LC-001', client: 'InsurTech Canada', dataset: 'Service Pricing Data', type: 'Annual License', revenue: '$24,000/yr', startDate: 'Jan 2026', status: 'Active' },
    { id: 'LC-002', client: 'AutoTraderPro', dataset: 'Garage Performance Metrics', type: 'Quarterly', revenue: '$8,000/qtr', startDate: 'Jul 2026', status: 'Active' },
    { id: 'LC-003', client: 'FleetManage Corp', dataset: 'Fleet Service Analytics', type: 'Monthly', revenue: '$2,500/mo', startDate: 'Sep 2026', status: 'Trial' },
];

export default function CareChartData() {
    return (
        <TabPage
            title="📊 CareChart Data"
            description="Service data pool, export management, and data licensing."
            tabs={[
                {
                    id: 'pool', label: 'Service Data Pool',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Total Records', value: '70.1K' },
                                { label: 'Categories', value: '28' },
                                { label: 'Contributing Garages', value: '342' },
                                { label: 'Data Freshness', value: '< 24h' },
                            ]} />
                            <DataTable columns={[
                                { key: 'category', header: 'Category', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'records', header: 'Records', render: (v: string) => <span className="text-sm font-bold text-accent-cyan">{v}</span> },
                                { key: 'garages', header: 'Garages', render: (v: number) => <span className="text-sm font-semibold text-white">{v}</span> },
                                { key: 'avgPrice', header: 'Avg Price' },
                                { key: 'lastUpdated', header: 'Last Updated' },
                            ]} data={servicePool} />
                        </div>
                    )
                },
                {
                    id: 'exports', label: 'Export Requests',
                    content: <DataTable columns={[
                        { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'requestor', header: 'Requestor', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'dataset', header: 'Dataset' },
                        { key: 'format', header: 'Format', render: (v: string) => <span className="font-mono text-accent-purple text-sm">{v}</span> },
                        { key: 'records', header: 'Records' },
                        { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Completed' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                    ]} data={exportRequests} searchKeys={['id', 'requestor']} />
                },
                {
                    id: 'licensing', label: 'Licensing Clients',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Licenses', value: '3' },
                                { label: 'Annual Revenue', value: '$58K', trend: '+42%', trendUp: true },
                            ]} />
                            <DataTable columns={[
                                { key: 'client', header: 'Client', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'dataset', header: 'Dataset' },
                                { key: 'type', header: 'License Type' },
                                { key: 'revenue', header: 'Revenue', render: (v: string) => <span className="text-sm font-bold text-accent-green">{v}</span> },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                            ]} data={licensingClients} />
                        </div>
                    )
                },
            ]}
        />
    );
}
