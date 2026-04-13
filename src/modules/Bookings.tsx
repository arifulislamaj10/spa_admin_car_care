import {
    Search,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2
} from 'lucide-react';
import { useState } from 'react';

const mockBookings = [
    { id: 'BK-24X7-9012', customer: 'John Doe', garage: 'AutoFix Downtown', service: 'Full Synthetic Oil Change', date: 'Oct 24, 2026', time: '09:00 AM', status: 'COMPLETED', amount: '$89.99' },
    { id: 'BK-24X7-9013', customer: 'Sarah Smith', garage: 'Elite Mechanics', service: 'Brake Pad Replacement', date: 'Oct 24, 2026', time: '11:30 AM', status: 'IN_PROGRESS', amount: '$240.00' },
    { id: 'BK-24X7-9014', customer: 'Mike T', garage: 'Tire Hub East', service: 'Winter Tire Swap', date: 'Oct 25, 2026', time: '02:00 PM', status: 'CONFIRMED', amount: '$120.50' },
    { id: 'BK-24X7-9015', customer: 'Emily R', garage: 'AutoFix Downtown', service: 'AC Diagnostics', date: 'Oct 25, 2026', time: '04:15 PM', status: 'PENDING', amount: '$45.00' },
    { id: 'BK-24X7-9016', customer: 'David L', garage: 'Speedy Lube', service: 'Transmission Flush', date: 'Oct 23, 2026', time: '10:00 AM', status: 'CANCELLED', amount: '$189.99' },
];

const statusConfig: Record<string, { icon: any; label: string; classes: string }> = {
    COMPLETED: { icon: CheckCircle2, label: 'Completed', classes: 'bg-accent-green/10 text-accent-green border-accent-green/20' },
    IN_PROGRESS: { icon: Loader2, label: 'In Progress', classes: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20' },
    CONFIRMED: { icon: Calendar, label: 'Confirmed', classes: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20' },
    PENDING: { icon: Clock, label: 'Pending', classes: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20' },
    CANCELLED: { icon: XCircle, label: 'Cancelled', classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

const StatusBadge = ({ status }: { status: string }) => {
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] sm:text-xs font-semibold border ${config.classes}`}>
            <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${status === 'IN_PROGRESS' ? 'animate-spin' : ''}`} />
            {config.label}
        </span>
    );
};

/* ─── Mobile Booking Card ─── */
const BookingCard = ({ booking, index }: { booking: typeof mockBookings[0]; index: number }) => (
    <div
        className="bg-surface rounded-xl p-4 border border-border-subtle animate-fade-in-up"
        style={{ animationDelay: `${0.05 * index}s` }}
    >
        <div className="flex items-start justify-between mb-3">
            <div>
                <p className="font-mono text-xs text-accent-cyan font-medium">{booking.id}</p>
                <p className="text-sm text-white font-medium mt-1">{booking.service}</p>
            </div>
            <span className="text-sm font-bold text-white">{booking.amount}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-text-muted">
            <span>{booking.customer}</span>
            <span>•</span>
            <span>{booking.garage}</span>
        </div>
        <div className="flex items-center justify-between">
            <StatusBadge status={booking.status} />
            <span className="text-[11px] text-text-muted">{booking.date} · {booking.time}</span>
        </div>
    </div>
);

export default function Bookings() {
    const [filter, setFilter] = useState('ALL');

    const filteredBookings = filter === 'ALL'
        ? mockBookings
        : mockBookings.filter((b) => b.status === filter);

    return (
        <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Booking Pipeline</h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">Monitor and override global service appointments.</p>
                </div>
                <button className="px-3 sm:px-4 py-2 bg-brand text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-brand-dark transition-all shadow-sm shadow-brand/20">
                    Manual Override
                </button>
            </div>

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle flex-1 flex flex-col overflow-hidden animate-fade-in-up delay-2">
                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-border-subtle flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search booking ID or customer..."
                            className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                        />
                    </div>

                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
                        {['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${filter === f
                                    ? 'bg-accent-cyan text-surface shadow-sm shadow-accent-cyan/20'
                                    : 'bg-surface border border-border-subtle text-text-muted hover:text-text-primary hover:border-accent-cyan/30'
                                    }`}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden flex-1 overflow-y-auto p-3 space-y-3">
                    {filteredBookings.map((booking, i) => (
                        <BookingCard key={booking.id} booking={booking} index={i} />
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="dark-table w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 pl-6">Booking Details</th>
                                <th className="p-4">Customer & Garage</th>
                                <th className="p-4">Schedule</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Value</th>
                                <th className="p-4 pr-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking, i) => (
                                <tr key={booking.id} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * i}s` }}>
                                    <td className="p-4 pl-6">
                                        <div className="font-mono text-sm text-accent-cyan font-medium">{booking.id}</div>
                                        <div className="text-sm text-white mt-1">{booking.service}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-white">{booking.customer}</div>
                                        <div className="text-xs text-text-muted mt-0.5">@ {booking.garage}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-text-primary">{booking.date}</div>
                                        <div className="text-xs text-text-muted mt-0.5">{booking.time}</div>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="text-sm font-semibold text-white">{booking.amount}</div>
                                        <div className="text-[10px] text-text-muted uppercase mt-0.5">Auth Held</div>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="px-3 py-1.5 text-xs font-medium text-accent-cyan border border-accent-cyan/20 rounded-lg hover:bg-accent-cyan/10 transition-all">
                                            View
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
