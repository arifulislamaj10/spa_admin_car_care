import { BarChart3, TrendingUp, TrendingDown, MousePointerClick, Eye, Filter } from 'lucide-react';

export default function CPMAnalytics() {
    return (
        <div className="space-y-6 animate-fade-in-up flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-purple-400" />
                        CPM Analytics
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Cost-per-mille metrics, impression tracking, CTR analysis, and global campaign ROI.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400/50">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Year to Date</option>
                    </select>
                    <button className="p-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-text-muted transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Eye className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Total Impressions</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">12.4M</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1 text-accent-green"><TrendingUp className="w-3 h-3" /> 14% vs prev</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <MousePointerClick className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Avg CTR</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">3.8%</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1 text-accent-green"><TrendingUp className="w-3 h-3" /> 0.4% vs prev</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">eCPM</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">$4.25</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1 text-red-400"><TrendingDown className="w-3 h-3" /> $0.12 vs prev</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-text-muted" />
                        </div>
                        <h3 className="text-sm font-medium text-text-muted">Avg ROAS</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">3.2x</p>
                    <p className="text-xs text-text-muted mt-1 text-text-secondary">Return on Ad Spend</p>
                </div>
            </div>

            <div className="flex-1 bg-surface border border-border-subtle rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50 z-10 pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-between px-10 border-b border-border-subtle opacity-40 mix-blend-screen px-4 pb-4 gap-2">
                    {/* Mock Bar Chart */}
                    {[40, 65, 45, 80, 55, 90, 75, 100, 85, 60, 45, 70, 95, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-purple-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                </div>

                {/* Mock Line Chart Vector */}
                <svg className="absolute inset-0 w-full h-full opacity-60 z-0 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,100 L0,70 Q10,60 20,80 T40,50 T60,60 T80,30 T100,40 L100,100 Z" fill="url(#purpleGradient)" opacity="0.2" />
                    <path d="M0,70 Q10,60 20,80 T40,50 T60,60 T80,30 T100,40" fill="none" stroke="#a855f7" strokeWidth="0.5" />
                    <defs>
                        <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="z-20 text-center bg-surface-card/90 backdrop-blur-md border border-border-subtle p-6 rounded-2xl shadow-2xl">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <h2 className="text-lg font-bold text-white mb-2">Interactive Reporting Engine</h2>
                    <p className="text-sm text-text-muted max-w-sm">Full CPM graphing, cohort breakdown, and demographic analysis tools are active.</p>
                </div>
            </div>
        </div>
    );
}
