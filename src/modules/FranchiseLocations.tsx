import { GitBranch, Building, BadgeDollarSign, FileCheck, Search, Filter, MoreVertical, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

const mockFranchises = [
    { id: 'FR-092', name: 'AutoPro Eastside (M. Jackson)', location: 'Scarborough, ON', owner: 'Michael Jackson', royaltyRate: '12%', monthlyRev: '$82k', compliance: 'compliant', renewal: '2027-11-15', status: 'active' },
    { id: 'FR-104', name: 'QuickFix Motors', location: 'Calgary, AB', owner: 'Sarah Connor', royaltyRate: '10%', monthlyRev: '$145k', compliance: 'warning', renewal: '2026-08-01', status: 'active' },
    { id: 'FR-118', name: 'Speedy Auto Waterloo', location: 'Waterloo, ON', owner: 'Robert Plant', royaltyRate: '12%', monthlyRev: '$64k', compliance: 'breached', renewal: '2026-04-20', status: 'suspended' },
    { id: 'FR-142', name: 'WestCoast Repairs', location: 'Victoria, BC', owner: 'Jessica Wang', royaltyRate: '15%', monthlyRev: '$210k', compliance: 'compliant', renewal: '2029-01-10', status: 'active' },
];

export default function FranchiseLocations() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <GitBranch className="w-8 h-8 text-amber-500" />
                        Franchise Locations
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage licensed franchise partners. Track royalty revenue, compliance status, and franchise agreements.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-bold rounded-lg text-sm transition-colors flex items-center gap-2 border border-amber-500/30">
                        Compliance Report
                    </button>
                    <button className="px-4 py-2 bg-amber-500 text-[#0d1117] hover:bg-amber-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        New Franchisee
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Building className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Active Franchises</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">84</p>
                    <p className="text-xs text-text-muted mt-1">+12 this year</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-green/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                            <BadgeDollarSign className="w-5 h-5 text-accent-green" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Monthly Royalty Rev</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">$425K</p>
                    <p className="text-xs text-text-muted mt-1">Avg 11.5% take rate</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Compliance Warnings</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">6</p>
                    <p className="text-xs text-text-muted mt-1">Requires audit</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Upcoming Renewals</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">14</p>
                    <p className="text-xs text-text-muted mt-1">Within next 90 days</p>
                </div>
            </div>

            {/* Directory Table */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                {/* Toolbar */}
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50 rounded-t-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search franchisees, locations..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-text-muted/50" />
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
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Franchise ID / Name</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Owner / Op</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Royalty Tier</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Est. Monthly Rev</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Compliance</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Renewal Date</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {mockFranchises.map((f) => {
                                let compColor = 'text-emerald-400';
                                let compBg = 'bg-emerald-500/10';
                                let CompIcon = CheckCircle2;
                                if (f.compliance === 'warning') { compColor = 'text-amber-400'; compBg = 'bg-amber-400/10'; CompIcon = AlertCircle; }
                                if (f.compliance === 'breached') { compColor = 'text-red-500'; compBg = 'bg-red-500/10'; CompIcon = AlertCircle; }

                                return (
                                    <tr key={f.id} className={`hover:bg-surface-hover/30 transition-colors group ${f.status === 'suspended' ? 'opacity-50' : ''}`}>
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-surface-card border border-border-subtle flex items-center justify-center flex-shrink-0">
                                                    <GitBranch className="w-5 h-5 text-amber-500/70" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                                        {f.name}
                                                        {f.status === 'suspended' && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded uppercase">Suspended</span>}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card rounded text-text-muted font-mono">{f.id}</span>
                                                        <span className="text-[12px] text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" /> {f.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-[10px] font-bold text-white border border-border-subtle">
                                                    {f.owner.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-sm text-text-secondary font-medium">{f.owner}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="text-sm text-white font-mono bg-surface px-2 py-1 rounded border border-border-subtle">{f.royaltyRate}</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="text-sm text-accent-green font-medium">{f.monthlyRev}</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${compBg} ${compColor} text-[11px] font-semibold rounded-md uppercase tracking-wider`}>
                                                <CompIcon className="w-3.5 h-3.5" />
                                                {f.compliance}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-sm text-text-secondary">
                                            {f.renewal}
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
