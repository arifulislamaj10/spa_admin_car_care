import { useState } from 'react';
import {
    Headphones, Search, ChevronLeft, ChevronRight, Loader2,
    AlertCircle, User, MessageSquare, Clock, CheckCircle2,
    XCircle, AlertTriangle, Filter, X, Send, Shield,
} from 'lucide-react';
import { useSupportTicketsQuery } from '../hooks/queries/useSupportTicketsQuery';
import { useSupportTicketDetailQuery } from '../hooks/queries/useSupportTicketDetailQuery';
import { useReplyToTicketMutation } from '../hooks/queries/useReplyToTicketMutation';
import { useUpdateTicketStatusMutation } from '../hooks/queries/useUpdateTicketStatusMutation';
import type { SupportTicket, TicketStatus, TicketPriority } from '../services/supportTickets.service';

const PAGE_LIMIT = 15;

/* ─── Config ─── */
const STATUS_TABS: { id: TicketStatus | ''; label: string }[] = [
    { id: '',            label: 'All'         },
    { id: 'open',        label: 'Open'        },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved',    label: 'Resolved'    },
    { id: 'closed',      label: 'Closed'      },
];

const PRIORITY_FILTERS: { id: TicketPriority | ''; label: string }[] = [
    { id: '',       label: 'All Priority' },
    { id: 'high',   label: 'High'         },
    { id: 'medium', label: 'Medium'       },
    { id: 'low',    label: 'Low'          },
];

const STATUS_CFG: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    open:        { label: 'Open',        cls: 'text-accent-cyan  bg-accent-cyan/10  border-accent-cyan/20',  icon: <MessageSquare className="w-3 h-3" /> },
    in_progress: { label: 'In Progress', cls: 'text-amber-400    bg-amber-500/10    border-amber-500/20',    icon: <Clock className="w-3 h-3" />         },
    resolved:    { label: 'Resolved',    cls: 'text-accent-green bg-accent-green/10 border-accent-green/20', icon: <CheckCircle2 className="w-3 h-3" />   },
    closed:      { label: 'Closed',      cls: 'text-text-muted   bg-surface          border-border-subtle',   icon: <XCircle className="w-3 h-3" />        },
};

const PRIORITY_CFG: Record<string, { label: string; cls: string }> = {
    high:   { label: 'High',   cls: 'text-red-400     bg-red-500/10    border-red-500/20'    },
    medium: { label: 'Medium', cls: 'text-amber-400   bg-amber-500/10  border-amber-500/20'  },
    low:    { label: 'Low',    cls: 'text-accent-green bg-accent-green/10 border-accent-green/20' },
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatDateTime(d: string) {
    return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/* ─── Badges ─── */
function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CFG[status] ?? STATUS_CFG.closed;
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${cfg.cls}`}>
            {cfg.icon}{cfg.label}
        </span>
    );
}

function PriorityBadge({ priority }: { priority: string }) {
    const cfg = PRIORITY_CFG[priority] ?? { label: priority, cls: 'text-text-muted bg-surface border-border-subtle' };
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${cfg.cls}`}>
            <AlertTriangle className="w-3 h-3" />{cfg.label}
        </span>
    );
}

/* ─── Ticket Detail Modal ─── */
function TicketDetailModal({ ticketId, onClose }: { ticketId: string; onClose: () => void }) {
    const [replyText, setReplyText] = useState('');
    const { data, isLoading, isError } = useSupportTicketDetailQuery(ticketId);
    const replyMutation        = useReplyToTicketMutation(ticketId);
    const statusMutation       = useUpdateTicketStatusMutation(ticketId);

    const handleSend = () => {
        const msg = replyText.trim();
        if (!msg || replyMutation.isPending) return;
        replyMutation.mutate(msg, {
            onSuccess: () => setReplyText(''),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-surface-card border border-border-subtle rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border-subtle shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <Headphones className="w-5 h-5 text-accent-cyan shrink-0" />
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-white truncate">
                                {isLoading ? 'Loading…' : data?.subject ?? 'Ticket Detail'}
                            </h2>
                            <p className="text-[11px] text-text-muted font-mono">#{ticketId.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-muted hover:text-white shrink-0 ml-3">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex flex-col items-center gap-3 py-16">
                        <Loader2 className="w-8 h-8 text-accent-cyan animate-spin" />
                        <span className="text-sm text-text-muted">Loading ticket…</span>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="m-5 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />Failed to load ticket details.
                    </div>
                )}

                {data && (
                    <>
                        {/* Ticket meta */}
                        <div className="px-5 py-4 border-b border-border-subtle bg-surface/30 shrink-0 space-y-3">
                            <div className="flex flex-wrap gap-2 items-center">
                                <StatusBadge status={data.status} />
                                <PriorityBadge priority={data.priority} />
                                <span className="text-[11px] text-text-muted ml-auto">{formatDate(data.createdAt)}</span>
                            </div>
                            {/* Status updater */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted shrink-0">Change status:</span>
                                <select
                                    value={data.status}
                                    disabled={statusMutation.isPending}
                                    onChange={e => statusMutation.mutate(e.target.value as TicketStatus)}
                                    className="flex-1 bg-surface border border-border-subtle rounded-lg text-xs text-text-primary px-2.5 py-1.5 focus:outline-none focus:border-accent-cyan/40 cursor-pointer disabled:opacity-50">
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                                {statusMutation.isPending && <Loader2 className="w-3.5 h-3.5 text-accent-cyan animate-spin shrink-0" />}
                                {statusMutation.isError && (
                                    <span className="text-[11px] text-red-400">
                                        {(statusMutation.error as any)?.response?.data?.message ?? 'Failed'}
                                    </span>
                                )}
                                {statusMutation.isSuccess && (
                                    <span className="text-[11px] text-accent-green">Updated!</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                                    <User className="w-3.5 h-3.5 text-accent-cyan" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-white">{data.user.fullName}</span>
                                    <span className="text-xs text-text-muted ml-2 capitalize">({data.user.role})</span>
                                </div>
                            </div>
                        </div>

                        {/* Conversation thread */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
                            {/* Original message */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <User className="w-4 h-4 text-accent-cyan" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-sm font-semibold text-white">{data.user.fullName}</span>
                                        <span className="text-[11px] text-text-muted">{formatDateTime(data.createdAt)}</span>
                                    </div>
                                    <div className="bg-surface border border-border-subtle rounded-xl rounded-tl-sm p-3">
                                        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{data.message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Replies */}
                            {data.replies.length > 0 ? (
                                data.replies.map((reply, i) => {
                                    const isAdmin = reply.isAdminReply;
                                    return (
                                        <div key={reply._id ?? i} className={`flex gap-3 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${isAdmin
                                                ? 'bg-accent-green/10 border-accent-green/20'
                                                : 'bg-accent-cyan/10 border-accent-cyan/20'}`}>
                                                {isAdmin
                                                    ? <Shield className="w-4 h-4 text-accent-green" />
                                                    : <User className="w-4 h-4 text-accent-cyan" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`flex items-baseline gap-2 mb-1 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                                                    <span className="text-sm font-semibold text-white">
                                                        {reply.user?.fullName ?? (isAdmin ? 'Support Admin' : 'User')}
                                                    </span>
                                                    <span className="text-[11px] text-text-muted">
                                                        {reply.createdAt ? formatDateTime(reply.createdAt) : ''}
                                                    </span>
                                                </div>
                                                <div className={`rounded-xl p-3 border ${isAdmin
                                                    ? 'bg-accent-green/5 border-accent-green/20 rounded-tr-sm'
                                                    : 'bg-surface border-border-subtle rounded-tl-sm'}`}>
                                                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{reply.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center gap-2 py-6 text-text-muted">
                                    <MessageSquare className="w-8 h-8 opacity-20" />
                                    <p className="text-xs">No replies yet. Be the first to respond.</p>
                                </div>
                            )}
                        </div>

                        {/* Reply box */}
                        <div className="p-4 border-t border-border-subtle shrink-0">
                            {replyMutation.isError && (
                                <p className="text-xs text-red-400 mb-2 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {(replyMutation.error as any)?.response?.data?.message ?? 'Failed to send reply.'}
                                </p>
                            )}
                            <div className="flex gap-2">
                                <textarea
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSend(); }}
                                    placeholder="Type your reply… (Ctrl+Enter to send)"
                                    rows={3}
                                    className="flex-1 bg-surface border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                                <button
                                    onClick={handleSend}
                                    disabled={!replyText.trim() || replyMutation.isPending}
                                    className="self-end px-4 py-2.5 bg-accent-cyan text-black text-sm font-semibold rounded-xl hover:bg-accent-cyan/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 shrink-0">
                                    {replyMutation.isPending
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <Send className="w-4 h-4" />}
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ─── Ticket Row ─── */
function TicketRow({ ticket, index, onView }: { ticket: SupportTicket; index: number; onView: (id: string) => void }) {
    return (
        <tr className="border-b border-border-subtle hover:bg-surface-hover/30 transition-colors animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${0.03 * index}s` }}
            onClick={() => onView(ticket._id)}>
            <td className="p-4 pl-6">
                <span className="text-xs font-mono text-text-muted">#{ticket._id.slice(-6).toUpperCase()}</span>
            </td>
            <td className="p-4 max-w-[240px]">
                <p className="text-sm font-semibold text-white truncate">{ticket.subject}</p>
                <p className="text-xs text-text-muted truncate mt-0.5">{ticket.message}</p>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-accent-cyan" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-text-primary truncate">{ticket.user.fullName}</p>
                        <p className="text-[11px] text-text-muted capitalize">{ticket.user.role}</p>
                    </div>
                </div>
            </td>
            <td className="p-4"><PriorityBadge priority={ticket.priority} /></td>
            <td className="p-4"><StatusBadge status={ticket.status} /></td>
            <td className="p-4">
                {ticket.assignedTo
                    ? <span className="text-xs text-text-secondary">{ticket.assignedTo}</span>
                    : <span className="text-xs text-text-muted italic">Unassigned</span>}
            </td>
            <td className="p-4">
                <span className="inline-flex items-center gap-1 text-[11px] text-text-muted">
                    <MessageSquare className="w-3 h-3" />{ticket.replies.length}
                </span>
            </td>
            <td className="p-4 pr-6">
                <p className="text-xs text-text-muted whitespace-nowrap">{formatDate(ticket.createdAt)}</p>
            </td>
        </tr>
    );
}

const SkeletonRow = () => (
    <tr className="border-b border-border-subtle">
        <td className="p-4 pl-6"><div className="w-16 h-3.5 bg-surface-hover rounded animate-pulse" /></td>
        <td className="p-4">
            <div className="w-48 h-3.5 bg-surface-hover rounded animate-pulse mb-1.5" />
            <div className="w-64 h-2.5 bg-surface-hover/60 rounded animate-pulse" />
        </td>
        {[1, 2, 3, 4, 5, 6].map(i => (
            <td key={i} className="p-4"><div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" /></td>
        ))}
    </tr>
);

/* ═══════════════════════════════════════════
   Support Desk Page
═══════════════════════════════════════════ */
export default function SupportDesk() {
    const [activeStatus, setActiveStatus]     = useState<TicketStatus | ''>('');
    const [activePriority, setActivePriority] = useState<TicketPriority | ''>('');
    const [page, setPage]                     = useState(1);
    const [search, setSearch]                 = useState('');
    const [debSearch, setDebSearch]           = useState('');
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

    const handleSearch = (val: string) => {
        setSearch(val);
        clearTimeout((handleSearch as any)._t);
        (handleSearch as any)._t = setTimeout(() => { setDebSearch(val); setPage(1); }, 400);
    };

    const handleStatusChange   = (s: TicketStatus | '')   => { setActiveStatus(s);   setPage(1); };
    const handlePriorityChange = (p: TicketPriority | '') => { setActivePriority(p); setPage(1); };

    const { data, isLoading, isError, error } = useSupportTicketsQuery({
        page, limit: PAGE_LIMIT,
        status:   activeStatus   || undefined,
        priority: activePriority || undefined,
    } as any);

    const tickets    = data?.results   ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;

    const filtered = debSearch
        ? tickets.filter(t =>
            t.subject.toLowerCase().includes(debSearch.toLowerCase()) ||
            t.user.fullName.toLowerCase().includes(debSearch.toLowerCase()) ||
            t.message.toLowerCase().includes(debSearch.toLowerCase()))
        : tickets;

    const openCount       = tickets.filter(t => t.status === 'open').length;
    const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
    const highCount       = tickets.filter(t => t.priority === 'high').length;

    return (
        <>
        {selectedTicketId && (
            <TicketDetailModal ticketId={selectedTicketId} onClose={() => setSelectedTicketId(null)} />
        )}

        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <Headphones className="w-6 h-6 text-accent-cyan" />
                    Support Desk
                </h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                    Manage and monitor all support tickets from users.
                </p>
            </div>

            {/* Status tabs */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {STATUS_TABS.map(tab => (
                        <button key={tab.id} onClick={() => handleStatusChange(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeStatus === tab.id ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            {tab.label}
                            {activeStatus === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Total Tickets', value: totalItems,                        color: 'text-white'       },
                    { label: 'Open',          value: isLoading ? '…' : openCount,       color: 'text-accent-cyan' },
                    { label: 'In Progress',   value: isLoading ? '…' : inProgressCount, color: 'text-amber-400'   },
                    { label: 'High Priority', value: isLoading ? '…' : highCount,       color: 'text-red-400'     },
                ].map(s => (
                    <div key={s.label} className="bg-surface-card border border-border-subtle rounded-xl p-4">
                        <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color}`}>
                            {isLoading && s.label === 'Total Tickets'
                                ? <span className="inline-block w-10 h-7 bg-surface-hover rounded animate-pulse" />
                                : s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load tickets.'}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                        placeholder="Search subject, user, message…"
                        className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                </div>
                <div className="flex items-center gap-3">
                    {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                    <div className="flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-text-muted" />
                        <select value={activePriority}
                            onChange={e => handlePriorityChange(e.target.value as TicketPriority | '')}
                            className="bg-surface border border-border-subtle rounded-lg text-xs text-text-primary px-2.5 py-1.5 focus:outline-none focus:border-accent-cyan/40 cursor-pointer">
                            {PRIORITY_FILTERS.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    {totalItems > 0 && !isLoading && (
                        <span className="text-xs text-text-muted">{totalItems} tickets</span>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface/50">
                                <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Subject</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Priority</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Assigned</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Replies</th>
                                <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading
                                ? [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                                : filtered.length > 0
                                    ? filtered.map((t, i) => (
                                        <TicketRow key={t._id} ticket={t} index={i} onView={setSelectedTicketId} />
                                    ))
                                    : (
                                        <tr><td colSpan={8} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3 text-text-muted">
                                                <Headphones className="w-10 h-10 opacity-30" />
                                                <span className="text-sm">No tickets found.</span>
                                            </div>
                                        </td></tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-xs text-text-muted">
                        Showing {(page - 1) * PAGE_LIMIT + 1}–{Math.min(page * PAGE_LIMIT, totalItems)} of {totalItems}
                    </span>
                    <div className="flex gap-1">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pg => (
                            <button key={pg} onClick={() => setPage(pg)}
                                className={`px-3 py-1 border rounded-lg text-xs transition-colors ${pg === page
                                    ? 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan font-medium'
                                    : 'border-border-subtle hover:bg-surface-hover text-text-muted'}`}>
                                {pg}
                            </button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                            className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
