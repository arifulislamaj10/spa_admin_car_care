import { ShieldAlert, AlertCircle } from 'lucide-react';
import TabPage from '../components/ui/TabPage';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';

const payouts = [
    { id: 'PO-9912', garage: 'Downtown Auto Care', amount: '$4,250.00', status: 'Processing', date: 'Oct 24, 2026', method: 'Instant Payout' },
    { id: 'PO-9911', garage: 'Westside Mechanics', amount: '$1,840.00', status: 'Paid', date: 'Oct 23, 2026', method: 'Standard ACH' },
    { id: 'PO-9910', garage: 'Elite Auto Body', amount: '$54,200.00', status: 'Awaiting 2nd Approval', date: 'Oct 22, 2026', method: 'Wire Transfer' },
    { id: 'PO-9909', garage: 'Mobile Fix It', amount: '$890.00', status: 'Failed', date: 'Oct 21, 2026', method: 'Standard ACH' },
    { id: 'PO-9908', garage: 'City Garage', amount: '$3,100.00', status: 'Paid', date: 'Oct 20, 2026', method: 'Instant Payout' },
];

const statusCol = {
    key: 'status', header: 'Status', render: (v: string) => {
        if (v === 'Awaiting 2nd Approval') {
            return (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20 flex items-center gap-1.5 w-max">
                    <ShieldAlert className="w-3 h-3" /> Awaiting 2nd Approval
                </span>
            );
        }
        const c = v === 'Paid' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' :
            v === 'Processing' ? 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' :
                'text-red-400 bg-red-500/10 border-red-500/20';
        return <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
    }
};

const baseCols = [
    { key: 'id', header: 'Payout ID', render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
    { key: 'garage', header: 'Garage / Entity', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
    { key: 'amount', header: 'Amount', render: (v: string) => <span className="text-sm font-bold text-white">{v}</span> },
    { key: 'method', header: 'Method' },
    { key: 'date', header: 'Initiated' },
    statusCol,
    { key: 'action', header: '', render: () => <button className="text-xs text-accent-cyan hover:underline">View Invoice</button> }
];

export default function Payouts() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4">
                <div className="p-2 bg-red-500/20 rounded-lg h-fit">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h3 className="text-red-400 font-bold text-sm">Fintech Compliance Alert: Failed Payouts</h3>
                    <p className="text-xs text-red-400/80 mt-1 max-w-3xl leading-relaxed">
                        1 payout recently failed due to a returned ACH (Insufficient Funds on receiving side). 
                        Please review <span className="font-mono bg-red-500/10 px-1 py-0.5 rounded border border-red-500/20 text-red-300">PO-9909</span> and coordinate with Mobile Fix It to update their routing details.
                    </p>
                </div>
            </div>

            <TabPage
                title="�� Payout Operations"
                description="Manage garage settlements, bulk wires, and instant payout processing."
                tabs={[
                    {
                        id: 'overview', label: 'All Payouts',
                        content: (
                            <div className="space-y-5">
                                <StatGrid stats={[
                                    { label: 'Settled (30d)', value: '$1.4M', trend: '+12%', trendUp: true },
                                    { label: 'Pending Processing', value: '$68,400' },
                                    { label: 'Failed Rate', value: '0.8%', trend: '-0.2%', trendUp: true },
                                    { label: 'Instant Payouts', value: '42%' },
                                ]} />
                                <DataTable columns={baseCols} data={payouts} searchKeys={['id', 'garage']} searchPlaceholder="Search payouts by ID or Garage..." />
                            </div>
                        )
                    },
                    {
                        id: 'pending', label: 'Needs Approval',
                        content: <DataTable columns={baseCols} data={payouts.filter(t => t.status.includes('Approval') || t.status === 'Processing')} searchKeys={['id', 'garage']} />
                    }
                ]}
            />
        </div>
    );
}
