import { Flag, Search, Filter, MessageSquareWarning, UserX, UserCheck, ShieldAlert } from 'lucide-react';

const reports = [
    { id: 'REP-4012', reportedBy: 'Customer_88', target: 'AutoPro Eastside', type: 'Inappropriate Communication', context: 'Offensive language in chat', severity: 'High', status: 'Pending Review', date: '2 hours ago' },
    { id: 'REP-4011', reportedBy: 'Speedy Auto Waterloo', target: 'Sarah J.', type: 'Harassment', context: 'Customer calling garage repeatedly with threats', severity: 'Critical', status: 'Escalated', date: '5 hours ago' },
    { id: 'REP-4008', reportedBy: 'System Auto-Mod', target: 'Review #892', type: 'Spam/Bot Content', context: 'Fake 5-star review detected', severity: 'Low', status: 'Auto-Deleted', date: '1 day ago' },
    { id: 'REP-4005', reportedBy: 'Customer_42', target: 'Downtown Tuners', type: 'Unsafe Work Environment', context: 'Mechanic appeared intoxicated', severity: 'Critical', status: 'Under Investigation', date: '2 days ago' },
];

export default function AbuseReports() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Flag className="w-8 h-8 text-rose-500" />
                        Abuse & Moderation
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Content moderation queue, user-submitted abuse reports, and safety policy enforcement.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Safety Policies
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-rose-500/20 rounded-xl p-5 border-l-4 border-l-rose-500">
                    <h3 className="text-text-muted text-sm font-medium">Pending Reports</h3>
                    <p className="text-3xl font-bold text-white mt-2">32</p>
                    <p className="text-xs text-rose-400 font-medium mt-1">Require moderation review</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Auto-Moderated</h3>
                    <p className="text-3xl font-bold text-white mt-2">1.4K</p>
                    <p className="text-xs text-text-muted mt-1">Spam filters & NLP triggers</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Enforcement Actions</h3>
                    <p className="text-3xl font-bold text-white mt-2">45</p>
                    <p className="text-xs text-text-muted mt-1">Suspensions / Bans (7d)</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Active Appeals</h3>
                    <p className="text-3xl font-bold text-white mt-2">8</p>
                    <p className="text-xs text-amber-500 mt-1">Users appealing bans</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search report ID, keywords, users..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Target
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Report Info</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Target Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Violation Type</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Severity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-surface-hover/30 transition-colors group">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-text-secondary font-mono inline-block mb-1">{r.id}</span>
                                        <p className="text-xs text-text-muted">By: <span className="font-medium text-white">{r.reportedBy}</span></p>
                                        <p className="text-[10px] text-text-secondary mt-0.5">{r.date}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white">{r.target}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-medium text-white mb-0.5">{r.type}</p>
                                        <p className="text-xs text-text-secondary truncate max-w-[200px]" title={r.context}>"{r.context}"</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        {r.severity === 'Critical' && <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Critical</span>}
                                        {r.severity === 'High' && <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">High</span>}
                                        {r.severity === 'Low' && <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Low</span>}
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider border ${r.status.includes('Pending') || r.status.includes('Under') ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                r.status.includes('Escalated') ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    'bg-surface-hover text-text-muted border-border-subtle'
                                            }`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-text-secondary hover:text-white hover:bg-surface-hover rounded-md transition-colors border border-transparent hover:border-border-subtle" title="Dismiss / Mark Safe">
                                                <UserCheck className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-text-secondary hover:text-red-400 hover:bg-surface-hover rounded-md transition-colors border border-transparent hover:border-red-500/30" title="Suspend User">
                                                <UserX className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-text-secondary hover:text-amber-400 hover:bg-surface-hover rounded-md transition-colors border border-transparent hover:border-amber-500/30" title="View Chat Logs">
                                                <MessageSquareWarning className="w-4 h-4" />
                                            </button>
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
