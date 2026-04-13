import { LayoutGrid, Download } from 'lucide-react';

const behavioralCohorts = [
    { segment: 'High Frequency ($$)', size: '8.4K', m1: '95', m2: '92', m3: '88', m4: '85', m5: '82', m6: '80' },
    { segment: 'Occasional Routine', size: '24.1K', m1: '75', m2: '45', m3: '65', m4: '40', m5: '60', m6: '35' },
    { segment: 'Emergency Only', size: '12.2K', m1: '30', m2: '15', m3: '12', m4: '10', m5: '8', m6: '5' },
    { segment: 'Discount Chasers', size: '18.5K', m1: '80', m2: '20', m3: '15', m4: '10', m5: '5', m6: '2' },
    { segment: 'New Registrations', size: '5.2K', m1: '100', m2: '-', m3: '-', m4: '-', m5: '-', m6: '-' },
];

export default function CohortAnalysis() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <LayoutGrid className="w-8 h-8 text-blue-500" />
                        Behavioral Cohorts
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Analyze user retention mapped by behavioral segments rather than just acquisition date.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-text-muted transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500/50">
                        <option>By Booking Frequency</option>
                        <option>By Vehicle Make</option>
                        <option>By First Service Type</option>
                    </select>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white text-sm uppercase tracking-wider">Activity Retention Matrix (%)</h2>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-card">
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Behavioral Segment</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">User Count</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 1</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 2</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 3</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 4</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 5</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Month 6</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle/50">
                            {behavioralCohorts.map((c) => (
                                <tr key={c.segment} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-4 font-bold text-white text-sm">{c.segment}</td>
                                    <td className="py-4 px-4 text-sm text-text-muted">{c.size}</td>

                                    {/* Dynamic Heatmap cells */}
                                    {[c.m1, c.m2, c.m3, c.m4, c.m5, c.m6].map((val, idx) => {
                                        if (val === '-') return <td key={idx} className="py-4 px-4 text-center text-text-muted text-sm">-</td>;
                                        const num = parseInt(val);
                                        // Generate opacity based on percentage for Blue scale
                                        const opacity = num > 85 ? 'bg-blue-500/80 text-white' :
                                            num > 60 ? 'bg-blue-500/40 text-white' :
                                                num > 30 ? 'bg-blue-500/20 text-blue-100' :
                                                    num > 10 ? 'bg-blue-500/10 text-blue-200' :
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
