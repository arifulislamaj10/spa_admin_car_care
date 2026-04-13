import { Globe2, DollarSign, Percent, Flag, CheckCircle2, AlertCircle } from 'lucide-react';

const regions = [
    { id: 'CA-ON', name: 'Ontario, Canada', cur: 'CAD', tax: 'HST (13%)', status: 'Active', garages: 450 },
    { id: 'CA-BC', name: 'British Columbia, Canada', cur: 'CAD', tax: 'GST+PST (12%)', status: 'Active', garages: 210 },
    { id: 'US-NY', name: 'New York, USA', cur: 'USD', tax: 'NY Sales (8.875%)', status: 'Beta', garages: 45 },
    { id: 'US-CA', name: 'California, USA', cur: 'USD', tax: 'CA Sales (7.25%)', status: 'Planning', garages: 0 },
];

export default function RegionManagement() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Globe2 className="w-8 h-8 text-blue-400" />
                        Region & Geofence Management
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Configure currencies, applicable tax rates, languages, and geo-fenced availability.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        Add New Region
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-emerald-500">
                    <h3 className="text-text-muted text-sm font-medium">Active Markets</h3>
                    <p className="text-3xl font-bold text-white mt-1">2</p>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Generating Revenue</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Beta Markets</h3>
                    <p className="text-3xl font-bold text-white mt-1">1</p>
                    <p className="text-xs text-amber-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Soft launch testing</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-l-4 border-l-blue-500">
                    <h3 className="text-text-muted text-sm font-medium">Supported Currencies</h3>
                    <p className="text-3xl font-bold text-white mt-1">2</p>
                    <p className="text-xs text-text-muted mt-1 uppercase">CAD, USD</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-card/50">
                    <h2 className="text-lg font-bold text-white">Jurisdictional Configuration</h2>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-card">
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Region Name</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Currency</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Tax Law</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Supply Density</th>
                                <th className="py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Market Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle/50">
                            {regions.map((r) => (
                                <tr key={r.id} className="hover:bg-surface-hover/30 transition-colors cursor-pointer group">
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors"><Flag className="w-4 h-4 text-text-muted" /> {r.name}</span>
                                            <span className="text-[10px] font-mono text-text-secondary mt-0.5 ml-6">{r.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="inline-flex items-center justify-center gap-1 font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                                            <DollarSign className="w-3 h-3" /> {r.cur}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-text-secondary flex items-center gap-2">
                                            <Percent className="w-3.5 h-3.5 text-text-muted" /> {r.tax}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="text-sm text-white font-medium">{r.garages} <span className="text-xs text-text-muted font-normal">garages</span></span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={`text-[11px] font-bold px-2 py-1 border rounded uppercase tracking-wider inline-block ${r.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : r.status === 'Beta' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-surface-hover text-text-muted border-border-subtle'}`}>
                                            {r.status}
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
