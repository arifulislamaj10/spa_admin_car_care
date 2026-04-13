import { TrendingUp, Filter, Activity, PieChart } from 'lucide-react';

const categories = [
    { name: 'Oil Changes', share: '32%', trend: '+4%', avgPrice: '$85.00', margin: 'Mid' },
    { name: 'Tire Services', share: '24%', trend: '+15%', avgPrice: '$120.00', margin: 'Low' },
    { name: 'Diagnostics', share: '18%', trend: '-2%', avgPrice: '$150.00', margin: 'High' },
    { name: 'Brake Repairs', share: '14%', trend: '+1%', avgPrice: '$350.00', margin: 'High' },
    { name: 'Detailing', share: '12%', trend: '+8%', avgPrice: '$180.00', margin: 'High' },
];

export default function ServiceTrendAnalysis() {
    return (
        <div className="space-y-6 animate-fade-in-up flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-fuchsia-400" />
                        Service Trend Analysis
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Trending service categories, seasonal volume patterns, and pricing elasticity.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-fuchsia-400/50">
                        <option>Seasonal (Winter)</option>
                        <option>Seasonal (Summer)</option>
                        <option>Year-over-Year</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-fuchsia-500">
                    <h3 className="text-text-muted text-sm font-medium">Top Category</h3>
                    <p className="text-xl font-bold text-white mt-1 pt-1">Oil Changes</p>
                    <p className="text-xs text-text-muted mt-1">32% of total bookings</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-accent-cyan">
                    <h3 className="text-text-muted text-sm font-medium">Highest Growth</h3>
                    <p className="text-xl font-bold text-white mt-1 pt-1">Tire Services</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">+15% seasonal spike</p>
                </div>
                <div className="bg-surface-card border border-amber-500/20 rounded-xl p-5 border-l-4 border-l-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Margin Opportunity</h3>
                    <p className="text-xl font-bold text-white mt-1 pt-1">Diagnostics</p>
                    <p className="text-xs text-amber-500 mt-1">High margin, volume stable</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Platform AOV</h3>
                    <p className="text-2xl font-bold text-white mt-1 pt-0.5">$185.40</p>
                    <p className="text-xs text-text-muted mt-1">Average Order Value</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[400px]">
                {/* Mock Chart Area */}
                <div className="flex-[2] bg-surface border border-border-subtle rounded-xl relative overflow-hidden flex flex-col isolate">
                    <div className="absolute inset-0 z-0 opacity-10 blur-3xl bg-gradient-to-tr from-fuchsia-500 to-transparent"></div>

                    <div className="p-4 border-b border-border-subtle bg-surface-card/50 flex justify-between items-center z-10">
                        <span className="text-sm font-bold text-white flex items-center gap-2"><Activity className="w-4 h-4 text-fuchsia-400" /> Seasonality Curves</span>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-surface-hover rounded text-text-muted"><Filter className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div className="flex-1 relative z-10 flex flex-col justify-end p-8 gap-2 pb-12">
                        {/* Mock Multi-line Chart area */}
                        <div className="relative h-48 w-full border-b border-l border-border-subtle/50 mb-4">
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                {/* Series 1 */}
                                <path d="M0,150 Q20%,120 40%,140 T80%,100 T100%,80" fill="none" stroke="#e879f9" strokeWidth="3" strokeLinecap="round" />
                                {/* Series 2 */}
                                <path d="M0,100 Q20%,140 40%,80 T80%,60 T100%,40" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,4" />
                                {/* Series 3 */}
                                <path d="M0,50 Q20%,70 40%,100 T80%,120 T100%,150" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </div>

                        <div className="flex justify-center gap-6 mt-2 text-xs font-semibold text-text-muted">
                            <span className="flex items-center gap-2"><span className="w-3 h-1 rounded-full bg-fuchsia-400"></span> Oil Changes</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-1 rounded-full bg-accent-cyan border-b-2 border-dashed border-surface"></span> Tires</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-1 rounded-full bg-amber-500 opacity-60"></span> A/C Systems</span>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="flex-1 bg-surface border border-border-subtle rounded-xl flex flex-col">
                    <div className="p-4 border-b border-border-subtle bg-surface-card flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center gap-2"><PieChart className="w-4 h-4 text-text-muted" /> Category Split</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
                        <div className="space-y-4">
                            {categories.map((c, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-sm font-bold text-white">{c.name}</span>
                                        <div className="text-right">
                                            <span className="text-xs font-medium text-white">{c.share}</span>
                                            <span className={`text-[10px] ml-2 ${c.trend.startsWith('+') ? 'text-accent-green' : 'text-red-400'}`}>{c.trend}</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-surface-hover rounded-full h-1.5 mb-2 overflow-hidden">
                                        <div className="bg-fuchsia-500 h-1.5 rounded-full" style={{ width: c.share }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-text-muted font-medium uppercase tracking-wider">
                                        <span>Avg: {c.avgPrice}</span>
                                        <span>Margin: <span className={c.margin === 'High' ? 'text-emerald-400' : c.margin === 'Mid' ? 'text-amber-400' : 'text-rose-400'}>{c.margin}</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
