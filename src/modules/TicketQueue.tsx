import { Ticket, Search, Filter, AlertCircle, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

const tickets = [
    { id: 'TKT-9021', user: 'Sarah Jenkins', type: 'Booking Issue', priority: 'High', status: 'Open', assignee: 'Unassigned', sla: '14m remaining', slaStatus: 'warning' },
    { id: 'TKT-9020', user: 'AutoPro Eastside', type: 'Platform Bug', priority: 'Medium', status: 'In Progress', assignee: 'David K.', sla: '2h 45m remaining', slaStatus: 'safe' },
    { id: 'TKT-9018', user: 'Mike T.', type: 'Billing Inquiry', priority: 'Low', status: 'Open', assignee: 'Unassigned', sla: '22h remaining', slaStatus: 'safe' },
    { id: 'TKT-9015', user: 'Speedy Auto', type: 'Payout Delayed', priority: 'Critical', status: 'Escalated', assignee: 'Sarah M.', sla: 'Breached (45m)', slaStatus: 'danger' },
    { id: 'TKT-9010', user: 'John Doe', type: 'General Question', priority: 'Low', status: 'Closed', assignee: 'Bot Auto-Reply', sla: 'Met', slaStatus: 'success' },
];

export default function TicketQueue() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Ticket className="w-8 h-8 text-blue-400" />
                        Support Ticket Queue
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Centralized support triage, assignment rules, priority escalation, and SLA tracking.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Analytics
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        Create Ticket
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-blue-500">
                    <h3 className="text-text-muted text-sm font-medium">Open Tickets</h3>
                    <p className="text-3xl font-bold text-white mt-2">142</p>
                    <p className="text-xs text-text-muted mt-1">+12 since yesterday</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Unassigned</h3>
                    <p className="text-3xl font-bold text-white mt-2">28</p>
                    <p className="text-xs text-amber-500 font-medium mt-1">Requires triage</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-red-500">
                    <h3 className="text-text-muted text-sm font-medium">SLA Breaches</h3>
                    <p className="text-3xl font-bold text-white mt-2">3</p>
                    <p className="text-xs text-red-400 font-medium mt-1">Immediate action needed</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-accent-green">
                    <h3 className="text-text-muted text-sm font-medium">Avg Resolution</h3>
                    <p className="text-3xl font-bold text-white mt-2">4.2h</p>
                    <p className="text-xs text-accent-green font-medium mt-1">-45m this week</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search ticket ID, user, subject..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-text-muted/50" />
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
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Ticket</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Requester</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority / Type</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Assignee</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">SLA Timer</th>
                                <th className="py-3 px-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {tickets.map((t) => (
                                <tr key={t.id} className="hover:bg-surface-hover/30 transition-colors cursor-pointer group">
                                    <td className="py-4 px-5">
                                        <span className="text-[11px] px-1.5 py-0.5 bg-surface-card border border-border-subtle rounded text-blue-400 font-mono inline-block">{t.id}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white flex items-center gap-2">
                                            {t.user}
                                        </p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            {t.priority === 'Critical' && <span className="text-xs font-bold text-red-500">Critical</span>}
                                            {t.priority === 'High' && <span className="text-xs font-bold text-amber-500">High</span>}
                                            {t.priority === 'Medium' && <span className="text-xs font-bold text-blue-400">Medium</span>}
                                            {t.priority === 'Low' && <span className="text-xs font-bold text-text-muted">Low</span>}
                                            <span className="text-[11px] text-text-muted uppercase">{t.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            {t.assignee === 'Unassigned' ? (
                                                <span className="text-sm text-text-muted italic border-b border-dashed border-text-muted/50 cursor-pointer hover:text-white transition-colors">Assign...</span>
                                            ) : (
                                                <span className="text-sm font-medium text-white px-2 py-1 bg-surface-hover rounded-md border border-border-subtle">{t.assignee}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        {t.status === 'Open' && <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Open</span>}
                                        {t.status === 'In Progress' && <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">In Progress</span>}
                                        {t.status === 'Escalated' && <span className="text-[11px] font-semibold text-red-500 uppercase tracking-wider flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Escalated</span>}
                                        {t.status === 'Closed' && <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Closed</span>}
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className={`w-3.5 h-3.5 ${t.slaStatus === 'danger' ? 'text-red-500' : t.slaStatus === 'warning' ? 'text-amber-500' : t.slaStatus === 'success' ? 'text-accent-green' : 'text-text-muted'}`} />
                                            <span className={`text-xs font-bold ${t.slaStatus === 'danger' ? 'text-red-500' : t.slaStatus === 'warning' ? 'text-amber-500' : t.slaStatus === 'success' ? 'text-accent-green' : 'text-text-muted'}`}>{t.sla}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-surface-hover rounded-md text-text-muted hover:text-white transition-colors">
                                            <MessageSquare className="w-4 h-4" />
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
