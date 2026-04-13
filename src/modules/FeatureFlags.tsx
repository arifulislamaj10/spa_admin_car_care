import { ToggleRight, AlertCircle, Filter, Search } from 'lucide-react';

const flags = [
    { id: 'pay_crypto_checkout', name: 'Crypto Checkout Flow', type: 'Feature', status: 'Enabled', rollout: '100%', env: 'Production', updated: '2 days ago' },
    { id: 'ai_carechat_v2', name: 'CareChat GPT-4o Agent', type: 'Experiment', status: 'Partial', rollout: '25%', env: 'Production', updated: '5 hours ago' },
    { id: 'ui_new_booking_flow', name: 'Redesigned Booking App', type: 'Feature', status: 'Disabled', rollout: '0%', env: 'Production', updated: '1 week ago' },
    { id: 'sys_maintenance_mode', name: 'Global Maintenance Lock', type: 'System', status: 'Disabled', rollout: '0%', env: 'All', updated: '1 month ago' },
];

export default function FeatureFlags() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ToggleRight className="w-8 h-8 text-cyan-400" />
                        Feature Flags
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage application state, progressive rollouts (A/B), and emergency system kill-switches.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Audit Logs
                    </button>
                    <button className="px-4 py-2 bg-cyan-500 text-[#0d1117] hover:bg-cyan-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        Create Flag
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-cyan-500">
                    <h3 className="text-text-muted text-sm font-medium">Active Flags</h3>
                    <p className="text-3xl font-bold text-white mt-1">42</p>
                    <p className="text-xs text-text-muted mt-1">In Production Environment</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-blue-500">
                    <h3 className="text-text-muted text-sm font-medium">Rolling Out (Partial)</h3>
                    <p className="text-3xl font-bold text-white mt-1">3</p>
                    <p className="text-xs text-blue-400 mt-1">Gathering A/B metrics</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-red-500">
                    <h3 className="text-text-muted text-sm font-medium">Stale Flags</h3>
                    <p className="text-3xl font-bold text-white mt-1">12</p>
                    <p className="text-xs text-red-400 mt-1">&gt; 30 days untouched</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search flag ID or name..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Status
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Flag Details</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type / Env</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Rollout rules</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Last Modified</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Toggle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {flags.map((f) => (
                                <tr key={f.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white mb-0.5">{f.name}</p>
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block">{f.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider mb-1 inline-block ${f.type === 'System' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : f.type === 'Experiment' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-surface-hover text-text-muted border-border-subtle'}`}>
                                            {f.type}
                                        </span>
                                        <p className="text-xs text-text-muted">Target: {f.env}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                                <div className={`h-full ${f.rollout === '100%' ? 'bg-emerald-500' : f.rollout === '0%' ? 'bg-text-muted' : 'bg-blue-500'}`} style={{ width: f.rollout }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-white w-8">{f.rollout}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm text-text-secondary">{f.updated}</span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex justify-end pr-2">
                                            {f.status === 'Enabled' ? (
                                                <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-end px-1 cursor-pointer transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                                    <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-md"></div>
                                                </div>
                                            ) : f.status === 'Partial' ? (
                                                <div className="w-12 h-6 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                                    <div className="w-4 h-4 bg-blue-400 rounded-full shadow-md"></div>
                                                </div>
                                            ) : (
                                                <div className="w-12 h-6 bg-surface-hover border border-border-subtle rounded-full flex items-center justify-start px-1 cursor-pointer transition-colors">
                                                    <div className="w-4 h-4 bg-text-muted rounded-full shadow-md"></div>
                                                </div>
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
