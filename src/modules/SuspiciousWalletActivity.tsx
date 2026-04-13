import { Eye, Search, Filter, Wallet, AlertTriangle } from 'lucide-react';

const activities = [
    { id: 'WL-0912', user: 'AutoPro Eastside', type: 'High Velocity Withdrawals', amount: '$12,500', transactions: 5, timeframe: 'Last 2 hours', status: 'Paused / Under Review', risk: 'High' },
    { id: 'WL-0910', user: 'JDoe_User_88', type: 'Smurfing Pattern Detected', amount: '$4,900', transactions: 12, timeframe: 'Last 24 hours', status: 'Flagged', risk: 'Medium' },
    { id: 'WL-0908', user: 'QuickFix Motors', type: 'Unusual Top-Up Source', amount: '$8,000', transactions: 1, timeframe: 'Last 5 mins', status: 'Blocked', risk: 'Critical' },
    { id: 'WL-0905', user: 'Metro Auto Masters', type: 'Cross-Border Volume Spike', amount: '$25,000', transactions: 4, timeframe: 'Last 7 days', status: 'Cleared', risk: 'Low' },
];

export default function SuspiciousWalletActivity() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Eye className="w-8 h-8 text-indigo-400" />
                        Wallet Monitoring
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Detect suspicious wallet behavior: velocity limits, unusual top-ups, and smurfing patterns.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Configure Rules
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-indigo-500">
                    <h3 className="text-text-muted text-sm font-medium">Flagged Accounts</h3>
                    <p className="text-3xl font-bold text-white mt-2">24</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-amber-500" /> Requires Review</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-red-500">
                    <h3 className="text-text-muted text-sm font-medium">Frozen Assets</h3>
                    <p className="text-3xl font-bold text-white mt-2">$84.5K</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Locked permanently or pending</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Velocity Spikes</h3>
                    <p className="text-3xl font-bold text-white mt-2">18</p>
                    <p className="text-xs text-text-muted mt-1">Exceeding 5x normal volume</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-accent-green">
                    <h3 className="text-text-muted text-sm font-medium">Cleared Alerts</h3>
                    <p className="text-3xl font-bold text-white mt-2">192</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">Last 30 days</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search user, garage, wallet ID..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Risk
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Alert ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Detection Reason</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Volume Affected</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status / Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {activities.map((a) => (
                                <tr key={a.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block">{a.id}</span>
                                        <div className="mt-2">
                                            {a.risk === 'Critical' && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-bold rounded uppercase tracking-wider">Critical</span>}
                                            {a.risk === 'High' && <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded uppercase tracking-wider">High</span>}
                                            {a.risk === 'Medium' && <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider">Medium</span>}
                                            {a.risk === 'Low' && <span className="px-2 py-0.5 bg-surface-hover text-text-muted text-[10px] font-bold rounded uppercase tracking-wider border border-border-subtle">Low</span>}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                                            <Wallet className="w-4 h-4 text-text-muted" /> {a.user}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white mb-0.5">{a.type}</p>
                                        <p className="text-xs text-text-muted">{a.transactions} transactions in {a.timeframe}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        {<span className="text-sm font-bold text-white">{a.amount}</span>}
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className={`text-xs font-bold ${a.status.includes('Blocked') || a.status.includes('Paused') ? 'text-red-400' : a.status.includes('Cleared') ? 'text-accent-green' : 'text-amber-500'}`}>
                                                {a.status}
                                            </span>
                                            {a.status !== 'Cleared' && (
                                                <button className="text-[11px] font-bold text-indigo-400 hover:text-white px-3 py-1.5 bg-surface hover:bg-surface-hover border border-indigo-500/30 hover:border-border-subtle rounded-md transition-colors">
                                                    Investigate
                                                </button>
                                            )}
                                        </div>
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
