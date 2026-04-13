import { ShieldAlert, AlertTriangle, Fingerprint, MapPin, Globe, Activity, Lock } from 'lucide-react';

const alerts = [
    { id: 'FRD-1092', signal: 'Velocity Limit Exceeded', entity: 'User: John D.', severity: 'Critical', details: '5 bookings made across 4 different garages in 10 minutes.', time: '12m ago', status: 'Auto-Blocked' },
    { id: 'FRD-1091', signal: 'Device Fingerprint Match', entity: 'Garage: WestCity Auto', severity: 'High', details: 'Known fraudulent device ID associated with previous chargeback ring.', time: '45m ago', status: 'Under Review' },
    { id: 'FRD-1088', signal: 'Geographic Improbability', entity: 'User: ASmith88', severity: 'Medium', details: 'IP location is Nigeria, booking garage in Toronto.', time: '2h ago', status: 'Payment Challenged' },
    { id: 'FRD-1085', signal: 'Stolen Card BIN', entity: 'User: Guest_9921', severity: 'High', details: 'Card BIN matches known compromised batches. Transaction blocked by Stripe Radar.', time: '5h ago', status: 'Blocked' },
];

export default function FraudMonitoring() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                        Fraud Monitoring
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        ML-powered fraud detection, anomalous transaction patterns, and risk signals.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Global Blocklist
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-red-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(239,68,68,0.05)] relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none" />
                    <h3 className="text-text-muted text-sm font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-500" /> Active Threats
                    </h3>
                    <p className="text-3xl font-bold text-white mt-2">8</p>
                    <p className="text-xs text-red-400 font-medium mt-1">Require immediate triage</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Prevented Loss</h3>
                    <p className="text-3xl font-bold text-white mt-2">$14.2K</p>
                    <p className="text-xs text-accent-green font-medium mt-1">This month (Auto-blocked)</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">False Positive Rate</h3>
                    <p className="text-3xl font-bold text-white mt-2">1.2%</p>
                    <p className="text-xs text-text-muted mt-1">Radar ML Engine</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4 text-text-muted" /> Auto-Blocked Entities
                    </h3>
                    <p className="text-3xl font-bold text-white mt-2">124</p>
                    <p className="text-xs text-text-muted mt-1">IPs, Devices, and Cards</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white">Live Threat Feed</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border-subtle rounded text-xs text-text-muted">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Scanning Live Traffic
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-0">
                    <div className="divide-y divide-border-subtle">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-5 hover:bg-surface-hover/30 transition-colors flex flex-col sm:flex-row gap-5 group">
                                <div className="flex-shrink-0 pt-1">
                                    {alert.severity === 'Critical' ? (
                                        <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
                                    ) : alert.severity === 'High' ? (
                                        <Fingerprint className="w-6 h-6 text-amber-500" />
                                    ) : (
                                        <MapPin className="w-6 h-6 text-blue-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-bold text-white">{alert.signal}</h3>
                                            <span className="text-[10px] text-text-muted font-mono bg-surface-card border border-border-subtle px-1.5 py-0.5 rounded">{alert.id}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-text-muted">{alert.time}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${alert.status.includes('Blocked') ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    alert.status.includes('Challenge') ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {alert.status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-text-secondary mb-1">{alert.entity}</p>
                                    <p className="text-sm text-text-muted leading-relaxed">{alert.details}</p>

                                    <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-xs font-semibold text-white bg-surface-hover px-3 py-1.5 rounded-md border border-border-subtle hover:border-text-muted transition-colors">
                                            Investigate
                                        </button>
                                        <button className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">
                                            Force Block
                                        </button>
                                        <button className="text-xs font-semibold text-text-muted hover:text-white transition-colors">
                                            Mark False Positive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
