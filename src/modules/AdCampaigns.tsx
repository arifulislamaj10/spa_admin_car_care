import { Target, Search, Filter, PlayCircle, PauseCircle, Activity } from 'lucide-react';

const campaigns = [
    { id: 'CMP-201', name: 'Winter Tire Promo (B2C)', channel: 'In-App & Push', budget: '$5,000', spent: '$3,420', status: 'Active', roi: '2.4x', conversions: 420 },
    { id: 'CMP-202', name: 'Fleet Onboarding Q1 (B2B)', channel: 'Email & LinkedIn', budget: '$10,000', spent: '$10,000', status: 'Completed', roi: '4.8x', conversions: 12 },
    { id: 'CMP-204', name: 'Refer-a-Friend Boost', channel: 'In-App Only', budget: '$2,000', spent: '$450', status: 'Active', roi: '1.2x', conversions: 45 },
];

export default function AdCampaigns() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-400" />
                        Ad Campaigns
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Multi-channel campaign lifecycle management.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Create Campaign
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search campaigns..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-purple-400/40 focus:ring-1 focus:ring-purple-400/20 transition-all placeholder:text-text-muted/50" />
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
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Campaign</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Channel</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Budget / Spent</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Conversions</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">ROAS</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {campaigns.map((c) => (
                                <tr key={c.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{c.name}</p>
                                        <span className="text-[11px] text-text-muted font-mono">{c.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-text-secondary">{c.channel}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{c.spent} <span className="text-text-muted font-normal">of {c.budget}</span></p>
                                    </td>
                                    <td className="py-4 px-5 text-sm text-white font-medium">{c.conversions}</td>
                                    <td className="py-4 px-5 text-sm text-accent-green font-bold">{c.roi}</td>
                                    <td className="py-4 px-5">
                                        {c.status === 'Active' ? (
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-emerald-500/20">Active</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-surface-hover text-text-muted text-[11px] font-semibold rounded-md uppercase tracking-wider border border-border-subtle">Completed</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-2 text-text-muted">
                                            {c.status === 'Active' ? <PauseCircle className="w-4 h-4 hover:text-white cursor-pointer" /> : <PlayCircle className="w-4 h-4 hover:text-white cursor-pointer" />}
                                            <Activity className="w-4 h-4 hover:text-accent-cyan cursor-pointer" />
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
