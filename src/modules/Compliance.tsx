import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const adminLogs = [
    { id: 1, admin: 'Alice Admin', action: 'Suspended user usr-103', ip: '142.58.xx.xx', timestamp: 'Oct 24, 14:45:22', level: 'Critical' },
    { id: 2, admin: 'Bob Finance', action: 'Approved manual payout PO-006', ip: '142.58.xx.xx', timestamp: 'Oct 24, 13:20:15', level: 'Warning' },
    { id: 3, admin: 'Alice Admin', action: 'Updated commission rate for GRG-001', ip: '142.58.xx.xx', timestamp: 'Oct 24, 11:08:44', level: 'Info' },
    { id: 4, admin: 'Super Admin', action: 'Created new admin role "Content Manager"', ip: '142.58.xx.xx', timestamp: 'Oct 23, 16:30:01', level: 'Warning' },
    { id: 5, admin: 'Alice Admin', action: 'Exported user data (12,482 records)', ip: '142.58.xx.xx', timestamp: 'Oct 23, 14:10:33', level: 'Critical' },
];

const kycRecords = [
    { id: 'KYC-001', user: 'Tony (AutoFix)', type: 'Garage Owner', document: 'Business License', submitted: 'Oct 22, 2026', verified: 'Oct 23, 2026', status: 'Verified' },
    { id: 'KYC-002', user: 'Mike (Mobile Mechanic)', type: 'Mechanic', document: 'Trade Certificate', submitted: 'Oct 23, 2026', verified: '—', status: 'Pending' },
    { id: 'KYC-003', user: 'Enterprise Fleet Corp', type: 'Fleet', document: 'Corp Registration', submitted: 'Oct 20, 2026', verified: 'Oct 21, 2026', status: 'Verified' },
    { id: 'KYC-004', user: 'Suspicious User', type: 'Customer', document: 'ID Scan', submitted: 'Oct 24, 2026', verified: '—', status: 'AML Flagged' },
];

const taxReports = [
    { id: 1, period: 'Q3 2026', type: 'GST/HST Filing', amount: '$28,420', dueDate: 'Oct 31, 2026', status: 'Pending' },
    { id: 2, period: 'Q2 2026', type: 'GST/HST Filing', amount: '$24,180', dueDate: 'Jul 31, 2026', status: 'Filed' },
    { id: 3, period: 'Q1 2026', type: 'GST/HST Filing', amount: '$19,840', dueDate: 'Apr 30, 2026', status: 'Filed' },
    { id: 4, period: 'FY 2025', type: 'Annual T2 Corporate', amount: '$142,580', dueDate: 'Jun 30, 2026', status: 'Filed' },
];

const privacyLogs = [
    { id: 1, type: 'Data Deletion Request', user: 'usr-445', source: 'PIPEDA', submitted: 'Oct 24, 2026', deadline: 'Nov 23, 2026', status: 'In Progress' },
    { id: 2, type: 'Data Access Request', user: 'usr-221', source: 'PIPEDA', submitted: 'Oct 22, 2026', deadline: 'Nov 21, 2026', status: 'Completed' },
    { id: 3, type: 'Consent Withdrawal', user: 'usr-889', source: 'GDPR (EU User)', submitted: 'Oct 20, 2026', deadline: 'Nov 19, 2026', status: 'In Progress' },
];

const levelCol = {
    key: 'level', header: 'Level', render: (v: string) => {
        const c = v === 'Critical' ? 'text-red-400 bg-red-500/10 border-red-500/20' : v === 'Warning' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20';
        return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
    }
};

export default function Compliance() {
    return (
        <TabPage
            title="🔐 Compliance"
            description="Admin action logs, audit trail, KYC/AML records, tax filings, and data privacy."
            tabs={[
                {
                    id: 'logs', label: 'Admin Logs',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Actions Today', value: '142' },
                                { label: 'Critical Actions', value: '8' },
                                { label: 'Unique Admins', value: '4' },
                            ]} />
                            <DataTable columns={[
                                { key: 'admin', header: 'Admin', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'action', header: 'Action', render: (v: string) => <span className="text-sm text-text-secondary">{v}</span> },
                                { key: 'ip', header: 'IP', render: (v: string) => <span className="font-mono text-xs text-text-muted">{v}</span> },
                                { key: 'timestamp', header: 'Timestamp' },
                                levelCol,
                            ]} data={adminLogs} searchKeys={['admin', 'action']} searchPlaceholder="Search admin actions..." />
                        </div>
                    )
                },
                {
                    id: 'audit', label: 'Audit Trail',
                    content: <DataTable columns={[
                        { key: 'admin', header: 'Actor', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'action', header: 'Action' },
                        { key: 'ip', header: 'Source IP', render: (v: string) => <span className="font-mono text-xs text-text-muted">{v}</span> },
                        { key: 'timestamp', header: 'Timestamp' },
                        levelCol,
                    ]} data={adminLogs} searchKeys={['admin', 'action']} />
                },
                {
                    id: 'kyc', label: 'KYC / AML',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Pending KYC', value: '12' },
                                { label: 'Verified (30d)', value: '89' },
                                { label: 'AML Flags', value: '3' },
                            ]} />
                            <DataTable columns={[
                                { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'user', header: 'User', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'type', header: 'Type' },
                                { key: 'document', header: 'Document' },
                                { key: 'submitted', header: 'Submitted' },
                                {
                                    key: 'status', header: 'Status', render: (v: string) => {
                                        const c = v === 'Verified' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : v === 'Pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20';
                                        return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
                                    }
                                },
                            ]} data={kycRecords} searchKeys={['id', 'user']} />
                        </div>
                    )
                },
                {
                    id: 'tax', label: 'Tax Reports',
                    content: <DataTable columns={[
                        { key: 'period', header: 'Period', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'type', header: 'Filing Type' },
                        { key: 'amount', header: 'Amount', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
                        { key: 'dueDate', header: 'Due Date' },
                        { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Filed' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{v}</span> },
                    ]} data={taxReports} />
                },
                {
                    id: 'privacy', label: 'Privacy (PIPEDA/GDPR)',
                    content: (
                        <div className="space-y-5">
                            <StatGrid stats={[
                                { label: 'Open Requests', value: '2' },
                                { label: 'Completed (30d)', value: '8' },
                                { label: 'Avg Response', value: '4 days' },
                            ]} />
                            <DataTable columns={[
                                { key: 'type', header: 'Request Type', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                                { key: 'user', header: 'User', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                                { key: 'source', header: 'Law' },
                                { key: 'deadline', header: 'Deadline' },
                                { key: 'status', header: 'Status', render: (v: string) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Completed' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{v}</span> },
                            ]} data={privacyLogs} />
                        </div>
                    )
                },
            ]}
        />
    );
}
