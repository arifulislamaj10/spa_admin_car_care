import {
    CreditCard,
    DollarSign,
    ArrowUpRight,
    Download,
    Building2
} from 'lucide-react';

const mockTransactions = [
    { id: 'pi_3PjX', date: 'Oct 24, 09:12 AM', type: 'PAYMENT', amount: '+$89.99', net: '+$71.99', fee: '-$18.00', status: 'SUCCEEDED', destination: 'AutoFix Downtown' },
    { id: 'pi_8Ks2', date: 'Oct 24, 11:45 AM', type: 'PAYMENT', amount: '+$240.00', net: '+$192.00', fee: '-$48.00', status: 'SUCCEEDED', destination: 'Elite Mechanics' },
    { id: 'po_9LqW', date: 'Oct 23, 05:00 PM', type: 'PAYOUT', amount: '-$1,240.50', net: '-$1,240.50', fee: '$0.00', status: 'SUCCEEDED', destination: 'AutoFix Downtown (Bank)' },
    { id: 're_2Mn4', date: 'Oct 23, 10:15 AM', type: 'REFUND', amount: '-$189.99', net: '-$189.99', fee: 'Returned', status: 'REFUNDED', destination: 'David L (Visa x4242)' },
];

const typeColors: Record<string, string> = {
    PAYMENT: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    PAYOUT: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    REFUND: 'bg-red-500/10 text-red-400 border-red-500/20',
};

/* ─── Mobile Transaction Card ─── */
const TransactionCard = ({ tx, index }: { tx: typeof mockTransactions[0]; index: number }) => (
    <div
        className="bg-surface rounded-xl p-4 border border-border-subtle animate-fade-in-up"
        style={{ animationDelay: `${0.05 * index}s` }}
    >
        <div className="flex items-start justify-between mb-2">
            <div className={`font-bold text-lg ${tx.type === 'PAYMENT' ? 'text-accent-green' : 'text-white'}`}>
                {tx.amount}
            </div>
            <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${typeColors[tx.type]}`}>
                {tx.type}
            </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-2">
            {tx.type === 'PAYOUT' ? <Building2 className="w-3.5 h-3.5 text-text-muted" /> : <CreditCard className="w-3.5 h-3.5 text-text-muted" />}
            <span className="truncate">{tx.destination}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-muted">
            <span>Fee: <span className="text-brand font-medium">{tx.fee}</span></span>
            <span>{tx.date}</span>
        </div>
    </div>
);

export default function Payments() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-accent-cyan" /> Financial Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">Stripe Connect interface for marketplace payouts and fees.</p>
                </div>
                <button className="px-3 sm:px-4 py-2 bg-surface-card border border-border-subtle text-text-secondary rounded-lg text-xs sm:text-sm font-medium hover:bg-surface-hover hover:text-white transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
                <div className="card-glow bg-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up delay-1">
                    <p className="text-xs sm:text-sm font-medium text-text-muted mb-1">Gross Volume (30d)</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">$142,890</h3>
                    <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm">
                        <span className="text-accent-green flex items-center font-semibold"><ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5" /> 12.5%</span>
                        <span className="text-text-muted ml-2">vs last month</span>
                    </div>
                </div>

                <div className="card-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-brand/30 relative overflow-hidden animate-fade-in-up delay-2" style={{ background: 'linear-gradient(135deg, #DF3923 0%, #B32D1C 100%)' }}>
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 pl-4 pt-4">
                        <DollarSign className="w-24 sm:w-32 h-24 sm:h-32 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-brand-light mb-1 relative z-10">CC24x7 Revenue (20%)</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white relative z-10">$28,578</h3>
                    <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm relative z-10">
                        <span className="text-white flex items-center font-semibold"><ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5" /> 12.5%</span>
                    </div>
                </div>

                <div className="card-glow bg-surface-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border-subtle animate-fade-in-up delay-3">
                    <p className="text-xs sm:text-sm font-medium text-text-muted mb-1">Pending Payouts</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">$18,440</h3>
                    <div className="mt-3 sm:mt-4">
                        <button className="text-xs sm:text-sm text-accent-cyan font-semibold hover:text-accent-cyan/80 transition-colors">Process Payout &rarr;</button>
                    </div>
                </div>
            </div>

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle overflow-hidden animate-fade-in-up delay-4">
                <div className="p-3 sm:p-5 border-b border-border-subtle flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-bold text-white">Recent Transactions</h3>
                    <div className="px-2 sm:px-3 py-1 bg-accent-purple/10 text-accent-purple text-[10px] sm:text-xs font-semibold rounded-full border border-accent-purple/20 flex items-center gap-1.5">
                        <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Stripe </span>Connected
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden p-3 space-y-3">
                    {mockTransactions.map((tx, i) => (
                        <TransactionCard key={tx.id} tx={tx} index={i} />
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="dark-table w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 pl-6">Amount</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Destination / Source</th>
                                <th className="p-4">Platform Fee</th>
                                <th className="p-4">Net (Garage)</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 pr-6 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTransactions.map((tx, i) => (
                                <tr key={tx.id} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
                                    <td className="p-4 pl-6">
                                        <div className={`font-bold ${tx.type === 'PAYMENT' ? 'text-accent-green' : 'text-white'}`}>
                                            {tx.amount}
                                        </div>
                                        <div className="text-xs text-text-muted font-mono mt-0.5">{tx.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${typeColors[tx.type]}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-white">
                                        <div className="flex items-center gap-2">
                                            {tx.type === 'PAYOUT' ? <Building2 className="w-4 h-4 text-text-muted" /> : <CreditCard className="w-4 h-4 text-text-muted" />}
                                            {tx.destination}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-brand">{tx.fee}</td>
                                    <td className="p-4 text-sm font-medium text-text-secondary">{tx.net}</td>
                                    <td className="p-4 text-sm text-text-muted">{tx.date}</td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="text-accent-cyan text-sm font-medium hover:text-accent-cyan/80 transition-colors">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
