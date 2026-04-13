import { Sparkles, TrendingUp, Search, Filter, Megaphone, DollarSign, MapPin, Eye, MousePointerClick } from 'lucide-react';

const sponsors = [
    { id: 'SP-109', garage: 'AutoPro Eastside', slot: 'Search Results Top', targetArea: 'Scarborough, ON', cpc: '$1.25', dailyBudget: '$50.00', status: 'Active', clicks: 142, spent: '$18.75' },
    { id: 'SP-110', garage: 'QuickFix Motors', slot: 'Category: Diagnostics', targetArea: 'Calgary, AB', cpc: '$0.80', dailyBudget: '$25.00', status: 'Active', clicks: 45, spent: '$36.00' },
    { id: 'SP-112', garage: 'WestCoast Repairs', slot: 'Homepage Featured', targetArea: 'Victoria, BC', cpc: '$2.50', dailyBudget: '$100.00', status: 'Paused', clicks: 210, spent: '$100.00' },
    { id: 'SP-115', garage: 'Speedy Auto Waterloo', slot: 'Search Results Top', targetArea: 'Waterloo, ON', cpc: '$1.00', dailyBudget: '$40.00', status: 'Active', clicks: 88, spent: '$12.00' },
];

export default function SponsoredListings() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-amber-400" />
                        Sponsored Listings
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage paid garage placement slots on search and category pages.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-amber-500 text-[#0d1117] hover:bg-amber-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2">
                        <Megaphone className="w-4 h-4" /> New Sponsorship
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Daily Ad Spend</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">$12.4K</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">+8% vs yesterday</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Eye className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Total Impressions</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">1.2M</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <MousePointerClick className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Total Clicks</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">45.2K</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Avg CPC</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">$1.15</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search sponsored listings..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-text-muted/50" />
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
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Campaign ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Placement Slot</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Targeting</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Budget Tracking</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Performance</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {sponsors.map((s) => (
                                <tr key={s.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block">{s.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{s.garage}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-text-secondary font-medium">{s.slot}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                                            <MapPin className="w-3.5 h-3.5 text-text-muted" />
                                            {s.targetArea}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-text-muted"><span className="text-white font-medium">{s.spent}</span> spent today</span>
                                            <div className="w-32 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                                <div className="h-full bg-accent-cyan rounded-full" style={{ width: `${(parseFloat(s.spent.slice(1)) / parseFloat(s.dailyBudget.slice(1))) * 100}%` }} />
                                            </div>
                                            <span className="text-[10px] text-text-muted uppercase">Limit: {s.dailyBudget}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-white">{s.clicks} <span className="text-text-muted text-xs">clicks</span></span>
                                            <span className="text-[11px] text-text-secondary">{s.cpc} <span className="text-text-muted">CPC</span></span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        {s.status === 'Active' ? (
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-emerald-500/20">Active</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-amber-500/20">Paused</span>
                                        )}
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
