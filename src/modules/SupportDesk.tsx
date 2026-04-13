import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const tickets = [
    { id: 'TK-4501', subject: 'Mechanic no-show complaint', priority: 'High', customer: 'John Doe', agent: 'Support L1', created: '2 hrs ago', status: 'Open' },
    { id: 'TK-4502', subject: 'Wrong parts installed', priority: 'Critical', customer: 'Sarah S.', agent: 'Escalation', created: '4 hrs ago', status: 'Escalated' },
    { id: 'TK-4503', subject: 'App crash on booking', priority: 'Medium', customer: 'Mike T.', agent: 'Support L1', created: '6 hrs ago', status: 'In Progress' },
    { id: 'TK-4504', subject: 'Refund not processed', priority: 'High', customer: 'David L.', agent: 'Finance', created: '1 day ago', status: 'Open' },
    { id: 'TK-4505', subject: 'Account locked out', priority: 'Low', customer: 'Emma W.', agent: 'Support L1', created: '2 days ago', status: 'Resolved' },
];

const fraudItems = [
    { id: 'FRD-101', type: 'Suspicious Logins', user: 'Unknown', ip: '185.220.101.xx', location: 'TOR Exit Node', attempts: 24, date: 'Oct 24, 2026', severity: 'Critical' },
    { id: 'FRD-102', type: 'Payment Anomaly', user: 'usr-404', ip: '192.168.x.x', location: 'Mumbai, IN', attempts: 1, date: 'Oct 23, 2026', severity: 'High' },
    { id: 'FRD-103', type: 'Fake Reviews', user: 'usr-887', ip: '10.0.x.x', location: 'VPN', attempts: 8, date: 'Oct 22, 2026', severity: 'Medium' },
];

const abuseReports = [
    { id: 'AB-301', reporter: 'John Doe', reported: 'GRG-004 (QuickFix Auto)', type: 'Harassment', description: 'Rude mechanic behavior', date: 'Oct 23, 2026', status: 'Investigating' },
    { id: 'AB-302', reporter: 'Sarah S.', reported: 'usr-221', type: 'Spam', description: 'Fake promotional messages', date: 'Oct 22, 2026', status: 'Resolved' },
];

const priorityCol = {
    key: 'priority', header: 'Priority', render: (v: string) => {
        const c = v === 'Critical' ? 'text-red-400 bg-red-500/10 border-red-500/20' : v === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : v === 'Medium' ? 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' : 'text-text-muted bg-surface border-border-subtle';
        return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
    }
};

const statusCol = {
    key: 'status', header: 'Status', render: (v: string) => {
        const c = v === 'Open' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : v === 'Escalated' ? 'text-red-400 bg-red-500/10 border-red-500/20' : v === 'In Progress' ? 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' : v === 'Resolved' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-text-muted bg-surface border-border-subtle';
        return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
    }
};

export default function SupportDesk() {
    return (
        <TabPage
            title="🛠 Support Desk"
            description="Ticket queue, dispute resolution, fraud monitoring, and abuse reports."
            tabs={[
                {
                    id: 'tickets', label: 'Ticket Queue',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Open Tickets', value: '47', trend: '-8', trendUp: true },
                                { label: 'Avg Response Time', value: '12 min' },
                                { label: 'Resolution Rate', value: '94.2%', trend: '+1.3%', trendUp: true },
                                { label: 'CSAT Score', value: '4.6/5' },
                            ]} />
                            <DataTable columns={[
                                { key: 'id', header: 'Ticket', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'subject', header: 'Subject', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                priorityCol,
                                { key: 'customer', header: 'Customer' },
                                { key: 'agent', header: 'Agent' },
                                { key: 'created', header: 'Created' },
                                statusCol,
                            ]} data={tickets} searchKeys={['id', 'subject', 'customer']} searchPlaceholder="Search tickets..." />
                        </div>
                    )
                },
                {
                    id: 'disputes', label: 'Disputes',
                    content: <DataTable columns={[
                        { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'subject', header: 'Subject', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        priorityCol,
                        { key: 'customer', header: 'Customer' },
                        statusCol,
                    ]} data={tickets.filter(t => t.priority === 'High' || t.priority === 'Critical')} />
                },
                {
                    id: 'fraud', label: 'Fraud Monitoring',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Active Threats', value: '3', trend: '+1' },
                                { label: 'Blocked IPs (30d)', value: '142' },
                                { label: 'Fraud Loss Prevented', value: '$8,420' },
                            ]} />
                            <DataTable columns={[
                                { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'type', header: 'Threat Type', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'ip', header: 'IP Address', render: (v: string) => <span className="font-mono text-sm text-text-secondary">{v}</span> },
                                { key: 'location', header: 'Location' },
                                { key: 'attempts', header: 'Attempts', render: (v: number) => <span className="text-sm font-bold text-white">{v}</span> },
                                {
                                    key: 'severity', header: 'Severity', render: (v: string) => {
                                        const c = v === 'Critical' ? 'text-red-400 bg-red-500/10 border-red-500/20' : v === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20';
                                        return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
                                    }
                                },
                            ]} data={fraudItems} />
                        </div>
                    )
                },
                {
                    id: 'risk', label: 'Risk Flags',
                    content: <DataTable columns={[
                        { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'type', header: 'Risk Type', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'user', header: 'User' },
                        { key: 'severity', header: 'Severity', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Critical' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{v}</span> },
                        { key: 'date', header: 'Date' },
                    ]} data={fraudItems} />
                },
                {
                    id: 'abuse', label: 'Abuse Reports',
                    content: <DataTable columns={[
                        { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'reporter', header: 'Reporter', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'reported', header: 'Reported Entity' },
                        { key: 'type', header: 'Type' },
                        { key: 'description', header: 'Description' },
                        { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Investigating' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-accent-green bg-accent-green/10 border-accent-green/20'}`}>{v}</span> },
                    ]} data={abuseReports} searchKeys={['id', 'reporter']} />
                },
            ]}
        />
    );
}
