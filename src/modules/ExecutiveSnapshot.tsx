import { TrendingUp, Users, DollarSign, ChevronUp, ChevronDown, BarChart3, LineChart, Target, Zap } from 'lucide-react';

const metrics = [
    {
        title: 'Gross Merchandise Value (GMV)',
        value: '$4.2M',
        change: '+12.4%',
        trend: 'up',
        timeframe: 'vs last month',
        icon: DollarSign,
        color: 'text-accent-cyan',
        bg: 'bg-accent-cyan/10',
    },
    {
        title: 'Monthly Active Users (MAU)',
        value: '142.5K',
        change: '+8.2%',
        trend: 'up',
        timeframe: 'vs last month',
        icon: Users,
        color: 'text-accent-green',
        bg: 'bg-accent-green/10',
    },
    {
        title: 'Net Promoter Score (NPS)',
        value: '74',
        change: '+2',
        trend: 'up',
        timeframe: 'vs last quarter',
        icon: Target,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
    },
    {
        title: 'Monthly Recurring Rev (MRR)',
        value: '$845K',
        change: '+15.1%',
        trend: 'up',
        timeframe: 'vs last month',
        icon: TrendingUp,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
    },
];

export default function ExecutiveSnapshot() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-accent-cyan" />
                        Executive Snapshot
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Board-ready summary: GMV, MAU, NPS, churn rate, and MRR at a glance.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-surface-card border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-accent-cyan/50">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                        <option>Last 12 Months</option>
                    </select>
                    <button className="px-4 py-2 bg-accent-cyan text-[#0d1117] hover:bg-accent-cyan/90 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(0,212,170,0.3)]">
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Primary KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.title} className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg}`}>
                                    <Icon className={`w-6 h-6 ${metric.color}`} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-md ${metric.trend === 'up' ? 'text-accent-green bg-accent-green/10' : 'text-accent-red bg-accent-red/10'}`}>
                                    {metric.trend === 'up' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    {metric.change}
                                </div>
                            </div>
                            <h3 className="text-text-muted text-sm font-medium">{metric.title}</h3>
                            <p className="text-3xl font-bold text-white mt-1 group-hover:text-accent-cyan transition-colors">{metric.value}</p>
                            <p className="text-xs text-text-muted mt-2 tracking-wide uppercase">{metric.timeframe}</p>
                        </div>
                    );
                })}
            </div>

            {/* Secondary Metrics & Charts (Mocked visual areas) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-surface-card border border-border-subtle rounded-xl p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <LineChart className="w-5 h-5 text-accent-cyan" />
                            Revenue vs Projections
                        </h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-2 text-xs text-text-muted font-medium"><span className="w-2 h-2 rounded-full bg-accent-cyan block" /> Actual</span>
                            <span className="flex items-center gap-2 text-xs text-text-muted font-medium"><span className="w-2 h-2 rounded-full border-2 border-text-muted border-dashed block" /> Projected</span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[250px] relative border-b border-l border-border-subtle/50 flex items-end">
                        {/* Mock Chart Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                            <div className="w-full border-t border-text-muted border-dashed" />
                            <div className="w-full border-t border-text-muted border-dashed" />
                            <div className="w-full border-t border-text-muted border-dashed" />
                            <div className="w-full border-t border-text-muted border-dashed" />
                        </div>

                        {/* Mock Chart Fill */}
                        <div className="w-full h-[60%] bg-gradient-to-t from-accent-cyan/20 to-transparent relative border-t-2 border-accent-cyan flex items-end justify-between px-4 pb-2">
                            <span className="text-[10px] text-text-muted absolute -bottom-6 left-[10%]">Q1</span>
                            <span className="text-[10px] text-text-muted absolute -bottom-6 left-[35%]">Q2</span>
                            <span className="text-[10px] text-text-muted absolute -bottom-6 left-[60%]">Q3</span>
                            <span className="text-[10px] text-text-muted absolute -bottom-6 left-[85%]">Q4</span>
                        </div>
                    </div>
                </div>

                {/* Breakdown Panel */}
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 flex flex-col">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                        <Zap className="w-5 h-5 text-accent-cyan" />
                        Growth Drivers
                    </h3>
                    <div className="flex-1 flex flex-col justify-around">

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-white">B2B Enterprise</span>
                                <span className="text-accent-green font-semibold">+24%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden">
                                <div className="h-full bg-accent-cyan w-[75%]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-white">Franchise Onboarding</span>
                                <span className="text-accent-green font-semibold">+18%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden">
                                <div className="h-full bg-purple-400 w-[60%]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-white">Consumer Bookings</span>
                                <span className="text-accent-green font-semibold">+12%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden">
                                <div className="h-full bg-amber-400 w-[45%]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-white">Churn Rate</span>
                                <span className="text-accent-red font-semibold">-2.1%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface-hover overflow-hidden">
                                <div className="h-full bg-accent-red w-[15%]" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
