import { Smartphone, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

const versions = [
    { os: 'iOS', app: 'Consumer', latest: 'v3.2.0', minSupport: 'v3.0.0', status: 'Healthy', forcedUpdate: false, rollout: '100%' },
    { os: 'Android', app: 'Consumer', latest: 'v3.2.0', minSupport: 'v2.9.5', status: 'Healthy', forcedUpdate: false, rollout: '100%' },
    { os: 'iOS', app: 'Garage Pro', latest: 'v1.5.0', minSupport: 'v1.4.2', status: 'Warning', forcedUpdate: true, rollout: '45%' },
    { os: 'Android', app: 'Garage Pro', latest: 'v1.5.0', minSupport: 'v1.4.2', status: 'Warning', forcedUpdate: true, rollout: '60%' },
];

export default function AppVersionControl() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Smartphone className="w-8 h-8 text-indigo-400" />
                        App Version Control
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Registry of active mobile app versions, minimum supported thresholds, and forced updates.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors">
                        View Install Logs
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-indigo-500">
                    <h3 className="text-text-muted text-sm font-medium">Total Installations</h3>
                    <p className="text-3xl font-bold text-white mt-1">2.4M</p>
                    <p className="text-xs text-text-muted mt-1">Across all platforms</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">On Latest Version</h3>
                    <p className="text-3xl font-bold text-white mt-1">84%</p>
                    <p className="text-xs text-accent-green mt-1 flex items-center gap-1 font-semibold">Adopted within 7 days</p>
                </div>
                <div className="bg-surface-card border border-amber-500/20 rounded-xl p-5 border-t-4 border-t-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Pending Forced Updates</h3>
                    <p className="text-3xl font-bold text-white mt-1">42K</p>
                    <p className="text-xs text-amber-500 mt-1">Users locked out until updated</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[400px]">
                <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white">Version Fleet Matrix</h2>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-card">
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Application</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Platform</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Latest Version</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Min Supported</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Rollout Status</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Forced Update</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle/50">
                            {versions.map((v, idx) => (
                                <tr key={idx} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-4 font-bold text-white text-sm">
                                        <div className="flex items-center gap-2">
                                            <Download className="w-4 h-4 text-indigo-400" /> {v.app}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 border rounded uppercase tracking-wider ${v.os === 'iOS' ? 'bg-surface-card text-white border-border-subtle' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>{v.os}</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">{v.latest}</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="font-mono text-text-secondary bg-surface-card px-2 py-1 rounded border border-border-subtle">{v.minSupport}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-24 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                                <div className="bg-indigo-500 h-full" style={{ width: v.rollout }}></div>
                                            </div>
                                            <span className="text-xs font-medium text-text-muted w-8">{v.rollout}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center border-l border-border-subtle/50">
                                        {v.forcedUpdate ? (
                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                                <AlertTriangle className="w-3.5 h-3.5" /> YES
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> NO
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="text-xs font-semibold px-3 py-1.5 bg-surface-hover border border-border-subtle hover:border-indigo-500/50 hover:text-white rounded text-text-primary transition-colors">
                                            Edit Thresholds
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
