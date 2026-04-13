import { DollarSign, Percent, Settings2, ShieldAlert, ArrowRight, ArrowDown } from 'lucide-react';

const commissionRules = [
    { id: 'CR-01', name: 'Global Default (Standard)', rate: '12.0%', appliesTo: 'All un-tiered garages', active: true },
    { id: 'CR-02', name: 'Pro Tier Subs', rate: '9.5%', appliesTo: 'Garages on Pro Plan', active: true },
    { id: 'CR-03', name: 'Enterprise Fleet Subs', rate: '7.0%', appliesTo: 'Garages on Enterprise Plan', active: true },
    { id: 'CR-04', name: 'Franchise Partner (Standard)', rate: '11.5%', appliesTo: 'Franchise Network', active: true },
    { id: 'CR-05', name: 'In-House (Intercompany)', rate: '0.0%', appliesTo: 'Owned Garages', active: true },
    { id: 'CR-06', name: 'New Garage Promo (First 90 Days)', rate: '5.0%', appliesTo: 'Onboarded < 90 Days', active: false },
];

const overrideOverrides = [
    { garage: 'AutoPro Eastside', normalRate: '11.5%', overrideRate: '8.0%', reason: 'Volume Commitment Q3', expires: '2026-09-30' },
    { garage: 'Downtown Tuners', normalRate: '12.0%', overrideRate: '10.0%', reason: 'Dispute Settlement', expires: '2026-12-31' },
];

export default function CommissionRates() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Percent className="w-8 h-8 text-accent-cyan" />
                        Commission Rates
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Configure platform take-rates, tier-based commission rules, and specific garage overrides.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-accent-cyan text-[#0d1117] hover:bg-accent-cyan/90 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(0,212,170,0.3)] flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> New Rule
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Effective Take Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">10.8%</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowDown className="w-3 h-3 text-accent-red" /> 0.2% vs last month (due to Pro upgrades)
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Percent className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Active Rules</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">5</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-cyan">1 inactive promo</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <ShieldAlert className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Active Overrides</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">2</p>
                    <p className="text-xs text-text-muted mt-1">Manual garage-level exceptions</p>
                </div>
            </div>

            {/* Global Rules Table */}
            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border-subtle bg-surface-card/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Commission Rules Engine</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Applies To Target</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Rate</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {commissionRules.map(rule => (
                                <tr key={rule.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-3 px-5 text-[11px] font-mono text-text-muted">{rule.id}</td>
                                    <td className="py-3 px-5 text-sm font-bold text-white">{rule.name}</td>
                                    <td className="py-3 px-5">
                                        <span className="text-[11px] px-2 py-1 bg-surface-card border border-border-subtle rounded-md text-text-secondary">{rule.appliesTo}</span>
                                    </td>
                                    <td className="py-3 px-5">
                                        <span className="text-sm font-bold text-accent-cyan">{rule.rate}</span>
                                    </td>
                                    <td className="py-3 px-5">
                                        {rule.active ? (
                                            <span className="text-[11px] font-semibold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                                        ) : (
                                            <span className="text-[11px] font-semibold text-text-muted bg-surface-hover px-2 py-0.5 rounded uppercase tracking-wider">Inactive</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-5 text-right">
                                        <button className="text-xs font-semibold text-text-secondary hover:text-white transition-colors">Configure</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Manual Overrides */}
            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border-subtle bg-surface-card/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Manual Garage Overrides</h3>
                    <button className="text-xs font-semibold text-accent-cyan hover:text-accent-cyan/80 transition-colors">Add Override</button>
                </div>
                <div className="p-5">
                    {overrideOverrides.length === 0 ? (
                        <p className="text-sm text-text-muted text-center py-4">No active manual overrides.</p>
                    ) : (
                        <div className="space-y-3">
                            {overrideOverrides.map((ov, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border-subtle bg-surface-card/30 rounded-lg gap-4">
                                    <div>
                                        <p className="text-sm font-bold text-white">{ov.garage}</p>
                                        <p className="text-xs text-text-muted mt-0.5">Reason: {ov.reason}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-text-muted line-through">{ov.normalRate}</span>
                                            <ArrowRight className="w-4 h-4 text-text-muted" />
                                            <span className="text-sm font-bold text-amber-400">{ov.overrideRate}</span>
                                        </div>
                                        <div className="w-px h-8 bg-border-subtle hidden sm:block" />
                                        <div className="text-right min-w-[100px]">
                                            <span className="text-[10px] text-text-muted block uppercase tracking-wider">Expires</span>
                                            <span className="text-xs text-text-secondary font-mono">{ov.expires}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
