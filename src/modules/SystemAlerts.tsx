import { AlertTriangle, AlertCircle, ShieldAlert, Cpu, HeartPulse, ShieldCheck, Zap, Server, Activity, ArrowUpRight } from 'lucide-react';

const alerts = [
    { id: 1, type: 'critical', title: 'Payment Gateway Timeout', message: 'Stripe API latency exceeding 5000ms. 14 payments queued.', time: '2m ago', source: 'FinTech Core', icon: Zap },
    { id: 2, type: 'warning', title: 'SLA Breach Warning', message: '3 garages in Toronto exceeding 48h completion SLA.', time: '14m ago', source: 'Operations & Risk', icon: AlertCircle },
    { id: 3, type: 'critical', title: 'High Error Rate', message: 'CareChat AI endpoint returning 500 errors for 8% of queries.', time: '22m ago', source: 'AI & Data', icon: Cpu },
    { id: 4, type: 'warning', title: 'Unusual Refund Spike', message: '12 refund requests in the last hour vs normal baseline of 2.', time: '1h ago', source: 'FinTech Core', icon: ArrowUpRight },
    { id: 5, type: 'info', title: 'Database Backup Completed', message: 'Daily snapshot created successfully. Size: 412GB.', time: '3h ago', source: 'Platform Health', icon: Server },
    { id: 6, type: 'info', title: 'KYC Queue Depth', message: 'Queue is at 145 items. Average review time: 4.2 hours.', time: '5h ago', source: 'Identity & Users', icon: ShieldCheck },
];

export default function SystemAlerts() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-accent-red" />
                        System Alerts
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Real-time alerting for downtime, error spikes, failed payments, and SLA breaches.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-red/10 border border-accent-red/20 rounded-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red" />
                        </span>
                        <span className="text-[11px] font-semibold text-accent-red tracking-wide uppercase">2 Critical</span>
                    </div>
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors">
                        Acknowledge All
                    </button>
                </div>
            </div>

            {/* Top Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-xs font-medium text-text-muted bg-surface px-2 py-1 rounded">Last 24h</span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-white">2</h3>
                        <p className="text-sm text-text-muted mt-1 font-medium">Critical Incidents</p>
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className="text-xs font-medium text-text-muted bg-surface px-2 py-1 rounded">Last 24h</span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-white">14</h3>
                        <p className="text-sm text-text-muted mt-1 font-medium">Warnings Generated</p>
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <HeartPulse className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <span className="text-xs font-medium text-text-muted bg-surface px-2 py-1 rounded">Live</span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-white">99.9%</h3>
                        <p className="text-sm text-text-muted mt-1 font-medium">Platform Uptime</p>
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-xs font-medium text-text-muted bg-surface px-2 py-1 rounded">Live</span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-3xl font-bold text-white">242ms</h3>
                        <p className="text-sm text-text-muted mt-1 font-medium">Avg API Latency</p>
                    </div>
                </div>
            </div>

            {/* Alerts Feed */}
            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between bg-surface-card/50">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Alert Stream</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-[11px] font-semibold bg-accent-cyan/10 text-accent-cyan rounded-md">All</button>
                        <button className="px-3 py-1.5 text-[11px] font-semibold text-text-muted hover:bg-surface-card rounded-md transition-colors">Critical</button>
                        <button className="px-3 py-1.5 text-[11px] font-semibold text-text-muted hover:bg-surface-card rounded-md transition-colors">Warnings</button>
                    </div>
                </div>

                <div className="divide-y divide-border-subtle">
                    {alerts.map((alert) => {
                        const Icon = alert.icon;
                        const isCritical = alert.type === 'critical';
                        const isWarning = alert.type === 'warning';

                        return (
                            <div key={alert.id} className="p-5 hover:bg-surface-hover/30 transition-colors flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${isCritical ? 'bg-red-500/10 text-red-500' :
                                        isWarning ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-sky-500/10 text-sky-500'
                                    }`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className={`text-sm font-bold ${isCritical ? 'text-white' : 'text-text-secondary'}`}>
                                                {alert.title}
                                            </h4>
                                            <p className="text-xs text-text-muted mt-1">{alert.message}</p>
                                        </div>

                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <span className="text-[11px] text-text-muted font-medium whitespace-nowrap">{alert.time}</span>
                                            <span className="text-[10px] px-2 py-0.5 bg-surface rounded-full text-text-muted border border-border-subtle">
                                                {alert.source}
                                            </span>
                                        </div>
                                    </div>

                                    {isCritical && (
                                        <div className="mt-3 flex gap-2">
                                            <button className="text-[11px] px-3 py-1.5 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors">
                                                Acknowledge
                                            </button>
                                            <button className="text-[11px] px-3 py-1.5 bg-surface-card border border-border-subtle text-text-primary font-semibold rounded hover:bg-surface-hover transition-colors">
                                                Investigate →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-border-subtle text-center bg-surface-card/30">
                    <button className="text-[13px] font-medium text-accent-cyan hover:text-accent-cyan/80 transition-colors">
                        Load Historical Alerts
                    </button>
                </div>
            </div>
        </div>
    );
}
