import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

const walletTxns = [
    { id: 'WTX-001', user: 'John Doe', type: 'Deposit', amount: '+$50.00', method: 'Stripe', date: 'Oct 24, 2026', status: 'Completed' },
    { id: 'WTX-002', user: 'Sarah S.', type: 'Reward Credit', amount: '+$15.00', method: 'System', date: 'Oct 24, 2026', status: 'Completed' },
    { id: 'WTX-003', user: 'Mike T.', type: 'Withdrawal', amount: '-$30.00', method: 'Bank Transfer', date: 'Oct 23, 2026', status: 'Processing' },
    { id: 'WTX-004', user: 'Enterprise Fleet', type: 'Deposit', amount: '+$500.00', method: 'Wire Transfer', date: 'Oct 23, 2026', status: 'Completed' },
    { id: 'WTX-005', user: 'John Doe', type: 'Payment', amount: '-$89.99', method: 'Wallet Balance', date: 'Oct 22, 2026', status: 'Completed' },
    { id: 'WTX-006', user: 'Alice Admin', type: 'Manual Adjustment', amount: '$200.00', method: 'System Override', date: 'Oct 22, 2026', status: 'Awaiting 2nd Approval' },
    { id: 'WTX-007', user: 'Downtown Garage', type: 'Bulk Payout', amount: '-$42,500.00', method: 'Wire Transfer', date: 'Oct 21, 2026', status: 'Awaiting 2nd Approval' },
];

const amountCol = { key: 'amount', header: 'Amount', render: (v: string) => <span className={`text-sm font-bold ${v.startsWith('+') ? 'text-accent-green' : v.startsWith('-') ? 'text-red-400' : 'text-white'}`}>{v}</span> };
const statusCol = {
    key: 'status', header: 'Status', render: (v: string) => {
        if (v === 'Awaiting 2nd Approval') {
            return (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20 flex items-center gap-1.5 w-max">
                    <ShieldAlert className="w-3 h-3" /> Awaiting 2nd Approval
                </span>
            );
        }
        const c = v === 'Completed' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : v === 'Processing' ? 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
    }
};

const baseCols = [
    { key: 'id', header: 'ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
    { key: 'user', header: 'Entity', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
    { key: 'type', header: 'Transaction Type' },
    amountCol,
    { key: 'method', header: 'Method' },
    { key: 'date', header: 'Date' },
    statusCol,
];

export default function WalletEngine() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Dual Authorization Banner */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4">
                <div className="p-2 bg-amber-500/20 rounded-lg h-fit">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                    <h3 className="text-amber-400 font-bold text-sm">Action Required: Dual Authorization Pending</h3>
                    <p className="text-xs text-amber-400/80 mt-1 max-w-3xl leading-relaxed">
                        There are currently <strong>2 transactions</strong> awaiting secondary approval. 
                        By policy, Manual Wallet Adjustments and Bulk Payouts over $25,000 require authorization from a <span className="font-mono bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">FINANCE_ADMIN</span> or <span className="font-mono bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">SUPER_ADMIN</span>.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30 transition-colors flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Review Pending Approvals
                    </button>
                </div>
            </div>

            <TabPage
                title="💳 Wallet Engine"
                description="Platform float management, deposits, withdrawals, and reward liability."
                tabs={[
                    {
                        id: 'float', label: 'Total Float',
                        content: (
                            <div className="space-y-5">
                                <StatGrid stats={[
                                    { label: 'Total Float', value: '$284,210', trend: '+8.2%', trendUp: true },
                                    { label: 'Active Wallets', value: '8,492' },
                                    { label: 'Avg Balance', value: '$33.47' },
                                    { label: 'Daily Volume', value: '$12,840', trend: '+5.1%', trendUp: true },
                                ]} />
                                <DataTable columns={baseCols} data={walletTxns} searchKeys={['id', 'user']} searchPlaceholder="Search wallet transactions..." />
                            </div>
                        )
                    },
                    {
                        id: 'deposits', label: 'Deposits',
                        content: <DataTable columns={baseCols} data={walletTxns.filter(t => t.type === 'Deposit')} searchKeys={['id', 'user']} />
                    },
                    {
                        id: 'withdrawals', label: 'Withdrawals',
                        content: <DataTable columns={baseCols} data={walletTxns.filter(t => t.type === 'Withdrawal' || t.type === 'Bulk Payout')} searchKeys={['id', 'user']} />
                    },
                    {
                        id: 'locked', label: 'Locked Funds',
                        content: (
                            <div className="space-y-5">
                                <StatGrid stats={[
                                    { label: 'Total Locked', value: '$18,440' },
                                    { label: 'Active Holds', value: '24' },
                                    { label: 'Dispute Holds', value: '6' },
                                ]} />
                                <DataTable columns={baseCols} data={walletTxns.filter(t => t.type === 'Locked')} />
                            </div>
                        )
                    },
                    {
                        id: 'rewards', label: 'Liability & Overrides',
                        content: (
                            <div className="space-y-5">
                                <StatGrid stats={[
                                    { label: 'Outstanding Rewards', value: '$42,180' },
                                    { label: 'Credits Issued (30d)', value: '$8,420', trend: '+15%', trendUp: true },
                                    { label: 'Manual Overrides (30d)', value: '$1,200', trend: '-2%', trendUp: false },
                                ]} />
                                <DataTable columns={baseCols} data={walletTxns.filter(t => t.type === 'Reward Credit' || t.type === 'Manual Adjustment')} />
                            </div>
                        )
                    },
                ]}
            />
        </div>
    );
}
