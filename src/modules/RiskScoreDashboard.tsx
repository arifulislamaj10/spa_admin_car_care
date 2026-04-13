import { Skull, Users, Store, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';

const risks = [
    { id: 'RSK-901', type: 'Garage', name: 'Downtown Tuners', score: 92, status: 'Critical Risk', factors: ['High Chargebacks (4%)', 'SLA Breaches', 'Dispute Spike'], trend: 'up' },
    { id: 'RSK-902', type: 'User', name: 'James_T_88', score: 85, status: 'High Risk', factors: ['Multiple IP Logins', 'High Value Refunds'], trend: 'up' },
    { id: 'RSK-905', type: 'User', name: 'Sarah1990', score: 65, status: 'Elevated Risk', factors: ['Failed Payment Retries', 'New Device login'], trend: 'down' },
    { id: 'RSK-909', type: 'Garage', name: 'QuickFix Motors', score: 40, status: 'Normal', factors: ['Low Engagement', 'Slight CSAT drop'], trend: 'down' },
];

export default function RiskScoreDashboard() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Skull className="w-8 h-8 text-rose-500" />
                        Risk Score Engine
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Composite risk scores for users and garages based on behavioral, financial, and compliance signals.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Scoring Matrix Rules
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-rose-500/10 to-surface-card border border-rose-500/20 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <h3 className="text-text-muted text-sm font-medium">Platform Aggregate Risk</h3>
                            <p className="text-4xl font-bold text-rose-400 mt-2">12.4</p>
                            <p className="text-xs text-text-muted mt-1">Scale: 0-100 (Avg Entity Score)</p>
                        </div>
                        <div className="flex flex-col items-end text-sm">
                            <span className="flex items-center gap-1 text-red-400 font-medium"><ArrowUpRight className="w-4 h-4" /> +0.8</span>
                            <span className="text-text-muted text-xs">Since last month</span>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium flex items-center gap-2"><Store className="w-4 h-4" /> Risky Garages (&gt;80)</h3>
                    <p className="text-3xl font-bold text-white mt-2">14</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Suspend evaluation advised</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Risky Users (&gt;80)</h3>
                    <p className="text-3xl font-bold text-white mt-2">412</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Strict velocity limits applied</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search entity ID, name..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Entity Type
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Entity Type</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Name / ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Risk Score</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Primary Risk Factors</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {risks.map((r) => (
                                <tr key={r.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        {r.type === 'Garage' ? (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400"><Store className="w-3.5 h-3.5" /> Garage</span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-400"><Users className="w-3.5 h-3.5" /> User</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{r.name}</p>
                                        <span className="text-[10px] text-text-muted font-mono">{r.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xl font-bold ${r.score >= 80 ? 'text-red-500' : r.score >= 60 ? 'text-amber-500' : 'text-accent-green'}`}>
                                                {r.score}
                                            </span>
                                            {r.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-red-500" /> : <ArrowDownRight className="w-4 h-4 text-accent-green" />}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                                            {r.factors.map(f => (
                                                <span key={f} className="px-2 py-0.5 bg-surface-hover text-text-secondary text-[10px] rounded border border-border-subtle truncate">{f}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        {r.score >= 80 ? (
                                            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-red-500/20">{r.status}</span>
                                        ) : r.score >= 60 ? (
                                            <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-amber-500/20">{r.status}</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-surface-hover text-text-muted text-[11px] font-semibold rounded-md uppercase tracking-wider border border-border-subtle">{r.status}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="text-xs font-semibold text-text-secondary hover:text-white transition-colors border-b border-dashed border-text-muted/50 hover:border-white pb-0.5">
                                            View Full Profile
                                        </button>
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
