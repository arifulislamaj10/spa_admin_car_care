import { useState } from 'react';
import {
    Tag, ChevronLeft, ChevronRight, Loader2, AlertCircle,
    Building2, Wrench, Percent, Calendar, CheckCircle2, XCircle, Clock,
    X, Eye, Phone, Mail, MapPin, Info,
} from 'lucide-react';
import { useOffersQuery } from '../hooks/queries/useOffersQuery';
import { useOfferDetailQuery } from '../hooks/queries/useOfferDetailQuery';
import type { Offer } from '../services/offers.service';

const PAGE_LIMIT = 12;

const STATUS_TABS = [
    { id: 'active',    label: 'Active'    },
    { id: 'expired',   label: 'Expired'   },
    { id: 'cancelled', label: 'Cancelled' },
];

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}


function StatusBadge({ status }: { status: string }) {
    if (status === 'active') {
        return (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-accent-green bg-accent-green/10 border-accent-green/20">
                <CheckCircle2 className="w-3 h-3" />Active
            </span>
        );
    }
    if (status === 'expired') {
        return (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-orange-400 bg-orange-400/10 border-orange-400/20">
                <Clock className="w-3 h-3" />Expired
            </span>
        );
    }
    if (status === 'cancelled') {
        return (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-red-400 bg-red-500/10 border-red-500/20">
                <XCircle className="w-3 h-3" />Cancelled
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-text-muted bg-surface border-border-subtle">
            <XCircle className="w-3 h-3" />{status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

/* ─── Detail Modal ─── */
function OfferDetailModal({ offerId, onClose }: { offerId: string; onClose: () => void }) {
    const { data, isLoading, isError } = useOfferDetailQuery(offerId);
    const img = data?.service.serviceImage?.[0]?.url;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-surface-card border border-border-subtle rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border-subtle">
                    <div className="flex items-center gap-2.5">
                        <Tag className="w-5 h-5 text-accent-cyan" />
                        <h2 className="text-base font-bold text-white">Offer Details</h2>
                    </div>
                    <button onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-muted hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 space-y-5">
                    {isLoading && (
                        <div className="flex flex-col items-center gap-3 py-12">
                            <Loader2 className="w-8 h-8 text-accent-cyan animate-spin" />
                            <span className="text-sm text-text-muted">Loading offer details…</span>
                        </div>
                    )}

                    {isError && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />Failed to load offer details.
                        </div>
                    )}

                    {data && (
                        <>
                            {/* Service image */}
                            {img && (
                                <div className="relative h-44 rounded-xl overflow-hidden bg-surface border border-border-subtle">
                                    <img src={img} alt={data.service.serviceName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-flex items-center gap-1 text-[14px] font-bold px-3 py-1 rounded-lg bg-accent-green text-white shadow">
                                            <Percent className="w-4 h-4" />{data.offerPercent}% OFF
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <StatusBadge status={data.status} />
                                    </div>
                                </div>
                            )}

                            {/* Offer description */}
                            {data.offerDescription && (
                                <div className="flex items-start gap-2.5 p-3 bg-surface rounded-xl border border-border-subtle">
                                    <Info className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                                    <p className="text-sm text-text-secondary leading-relaxed">{data.offerDescription}</p>
                                </div>
                            )}

                            {/* Pricing */}
                            <div>
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2">Pricing</p>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-surface rounded-xl p-3 text-center border border-border-subtle">
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Original</p>
                                        <p className="text-base font-semibold text-text-secondary line-through">
                                            ৳{data.service.servicePrice.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-accent-green/5 rounded-xl p-3 text-center border border-accent-green/20">
                                        <p className="text-[10px] text-accent-green uppercase tracking-wider mb-1">Offer Price</p>
                                        <p className="text-base font-bold text-accent-green">
                                            ৳{data.offerPrice.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/20">
                                        <p className="text-[10px] text-red-400 uppercase tracking-wider mb-1">You Save</p>
                                        <p className="text-base font-bold text-red-400">
                                            ৳{(data.service.servicePrice - data.offerPrice).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Service info */}
                            <div>
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2">Service</p>
                                <div className="bg-surface rounded-xl border border-border-subtle p-4 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Wrench className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                                        <p className="text-sm font-semibold text-white">{data.service.serviceName}</p>
                                    </div>
                                    {(data.service as any).serviceDetails && (
                                        <p className="text-xs text-text-muted pl-5">{(data.service as any).serviceDetails}</p>
                                    )}
                                </div>
                            </div>

                            {/* Garage info */}
                            <div>
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2">Garage</p>
                                <div className="bg-surface rounded-xl border border-border-subtle p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5 text-text-muted shrink-0" />
                                        <p className="text-sm font-semibold text-white">{data.garageId.fullName}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-text-muted shrink-0" />
                                        <p className="text-xs text-text-secondary">{data.garageId.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-text-muted shrink-0" />
                                        <p className="text-xs text-text-secondary">{data.garageId.phoneNumber}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                                        <p className="text-xs text-text-secondary leading-relaxed">{data.garageId.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Expiry & dates */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-surface rounded-xl border border-border-subtle p-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider">Expires</p>
                                    </div>
                                    <p className="text-sm font-medium text-white">{formatDate(data.offerExpiresAt)}</p>
                                </div>
                                <div className="bg-surface rounded-xl border border-border-subtle p-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5 text-text-muted" />
                                        <p className="text-[10px] text-text-muted uppercase tracking-wider">Created</p>
                                    </div>
                                    <p className="text-sm font-medium text-white">{formatDate(data.createdAt)}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function OfferCard({ offer, index, onView }: { offer: Offer; index: number; onView: (id: string) => void }) {
    const img = offer.service.serviceImage?.[0]?.url;
    return (
        <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${0.04 * index}s` }}>
            {img && (
                <div className="relative h-36 overflow-hidden bg-surface">
                    <img src={img} alt={offer.service.serviceName}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 text-[13px] font-bold px-2.5 py-1 rounded-lg bg-accent-green text-white shadow">
                            <Percent className="w-3.5 h-3.5" />{offer.offerPercent}% OFF
                        </span>
                    </div>
                    <div className="absolute top-2 right-2">
                        <StatusBadge status={offer.status} />
                    </div>
                </div>
            )}

            <div className="p-4 space-y-3">
                {!img && (
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[13px] font-bold px-2.5 py-1 rounded-lg bg-accent-green/10 border border-accent-green/20 text-accent-green">
                            <Percent className="w-3.5 h-3.5" />{offer.offerPercent}% OFF
                        </span>
                        <StatusBadge status={offer.status} />
                    </div>
                )}

                {/* Service */}
                <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <Wrench className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                        <p className="text-sm font-semibold text-white truncate">{offer.service.serviceName}</p>
                    </div>
                    {offer.offerDescription && (
                        <p className="text-xs text-text-muted truncate">{offer.offerDescription}</p>
                    )}
                </div>

                {/* Garage */}
                <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-text-secondary truncate">{offer.garageId.fullName}</p>
                        <p className="text-[11px] text-text-muted truncate">{offer.garageId.address}</p>
                    </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-surface rounded-lg p-2.5 text-center border border-border-subtle">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Original</p>
                        <p className="text-sm font-semibold text-text-secondary line-through">
                            ৳{offer.service.servicePrice.toLocaleString()}
                        </p>
                    </div>
                    <div className="flex-1 bg-accent-green/5 rounded-lg p-2.5 text-center border border-accent-green/20">
                        <p className="text-[10px] text-accent-green uppercase tracking-wider mb-0.5">Offer Price</p>
                        <p className="text-sm font-bold text-accent-green">
                            ৳{offer.offerPrice.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Expiry + View */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-border-subtle">
                    <Calendar className="w-3 h-3 text-text-muted" />
                    <span className="text-[11px] text-text-muted">Expires {formatDate(offer.offerExpiresAt)}</span>
                    <button onClick={() => onView(offer._id)}
                        className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-accent-cyan hover:underline">
                        <Eye className="w-3 h-3" />View
                    </button>
                </div>
            </div>
        </div>
    );
}

function OfferRow({ offer, index, onView }: { offer: Offer; index: number; onView: (id: string) => void }) {
    const img = offer.service.serviceImage?.[0]?.url;
    return (
        <tr className="border-b border-border-subtle hover:bg-surface-hover/30 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${0.04 * index}s` }}>
            <td className="p-4 pl-6">
                <div className="flex items-center gap-3">
                    {img ? (
                        <img src={img} alt={offer.service.serviceName}
                            className="w-9 h-9 rounded-lg object-cover border border-border-subtle shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                        <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                            <Wrench className="w-4 h-4 text-accent-cyan" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{offer.service.serviceName}</p>
                        <p className="text-xs text-text-muted truncate">{offer.offerDescription || '—'}</p>
                    </div>
                </div>
            </td>
            <td className="p-4">
                <p className="text-sm text-text-secondary truncate max-w-[160px]">{offer.garageId.fullName}</p>
                <p className="text-xs text-text-muted truncate max-w-[160px]">{offer.garageId.email}</p>
            </td>
            <td className="p-4 text-center">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-accent-green">
                    <Percent className="w-3.5 h-3.5" />{offer.offerPercent}%
                </span>
            </td>
            <td className="p-4 text-center">
                <p className="text-xs text-text-muted line-through">৳{offer.service.servicePrice.toLocaleString()}</p>
                <p className="text-sm font-bold text-accent-green">৳{offer.offerPrice.toLocaleString()}</p>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Calendar className="w-3 h-3" />{formatDate(offer.offerExpiresAt)}
                </div>
            </td>
            <td className="p-4"><StatusBadge status={offer.status} /></td>
            <td className="p-4 text-xs text-text-muted whitespace-nowrap">{formatDate(offer.createdAt)}</td>
            <td className="p-4 pr-6">
                <button onClick={() => onView(offer._id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent-cyan border border-accent-cyan/20 bg-accent-cyan/5 hover:bg-accent-cyan/10 px-2.5 py-1 rounded-lg transition-colors">
                    <Eye className="w-3.5 h-3.5" />View
                </button>
            </td>
        </tr>
    );
}

const SkeletonCard = () => (
    <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        <div className="h-36 bg-surface-hover animate-pulse" />
        <div className="p-4 space-y-3">
            <div className="flex gap-2 justify-between">
                <div className="w-20 h-6 bg-surface-hover rounded-lg animate-pulse" />
                <div className="w-16 h-5 bg-surface-hover/60 rounded-md animate-pulse" />
            </div>
            <div className="space-y-1.5">
                <div className="w-3/4 h-4 bg-surface-hover rounded animate-pulse" />
                <div className="w-full h-3 bg-surface-hover/60 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
                <div className="flex-1 h-12 bg-surface-hover/40 rounded-lg animate-pulse" />
                <div className="flex-1 h-12 bg-surface-hover/40 rounded-lg animate-pulse" />
            </div>
        </div>
    </div>
);

const SkeletonRow = () => (
    <tr className="border-b border-border-subtle">
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-hover animate-pulse shrink-0" />
                <div className="space-y-1.5">
                    <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                    <div className="w-36 h-2.5 bg-surface-hover/60 rounded animate-pulse" />
                </div>
            </div>
        </td>
        {[1, 2, 3, 4, 5, 6].map(i => (
            <td key={i} className="p-4"><div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" /></td>
        ))}
    </tr>
);

export default function Marketing() {
    const [activeStatus, setActiveStatus] = useState('active');
    const [page, setPage]       = useState(1);
    const [viewMode, setViewMode]             = useState<'grid' | 'table'>('grid');
    const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useOffersQuery({
        page, limit: PAGE_LIMIT, status: activeStatus,
    });

    const offers      = data?.results      ?? [];
    const totalPages  = data?.totalPages   ?? 1;
    const totalItems  = data?.totalResults ?? 0;
    const savings     = offers.reduce((acc, o) => acc + (o.service.servicePrice - o.offerPrice), 0);

    const handleTabChange = (status: string) => {
        setActiveStatus(status);
        setPage(1);
    };

    return (
        <>
        {selectedOfferId && (
            <OfferDetailModal offerId={selectedOfferId} onClose={() => setSelectedOfferId(null)} />
        )}
        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <Tag className="w-6 h-6 text-accent-cyan" />
                    Offers
                </h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                    Garage service offers and discounts across the platform.
                </p>
            </div>

            {/* Status tabs */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {STATUS_TABS.map(tab => (
                        <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeStatus === tab.id ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            {tab.label}
                            {activeStatus === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Total Offers</p>
                    <p className="text-2xl font-bold text-white">
                        {isLoading ? <span className="inline-block w-10 h-7 bg-surface-hover rounded animate-pulse" /> : totalItems}
                    </p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">This Page</p>
                    <p className="text-2xl font-bold text-accent-cyan">
                        {isLoading ? '…' : offers.length}
                    </p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4 col-span-2 sm:col-span-1">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Avg. Savings (Page)</p>
                    <p className="text-2xl font-bold text-accent-green">
                        {isLoading ? '…' : offers.length > 0 ? `৳${Math.round(savings / offers.length).toLocaleString()}` : '—'}
                    </p>
                </div>
            </div>

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load offers.'}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                    {!isLoading && totalItems > 0 && (
                        <span className="text-xs text-text-muted">{totalItems} offers</span>
                    )}
                </div>
                <div className="flex bg-surface border border-border-subtle rounded-lg overflow-hidden">
                    <button onClick={() => setViewMode('grid')}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                        Grid
                    </button>
                    <button onClick={() => setViewMode('table')}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'table' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                        Table
                    </button>
                </div>
            </div>

            {/* Grid */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading
                        ? [1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)
                        : offers.length > 0
                            ? offers.map((o, i) => <OfferCard key={o._id} offer={o} index={i} onView={setSelectedOfferId} />)
                            : (
                                <div className="col-span-full flex flex-col items-center gap-3 py-16 text-text-muted">
                                    <Tag className="w-10 h-10 opacity-30" />
                                    <span className="text-sm">No {activeStatus} offers found.</span>
                                </div>
                            )
                    }
                </div>
            )}

            {/* Table */}
            {viewMode === 'table' && (
                <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface/50">
                                    <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Service</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Discount</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Price</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Expires</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Created</th>
                                    <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading
                                    ? [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                                    : offers.length > 0
                                        ? offers.map((o, i) => <OfferRow key={o._id} offer={o} index={i} onView={setSelectedOfferId} />)
                                        : (
                                            <tr><td colSpan={7} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-3 text-text-muted">
                                                    <Tag className="w-10 h-10 opacity-30" />
                                                    <span className="text-sm">No {activeStatus} offers found.</span>
                                                </div>
                                            </td></tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-text-muted">
                    <span className="text-xs">
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
