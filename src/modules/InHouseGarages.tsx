import { Home, Users, Wrench, TrendingUp, Search, Filter, MoreVertical, MapPin, Star, Building2 } from 'lucide-react';

const mockGarages = [
    { id: 'IH-001', name: 'CarCare24x7 Downtown', location: 'Toronto, ON', manager: 'Sarah Jenkins', staff: 14, bays: 8, rating: 4.8, throughput: 42, revenue: '$142k', status: 'operational' },
    { id: 'IH-002', name: 'CarCare24x7 North York', location: 'North York, ON', manager: 'Marcus Chen', staff: 22, bays: 12, rating: 4.9, throughput: 68, revenue: '$215k', status: 'operational' },
    { id: 'IH-003', name: 'CarCare24x7 Mississauga Express', location: 'Mississauga, ON', manager: 'David Alaba', staff: 8, bays: 4, rating: 4.5, throughput: 28, revenue: '$85k', status: 'maintenance' },
    { id: 'IH-004', name: 'CarCare24x7 Vancouver Hub', location: 'Vancouver, BC', manager: 'Emma Watson', staff: 35, bays: 18, rating: 4.7, throughput: 95, revenue: '$310k', status: 'operational' },
];

export default function InHouseGarages() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Home className="w-8 h-8 text-accent-cyan" />
                        In-House Garages
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage owned and operated CarCare24x7 service centers. Monitor ROI, daily throughput, and staffing levels.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Map View
                    </button>
                    <button className="px-4 py-2 bg-accent-cyan text-[#0d1117] hover:bg-accent-cyan/90 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                        <Building2 className="w-4 h-4" /> Add Location
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Home className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Total Locations</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">14</p>
                    <p className="text-xs text-text-muted mt-1">+2 planned in Q4</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Total Staff (W2)</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">248</p>
                    <p className="text-xs text-text-muted mt-1">Mechanics & Managers</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                            <Wrench className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Daily Avg Throughput</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">485</p>
                    <p className="text-xs text-text-muted mt-1">Completed services/day</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-green/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-accent-green" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Est. Monthly Revenue</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">$2.4M</p>
                    <p className="text-xs text-text-muted mt-1">+12.4% vs last month</p>
                </div>
            </div>

            {/* Directory Table */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                {/* Toolbar */}
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50 rounded-t-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search locations, managers..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Location ID / Name</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Manager</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Capacity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Rating</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Est. Revenue</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {mockGarages.map((g) => (
                                <tr key={g.id} className="hover:bg-surface-hover/30 transition-colors group">
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-surface-card border border-border-subtle flex items-center justify-center flex-shrink-0">
                                                <Building2 className="w-5 h-5 text-text-muted" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white flex items-center gap-2">
                                                    {g.name}
                                                    {g.status === 'maintenance' && <span className="w-2 h-2 rounded-full bg-amber-500" title="Under Maintenance"></span>}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[11px] px-1.5 py-0.5 bg-surface-card rounded text-text-muted font-mono">{g.id}</span>
                                                    <span className="text-[12px] text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" /> {g.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-[10px] font-bold text-white border border-border-subtle">
                                                {g.manager.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-sm text-text-secondary font-medium">{g.manager}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-white font-medium">{g.staff} Staff</span>
                                            <span className="text-xs text-text-muted">{g.bays} Service Bays</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-medium text-white">{g.rating}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-accent-green font-medium">{g.revenue}</span>
                                            <span className="text-xs text-text-muted">{g.throughput} jobs/day</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        {g.status === 'operational' ? (
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold rounded-md uppercase tracking-wider">Operational</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[11px] font-semibold rounded-md uppercase tracking-wider">Maint / Reno</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="w-4 h-4" />
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
