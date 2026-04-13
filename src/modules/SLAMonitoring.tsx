import { Clock, AlertTriangle, AlertCircle, ShieldAlert, BadgeDollarSign, Filter, Search } from 'lucide-react';

const breaches = [
    { id: 'SLA-8921', type: 'Response Time', garage: 'Metro Auto Masters', limit: '15m', actual: '42m', penalty: '$25.00', status: 'Penalty Applied' },
    { id: 'SLA-8922', type: 'Completion Target', garage: 'QuickFix Motors', limit: '48h', actual: '72h', penalty: '$150.00', status: 'Penalty Applied' },
    { id: 'SLA-8925', type: 'Customer Wait Time', garage: 'Downtown Tuners', limit: '30m', actual: '55m', penalty: 'Warning', status: 'Warning Issued' },
    { id: 'SLA-8928', type: 'Response Time', garage: 'Speedy Auto Waterloo', limit: '15m', actual: '2h 10m', penalty: '$75.00', status: 'Pending Review' },
];

export default function SLAMonitoring() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Clock className="w-8 h-8 text-amber-500" />
                        SLA Monitoring
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Track service-level agreements across the network. Monitor breached targets and automated penalty workflows.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Configure SLAs
                    </button>
                    <button className="px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                        Export Breach Log
                    </button>
                </div>
            </div>

            {/* SLA KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-text-muted" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Active Breaches</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">14</p>
                    <p className="text-xs text-text-muted mt-1">Currently failing SLA targets</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Critical Breaches</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">3</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Exceeding 2x SLA limit</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <BadgeDollarSign className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Penalties Collected</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">$4,250</p>
                    <p className="text-xs text-text-muted mt-1">Current month (auto-deducted)</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">At Risk Garages</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">8</p>
                    <p className="text-xs text-text-muted mt-1">Nearing suspension threshold</p>
                </div>
            </div>

            {/* Breach Log Table */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                {/* Toolbar */}
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50 rounded-t-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search incidents, garages..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-text-muted/50" />
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
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Incident ID</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage Offender</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA Metric</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Limit vs Actual</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Penalty</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {breaches.map((b) => (
                                <tr key={b.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block">{b.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{b.garage}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-text-secondary font-medium">{b.type}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-text-muted">{b.limit}</span>
                                            <span className="text-text-muted text-xs">→</span>
                                            <span className="text-sm font-bold text-red-500">{b.actual}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`text-sm font-bold ${b.penalty === 'Warning' ? 'text-amber-400' : 'text-accent-cyan'}`}>{b.penalty}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        {b.status === 'Penalty Applied' && <span className="px-2 py-1 bg-surface-hover text-text-muted text-[11px] font-semibold rounded-md uppercase tracking-wider border border-border-subtle">Applied</span>}
                                        {b.status === 'Warning Issued' && <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-amber-500/20">Warning Sent</span>}
                                        {b.status === 'Pending Review' && <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-red-500/20">Pending Review</span>}
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="text-[12px] font-semibold text-accent-cyan hover:text-accent-cyan/80 transition-colors">Review Case</button>
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
