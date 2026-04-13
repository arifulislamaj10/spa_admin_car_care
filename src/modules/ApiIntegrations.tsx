import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const apiClients = [
    { id: 'API-001', client: 'CarCare Mobile App', key: 'ck_live_...4x7m', requests: '2.4M/mo', rateLimit: '10K/min', lastCall: '< 1s ago', status: 'Active' },
    { id: 'API-002', client: 'Torqon Wrench Panel', key: 'ck_live_...wrn1', requests: '890K/mo', rateLimit: '5K/min', lastCall: '2s ago', status: 'Active' },
    { id: 'API-003', client: 'InsurTech Partner', key: 'ck_live_...ins2', requests: '45K/mo', rateLimit: '1K/min', lastCall: '15 min ago', status: 'Active' },
    { id: 'API-004', client: 'Staging Environment', key: 'ck_test_...stg1', requests: '12K/mo', rateLimit: '500/min', lastCall: '3 hrs ago', status: 'Test' },
];

const webhookLogs = [
    { id: 1, event: 'booking.completed', endpoint: 'https://hooks.carcare.ca/booking', status: '200', latency: '145ms', timestamp: 'Oct 24, 14:32:01', retries: 0 },
    { id: 2, event: 'payment.captured', endpoint: 'https://hooks.carcare.ca/payment', status: '200', latency: '89ms', timestamp: 'Oct 24, 14:31:45', retries: 0 },
    { id: 3, event: 'payout.settled', endpoint: 'https://hooks.carcare.ca/payout', status: '500', latency: '2100ms', timestamp: 'Oct 24, 14:30:12', retries: 3 },
    { id: 4, event: 'user.registered', endpoint: 'https://hooks.carcare.ca/user', status: '200', latency: '112ms', timestamp: 'Oct 24, 14:28:55', retries: 0 },
    { id: 5, event: 'review.posted', endpoint: 'https://hooks.carcare.ca/review', status: '200', latency: '98ms', timestamp: 'Oct 24, 14:25:30', retries: 0 },
];

const stripeLogs = [
    { id: 'evt_3Mn1', event: 'payment_intent.succeeded', amount: '$89.99', customer: 'cus_Jd02', gateway: 'Stripe', timestamp: 'Oct 24, 14:32:01' },
    { id: 'evt_3Mn2', event: 'charge.refunded', amount: '-$45.00', customer: 'cus_Kf04', gateway: 'Stripe', timestamp: 'Oct 24, 14:28:12' },
    { id: 'evt_3Mn3', event: 'payout.paid', amount: '$4,210.00', customer: 'acct_Gr01', gateway: 'Stripe Connect', timestamp: 'Oct 24, 14:15:00' },
    { id: 'evt_3Mn4', event: 'invoice.payment_failed', amount: '$149.00', customer: 'cus_Lm08', gateway: 'Stripe', timestamp: 'Oct 24, 13:45:22' },
];

export default function ApiIntegrations() {
    return (
        <TabPage
            title="🔌 API & Integrations"
            description="External API client management, webhook delivery logs, and Stripe event stream."
            tabs={[
                {
                    id: 'clients', label: 'External API Clients',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Clients', value: '4' },
                                { label: 'Total Requests (30d)', value: '3.3M' },
                                { label: 'Avg Latency', value: '48ms' },
                                { label: 'Uptime', value: '99.98%' },
                            ]} />
                            <DataTable columns={[
                                { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'client', header: 'Client Name', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'key', header: 'API Key', render: (v: string) => <span className="font-mono text-xs text-text-muted">{v}</span> },
                                { key: 'requests', header: 'Requests' },
                                { key: 'rateLimit', header: 'Rate Limit' },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                            ]} data={apiClients} searchKeys={['client', 'id']} />
                        </div>
                    )
                },
                {
                    id: 'webhooks', label: 'Webhook Logs',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Delivered (24h)', value: '4,210' },
                                { label: 'Failed', value: '3', trend: '-2', trendUp: true },
                                { label: 'Retry Queue', value: '1' },
                            ]} />
                            <DataTable columns={[
                                { key: 'event', header: 'Event', render: (v: string) => <span className="font-mono text-accent-purple text-sm">{v}</span> },
                                { key: 'endpoint', header: 'Endpoint', render: (v: string) => <span className="font-mono text-xs text-text-muted truncate max-w-[250px] block">{v}</span> },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-bold ${v === '200' ? 'text-accent-green' : 'text-red-400'}`}>{v}</span> },
                                { key: 'latency', header: 'Latency' },
                                { key: 'retries', header: 'Retries', render: (v: number) => <span className={`text-sm ${v > 0 ? 'text-red-400 font-bold' : 'text-text-muted'}`}>{v}</span> },
                                { key: 'timestamp', header: 'Timestamp' },
                            ]} data={webhookLogs} searchKeys={['event']} />
                        </div>
                    )
                },
                {
                    id: 'stripe', label: 'Stripe Logs',
                    content: <DataTable columns={[
                        { key: 'id', header: 'Event ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'event', header: 'Event', render: (v: string) => <span className="font-mono text-sm text-white">{v}</span> },
                        { key: 'amount', header: 'Amount', render: (v: string) => <span className={`text-sm font-bold ${v.startsWith('-') ? 'text-red-400' : 'text-accent-green'}`}>{v}</span> },
                        { key: 'customer', header: 'Customer', render: (v: string) => <span className="font-mono text-xs text-text-muted">{v}</span> },
                        { key: 'gateway', header: 'Gateway' },
                        { key: 'timestamp', header: 'Timestamp' },
                    ]} data={stripeLogs} searchKeys={['id', 'event']} searchPlaceholder="Search Stripe events..." />
                },
            ]}
        />
    );
}
