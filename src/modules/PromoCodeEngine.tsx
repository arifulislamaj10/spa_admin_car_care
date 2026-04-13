import { Hash, Tag, Settings, Plus, Play, Pause } from 'lucide-react';

const promos = [
    { id: 'WINTER50', type: 'Flat Discount', value: '$50.00', limit: '1000 uses', used: 845, cost: '$42,250', status: 'Active', expires: '2026-03-01' },
    { id: 'FIRSTOIL', type: 'Percentage', value: '20%', limit: 'No Limit', used: 2410, cost: '$28,400', status: 'Active', expires: 'Ongoing' },
    { id: 'VIPFLEET', type: 'Service Specific', value: 'Free Inspection', limit: '100 uses', used: 100, cost: '$8,500', status: 'Depleted', expires: '2026-02-01' },
];

export default function PromoCodeEngine() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Hash className="w-8 h-8 text-amber-500" />
                        Promo Code Engine
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Generate promotional codes, define spend limits, rules, and track discount liabilities.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-amber-500 text-[#0d1117] hover:bg-amber-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Promo Code
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
                <div className="flex-1 overflow-x-auto p-1">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Promo Code</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type / Value</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Availability</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Total Liability</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status / Expiry</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {promos.map((p) => (
                                <tr key={p.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-white tracking-wider border border-border-subtle bg-surface px-2 py-1 rounded flex items-center gap-2 w-max">
                                            <Tag className="w-3.5 h-3.5 text-amber-500" /> {p.id}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-accent-green">{p.value}</p>
                                        <p className="text-[11px] text-text-muted uppercase mt-0.5">{p.type}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-white">{p.used} <span className="text-xs text-text-muted">redemptions</span></span>
                                            <span className="text-[10px] text-text-secondary uppercase">Limit: {p.limit}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-sm font-bold text-white">
                                        {p.cost}
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            {p.status === 'Active' ? (
                                                <span className="w-fit px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded uppercase tracking-wider">Active</span>
                                            ) : (
                                                <span className="w-fit px-2 py-0.5 bg-surface-hover text-text-muted text-[10px] font-semibold rounded uppercase tracking-wider border border-border-subtle">Depleted</span>
                                            )}
                                            <span className="text-[10px] text-text-muted">Exp: {p.expires}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-3 text-text-muted">
                                            <Settings className="w-4 h-4 hover:text-white cursor-pointer" />
                                            {p.status === 'Active' ? <Pause className="w-4 h-4 hover:text-white cursor-pointer" /> : <Play className="w-4 h-4 hover:text-white cursor-pointer" />}
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
