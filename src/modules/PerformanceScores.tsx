import { Trophy, TrendingUp, TrendingDown, Users, Clock, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

const leaderBoard = [
    { rank: 1, garage: 'AutoPro Eastside', manager: 'M. Jackson', score: 98, csat: 4.9, responseTime: '12m', completionRate: '99%', trend: 2 },
    { rank: 2, garage: 'CarCare24x7 North York', manager: 'M. Chen', score: 96, csat: 4.9, responseTime: '15m', completionRate: '98%', trend: 1 },
    { rank: 3, garage: 'CarCare24x7 Downtown', manager: 'S. Jenkins', score: 94, csat: 4.8, responseTime: '22m', completionRate: '95%', trend: -1 },
];

const bottomPerformers = [
    { rank: 82, garage: 'Speedy Auto Waterloo', manager: 'R. Plant', score: 62, csat: 3.4, responseTime: '3h 15m', completionRate: '72%', trend: -5 },
    { rank: 83, garage: 'QuickFix Motors', manager: 'S. Connor', score: 58, csat: 3.2, responseTime: '4h 45m', completionRate: '68%', trend: -3 },
    { rank: 84, garage: 'Metro Auto Masters', manager: 'J. Peterson', score: 45, csat: 2.8, responseTime: '8h 30m', completionRate: '54%', trend: -12 },
];

export default function PerformanceScores() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-amber-400" />
                        Performance Scores
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Composite scoring based on customer satisfaction (CSAT), response times, and completion rates.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-accent-cyan/50">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>
            </div>

            {/* Primary KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-text-muted" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Avg Network Score</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">84.2</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-accent-green" /> +1.4 vs last month
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Network CSAT</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">4.6<span className="text-lg text-text-muted">/5</span></p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-text-muted" /> Stable
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Avg Response Time</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">42m</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-accent-green" /> -5m vs last month
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-green/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-accent-green" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Network Completion</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">91%</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-accent-green" /> +2% vs last month
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Top Performers */}
                <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col h-[400px]">
                    <div className="px-5 py-4 border-b border-border-subtle bg-surface-card/50 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Performers</h3>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface-hover/20">
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Rank</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Garage Area</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Score</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">CSAT</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Resp Time</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {leaderBoard.map((g) => (
                                    <tr key={g.rank} className="hover:bg-surface-hover/30 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${g.rank === 1 ? 'bg-amber-400 text-[#0d1117]' : g.rank === 2 ? 'bg-slate-300 text-[#0d1117]' : 'bg-amber-600 text-white'}`}>
                                                {g.rank}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="text-[13px] font-bold text-white">{g.garage}</p>
                                            <p className="text-[11px] text-text-muted truncate w-24">{g.manager}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-[13px] font-bold text-accent-green">{g.score}</span>
                                        </td>
                                        <td className="py-3 px-4 text-[12px] text-text-secondary">{g.csat}</td>
                                        <td className="py-3 px-4 text-[12px] text-text-secondary">{g.responseTime}</td>
                                        <td className="py-3 px-4">
                                            {g.trend > 0 ? (
                                                <div className="flex items-center gap-1 text-accent-green text-[12px] font-medium"><TrendingUp className="w-3.5 h-3.5" /> +{g.trend}</div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-red-500 text-[12px] font-medium"><TrendingDown className="w-3.5 h-3.5" /> {g.trend}</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Performers */}
                <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col h-[400px]">
                    <div className="px-5 py-4 border-b border-border-subtle bg-surface-card/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Focus Areas (Bottom 10%)</h3>
                        </div>
                        <button className="text-[11px] font-semibold text-text-muted hover:text-white transition-colors bg-surface hover:bg-surface-hover px-2.5 py-1 rounded border border-border-subtle">
                            Require Audit
                        </button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface-hover/20">
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Rank</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Garage Area</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Score</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">CSAT</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Resp Time</th>
                                    <th className="py-3 px-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {bottomPerformers.map((g) => (
                                    <tr key={g.rank} className="hover:bg-surface-hover/30 transition-colors">
                                        <td className="py-3 px-4 text-[12px] font-bold text-text-muted">
                                            #{g.rank}
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="text-[13px] font-bold text-white">{g.garage}</p>
                                            <p className="text-[11px] text-text-muted truncate w-24">{g.manager}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-[13px] font-bold text-red-500">{g.score}</span>
                                        </td>
                                        <td className="py-3 px-4 text-[12px] text-text-secondary">{g.csat}</td>
                                        <td className="py-3 px-4 text-[12px] text-amber-500 font-medium">{g.responseTime}</td>
                                        <td className="py-3 px-4">
                                            {g.trend > 0 ? (
                                                <div className="flex items-center gap-1 text-accent-green text-[12px] font-medium"><TrendingUp className="w-3.5 h-3.5" /> +{g.trend}</div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-red-500 text-[12px] font-medium"><TrendingDown className="w-3.5 h-3.5" /> {g.trend}</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
