import { Scale, Users, Search, Filter, ShieldAlert, ArrowRight } from 'lucide-react';

const disputes = [
    { id: 'DSP-882', customer: 'James T.', garage: 'Metro Auto Masters', reason: 'Service not as described', amount: '$450.00', status: 'Awaiting Garage Reply', date: '2026-02-24', riskLevel: 'Medium' },
    { id: 'DSP-881', customer: 'Sarah W.', garage: 'QuickFix Motors', reason: 'Overcharged / Wrong quote', amount: '$120.00', status: 'In Mediation', date: '2026-02-23', riskLevel: 'Low' },
    { id: 'DSP-879', customer: 'David C.', garage: 'Downtown Tuners', reason: 'Damage caused to vehicle', amount: '$1,200.00', status: 'Escalated to Legal', date: '2026-02-21', riskLevel: 'Critical' },
    { id: 'DSP-875', customer: 'Amanda P.', garage: 'Speedy Auto Waterloo', reason: 'Did not authorize repair', amount: '$85.00', status: 'Resolved (Customer Refunded)', date: '2026-02-18', riskLevel: 'Low' },
];

export default function Disputes() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Scale className="w-8 h-8 text-rose-500" />
                        Dispute Resolution Center
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Mediate customer-garage disputes, hold funds in escrow, and enforce platform resolution policies.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Policy Guidelines
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-rose-500">
                    <h3 className="text-text-muted text-sm font-medium">Active Disputes</h3>
                    <p className="text-3xl font-bold text-white mt-2">12</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3 text-amber-500" /> 3 escalating</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Funds in Escrow</h3>
                    <p className="text-3xl font-bold text-white mt-2">$4,850.00</p>
                    <p className="text-xs text-text-muted mt-1">Locked pending resolution</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Garage Win Rate</h3>
                    <p className="text-3xl font-bold text-white mt-2">68%</p>
                    <p className="text-xs text-text-muted mt-1">Last 30 days</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Avg Resolution Time</h3>
                    <p className="text-3xl font-bold text-white mt-2">4.5d</p>
                    <p className="text-xs text-text-muted mt-1">Platform average: 5.0d</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search dispute ID, customer, garage..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Status
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Dispute ID / Date</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Parties Involved</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Reason / Amount</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Risk Level</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Current Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {disputes.map((d) => (
                                <tr key={d.id} className="hover:bg-surface-hover/30 transition-colors cursor-pointer group">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block mb-1">{d.id}</span>
                                        <p className="text-xs text-text-muted">{d.date}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="w-4 h-4 text-text-muted" />
                                            <span className="font-medium text-white">{d.customer}</span>
                                            <ArrowRight className="w-3 h-3 text-text-muted" />
                                            <span className="text-text-secondary">{d.garage}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-rose-400">{d.amount}</p>
                                        <p className="text-[11px] text-text-muted mt-0.5">{d.reason}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        {d.riskLevel === 'Critical' && <span className="px-2 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded uppercase tracking-wider border border-red-500/20">Critical</span>}
                                        {d.riskLevel === 'Medium' && <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded uppercase tracking-wider border border-amber-500/20">Medium</span>}
                                        {d.riskLevel === 'Low' && <span className="px-2 py-1 bg-surface-hover text-text-muted text-[10px] font-bold rounded uppercase tracking-wider border border-border-subtle">Low</span>}
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`text-xs font-bold ${d.status.includes('Escalated') ? 'text-red-400' : d.status.includes('Resolved') ? 'text-accent-green' : 'text-blue-400'}`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="text-xs font-semibold text-rose-400 hover:text-white transition-colors">Review Case</button>
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
