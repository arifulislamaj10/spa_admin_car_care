import { useState } from 'react';
import {
    Search, Calendar, Clock, CheckCircle2, XCircle, Loader2,
    ChevronLeft, ChevronRight, AlertCircle, X,
    User, Building2, Wrench, CreditCard, MapPin, Receipt,
    CalendarClock, Ban,
} from 'lucide-react';
import { useBookingsQuery } from '../hooks/queries/useBookingsQuery';
import { useBookingDetailQuery } from '../hooks/queries/useBookingDetailQuery';
import { useRescheduleBookingMutation } from '../hooks/queries/useRescheduleBookingMutation';
import { useCancelBookingMutation } from '../hooks/queries/useCancelBookingMutation';
import type { BookingItem } from '../services/bookings.service';

/* ─── Status config ─── */
const STATUS_CONFIG: Record<string, { icon: any; label: string; classes: string; spin?: boolean }> = {
    completed:  { icon: CheckCircle2, label: 'Completed',   classes: 'bg-accent-green/10 text-accent-green border-accent-green/20' },
    inprogress: { icon: Loader2,      label: 'In Progress', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20', spin: true  },
    confirmed:  { icon: Calendar,     label: 'Confirmed',   classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20'       },
    pending:    { icon: Clock,        label: 'Pending',     classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20'          },
    cancelled:  { icon: XCircle,      label: 'Cancelled',   classes: 'bg-red-500/10 text-red-400 border-red-500/20'               },
    noshow:     { icon: XCircle,      label: 'No Show',     classes: 'bg-orange-500/10 text-orange-400 border-orange-500/20'      },
};

const PAYMENT_CONFIG: Record<string, string> = {
    paid:    'text-accent-green',
    unpaid:  'text-red-400',
    pending: 'text-amber-400',
};

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold border ${cfg.classes}`}>
            <Icon className={`w-3 h-3 ${cfg.spin ? 'animate-spin' : ''}`} />
            {cfg.label}
        </span>
    );
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatMoney(n: number) {
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/* ─── Detail Modal ─── */
type AdminAction = 'none' | 'reschedule' | 'cancel';
const ACTIONABLE = ['pending', 'confirmed', 'inprogress'];

function BookingDetailModal({ bookingId, onClose }: { bookingId: string; onClose: () => void }) {
    const { data: booking, isLoading, isError } = useBookingDetailQuery(bookingId);
    const rescheduleMutation = useRescheduleBookingMutation();
    const cancelMutation     = useCancelBookingMutation();

    const [action, setAction]           = useState<AdminAction>('none');
    const [newDate, setNewDate]         = useState('');
    const [newTime, setNewTime]         = useState('');
    const [cancelReason, setCancelReason] = useState('');
    const [refund, setRefund]           = useState(true);
    const [fieldErr, setFieldErr]       = useState('');

    const isBusy = rescheduleMutation.isPending || cancelMutation.isPending;

    const resetAction = () => {
        setAction('none');
        setNewDate(''); setNewTime('');
        setCancelReason(''); setRefund(true);
        setFieldErr('');
        rescheduleMutation.reset();
        cancelMutation.reset();
    };

    const handleReschedule = () => {
        if (!newDate.trim()) { setFieldErr('Date is required.'); return; }
        if (!newTime.trim()) { setFieldErr('Time is required.'); return; }
        rescheduleMutation.mutate(
            { id: bookingId, scheduledDate: newDate, scheduledTime: newTime },
            { onSuccess: () => { resetAction(); } },
        );
    };

    const handleCancel = () => {
        if (!cancelReason.trim()) { setFieldErr('Cancellation reason is required.'); return; }
        cancelMutation.mutate(
            { id: bookingId, cancellationReason: cancelReason.trim(), refund },
            { onSuccess: () => { resetAction(); } },
        );
    };

    const mutationError =
        (rescheduleMutation.isError && ((rescheduleMutation.error as any)?.response?.data?.message || 'Reschedule failed.')) ||
        (cancelMutation.isError     && ((cancelMutation.error     as any)?.response?.data?.message || 'Cancellation failed.')) ||
        null;

    const canAct = booking && ACTIONABLE.includes(booking.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !isBusy) onClose(); }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-lg bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border-subtle">
                    <div>
                        <h2 className="text-base font-bold text-white">Booking Detail</h2>
                        <p className="text-xs text-text-muted font-mono mt-0.5">{bookingId.slice(-12).toUpperCase()}</p>
                    </div>
                    <button onClick={onClose} disabled={isBusy}
                        className="p-1.5 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors disabled:opacity-40">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 max-h-[65vh] overflow-y-auto space-y-4">
                    {isLoading && (
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-surface rounded-xl p-4 border border-border-subtle space-y-2">
                                    <div className="w-24 h-3 bg-surface-hover rounded animate-pulse" />
                                    <div className="w-full h-3.5 bg-surface-hover/70 rounded animate-pulse" />
                                    <div className="w-3/4 h-3 bg-surface-hover/50 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                            <AlertCircle className="w-4 h-4 shrink-0" />Failed to load booking details.
                        </div>
                    )}

                    {booking && (
                        <>
                            {/* Status row */}
                            <div className="flex items-center justify-between">
                                <StatusBadge status={booking.status} />
                                <span className={`text-xs font-semibold capitalize ${PAYMENT_CONFIG[booking.paymentStatus] ?? 'text-text-muted'}`}>
                                    {booking.paymentStatus} · {booking.paymentMethod}
                                </span>
                            </div>

                            {/* ── Admin Actions ── */}
                            {canAct && action === 'none' && (
                                <div className="flex gap-2">
                                    <button onClick={() => setAction('reschedule')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent-cyan/10 border border-accent-cyan/20 hover:bg-accent-cyan/20 text-accent-cyan rounded-xl text-xs font-semibold transition-colors">
                                        <CalendarClock className="w-3.5 h-3.5" />Reschedule
                                    </button>
                                    <button onClick={() => setAction('cancel')}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-colors">
                                        <Ban className="w-3.5 h-3.5" />Cancel Booking
                                    </button>
                                </div>
                            )}

                            {/* Reschedule form */}
                            {action === 'reschedule' && (
                                <div className="bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl p-4 space-y-3">
                                    <p className="text-xs font-semibold text-accent-cyan flex items-center gap-1.5">
                                        <CalendarClock className="w-3.5 h-3.5" />Reschedule Booking
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] text-text-muted block mb-1">New Date</label>
                                            <input type="date" value={newDate} onChange={e => { setNewDate(e.target.value); setFieldErr(''); }}
                                                className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] text-text-muted block mb-1">New Time</label>
                                            <input type="time" value={newTime} onChange={e => { setNewTime(e.target.value); setFieldErr(''); }}
                                                className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                                        </div>
                                    </div>
                                    {fieldErr && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErr}</p>}
                                    {mutationError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{mutationError}</p>}
                                    <div className="flex gap-2">
                                        <button onClick={resetAction} disabled={isBusy}
                                            className="flex-1 py-2 bg-surface border border-border-subtle hover:bg-surface-hover text-text-primary rounded-xl text-xs font-semibold transition-colors disabled:opacity-40">
                                            Back
                                        </button>
                                        <button onClick={handleReschedule} disabled={isBusy}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent-cyan/20 border border-accent-cyan/30 hover:bg-accent-cyan/30 text-accent-cyan rounded-xl text-xs font-bold transition-colors disabled:opacity-40">
                                            {rescheduleMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CalendarClock className="w-3.5 h-3.5" />}
                                            Confirm Reschedule
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Cancel form */}
                            {action === 'cancel' && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-3">
                                    <p className="text-xs font-semibold text-red-400 flex items-center gap-1.5">
                                        <Ban className="w-3.5 h-3.5" />Cancel Booking
                                    </p>
                                    <div>
                                        <label className="text-[11px] text-text-muted block mb-1">Cancellation Reason</label>
                                        <textarea value={cancelReason} onChange={e => { setCancelReason(e.target.value); setFieldErr(''); }}
                                            placeholder="Reason for cancellation..." rows={2}
                                            className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-red-400/40 focus:ring-1 focus:ring-red-400/20 resize-none transition-all" />
                                    </div>
                                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                        <div onClick={() => setRefund(r => !r)}
                                            className={`w-9 h-5 rounded-full transition-colors relative ${refund ? 'bg-accent-green' : 'bg-surface-hover border border-border-subtle'}`}>
                                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${refund ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                        </div>
                                        <span className="text-xs text-text-secondary">Issue refund to customer</span>
                                    </label>
                                    {fieldErr && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErr}</p>}
                                    {mutationError && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{mutationError}</p>}
                                    <div className="flex gap-2">
                                        <button onClick={resetAction} disabled={isBusy}
                                            className="flex-1 py-2 bg-surface border border-border-subtle hover:bg-surface-hover text-text-primary rounded-xl text-xs font-semibold transition-colors disabled:opacity-40">
                                            Back
                                        </button>
                                        <button onClick={handleCancel} disabled={isBusy}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-xl text-xs font-bold transition-colors disabled:opacity-40">
                                            {cancelMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Ban className="w-3.5 h-3.5" />}
                                            Confirm Cancellation
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Customer */}
                            <div className="bg-surface rounded-xl p-4 border border-border-subtle">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />Customer
                                </p>
                                <div className="flex items-center gap-3">
                                    {booking.user.image ? (
                                        <img src={booking.user.image} alt={booking.user.fullName}
                                            className="w-10 h-10 rounded-full object-cover border border-border-subtle shrink-0"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                                            <User className="w-5 h-5 text-accent-cyan" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-white">{booking.user.fullName}</p>
                                        <p className="text-xs text-text-muted">{booking.user.email}</p>
                                        <p className="text-xs text-text-muted">{booking.user.phoneNumber}</p>
                                    </div>
                                </div>
                                {booking.user.address && (
                                    <div className="flex items-start gap-1.5 mt-2 text-xs text-text-muted">
                                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                        <span>{booking.user.address}</span>
                                    </div>
                                )}
                            </div>

                            {/* Garage */}
                            <div className="bg-surface rounded-xl p-4 border border-border-subtle">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5" />Garage
                                </p>
                                <p className="text-sm font-semibold text-white">{booking.garage.fullName}</p>
                                <p className="text-xs text-text-muted">{booking.garage.email}</p>
                                <p className="text-xs text-text-muted">{booking.garage.phoneNumber}</p>
                                {booking.garage.address && (
                                    <div className="flex items-start gap-1.5 mt-1.5 text-xs text-text-muted">
                                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent-cyan/60" />
                                        <span>{booking.garage.address}</span>
                                    </div>
                                )}
                            </div>

                            {/* Service */}
                            <div className="bg-surface rounded-xl p-4 border border-border-subtle">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Wrench className="w-3.5 h-3.5" />Service
                                </p>
                                <div className="flex items-start gap-3">
                                    {booking.service.serviceImage?.[0]?.url && (
                                        <img src={booking.service.serviceImage[0].url} alt={booking.service.serviceName}
                                            className="w-12 h-12 rounded-xl object-cover border border-border-subtle shrink-0"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-white">{booking.service.serviceName}</p>
                                        <p className="text-xs text-text-muted">{booking.service.serviceDetails}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.service.serviceDuration} min</span>
                                            <span className={`text-xs font-medium ${booking.service.isFixedPrice ? 'text-accent-cyan' : 'text-amber-400'}`}>
                                                {booking.service.isFixedPrice ? 'Fixed' : 'Variable'} price
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                                    <p className="text-[11px] text-text-muted mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" />Date</p>
                                    <p className="text-sm font-semibold text-white">{formatDate(booking.scheduledDate)}</p>
                                </div>
                                <div className="bg-surface rounded-xl p-3 border border-border-subtle">
                                    <p className="text-[11px] text-text-muted mb-1 flex items-center gap-1"><Clock className="w-3 h-3" />Time</p>
                                    <p className="text-sm font-semibold text-white">{booking.scheduledTime}</p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-surface rounded-xl p-4 border border-border-subtle">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <Receipt className="w-3.5 h-3.5" />Payment
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-text-muted">
                                        <span>Service price</span>
                                        <span>{formatMoney(booking.servicePrice)}</span>
                                    </div>
                                    {booking.discountAmount > 0 && (
                                        <div className="flex justify-between text-accent-green">
                                            <span>Discount</span>
                                            <span>-{formatMoney(booking.discountAmount)}</span>
                                        </div>
                                    )}
                                    {booking.taxAmount > 0 && (
                                        <div className="flex justify-between text-text-muted">
                                            <span>Tax</span>
                                            <span>{formatMoney(booking.taxAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-white border-t border-border-subtle pt-2 mt-1">
                                        <span>Total</span>
                                        <span>{formatMoney(booking.totalAmount)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle">
                                    <CreditCard className="w-4 h-4 text-text-muted" />
                                    <span className="text-xs text-text-muted capitalize">{booking.paymentMethod}</span>
                                    <span className={`text-xs font-semibold capitalize ml-auto ${PAYMENT_CONFIG[booking.paymentStatus] ?? ''}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Cancellation reason */}
                            {booking.cancellationReason && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                                    <p className="text-[11px] text-red-400 uppercase tracking-wider mb-1">Cancellation Reason</p>
                                    <p className="text-sm text-text-secondary">{booking.cancellationReason}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Mobile Booking Card ─── */
function BookingCard({ booking, index, onView }: { booking: BookingItem; index: number; onView: () => void }) {
    return (
        <div className="bg-surface rounded-xl p-4 border border-border-subtle animate-fade-in-up"
            style={{ animationDelay: `${0.05 * index}s` }}>
            <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-accent-cyan font-medium">{booking._id.slice(-10).toUpperCase()}</p>
                    <p className="text-sm text-white font-medium mt-0.5 truncate">{booking.service.serviceName}</p>
                </div>
                <span className="text-sm font-bold text-white shrink-0 ml-3">{formatMoney(booking.totalAmount)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs text-text-muted">
                <span>{booking.user.fullName}</span>
                <span>•</span>
                <span>{booking.garage.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
                <StatusBadge status={booking.status} />
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-muted">{formatDate(booking.scheduledDate)} · {booking.scheduledTime}</span>
                    <button onClick={onView}
                        className="px-2.5 py-1 text-[11px] font-medium text-accent-cyan border border-accent-cyan/20 rounded-lg hover:bg-accent-cyan/10 transition-all">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Skeleton Row ─── */
const SkeletonRow = () => (
    <tr className="border-b border-border-subtle">
        <td className="p-4 pl-6">
            <div className="w-24 h-3 bg-surface-hover rounded animate-pulse mb-1.5" />
            <div className="w-36 h-3.5 bg-surface-hover/70 rounded animate-pulse" />
        </td>
        {[1, 2, 3, 4].map(i => (
            <td key={i} className="p-4">
                <div className="w-28 h-3.5 bg-surface-hover/60 rounded animate-pulse" />
            </td>
        ))}
        <td className="p-4 pr-6"><div className="w-14 h-7 bg-surface-hover/40 rounded-lg animate-pulse ml-auto" /></td>
    </tr>
);

/* ═══════════════════════════════════════════ */

const PAGE_LIMIT = 15;
const FILTERS = ['ALL', 'pending', 'confirmed', 'inprogress', 'completed', 'cancelled', 'noshow'] as const;

export default function Bookings() {
    const [filter, setFilter]       = useState<string>('ALL');
    const [page, setPage]           = useState(1);
    const [search, setSearch]       = useState('');
    const [debSearch, setDebSearch] = useState('');
    const [viewId, setViewId]       = useState<string | null>(null);

    const handleSearch = (val: string) => {
        setSearch(val);
        clearTimeout((handleSearch as any)._t);
        (handleSearch as any)._t = setTimeout(() => { setDebSearch(val); setPage(1); }, 400);
    };

    const handleFilter = (f: string) => { setFilter(f); setPage(1); };

    const { data, isLoading, isError, error } = useBookingsQuery({
        page,
        limit: PAGE_LIMIT,
        status: filter === 'ALL' ? undefined : filter,
        search: debSearch || undefined,
    });

    const bookings   = data?.results   ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;

    return (
        <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
            {/* Detail Modal */}
            {viewId && <BookingDetailModal bookingId={viewId} onClose={() => setViewId(null)} />}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Booking Pipeline</h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">Monitor and override global service appointments.</p>
                </div>
                {totalItems > 0 && !isLoading && (
                    <span className="text-xs text-text-muted">{totalItems} total bookings</span>
                )}
            </div>

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load bookings.'}
                </div>
            )}

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle flex-1 flex flex-col overflow-hidden animate-fade-in-up">
                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-border-subtle flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                        <div className="relative w-full sm:w-80">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                                placeholder="Search customer or service..."
                                className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                        </div>
                        {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin self-center" />}
                    </div>

                    {/* Status filters */}
                    <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1">
                        {FILTERS.map(f => (
                            <button key={f} onClick={() => handleFilter(f)}
                                className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${filter === f
                                    ? 'bg-accent-cyan text-surface shadow-sm shadow-accent-cyan/20'
                                    : 'bg-surface border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-cyan/30'}`}>
                                {f === 'ALL' ? 'All' : STATUS_CONFIG[f]?.label ?? f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden flex-1 overflow-y-auto p-3 space-y-3">
                    {isLoading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-surface rounded-xl p-4 border border-border-subtle space-y-2">
                                <div className="w-24 h-3 bg-surface-hover rounded animate-pulse" />
                                <div className="w-40 h-3.5 bg-surface-hover/70 rounded animate-pulse" />
                                <div className="w-32 h-3 bg-surface-hover/50 rounded animate-pulse" />
                            </div>
                        ))
                    ) : bookings.length > 0 ? (
                        bookings.map((b, i) => (
                            <BookingCard key={b._id} booking={b} index={i} onView={() => setViewId(b._id)} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center gap-3 py-12 text-text-muted">
                            <Calendar className="w-10 h-10 opacity-30" />
                            <span className="text-sm">No bookings found.</span>
                        </div>
                    )}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Booking</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Customer & Garage</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Schedule</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Payment</th>
                                <th className="p-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                                <th className="p-4 pr-6 text-right text-xs font-semibold text-text-muted uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                            ) : bookings.length > 0 ? (
                                bookings.map((b, i) => (
                                    <tr key={b._id} className="hover:bg-surface-hover/30 transition-colors group animate-fade-in-up"
                                        style={{ animationDelay: `${0.04 * i}s` }}>
                                        <td className="p-4 pl-6">
                                            <p className="font-mono text-xs text-accent-cyan font-medium">{b._id.slice(-10).toUpperCase()}</p>
                                            <p className="text-sm text-white mt-0.5">{b.service.serviceName}</p>
                                            <p className="text-[10px] text-text-muted mt-0.5 capitalize">{b.bookingType}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                {b.user.image && (
                                                    <img src={b.user.image} alt={b.user.fullName}
                                                        className="w-6 h-6 rounded-full object-cover border border-border-subtle shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                )}
                                                <span className="text-sm font-medium text-white">{b.user.fullName}</span>
                                            </div>
                                            <p className="text-xs text-text-muted">@ {b.garage.fullName}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-text-primary">{formatDate(b.scheduledDate)}</p>
                                            <p className="text-xs text-text-muted mt-0.5">{b.scheduledTime}</p>
                                        </td>
                                        <td className="p-4"><StatusBadge status={b.status} /></td>
                                        <td className="p-4">
                                            <p className={`text-xs font-semibold capitalize ${PAYMENT_CONFIG[b.paymentStatus] ?? 'text-text-muted'}`}>
                                                {b.paymentStatus}
                                            </p>
                                            <p className="text-[10px] text-text-muted capitalize mt-0.5">{b.paymentMethod}</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <p className="text-sm font-semibold text-white">{formatMoney(b.totalAmount)}</p>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button onClick={() => setViewId(b._id)}
                                                className="px-3 py-1.5 text-xs font-medium text-accent-cyan border border-accent-cyan/20 rounded-lg hover:bg-accent-cyan/10 transition-all opacity-0 group-hover:opacity-100">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 text-text-muted">
                                            <Calendar className="w-10 h-10 opacity-30" />
                                            <span className="text-sm">No bookings found.</span>
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
        </div>
    );
}
