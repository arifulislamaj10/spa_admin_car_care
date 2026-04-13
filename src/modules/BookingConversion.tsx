import { GitFork } from 'lucide-react';

const funnelSteps = [
    { step: '1. App Opens / Web Visits', count: '142,500', dropoff: '-', percent: '100%', color: 'border-l-blue-500' },
    { step: '2. Search Initiated', count: '98,000', dropoff: '31.2%', percent: '68.7%', color: 'border-l-indigo-500' },
    { step: '3. Garage View', count: '64,200', dropoff: '34.4%', percent: '45.0%', color: 'border-l-purple-500' },
    { step: '4. Initiated Booking', count: '31,500', dropoff: '50.9%', percent: '22.1%', color: 'border-l-rose-500' },
    { step: '5. Booking Completed', count: '24,800', dropoff: '21.2%', percent: '17.4%', color: 'border-l-emerald-500' },
];

export default function BookingConversion() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <GitFork className="w-8 h-8 text-rose-400" />
                        Conversion Funnel
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Macro-level booking funnel. Track drop-off points from search to payment completion.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-rose-400/50">
                        <option>All Services</option>
                        <option>Tires</option>
                        <option>Oil Change</option>
                        <option>Diagnostics</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Top-of-Funnel</h3>
                    <p className="text-3xl font-bold text-white mt-1">142.5K</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">Completed Bookings</h3>
                    <p className="text-3xl font-bold text-white mt-1">24.8K</p>
                </div>
                <div className="bg-surface-card border border-rose-500/20 rounded-xl p-5 border-t-4 border-t-rose-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
                    <h3 className="text-text-muted text-sm font-medium">Est. Abandonment Value</h3>
                    <p className="text-3xl font-bold text-white mt-1">$450K</p>
                    <p className="text-xs text-rose-400 mt-1">At checkout stage</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Total Conversion</h3>
                    <p className="text-3xl font-bold text-white mt-1">17.4%</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    {funnelSteps.map((s, index) => (
                        <div key={s.step} className="relative mb-6 last:mb-0">
                            {/* Visual Connector */}
                            {index !== funnelSteps.length - 1 && (
                                <div className="absolute left-6 top-12 bottom-[-24px] w-px border-l-2 border-dashed border-border-subtle z-0" />
                            )}

                            <div className={`bg-surface-card border border-border-subtle rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-l-4 ${s.color} hover:bg-surface-hover/30 transition-colors`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-bold text-white shadow-lg mx-auto sm:mx-0 shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{s.step}</h3>
                                        {index > 0 && <p className="text-xs text-text-muted mt-0.5"><span className="text-rose-400 font-semibold">{s.dropoff} drop-off</span> from previous step</p>}
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-border-subtle sm:border-0 gap-4 sm:gap-1">
                                    <div className="text-brand-primary text-2xl font-bold font-mono tracking-tight">{s.count}</div>
                                    <div className="bg-surface-hover px-2 py-0.5 rounded text-xs text-text-muted font-semibold border border-border-subtle">{s.percent} of Total</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
