import { Gift, Zap, TrendingUp, Settings2, Trash2 } from 'lucide-react';

const rules = [
    { id: 'RWD-001', name: 'Signup Bonus', action: 'Account Created', points: '+500', active: true },
    { id: 'RWD-002', name: 'First Booking', action: 'Completed Service', points: '+1000', active: true },
    { id: 'RWD-003', name: 'Standard Spend', action: 'Per $1 Spent', points: '+1', active: true },
    { id: 'RWD-004', name: 'Referral Bonus', action: 'Friend Books Service', points: '+2500', active: true },
    { id: 'RWD-005', name: 'Review Left', action: 'Left 4+ Star Review', points: '+100', active: false },
];

export default function RewardEngineRules() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Gift className="w-8 h-8 text-fuchsia-500" />
                        Reward Engine Rules
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Configure points generation, redemption values, and promotional multipliers.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-fuchsia-500 text-white hover:bg-fuchsia-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                        Create Rule
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-fuchsia-500">
                    <h3 className="text-text-muted text-sm font-medium">Points in Circulation</h3>
                    <p className="text-3xl font-bold text-white mt-1">42.5M</p>
                    <p className="text-xs text-text-muted mt-1">Total unspent liability</p>
                </div>
                <div className="bg-surface-card border border-amber-500/20 rounded-xl p-5 border-t-4 border-t-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Est. Financial Liability</h3>
                    <p className="text-3xl font-bold text-white mt-1">$425,000</p>
                    <p className="text-xs text-text-muted mt-1">Based on 100pts = $1.00</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">Redemption Rate</h3>
                    <p className="text-3xl font-bold text-white mt-1">14.2%</p>
                    <p className="text-xs text-accent-green mt-1 flex items-center gap-1 font-semibold"><TrendingUp className="w-3 h-3" /> +2% MoM</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Active Multipliers</h3>
                    <p className="text-3xl font-bold text-white mt-1">2</p>
                    <p className="text-xs text-fuchsia-400 mt-1 flex items-center gap-1 font-semibold"><Zap className="w-3 h-3" /> Double points on Tires</p>
                </div>
            </div>

            <div className="flex gap-4 min-h-[500px] flex-col md:flex-row">
                {/* Rules Table */}
                <div className="flex-[2] bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-card/50">
                        <h2 className="text-lg font-bold text-white">Earning Triggers</h2>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface-hover/20">
                                    <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Rule Name</th>
                                    <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Trigger Action</th>
                                    <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Points Awarded</th>
                                    <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {rules.map((r) => (
                                    <tr key={r.id} className="hover:bg-surface-hover/30 transition-colors group">
                                        <td className="py-4 px-5">
                                            <p className="text-sm font-bold text-white">{r.name}</p>
                                            <p className="text-[10px] font-mono text-text-secondary mt-0.5">{r.id}</p>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="text-xs text-text-secondary px-2 py-1 bg-surface-card border border-border-subtle rounded">{r.action}</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="text-lg font-bold font-mono text-fuchsia-400">{r.points}</span>
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                                {r.active ? (
                                                    <div className="w-10 h-5 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-end px-1 cursor-pointer">
                                                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-5 bg-surface-hover border border-border-subtle rounded-full flex items-center justify-start px-1 cursor-pointer">
                                                        <div className="w-3 h-3 bg-text-muted rounded-full"></div>
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

                {/* Global Settings */}
                <div className="flex-1 bg-surface-card border border-border-subtle rounded-xl flex flex-col p-6">
                    <h3 className="font-bold text-white flex items-center gap-2 mb-6"><Settings2 className="w-5 h-5 text-fuchsia-500" /> Core Variables</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs text-text-muted font-bold uppercase tracking-wider block mb-2">Points Valuation</label>
                            <div className="flex items-center gap-2">
                                <input type="text" value="100" className="w-16 bg-[#0d1117] border border-border-subtle rounded-lg px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-fuchsia-500/50" />
                                <span className="text-sm text-text-muted">pts =</span>
                                <input type="text" value="$1.00" className="flex-1 bg-[#0d1117] border border-border-subtle rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-fuchsia-500/50" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-text-muted font-bold uppercase tracking-wider block mb-2">Points Expiration</label>
                            <select className="w-full bg-[#0d1117] border border-border-subtle rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-fuchsia-500/50">
                                <option>Rolling 12 Months</option>
                                <option>Rolling 24 Months</option>
                                <option>End of Calendar Year</option>
                                <option>Never Expire</option>
                            </select>
                        </div>

                        <div className="pt-4 mt-6 border-t border-border-subtle">
                            <button className="w-full px-4 py-2 bg-surface hover:bg-surface-hover border border-border-subtle font-bold rounded-lg text-sm text-white transition-colors">
                                Update Global Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
