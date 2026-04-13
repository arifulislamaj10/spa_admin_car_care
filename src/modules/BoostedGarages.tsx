import { Rocket, Zap, TrendingUp, Search, Filter } from 'lucide-react';

const boosts = [
    { id: 'BST-024', garage: 'AutoPro Eastside', type: 'Weekend Surge Boost', start: '2026-02-27', duration: '48 Hours', cost: '$150.00', status: 'Scheduled', estLift: '+65%' },
    { id: 'BST-022', garage: 'Metro Auto Masters', type: 'Visibility Max', start: '2026-02-25', duration: '7 Days', cost: '$400.00', status: 'Active', estLift: '+120%' },
    { id: 'BST-021', garage: 'Reliable Motors', type: 'Off-Peak Filler', start: '2026-02-24', duration: '24 Hours', cost: '$75.00', status: 'Active', estLift: '+35%' },
    { id: 'BST-018', garage: 'Downtown Tuners', type: 'Weekend Surge Boost', start: '2026-02-20', duration: '48 Hours', cost: '$150.00', status: 'Completed', estLift: '+72%' },
];

export default function BoostedGarages() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-accent-cyan" />
                        Boosted Garages
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Priority visibility boosts. Track garages purchasing temporary algorithmic lifts.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Pricing Tiers
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Zap className="w-4 h-4 text-accent-cyan" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Active Boosts</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">42</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Avg Traffic Lift</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">+84%</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search boosted garages..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Boost ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Boost Package</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Duration</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Cost</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Lift</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {boosts.map((b) => (
                                <tr key={b.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block">{b.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{b.garage}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-accent-cyan font-medium">{b.type}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-white">{b.duration}</p>
                                        <p className="text-[10px] text-text-muted mt-0.5">Start: {b.start}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-white">{b.cost}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm text-accent-green font-bold">{b.estLift}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        {b.status === 'Active' && <span className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan text-[11px] font-semibold rounded-md uppercase tracking-wider border border-accent-cyan/20">Active</span>}
                                        {b.status === 'Scheduled' && <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-amber-500/20">Scheduled</span>}
                                        {b.status === 'Completed' && <span className="px-2 py-1 bg-surface-hover text-text-muted text-[11px] font-semibold rounded-md uppercase tracking-wider border border-border-subtle">Completed</span>}
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
