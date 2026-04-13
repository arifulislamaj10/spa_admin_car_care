import { RefreshCw, Filter, AlertTriangle } from 'lucide-react';

const cohorts = [
    { month: 'Oct 2025', size: '2,400', m1: '85%', m2: '72%', m3: '65%', m4: '58%', m5: '52%', m6: '45%' },
    { month: 'Nov 2025', size: '3,100', m1: '88%', m2: '74%', m3: '68%', m4: '61%', m5: '55%', m6: '-' },
    { month: 'Dec 2025', size: '4,500', m1: '82%', m2: '70%', m3: '62%', m4: '55%', m5: '-', m6: '-' },
    { month: 'Jan 2026', size: '5,200', m1: '86%', m2: '75%', m3: '69%', m4: '-', m5: '-', m6: '-' },
    { month: 'Feb 2026', size: '8,420', m1: '89%', m2: '78%', m3: '-', m4: '-', m5: '-', m6: '-' },
];

export default function RetentionRate() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-emerald-500" />
                        User Retention & Churn
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        D1/D7/D30 retention curves, cohort analysis, and predictive churn modeling.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/20 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                        Run Re-engagement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">D1 Retention</h3>
                    <p className="text-3xl font-bold text-white mt-1">42.8%</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">+2.1% YoY</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">D30 Retention</h3>
                    <p className="text-3xl font-bold text-white mt-1">18.4%</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">+0.8% YoY</p>
                </div>
                <div className="bg-surface-card border border-red-500/20 rounded-xl p-5 border-l-4 border-l-red-500">
                    <h3 className="text-text-muted text-sm font-medium">Platform Churn</h3>
                    <p className="text-3xl font-bold text-white mt-1">4.2%</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Monthly Avg</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Predicted At-Risk</h3>
                    <p className="text-3xl font-bold text-white mt-1">1,240</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> High probability</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white">Cohort Retention Curve (Months)</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Cohort
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-card">
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Cohort</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Size</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 1</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 2</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 3</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 4</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 5</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 6</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle/50">
                            {cohorts.map((c) => (
                                <tr key={c.month} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-4 font-medium text-white text-sm">{c.month}</td>
                                    <td className="py-4 px-4 text-sm text-text-muted">{c.size}</td>

                                    {/* Dynamic Heatmap cells */}
                                    {[c.m1, c.m2, c.m3, c.m4, c.m5, c.m6].map((val, idx) => {
                                        if (val === '-') return <td key={idx} className="py-4 px-4 text-center text-text-muted text-sm">-</td>;
                                        const num = parseInt(val);
                                        // Generate opacity based on percentage
                                        const opacity = num > 80 ? 'bg-emerald-500/60 text-white' :
                                            num > 70 ? 'bg-emerald-500/40 text-white' :
                                                num > 60 ? 'bg-emerald-500/20 text-emerald-100' :
                                                    num > 50 ? 'bg-emerald-500/10 text-emerald-200' :
                                                        'bg-surface-hover text-text-muted';
                                        return (
                                            <td key={idx} className="p-1">
                                                <div className={`w-full py-2 flex items-center justify-center rounded-sm font-mono text-xs font-semibold ${opacity}`}>
                                                    {val}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
