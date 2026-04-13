import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const usageLogs = [
    { id: 1, session: 'CS-8901', user: 'John Doe', query: 'What oil does my 2019 Civic need?', tokens: 284, latency: '1.2s', model: 'GPT-4o-mini', date: 'Oct 24, 2026' },
    { id: 2, session: 'CS-8902', user: 'Sarah S.', query: 'Brake pad replacement cost estimate', tokens: 412, latency: '1.8s', model: 'GPT-4o-mini', date: 'Oct 24, 2026' },
    { id: 3, session: 'CS-8903', user: 'Mike T.', query: 'Nearest garage with tire rotation', tokens: 198, latency: '0.9s', model: 'GPT-4o-mini', date: 'Oct 23, 2026' },
    { id: 4, session: 'CS-8904', user: 'Enterprise Fleet', query: 'Fleet maintenance schedule optimization', tokens: 856, latency: '3.1s', model: 'GPT-4o', date: 'Oct 23, 2026' },
];

const errorLogs = [
    { id: 1, code: 'ERR-429', type: 'Rate Limit', message: 'OpenAI rate limit exceeded', count: 12, lastSeen: 'Oct 24, 2026', severity: 'Warning' },
    { id: 2, code: 'ERR-500', type: 'Timeout', message: 'Model inference timeout after 30s', count: 3, lastSeen: 'Oct 23, 2026', severity: 'Error' },
    { id: 3, code: 'ERR-422', type: 'Validation', message: 'Input token limit exceeded (8192)', count: 8, lastSeen: 'Oct 22, 2026', severity: 'Warning' },
];

const modelUpdates = [
    { id: 1, model: 'GPT-4o-mini', version: 'v2024.10.15', update: 'Automotive knowledge fine-tuning', date: 'Oct 15, 2026', status: 'Deployed' },
    { id: 2, model: 'GPT-4o', version: 'v2024.10.01', update: 'Fleet analytics reasoning', date: 'Oct 1, 2026', status: 'Deployed' },
    { id: 3, model: 'CareChatV2', version: 'v0.9-beta', update: 'Custom embedding model for parts catalog', date: 'Sep 20, 2026', status: 'Testing' },
];

export default function CareChatAI() {
    return (
        <TabPage
            title="🤖 CareChat AI"
            description="AI assistant usage analytics, error monitoring, and model lifecycle management."
            tabs={[
                {
                    id: 'usage', label: 'Usage Logs',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Sessions (24h)', value: '1,247', trend: '+14%', trendUp: true },
                                { label: 'Total Tokens', value: '2.4M' },
                                { label: 'Avg Latency', value: '1.4s' },
                                { label: 'Satisfaction', value: '4.7/5' },
                            ]} />
                            <DataTable columns={[
                                { key: 'session', header: 'Session', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'user', header: 'User', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'query', header: 'Query', render: (v: string) => <span className="text-sm text-text-secondary truncate max-w-[300px] block">{v}</span> },
                                { key: 'tokens', header: 'Tokens', render: (v: number) => <span className="text-sm font-semibold text-white">{v}</span> },
                                { key: 'latency', header: 'Latency' },
                                { key: 'model', header: 'Model', render: (v: string) => <span className="text-xs font-mono text-accent-purple">{v}</span> },
                            ]} data={usageLogs} searchKeys={['session', 'user', 'query']} />
                        </div>
                    )
                },
                {
                    id: 'errors', label: 'Error Logs',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Errors (24h)', value: '23', trend: '-5', trendUp: true },
                                { label: 'Error Rate', value: '1.8%' },
                                { label: 'Uptime', value: '99.7%' },
                            ]} />
                            <DataTable columns={[
                                { key: 'code', header: 'Code', render: (v: string) => <span className="font-mono text-red-400 text-sm">{v}</span> },
                                { key: 'type', header: 'Type', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'message', header: 'Message' },
                                { key: 'count', header: 'Count', render: (v: number) => <span className="text-sm font-bold text-white">{v}</span> },
                                { key: 'severity', header: 'Severity', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Error' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{v}</span> },
                            ]} data={errorLogs} />
                        </div>
                    )
                },
                {
                    id: 'models', label: 'Model Updates',
                    content: <DataTable columns={[
                        { key: 'model', header: 'Model', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                        { key: 'version', header: 'Version', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'update', header: 'Update Description' },
                        { key: 'date', header: 'Date' },
                        { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Deployed' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                    ]} data={modelUpdates} />
                },
            ]}
        />
    );
}
