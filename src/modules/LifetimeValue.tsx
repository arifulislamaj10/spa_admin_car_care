import { Heart, TrendingUp, Target, CalendarDays } from 'lucide-react';

const channels = [
    { name: 'Organic Search', cac: '$12.50', ltv: '$450', ratio: '36x', payback: '0.4 mos' },
    { name: 'Referral Program', cac: '$25.00', ltv: '$620', ratio: '24.8x', payback: '0.8 mos' },
    { name: 'Paid Social (Meta)', cac: '$45.00', ltv: '$280', ratio: '6.2x', payback: '2.1 mos' },
    { name: 'Apple Search Ads', cac: '$52.00', ltv: '$310', ratio: '5.9x', payback: '2.4 mos' },
];

export default function LifetimeValue() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Heart className="w-8 h-8 text-rose-500" />
                        Customer Lifetime Value
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        LTV vs CAC ratio, cohort profitability matching, and payback period analysis.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-rose-500">
                    <h3 className="text-text-muted text-sm font-medium">Avg LTV (Platform)</h3>
                    <p className="text-3xl font-bold text-white mt-1">$385.00</p>
                    <p className="text-xs text-accent-green mt-1 flex items-center gap-1 font-semibold"><TrendingUp className="w-3 h-3" /> +$42 vs last yr</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Blended CAC</h3>
                    <p className="text-3xl font-bold text-white mt-1">$28.40</p>
                    <p className="text-xs text-text-muted mt-1">Customer Acquisition Cost</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">LTV:CAC Ratio</h3>
                    <p className="text-3xl font-bold text-white mt-1">13.5x</p>
                    <p className="text-xs text-text-muted mt-1">Excellent unit economics</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-blue-500">
                    <h3 className="text-text-muted text-sm font-medium">Payback Period</h3>
                    <p className="text-3xl font-bold text-white mt-1">1.2 mos</p>
                    <p className="text-xs text-text-muted mt-1">Time to recover CAC</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[400px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-rose-500" /> Acquisition Channel Economics</h2>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Channel Strategy</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Acquisition Cost (CAC)</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Lifetime Value (LTV)</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">LTV:CAC Ratio</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Payback Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {channels.map((c, idx) => (
                                <tr key={idx} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{c.name}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-amber-400">{c.cac}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-accent-green">{c.ltv}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`px-2 py-1 text-xs font-bold rounded border uppercase tracking-wider ${parseFloat(c.ratio) > 10 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-surface-hover text-text-muted border-border-subtle'}`}>
                                            {c.ratio}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <CalendarDays className="w-4 h-4 text-text-muted" /> {c.payback}
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
