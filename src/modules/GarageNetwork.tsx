import { useState } from 'react';
import {
    MapPin, Search, ChevronLeft, ChevronRight,
    Loader2, AlertCircle, CheckCircle2, Clock, XCircle,
    Wrench, FileText, ShieldCheck, MoreVertical, Building2,
} from 'lucide-react';
import StatGrid from '../components/ui/StatGrid';
import DataTable from '../components/ui/DataTable';
import { useGaragesQuery } from '../hooks/queries/useGaragesQuery';
import { usePendingGaragesQuery } from '../hooks/queries/usePendingGaragesQuery';
import type { GarageItem } from '../services/garages.service';

/* ─── Status badge ─── */
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
        approved: { label: 'Approved', cls: 'text-accent-green bg-accent-green/10 border-accent-green/20', icon: <CheckCircle2 className="w-3 h-3" /> },
        pending:  { label: 'Pending',  cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20',          icon: <Clock        className="w-3 h-3" /> },
        rejected: { label: 'Rejected', cls: 'text-red-400 bg-red-500/10 border-red-500/20',               icon: <XCircle      className="w-3 h-3" /> },
    };
    const s = map[status] ?? map.pending;
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${s.cls}`}>
            {s.icon}{s.label}
        </span>
    );
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ─── Garage Row (desktop) ─── */
const GarageRow = ({ garage, index }: { garage: GarageItem; index: number }) => (
    <tr className="animate-fade-in-up border-b border-border-subtle hover:bg-surface-hover/30 transition-colors"
        style={{ animationDelay: `${0.04 * index}s` }}>

        {/* Logo + Name */}
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                {garage.garageLogo ? (
                    <img src={garage.garageLogo} alt={garage.garageUser.fullName}
                        className="w-10 h-10 rounded-xl object-cover border border-border-subtle flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-accent-cyan" />
                    </div>
                )}
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{garage.garageUser.fullName}</p>
                    <p className="text-xs text-text-muted truncate">{garage.garageUser.email}</p>
                </div>
            </div>
        </td>

        {/* Address */}
        <td className="p-4">
            <div className="flex items-start gap-1.5 text-text-muted">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                <span className="text-xs max-w-[180px] leading-relaxed">{garage.garageUser.address}</span>
            </div>
        </td>

        {/* Status */}
        <td className="p-4"><StatusBadge status={garage.approvalStatus} /></td>

        {/* Mechanics */}
        <td className="p-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-sm font-semibold text-white">{garage.numberOfMacanics}</span>
            </div>
        </td>

        {/* Approved by */}
        <td className="p-4">
            {garage.approvedBy ? (
                <div>
                    <p className="text-xs font-medium text-white">{garage.approvedBy.fullName}</p>
                    {garage.approvedAt && (
                        <p className="text-[10px] text-text-muted mt-0.5">{formatDate(garage.approvedAt)}</p>
                    )}
                </div>
            ) : (
                <span className="text-xs text-text-muted">—</span>
            )}
        </td>

        {/* Docs */}
        <td className="p-4">
            <div className="flex items-center gap-2">
                <a href={garage.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-medium text-accent-cyan hover:underline"
                    title="Insurance & Certificate">
                    <ShieldCheck className="w-3.5 h-3.5" />Ins.
                </a>
                <a href={garage.businessLicense} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-medium text-accent-cyan hover:underline"
                    title="Business License">
                    <FileText className="w-3.5 h-3.5" />Lic.
                </a>
            </div>
        </td>

        {/* Joined */}
        <td className="p-4 text-sm text-text-muted">{formatDate(garage.createdAt)}</td>

        {/* Actions */}
        <td className="p-4 pr-6 text-right">
            <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
            </button>
        </td>
    </tr>
);

/* ─── Garage Mobile Card ─── */
const GarageCard = ({ garage, index }: { garage: GarageItem; index: number }) => (
    <div className="bg-surface rounded-xl border border-border-subtle p-4 animate-fade-in-up"
        style={{ animationDelay: `${0.05 * index}s` }}>
        <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
                {garage.garageLogo ? (
                    <img src={garage.garageLogo} alt={garage.garageUser.fullName}
                        className="w-11 h-11 rounded-xl object-cover border border-border-subtle shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                    <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-accent-cyan" />
                    </div>
                )}
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{garage.garageUser.fullName}</p>
                    <p className="text-[11px] text-text-muted truncate">{garage.garageUser.email}</p>
                </div>
            </div>
            <StatusBadge status={garage.approvalStatus} />
        </div>

        <div className="space-y-1.5 text-[11px] text-text-muted border-t border-border-subtle pt-3">
            <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                <span>{garage.garageUser.address}</span>
            </div>
            <div className="flex justify-between">
                <span>Mechanics</span>
                <span className="text-white font-medium flex items-center gap-1"><Wrench className="w-3 h-3" />{garage.numberOfMacanics}</span>
            </div>
            {garage.approvedBy && (
                <div className="flex justify-between">
                    <span>Approved by</span>
                    <span className="text-white font-medium">{garage.approvedBy.fullName}</span>
                </div>
            )}
            <div className="flex justify-between">
                <span>Joined</span>
                <span>{formatDate(garage.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3 pt-1">
                <a href={garage.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent-cyan hover:underline">
                    <ShieldCheck className="w-3.5 h-3.5" />Insurance
                </a>
                <a href={garage.businessLicense} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent-cyan hover:underline">
                    <FileText className="w-3.5 h-3.5" />License
                </a>
            </div>
        </div>
    </div>
);

/* ─── Skeleton ─── */
const SkeletonRow = () => (
    <tr className="border-b border-border-subtle">
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                <div className="space-y-2">
                    <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                    <div className="w-36 h-3 bg-surface-hover/60 rounded animate-pulse" />
                </div>
            </div>
        </td>
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <td key={i} className="p-4">
                <div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" />
            </td>
        ))}
    </tr>
);

/* ─── All Garages Tab ─── */
const PAGE_LIMIT = 15;

function AllGaragesTab() {
    const [page, setPage]           = useState(1);
    const [search, setSearch]       = useState('');
    const [debSearch, setDebSearch] = useState('');

    const handleSearch = (val: string) => {
        setSearch(val);
        clearTimeout((handleSearch as any)._t);
        (handleSearch as any)._t = setTimeout(() => { setDebSearch(val); setPage(1); }, 400);
    };

    const { data, isLoading, isError, error } = useGaragesQuery({ page, limit: PAGE_LIMIT, search: debSearch });

    const garages    = data?.results ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;

    const approved = garages.filter(g => g.approvalStatus === 'approved').length;
    const pending  = garages.filter(g => g.approvalStatus === 'pending').length;
    const rejected = garages.filter(g => g.approvalStatus === 'rejected').length;

    return (
        <div className="space-y-5">
            {/* Stats */}
            <StatGrid stats={[
                { label: 'Total Garages',  value: String(totalItems || '—'), trend: '', trendUp: true },
                { label: 'Approved',       value: String(isLoading ? '…' : approved),  trend: '', trendUp: true },
                { label: 'Pending Review', value: String(isLoading ? '…' : pending),   trend: '', trendUp: false },
                { label: 'Rejected',       value: String(isLoading ? '…' : rejected),  trend: '', trendUp: false },
            ]} />

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load garages.'}
                </div>
            )}

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle overflow-hidden">
                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-border-subtle flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text" value={search}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Search garages..."
                            className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                        {totalItems > 0 && !isLoading && (
                            <span className="text-xs text-text-muted">{totalItems} garages</span>
                        )}
                    </div>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden p-3 space-y-3">
                    {isLoading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-surface rounded-xl border border-border-subtle p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                                        <div className="w-40 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 pt-3 border-t border-border-subtle">
                                    {[1, 2, 3].map(j => <div key={j} className="w-full h-3 bg-surface-hover/40 rounded animate-pulse" />)}
                                </div>
                            </div>
                        ))
                    ) : garages.length > 0 ? (
                        garages.map((g, i) => <GarageCard key={g._id} garage={g} index={i} />)
                    ) : (
                        <div className="text-center py-12 text-text-muted text-sm flex flex-col items-center gap-3">
                            <Building2 className="w-10 h-10 opacity-30" />
                            No garages found.
                        </div>
                    )}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface/50">
                                <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Address</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Mechanics</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Approved By</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Docs</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Joined</th>
                                <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                            ) : garages.length > 0 ? (
                                garages.map((g, i) => <GarageRow key={g._id} garage={g} index={i} />)
                            ) : (
                                <tr>
                                    <td colSpan={8} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-text-muted">
                                            <Building2 className="w-10 h-10 opacity-30" />
                                            <span className="text-sm">No garages found.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalItems > 0 && (
                    <div className="p-3 sm:p-4 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-text-muted">
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

/* ─── Garage Queue Tab ─── */
const QUEUE_LIMIT = 15;

function GarageQueueTab() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = usePendingGaragesQuery({ page, limit: QUEUE_LIMIT });

    const garages    = data?.results ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;

    return (
        <div className="space-y-5">
            {/* Stats */}
            <StatGrid stats={[
                { label: 'Pending Review', value: String(isLoading ? '…' : totalItems), trend: '', trendUp: false },
                { label: 'Awaiting Action', value: String(isLoading ? '…' : garages.length), trend: '', trendUp: false },
            ]} />

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load pending garages.'}
                </div>
            )}

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle overflow-hidden">
                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-border-subtle flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-semibold text-white">Pending Verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                        {totalItems > 0 && !isLoading && (
                            <span className="text-xs text-amber-400 font-medium">{totalItems} awaiting review</span>
                        )}
                    </div>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden p-3 space-y-3">
                    {isLoading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-surface rounded-xl border border-border-subtle p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                                        <div className="w-40 h-3 bg-surface-hover/60 rounded animate-pulse" />
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
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {g.garageLogo ? (
                                            <img src={g.garageLogo} alt={g.garageUser.fullName}
                                                className="w-11 h-11 rounded-xl object-cover border border-border-subtle shrink-0"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                        ) : (
                                            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                                <Building2 className="w-5 h-5 text-amber-400" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{g.garageUser.fullName}</p>
                                            <p className="text-[11px] text-text-muted truncate">{g.garageUser.email}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-amber-400 bg-amber-500/10 border-amber-500/20 shrink-0">
                                        <Clock className="w-3 h-3" />Pending
                                    </span>
                                </div>
                                <div className="space-y-1.5 text-[11px] text-text-muted border-t border-border-subtle pt-3">
                                    <div className="flex items-start gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                        <span>{g.garageUser.address}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Phone</span>
                                        <span className="text-white font-medium">{g.garageUser.phoneNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Mechanics</span>
                                        <span className="text-white font-medium flex items-center gap-1"><Wrench className="w-3 h-3" />{g.numberOfMacanics}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Submitted</span>
                                        <span>{formatDate(g.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 pt-1">
                                        <a href={g.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-accent-cyan hover:underline">
                                            <ShieldCheck className="w-3.5 h-3.5" />Insurance
                                        </a>
                                        <a href={g.businessLicense} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-accent-cyan hover:underline">
                                            <FileText className="w-3.5 h-3.5" />License
                                        </a>
                                    </div>
                                    {g.description && (
                                        <p className="pt-1 text-text-secondary italic">"{g.description}"</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-text-muted text-sm flex flex-col items-center gap-3">
                            <CheckCircle2 className="w-10 h-10 text-accent-green opacity-50" />
                            No pending garages — all caught up!
                        </div>
                    )}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface/50">
                                <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Contact</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Address</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Mechanics</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Documents</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted</th>
                                <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="border-b border-border-subtle">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-surface-hover animate-pulse shrink-0" />
                                                <div className="space-y-2">
                                                    <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                                                    <div className="w-36 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </td>
                                        {[1, 2, 3, 4, 5, 6].map(j => (
                                            <td key={j} className="p-4">
                                                <div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : garages.length > 0 ? (
                                garages.map((g, i) => (
                                    <tr key={g._id} className="animate-fade-in-up border-b border-border-subtle hover:bg-surface-hover/30 transition-colors"
                                        style={{ animationDelay: `${0.04 * i}s` }}>
                                        {/* Logo + Name */}
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                {g.garageLogo ? (
                                                    <img src={g.garageLogo} alt={g.garageUser.fullName}
                                                        className="w-10 h-10 rounded-xl object-cover border border-border-subtle flex-shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <Building2 className="w-5 h-5 text-amber-400" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-white truncate">{g.garageUser.fullName}</p>
                                                    <p className="text-xs text-text-muted truncate">{g.garageUser.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Contact */}
                                        <td className="p-4">
                                            <span className="text-xs text-text-secondary">{g.garageUser.phoneNumber}</span>
                                        </td>
                                        {/* Address */}
                                        <td className="p-4">
                                            <div className="flex items-start gap-1.5 text-text-muted">
                                                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                                <span className="text-xs max-w-[160px] leading-relaxed">{g.garageUser.address}</span>
                                            </div>
                                        </td>
                                        {/* Mechanics */}
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Wrench className="w-3.5 h-3.5 text-text-muted" />
                                                <span className="text-sm font-semibold text-white">{g.numberOfMacanics}</span>
                                            </div>
                                        </td>
                                        {/* Documents */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <a href={g.insuranceAndCertificate} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-[10px] font-medium text-accent-cyan hover:underline"
                                                    title="Insurance & Certificate">
                                                    <ShieldCheck className="w-3.5 h-3.5" />Ins.
                                                </a>
                                                <a href={g.businessLicense} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-[10px] font-medium text-accent-cyan hover:underline"
                                                    title="Business License">
                                                    <FileText className="w-3.5 h-3.5" />Lic.
                                                </a>
                                            </div>
                                        </td>
                                        {/* Submitted */}
                                        <td className="p-4 text-xs text-text-muted">{formatDate(g.createdAt)}</td>
                                        {/* Actions */}
                                        <td className="p-4 pr-6 text-right">
                                            <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-text-muted">
                                            <CheckCircle2 className="w-10 h-10 text-accent-green opacity-50" />
                                            <span className="text-sm">No pending garages — all caught up!</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalItems > 0 && (
                    <div className="p-3 sm:p-4 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-text-muted">
                        <span className="text-xs">
                            Showing {(page - 1) * QUEUE_LIMIT + 1}–{Math.min(page * QUEUE_LIMIT, totalItems)} of {totalItems}
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

/* ─── Static data for remaining tabs ─── */
const mockGarages = [
    { id: 'GRG-001', name: "Jay's Smart Garage", type: 'Partner',   city: 'Scarborough, ON',  plan: 'Premium',    commission: '18%', rating: '4.9', jobs: 847, status: 'Active'  },
    { id: 'GRG-002', name: 'AutoPro Express',     type: 'Franchise', city: 'Mississauga, ON',  plan: 'Enterprise', commission: '15%', rating: '4.8', jobs: 723, status: 'Active'  },
    { id: 'GRG-003', name: 'MechMaster Hub',      type: 'In-House',  city: 'Calgary, AB',       plan: 'Premium',    commission: '20%', rating: '4.8', jobs: 691, status: 'Active'  },
    { id: 'GRG-004', name: 'QuickFix Auto',       type: 'Partner',   city: 'Vancouver, BC',    plan: 'Basic',      commission: '20%', rating: '4.5', jobs: 312, status: 'Active'  },
    { id: 'GRG-005', name: 'TorqueWorks',         type: 'Partner',   city: 'Edmonton, AB',     plan: 'Premium',    commission: '18%', rating: '4.2', jobs: 189, status: 'Pending' },
];

const plans = [
    { id: 1, name: 'Basic',      price: '$49/mo',  garages: 89,  features: 'Listing, Basic Analytics',                              color: 'text-text-secondary' },
    { id: 2, name: 'Premium',    price: '$149/mo', garages: 187, features: 'Priority Listing, Full Analytics, API Access',          color: 'text-accent-cyan'    },
    { id: 3, name: 'Enterprise', price: '$399/mo', garages: 66,  features: 'White-label, Dedicated Support, Custom Commission',     color: 'text-accent-purple'  },
];

const regions = [
    { name: 'Ontario',         garages: 142, revenue: '$48.2K', growth: '+12%' },
    { name: 'Alberta',         garages: 87,  revenue: '$31.5K', growth: '+18%' },
    { name: 'British Columbia',garages: 63,  revenue: '$22.1K', growth: '+8%'  },
    { name: 'Quebec',          garages: 28,  revenue: '$9.4K',  growth: '+24%' },
    { name: 'Manitoba',        garages: 12,  revenue: '$4.2K',  growth: '+32%' },
];

const disputes = [
    { id: 'DSP-201', garage: "Jay's Smart Garage", customer: 'John Doe',  type: 'Service Quality', amount: '$89.99', date: 'Oct 22, 2026', status: 'Open'          },
    { id: 'DSP-202', garage: 'QuickFix Auto',      customer: 'Sarah S.',  type: 'No-Show',         amount: '$0',     date: 'Oct 21, 2026', status: 'Resolved'      },
    { id: 'DSP-203', garage: 'SpeedyLube Pro',     customer: 'Mike T.',   type: 'Overcharge',      amount: '$45.00', date: 'Oct 20, 2026', status: 'Investigating' },
];

/* ═══════════════════════════════════════════
   GarageNetwork Page
═══════════════════════════════════════════ */
export default function GarageNetwork() {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all',         label: 'All Garages'        },
        { id: 'queue',       label: 'Garage Queue'       },
        { id: 'plans',       label: 'Subscription Plans' },
        { id: 'commission',  label: 'Commission Rates'   },
        { id: 'performance', label: 'Performance'        },
        { id: 'disputes',    label: 'Disputes'           },
        { id: 'contracts',   label: 'Contracts'          },
        { id: 'map',         label: 'Geographic Map'     },
    ];

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Garage Network</h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Partner garages, franchise management, and geographic expansion.</p>
            </div>

            {/* Tab bar */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            {tab.label}
                            {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div key={activeTab} className="animate-fade-in-up">

                {activeTab === 'all' && <AllGaragesTab />}

                {activeTab === 'queue' && <GarageQueueTab />}

                {activeTab === 'plans' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {plans.map(p => (
                            <div key={p.id} className="card-glow bg-surface-card rounded-2xl p-6 border border-border-subtle">
                                <h3 className={`text-xl font-bold ${p.color} mb-1`}>{p.name}</h3>
                                <p className="text-3xl font-extrabold text-white mb-4">{p.price}</p>
                                <p className="text-sm text-text-muted mb-4">{p.features}</p>
                                <div className="pt-4 border-t border-border-subtle">
                                    <p className="text-sm text-text-secondary"><span className="font-bold text-white">{p.garages}</span> active garages</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'commission' && (
                    <div className="space-y-5">
                        <StatGrid stats={[
                            { label: 'Avg Commission', value: '18.2%' },
                            { label: 'Revenue (30d)',  value: '$28.5K', trend: '+12%', trendUp: true },
                            { label: 'Custom Rates',   value: '14' },
                        ]} />
                        <DataTable columns={[
                            { key: 'name',       header: 'Garage',     render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                            { key: 'type',       header: 'Type'                                                                                           },
                            { key: 'commission', header: 'Rate',       render: (v: string) => <span className="text-sm font-bold text-accent-cyan">{v}</span> },
                            { key: 'plan',       header: 'Plan'                                                                                           },
                        ]} data={mockGarages} />
                    </div>
                )}

                {activeTab === 'performance' && (
                    <DataTable columns={[
                        { key: 'name',   header: 'Garage', render: (v: string) => <span className="text-sm font-medium text-white">{v}</span>         },
                        { key: 'rating', header: 'Rating', render: (v: string) => <span className="text-sm font-bold text-amber-400">★ {v}</span>     },
                        { key: 'jobs',   header: 'Total Jobs', render: (v: number) => <span className="text-sm font-semibold text-white">{v}</span>   },
                        { key: 'city',   header: 'Location'                                                                                            },
                    ]} data={[...mockGarages].sort((a, b) => b.jobs - a.jobs)} />
                )}

                {activeTab === 'disputes' && (
                    <DataTable columns={[
                        { key: 'id',       header: 'ID',       render: (v: string) => <span className="font-mono text-accent-cyan text-sm">{v}</span> },
                        { key: 'garage',   header: 'Garage',   render: (v: string) => <span className="text-sm font-medium text-white">{v}</span>     },
                        { key: 'customer', header: 'Customer'                                                                                          },
                        { key: 'type',     header: 'Type'                                                                                              },
                        { key: 'amount',   header: 'Amount',   render: (v: string) => <span className="text-sm font-semibold text-white">{v}</span>   },
                        { key: 'status',   header: 'Status',   render: (v: string) => {
                            const c = v === 'Open' ? 'text-red-400 bg-red-500/10 border-red-500/20' : v === 'Resolved' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                            return <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${c}`}>{v}</span>;
                        }},
                    ]} data={disputes} searchKeys={['id', 'garage']} />
                )}

                {activeTab === 'contracts' && (
                    <DataTable columns={[
                        { key: 'name',   header: 'Garage',        render: (v: string) => <span className="text-sm font-medium text-white">{v}</span> },
                        { key: 'type',   header: 'Contract Type'                                                                                      },
                        { key: 'plan',   header: 'Plan'                                                                                               },
                        { key: 'status', header: 'Status',        render: (v: string) => (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${v === 'Active' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>{v}</span>
                        )},
                    ]} data={mockGarages} />
                )}

                {activeTab === 'map' && (
                    <div className="space-y-5">
                        <StatGrid stats={[
                            { label: 'Provinces Covered',   value: '6'       },
                            { label: 'Total Garages',       value: '342'     },
                            { label: 'Nationwide Revenue',  value: '$118.5K' },
                        ]} />
                        <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
                            <div className="p-5 border-b border-border-subtle">
                                <h3 className="text-lg font-bold text-white">Regional Breakdown</h3>
                            </div>
                            <div className="divide-y divide-border-subtle">
                                {regions.map(r => (
                                    <div key={r.name} className="p-4 px-6 flex items-center justify-between hover:bg-surface-hover/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-accent-cyan" />
                                            <span className="text-sm font-medium text-white">{r.name}</span>
                                        </div>
                                        <div className="flex items-center gap-8 text-sm">
                                            <span className="text-text-secondary">{r.garages} garages</span>
                                            <span className="font-semibold text-white">{r.revenue}</span>
                                            <span className="text-accent-green font-semibold">{r.growth}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
