import { useState } from 'react';
import {
    ClipboardList, Clock, Search, FileText, CalendarClock,
    Building2, MapPin, Wrench, ShieldCheck, ChevronLeft, ChevronRight,
    Loader2, AlertCircle, CheckCircle2, X, ThumbsUp, ThumbsDown,
} from 'lucide-react';
import { usePendingGaragesQuery } from '../hooks/queries/usePendingGaragesQuery';
import { useApproveGarageMutation } from '../hooks/queries/useApproveGarageMutation';
import { useRejectGarageMutation } from '../hooks/queries/useRejectGarageMutation';
import type { GarageItem } from '../services/garages.service';

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function timeAgo(d: string) {
    const diff  = Date.now() - new Date(d).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days  = Math.floor(hours / 24);
    if (days  > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
}

/* ─── Review Modal ─── */
type ModalView = 'main' | 'reject-form' | 'approve-confirm';

function ReviewModal({ garage, onClose }: { garage: GarageItem; onClose: () => void }) {
    const [view, setView]         = useState<ModalView>('main');
    const [reason, setReason]     = useState('');
    const [reasonErr, setReasonErr] = useState('');

    const approveMutation = useApproveGarageMutation();
    const rejectMutation  = useRejectGarageMutation();

    const isPending = approveMutation.isPending || rejectMutation.isPending;

    const handleApprove = () => {
        approveMutation.reset();
        approveMutation.mutate(garage._id, {
            onSuccess: () => onClose(),
        });
    };

    const handleReject = () => {
        if (!reason.trim()) { setReasonErr('Rejection reason is required.'); return; }
        rejectMutation.reset();
        rejectMutation.mutate({ id: garage._id, rejectionReason: reason.trim() }, {
            onSuccess: () => onClose(),
        });
    };

    const goBack = () => {
        setView('main');
        setReason('');
        setReasonErr('');
        approveMutation.reset();
        rejectMutation.reset();
    };

    const extractError = (err: unknown) => {
        const e = err as any;
        return (
            e?.response?.data?.message ||
            e?.response?.data?.error  ||
            e?.message                ||
            'Something went wrong. Please try again.'
        );
    };

    const apiError =
        (approveMutation.isError && extractError(approveMutation.error)) ||
        (rejectMutation.isError  && extractError(rejectMutation.error))  ||
        null;

    return (
        /* Backdrop */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-lg bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border-subtle">
                    <div className="flex items-center gap-3">
                        {garage.garageLogo ? (
                            <img src={garage.garageLogo} alt={garage.garageUser.fullName}
                                className="w-10 h-10 rounded-xl object-cover border border-border-subtle shrink-0"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-amber-400" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-base font-bold text-white">{garage.garageUser.fullName}</h2>
                            <p className="text-xs text-text-muted">{garage.garageUser.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} disabled={isPending}
                        className="p-1.5 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors disabled:opacity-40">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                            <p className="text-[11px] text-text-muted mb-0.5">Phone</p>
                            <p className="text-white font-medium">{garage.garageUser.phoneNumber}</p>
                        </div>
                        <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                            <p className="text-[11px] text-text-muted mb-0.5">Mechanics</p>
                            <p className="text-white font-medium flex items-center gap-1"><Wrench className="w-3.5 h-3.5 text-text-muted" />{garage.numberOfMacanics}</p>
                        </div>
                        <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                            <p className="text-[11px] text-text-muted mb-0.5">Submitted</p>
                            <p className="text-white font-medium">{formatDate(garage.createdAt)}</p>
                        </div>
                        <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                            <p className="text-[11px] text-text-muted mb-0.5">Status</p>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20">
                                <Clock className="w-3 h-3" />Pending
                            </span>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                        <p className="text-[11px] text-text-muted mb-1">Address</p>
                        <div className="flex items-start gap-2 text-sm text-text-secondary">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                            <span>{garage.garageUser.address}</span>
                        </div>
                    </div>

                    {/* Description */}
                    {garage.description && (
                        <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                            <p className="text-[11px] text-text-muted mb-1">Description</p>
                            <p className="text-sm text-text-secondary italic">"{garage.description}"</p>
                        </div>
                    )}

                    {/* Documents */}
                    <div className="flex gap-3">
                        <a href={garage.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface border border-accent-cyan/20 hover:border-accent-cyan/40 text-accent-cyan rounded-xl text-xs font-semibold transition-colors">
                            <ShieldCheck className="w-4 h-4" />Insurance & Certificate
                        </a>
                        <a href={garage.businessLicense} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-surface border border-accent-cyan/20 hover:border-accent-cyan/40 text-accent-cyan rounded-xl text-xs font-semibold transition-colors">
                            <FileText className="w-4 h-4" />Business License
                        </a>
                    </div>

                    {/* Approve confirm view */}
                    {view === 'approve-confirm' && (
                        <div className="bg-accent-green/5 border border-accent-green/20 rounded-xl p-4">
                            <p className="text-sm font-semibold text-accent-green mb-1">Confirm Approval</p>
                            <p className="text-xs text-text-muted">
                                You are about to approve <span className="text-white font-medium">{garage.garageUser.fullName}</span>. They will gain full access to the platform.
                            </p>
                        </div>
                    )}

                    {/* Reject form view */}
                    {view === 'reject-form' && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-3">
                            <p className="text-sm font-semibold text-red-400">Rejection Reason</p>
                            <textarea
                                value={reason}
                                onChange={e => { setReason(e.target.value); setReasonErr(''); }}
                                placeholder="Explain why this application is being rejected..."
                                rows={3}
                                className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-red-400/40 focus:ring-1 focus:ring-red-400/20 resize-none transition-all"
                            />
                            {reasonErr && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" />{reasonErr}
                                </p>
                            )}
                        </div>
                    )}

                    {/* API error */}
                    {apiError && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />{apiError}
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                <div className="p-5 border-t border-border-subtle">
                    {view === 'main' && (
                        <div className="flex gap-3">
                            <button onClick={() => setView('reject-form')}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold transition-colors">
                                <ThumbsDown className="w-4 h-4" />Reject
                            </button>
                            <button onClick={() => setView('approve-confirm')}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent-green/10 border border-accent-green/20 hover:bg-accent-green/20 text-accent-green rounded-xl text-sm font-semibold transition-colors">
                                <ThumbsUp className="w-4 h-4" />Approve
                            </button>
                        </div>
                    )}

                    {view === 'approve-confirm' && (
                        <div className="flex gap-3">
                            <button onClick={goBack} disabled={isPending}
                                className="flex-1 py-2.5 bg-surface border border-border-subtle hover:bg-surface-hover text-text-primary rounded-xl text-sm font-semibold transition-colors disabled:opacity-40">
                                Back
                            </button>
                            <button onClick={handleApprove} disabled={isPending}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent-green/20 border border-accent-green/30 hover:bg-accent-green/30 text-accent-green rounded-xl text-sm font-bold transition-colors disabled:opacity-40">
                                {approveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                Confirm Approval
                            </button>
                        </div>
                    )}

                    {view === 'reject-form' && (
                        <div className="flex gap-3">
                            <button onClick={goBack} disabled={isPending}
                                className="flex-1 py-2.5 bg-surface border border-border-subtle hover:bg-surface-hover text-text-primary rounded-xl text-sm font-semibold transition-colors disabled:opacity-40">
                                Back
                            </button>
                            <button onClick={handleReject} disabled={isPending}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-bold transition-colors disabled:opacity-40">
                                {rejectMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsDown className="w-4 h-4" />}
                                Confirm Rejection
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════ */

const PAGE_LIMIT = 15;

export default function ApplicationsQueue() {
    const [page, setPage]           = useState(1);
    const [search, setSearch]       = useState('');
    const [debSearch, setDebSearch] = useState('');
    const [selected, setSelected]   = useState<GarageItem | null>(null);

    const handleSearch = (val: string) => {
        setSearch(val);
        clearTimeout((handleSearch as any)._t);
        (handleSearch as any)._t = setTimeout(() => { setDebSearch(val); setPage(1); }, 400);
    };

    const { data, isLoading, isError, error } = usePendingGaragesQuery({ page, limit: PAGE_LIMIT });

    const allGarages = data?.results ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;

    const garages = debSearch
        ? allGarages.filter(g =>
            g.garageUser.fullName.toLowerCase().includes(debSearch.toLowerCase()) ||
            g.garageUser.email.toLowerCase().includes(debSearch.toLowerCase()) ||
            g.garageUser.address.toLowerCase().includes(debSearch.toLowerCase())
        )
        : allGarages;

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Modal */}
            {selected && <ReviewModal garage={selected} onClose={() => setSelected(null)} />}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ClipboardList className="w-8 h-8 text-accent-cyan" />
                        Applications Queue
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Review and process new garage registrations. Track applicants through background checks and onboarding.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        <CalendarClock className="w-4 h-4" /> SLA Report
                    </button>
                </div>
            </div>

            {/* Pipeline Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border rounded-xl p-4 flex flex-col justify-between h-24 bg-amber-500/10 border-amber-500/30">
                    <span className="text-sm font-semibold text-amber-400">Pending Review</span>
                    <span className="text-3xl font-bold text-amber-400">
                        {isLoading
                            ? <span className="inline-block w-10 h-8 bg-amber-500/20 rounded animate-pulse" />
                            : totalItems}
                    </span>
                </div>
                <div className="border rounded-xl p-4 flex flex-col justify-between h-24 bg-purple-400/10 border-purple-400/30">
                    <span className="text-sm font-semibold text-purple-400">Background Check</span>
                    <span className="text-3xl font-bold text-purple-400">—</span>
                </div>
                <div className="border rounded-xl p-4 flex flex-col justify-between h-24 bg-sky-500/10 border-sky-500/30">
                    <span className="text-sm font-semibold text-sky-400">Contract Sent</span>
                    <span className="text-3xl font-bold text-sky-400">—</span>
                </div>
                <div className="border rounded-xl p-4 flex flex-col justify-between h-24 bg-accent-cyan/10 border-accent-cyan/30">
                    <span className="text-sm font-semibold text-accent-cyan">Onboarding</span>
                    <span className="text-3xl font-bold text-accent-cyan">—</span>
                </div>
            </div>

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load applications.'}
                </div>
            )}

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                        placeholder="Search applications..."
                        className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                </div>

                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-surface rounded-xl border border-border-subtle p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-11 h-11 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <div className="w-32 h-3.5 bg-surface-hover rounded animate-pulse" />
                                    <div className="w-44 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-1.5 pt-3 border-t border-border-subtle">
                                {[1, 2, 3].map(j => <div key={j} className="w-full h-3 bg-surface-hover/40 rounded animate-pulse" />)}
                            </div>
                        </div>
                    ))
                ) : garages.length > 0 ? (
                    garages.map((g, i) => (
                        <div key={g._id} className="bg-surface rounded-xl border border-amber-500/20 p-4 animate-fade-in-up"
                            style={{ animationDelay: `${0.05 * i}s` }}>
                            <div className="flex items-start gap-3 mb-3">
                                {g.garageLogo ? (
                                    <img src={g.garageLogo} alt={g.garageUser.fullName}
                                        className="w-11 h-11 rounded-xl object-cover border border-border-subtle shrink-0"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                ) : (
                                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                        <Building2 className="w-5 h-5 text-amber-400" />
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-white truncate">{g.garageUser.fullName}</p>
                                    <p className="text-[11px] text-text-muted truncate">{g.garageUser.email}</p>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20 shrink-0">
                                    <Clock className="w-3 h-3" />Pending
                                </span>
                            </div>
                            <div className="space-y-1.5 text-[11px] text-text-muted border-t border-border-subtle pt-3 mb-3">
                                <div className="flex items-start gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                    <span>{g.garageUser.address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Submitted</span>
                                    <span>{formatDate(g.createdAt)}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelected(g)}
                                className="w-full py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover text-sm font-semibold text-text-primary rounded-xl transition-colors">
                                Review Application
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-text-muted text-sm flex flex-col items-center gap-3">
                        <CheckCircle2 className="w-10 h-10 text-accent-green opacity-50" />
                        No pending applications — all caught up!
                    </div>
                )}
            </div>

            {/* Desktop table */}
            <div className="hidden md:flex bg-surface border border-border-subtle rounded-xl flex-col min-h-[400px]">
                {/* Toolbar */}
                <div className="p-4 border-b border-border-subtle flex sm:items-center justify-between gap-4 bg-surface-card/50 rounded-t-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                            placeholder="Search applications, garages..."
                            className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                        {totalItems > 0 && !isLoading && (
                            <span className="text-xs text-amber-400 font-medium">{totalItems} pending</span>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Applicant</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Location</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Mechanics</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Stage</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="border-b border-border-subtle">
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                                                <div className="space-y-2">
                                                    <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                                                    <div className="w-20 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </td>
                                        {[1, 2, 3, 4, 5, 6].map(j => (
                                            <td key={j} className="py-4 px-5">
                                                <div className="w-24 h-3.5 bg-surface-hover/60 rounded animate-pulse" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : garages.length > 0 ? (
                                garages.map((g, i) => (
                                    <tr key={g._id} className="hover:bg-surface-hover/30 transition-colors group animate-fade-in-up"
                                        style={{ animationDelay: `${0.04 * i}s` }}>
                                        {/* Garage */}
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-3">
                                                {g.garageLogo ? (
                                                    <img src={g.garageLogo} alt={g.garageUser.fullName}
                                                        className="w-9 h-9 rounded-xl object-cover border border-border-subtle shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                                        <Building2 className="w-4 h-4 text-amber-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-bold text-white">{g.garageUser.fullName}</p>
                                                    <span className="text-[10px] px-1.5 py-0.5 bg-surface-card rounded text-text-muted font-mono mt-0.5 inline-block border border-border-subtle">
                                                        {g._id.slice(-8).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Applicant */}
                                        <td className="py-4 px-5">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm text-text-secondary font-medium">{g.garageUser.email}</span>
                                                <span className="text-xs text-text-muted">{g.garageUser.phoneNumber}</span>
                                            </div>
                                        </td>
                                        {/* Location */}
                                        <td className="py-4 px-5">
                                            <div className="flex items-start gap-1.5 text-text-muted max-w-[180px]">
                                                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                                <span className="text-xs whitespace-normal leading-relaxed">{g.garageUser.address}</span>
                                            </div>
                                        </td>
                                        {/* Mechanics */}
                                        <td className="py-4 px-5 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Wrench className="w-3.5 h-3.5 text-text-muted" />
                                                <span className="text-sm font-semibold text-white">{g.numberOfMacanics}</span>
                                            </div>
                                        </td>
                                        {/* Submitted */}
                                        <td className="py-4 px-5">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5 text-text-secondary text-sm">
                                                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                                                    {timeAgo(g.createdAt)}
                                                </div>
                                                <span className="text-[10px] text-text-muted">{formatDate(g.createdAt)}</span>
                                            </div>
                                        </td>
                                        {/* Stage */}
                                        <td className="py-4 px-5">
                                            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                Pending Review
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        <td className="py-4 px-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a href={g.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                                                    className="p-1.5 text-text-muted hover:text-accent-cyan hover:bg-surface-hover rounded-lg transition-colors" title="Insurance & Certificate">
                                                    <ShieldCheck className="w-4 h-4" />
                                                </a>
                                                <a href={g.businessLicense} target="_blank" rel="noopener noreferrer"
                                                    className="p-1.5 text-text-muted hover:text-accent-cyan hover:bg-surface-hover rounded-lg transition-colors" title="Business License">
                                                    <FileText className="w-4 h-4" />
                                                </a>
                                                <button onClick={() => setSelected(g)}
                                                    className="px-3 py-1.5 bg-surface-card border border-border-subtle hover:bg-surface-hover text-xs font-semibold text-text-primary rounded-lg transition-colors">
                                                    Review
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-text-muted">
                                            <CheckCircle2 className="w-10 h-10 text-accent-green opacity-50" />
                                            <span className="text-sm">No pending applications — all caught up!</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalItems > 0 && (
                    <div className="p-4 border-t border-border-subtle flex justify-between items-center text-sm text-text-muted">
                        <span className="text-xs">
                            Showing {(page - 1) * PAGE_LIMIT + 1}–{Math.min(page * PAGE_LIMIT, totalItems)} of {totalItems}
                        </span>
                        <div className="flex gap-1">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover text-text-muted disabled:opacity-30 transition-colors">
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
                                className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover text-text-muted disabled:opacity-30 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
