import { Users, TrendingUp, UserPlus, Filter } from 'lucide-react';

export default function UserGrowth() {
    return (
        <div className="space-y-6 animate-fade-in-up flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        User Growth & Acquisition
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        MAU/DAU trends, signup funnels, activation rates, and channel attribution.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary/50">
                        <option>Last 30 Days</option>
                        <option>Year to Date</option>
                        <option>All Time</option>
                    </select>
                    <button className="p-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-text-muted transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-primary">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-medium text-text-muted">Total Users (MAU)</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">142.5K</p>
                    <p className="text-xs text-accent-green mt-1 flex items-center gap-1 font-semibold"><TrendingUp className="w-3 h-3" /> +12% MoM</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-emerald-500">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-medium text-text-muted">New Signups</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">8,420</p>
                    <p className="text-xs text-text-muted mt-1">This month</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-amber-500">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-medium text-text-muted">Activation Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">45.2%</p>
                    <p className="text-xs text-text-muted mt-1">Booked 1st service &lt; 7 days</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-purple-500">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-medium text-text-muted">Top Channel</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">Organic</p>
                    <p className="text-xs text-text-muted mt-1">38% of acquisitions</p>
                </div>
            </div>

            <div className="flex-1 bg-surface border border-border-subtle rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50 z-10 pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-between px-10 border-b border-border-subtle opacity-30 mix-blend-screen px-4 pb-4 gap-1 sm:gap-4">
                    {/* Mock Bar Chart */}
                    {[10, 15, 25, 20, 35, 30, 45, 40, 60, 50, 75, 70, 90, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/40 rounded-t-sm relative group-hover:bg-primary/60 transition-colors duration-500" style={{ height: `${h}%` }}>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-text-secondary whitespace-nowrap">Week {i + 1}</div>
                        </div>
                    ))}
                </div>

                {/* Mock Line Chart Vector */}
                <svg className="absolute inset-0 w-full h-full opacity-50 z-0 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,90 L0,70 Q10,65 20,70 T40,55 T60,40 T80,30 T100,20 L100,100 Z" fill="url(#blueGradient)" opacity="0.1" />
                    <path d="M0,70 Q10,65 20,70 T40,55 T60,40 T80,30 T100,20" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                    <defs>
                        <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="z-20 text-center bg-surface-card/90 backdrop-blur-md border border-border-subtle p-8 rounded-2xl shadow-2xl max-w-sm">
                    <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-white mb-2">Growth Vector Analytics</h2>
                    <p className="text-sm text-text-muted">Full granular cohort tracking, attribution modeling, and demographic slice tools are active.</p>
                </div>
            </div>
        </div>
    );
}
