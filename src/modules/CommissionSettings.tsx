import { Percent, TrendingUp, Settings, Store, CheckCircle2 } from 'lucide-react';

const tiers = [
    { level: 'Free Tier', rate: '20%', type: 'Standard', volumeReq: '$0', activeGarages: 1420 },
    { level: 'Pro Tier', rate: '15%', type: 'Discounted', volumeReq: '$5,000/mo', activeGarages: 840 },
    { level: 'Enterprise / Franchise', rate: '10%', type: 'Discounted', volumeReq: '$25,000/mo', activeGarages: 154 },
];

const overrides = [
    { garage: 'AutoPro Eastside', id: 'GAR-8812', rate: '8%', reason: 'Strategic Partnership', approvedBy: 'Shamim M.', date: 'Oct 2025' },
    { garage: 'QuickFix Motors', id: 'GAR-8810', rate: '12%', reason: 'Volume Guarantee Promo', approvedBy: 'SysAdmin', date: 'Jan 2026' },
];

export default function CommissionSettings() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Percent className="w-8 h-8 text-emerald-400" />
                        Global Commission Rules
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Platform take-rates, tier threshold definitions, and manual garage revenue overrides.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-emerald-500 text-[#0d1117] hover:bg-emerald-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        Save Global Rate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tiers Configuration */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" /> Active Commission Tiers
                    </h2>
                    <div className="grid gap-4">
                        {tiers.map((t, i) => (
                            <div key={i} className={`bg-surface border border-border-subtle rounded-xl p-5 flex items-center justify-between group hover:border-emerald-500/30 transition-colors ${i === 0 ? 'border-l-4 border-l-surface-hover' : i === 1 ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-purple-500'}`}>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-white">{t.level}</h3>
                                        <span className="text-[10px] uppercase tracking-wider text-text-muted border border-border-subtle px-1.5 py-0.5 bg-surface-hover rounded">{t.type}</span>
                                    </div>
                                    <p className="text-sm text-text-muted">Threshold: <span className="text-white font-medium">{t.volumeReq}</span></p>
                                    <p className="text-xs text-text-secondary mt-2 flex items-center gap-1"><Store className="w-3 h-3" /> {t.activeGarages} garages active</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="text-sm text-text-muted block mb-1">Take Rate</span>
                                        <div className="text-3xl font-mono font-bold text-emerald-400">{t.rate}</div>
                                    </div>
                                    <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded transition-colors opacity-0 group-hover:opacity-100">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calculator Widget */}
                <div className="bg-surface-card border border-border-subtle rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Rate Simulator</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Gross Booking Value</label>
                                <input type="text" value="$1,500.00" disabled className="w-full bg-[#0d1117] border border-border-subtle rounded-lg px-3 py-2 text-white font-mono" />
                            </div>
                            <div>
                                <label className="text-xs text-text-muted block mb-1">Applied Tier</label>
                                <select className="w-full bg-[#0d1117] border border-border-subtle rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none">
                                    <option>Pro Tier (15%)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-text-muted">Platform Revenue</span>
                            <span className="font-mono text-emerald-400 font-bold">$225.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Garage Payout</span>
                            <span className="font-mono text-white font-bold">$1,275.00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manual Overrides */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col mt-8">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">Manual Garage Overrides</h2>
                    <button className="text-xs font-semibold px-3 py-1.5 bg-surface-hover border border-border-subtle hover:border-text-muted rounded text-text-primary transition-colors">
                        Add Override
                    </button>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Custom Rate</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Justification</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Approved By</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {overrides.map((o) => (
                                <tr key={o.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white flex items-center gap-2"><Store className="w-4 h-4 text-text-muted" /> {o.garage}</p>
                                        <p className="text-[10px] font-mono text-text-secondary mt-0.5">{o.id}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-lg font-bold font-mono text-amber-400">{o.rate}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm text-text-secondary">{o.reason}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-xs text-text-muted flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-accent-green" /> {o.approvedBy}</span>
                                        <span className="text-[10px] text-text-secondary mt-0.5 block">{o.date}</span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="text-xs font-semibold text-red-400 border border-transparent hover:border-red-500/30 px-3 py-1 rounded transition-colors hover:bg-surface-hover">Revoke</button>
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
