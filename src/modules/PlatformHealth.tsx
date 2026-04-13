import { Activity, Server, Database, Globe, MemoryStick, Cpu, Clock, CheckCircle2, XCircle } from 'lucide-react';

const services = [
    { name: 'API Gateway', status: 'operational', uptime: '99.99%', latency: '45ms', region: 'us-east-1' },
    { name: 'Core Booking Engine', status: 'operational', uptime: '99.95%', latency: '120ms', region: 'us-east-1' },
    { name: 'FinTech Ledger', status: 'operational', uptime: '100%', latency: '85ms', region: 'us-east-1' },
    { name: 'CareChat AI Service', status: 'degraded', uptime: '98.50%', latency: '850ms', region: 'us-east-2' },
    { name: 'PostgreSQL Primary DB', status: 'operational', uptime: '99.99%', latency: '12ms', region: 'us-east-1' },
    { name: 'Redis Cache Fleet', status: 'operational', uptime: '100%', latency: '2ms', region: 'global' },
];

export default function PlatformHealth() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Activity className="w-8 h-8 text-emerald-400" />
                        Platform Health
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Infrastructure monitoring: Uptime, latency, error rates, and resource utilization.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">All Systems Normal</span>
                    </div>
                </div>
            </div>

            {/* Top Infrastructure Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4 text-text-muted">
                        <Cpu className="w-5 h-5" />
                        <h3 className="text-sm font-medium">Cluster CPU Usage</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">42%</span>
                        <span className="text-xs text-text-muted mb-1 block">Avg across 64 nodes</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-hover mt-4 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[42%]" />
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4 text-text-muted">
                        <MemoryStick className="w-5 h-5" />
                        <h3 className="text-sm font-medium">Memory Allocation</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">78%</span>
                        <span className="text-xs text-text-muted mb-1 block">1.2TB / 1.5TB</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-hover mt-4 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[78%]" />
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4 text-text-muted">
                        <Database className="w-5 h-5" />
                        <h3 className="text-sm font-medium">DB Connection Pool</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">1,420</span>
                        <span className="text-xs text-text-muted mb-1 block">Active Connections</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-hover mt-4 overflow-hidden">
                        <div className="h-full bg-accent-cyan w-[65%]" />
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4 text-text-muted">
                        <Globe className="w-5 h-5" />
                        <h3 className="text-sm font-medium">Active WebSocket</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-white">12.4K</span>
                        <span className="text-xs text-text-muted mb-1 block">Connected Clients</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-hover mt-4 overflow-hidden">
                        <div className="h-full bg-purple-400 w-[45%]" />
                    </div>
                </div>
            </div>

            {/* Services Status Table */}
            <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border-subtle bg-surface-card/50">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Microservices Status</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Service Name</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Uptime (30d)</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Latency (p95)</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Region</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {services.map((service) => (
                                <tr key={service.name} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-3 px-5">
                                        <div className="flex items-center gap-3">
                                            <Server className="w-4 h-4 text-text-muted" />
                                            <span className="text-sm font-medium text-white">{service.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5">
                                        {service.status === 'operational' ? (
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Normal
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                                                <XCircle className="w-3.5 h-3.5" /> Degraded
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-5">
                                        <span className="text-sm text-text-secondary">{service.uptime}</span>
                                    </td>
                                    <td className="py-3 px-5">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-text-muted" />
                                            <span className={`text-sm ${service.latency.includes('8') ? 'text-amber-400' : 'text-text-secondary'}`}>
                                                {service.latency}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5">
                                        <span className="text-[11px] px-2 py-1 bg-surface-card border border-border-subtle rounded-md text-text-muted font-mono">
                                            {service.region}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
