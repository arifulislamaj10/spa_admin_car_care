import { Ban, Search, Filter, ShieldCheck, Globe, MonitorSmartphone, CreditCard, Lock, MapPin } from 'lucide-react';

const blacklist = [
    { id: 'BLK-001', entity: '192.168.1.45', type: 'IP Address', reason: 'Repeated API Abuse / DDoS attempt', date: '2026-02-20', expires: 'Permanent' },
    { id: 'BLK-002', entity: 'Device: 8F2A-99B1...', type: 'Hardware Hash', reason: 'Associated with 4 fraudulent accounts', date: '2026-02-18', expires: 'Permanent' },
    { id: 'BLK-003', entity: 'Russia, Belarus', type: 'Geographic Region', reason: 'OFAC Sanctions Compliance', date: '2022-03-01', expires: 'Ongoing' },
    { id: 'BLK-005', entity: 'BIN: 424242', type: 'Card BIN Range', reason: 'High chargeback velocity from issuer', date: '2026-02-24', expires: '2026-03-24 (30 Days)' },
];

export default function BlacklistControl() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Ban className="w-8 h-8 text-neutral-400" />
                        Blacklist Control
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage blocked users, devices, IPs, BINs, and geographic network layer restrictions.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-neutral-600/20 text-neutral-300 border border-neutral-600/50 hover:bg-neutral-600/40 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Network Guard Logs
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        Add Restriction
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-neutral-500">
                    <h3 className="text-text-muted text-sm font-medium">Banned IPs & CIDRs</h3>
                    <p className="text-3xl font-bold text-white mt-1">1,240</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-neutral-500">
                    <h3 className="text-text-muted text-sm font-medium">Blocked Devices</h3>
                    <p className="text-3xl font-bold text-white mt-1">482</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-neutral-500">
                    <h3 className="text-text-muted text-sm font-medium">Card BIN Blocks</h3>
                    <p className="text-3xl font-bold text-white mt-1">14</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-neutral-500">
                    <h3 className="text-text-muted text-sm font-medium">Geo-Blocks (Regions)</h3>
                    <p className="text-3xl font-bold text-white mt-1">12</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search entity, ID or reason..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-neutral-500/40 focus:ring-1 focus:ring-neutral-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Type
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Target Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Enforcement Reason</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Date Applied</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Lock Duration</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {blacklist.map((b) => (
                                <tr key={b.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white font-mono">{b.entity}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2">
                                            {b.type === 'IP Address' && <Globe className="w-4 h-4 text-text-muted" />}
                                            {b.type === 'Hardware Hash' && <MonitorSmartphone className="w-4 h-4 text-text-muted" />}
                                            {b.type === 'Geographic Region' && <MapPin className="w-4 h-4 text-text-muted" />}
                                            {b.type === 'Card BIN Range' && <CreditCard className="w-4 h-4 text-text-muted" />}
                                            <span className="text-sm text-text-secondary">{b.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-text-muted max-w-xs truncate" title={b.reason}>{b.reason}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm text-white">{b.date}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`text-xs font-bold ${b.expires === 'Permanent' ? 'text-red-500' : 'text-amber-500'} flex items-center gap-1.5`}>
                                            {b.expires === 'Permanent' ? <Lock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 opacity-50" />} {b.expires}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-border-subtle px-3 py-1.5 rounded-md hover:bg-surface-hover">
                                            Revoke Ban
                                        </button>
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
