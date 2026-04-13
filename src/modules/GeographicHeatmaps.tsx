import { Map as MapIcon, Filter, ExternalLink, MapPin } from 'lucide-react';

const regions = [
    { name: 'Greater Toronto Area', volume: '14,200 requests', status: 'High Density', coverage: '94%', growth: '+12% MoM' },
    { name: 'Vancouver Metro', volume: '8,400 requests', status: 'High Density', coverage: '88%', growth: '+8% MoM' },
    { name: 'Calgary District', volume: '4,100 requests', status: 'Growing', coverage: '65%', growth: '+24% MoM' },
    { name: 'Halifax Region', volume: '950 requests', status: 'Underserved', coverage: '30%', growth: '+45% MoM' },
];

export default function GeographicHeatmaps() {
    return (
        <div className="space-y-6 animate-fade-in-up flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <MapIcon className="w-8 h-8 text-teal-400" />
                        Geographic Demand Heatmaps
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Visualize booking density, identify underserved zones, and map expansion targets.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter Metrics
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-teal-500">
                    <h3 className="text-text-muted text-sm font-medium">Top Region</h3>
                    <p className="text-2xl font-bold text-white mt-1">GTA</p>
                    <p className="text-xs text-text-muted mt-1 text-teal-400">42% of total volume</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 border-t-4 border-t-amber-500">
                    <h3 className="text-text-muted text-sm font-medium">Fastest Growing</h3>
                    <p className="text-2xl font-bold text-white mt-1">Halifax</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">+45% MoM Growth</p>
                </div>
                <div className="bg-surface-card border border-rose-500/20 rounded-xl p-5 border-t-4 border-t-rose-500">
                    <h3 className="text-text-muted text-sm font-medium">Capacity Warnings</h3>
                    <p className="text-2xl font-bold text-white mt-1">14 Zones</p>
                    <p className="text-xs text-rose-400 mt-1">Demand exceeds garage capacity</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5">
                    <h3 className="text-text-muted text-sm font-medium">Total Zip Codes</h3>
                    <p className="text-2xl font-bold text-white mt-1">1,842</p>
                    <p className="text-xs text-text-muted mt-1">With active bookings</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[400px]">
                {/* Interactive Map Mockup */}
                <div className="flex-[2] bg-surface-card border border-border-subtle rounded-xl relative overflow-hidden flex flex-col">
                    <div className="absolute inset-0 bg-[#0d1117] opacity-50 z-0">
                        {/* Grid Background */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    </div>

                    <div className="p-4 border-b border-border-subtle bg-surface-card/90 relative z-10 flex justify-between items-center backdrop-blur-md">
                        <span className="text-sm font-bold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-400" /> Live Distribution Viewer</span>
                        <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]"></span> Hot</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]"></span> Medium</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500 drop-shadow-[0_0_5px_rgba(20,184,166,0.8)]"></span> Cool</span>
                        </div>
                    </div>

                    <div className="flex-1 relative z-10 flex items-center justify-center p-8">
                        <div className="text-center bg-surface/80 backdrop-blur-md border border-border-subtle p-6 rounded-2xl shadow-xl max-w-sm">
                            <MapIcon className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                            <h2 className="text-lg font-bold text-white mb-2">WebGL Map Engine Sandbox</h2>
                            <p className="text-sm text-text-muted">High-density visual layer plotting 100k+ data points rendering real-time booking clusters globally.</p>
                        </div>
                    </div>
                </div>

                {/* Top Regions List */}
                <div className="flex-1 bg-surface border border-border-subtle rounded-xl flex flex-col">
                    <div className="p-4 border-b border-border-subtle bg-surface-card flex justify-between items-center">
                        <h3 className="font-bold text-white">Region Synopsis</h3>
                        <ExternalLink className="w-4 h-4 text-text-muted hover:text-white cursor-pointer" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {regions.map((r, i) => (
                            <div key={i} className="bg-surface-hover/30 border border-border-subtle rounded-lg p-3 hover:border-text-muted transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-sm font-bold text-white">{r.name}</h4>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${r.status === 'High Density' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : r.status === 'Underserved' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>{r.status}</span>
                                </div>
                                <div className="flex justify-between text-xs text-text-muted mb-1">
                                    <span>Volume:</span>
                                    <span className="font-medium text-white">{r.volume}</span>
                                </div>
                                <div className="flex justify-between text-xs text-text-muted mb-1">
                                    <span>Coverage:</span>
                                    <span className="font-medium text-white">{r.coverage}</span>
                                </div>
                                <div className="flex justify-between text-xs text-text-muted">
                                    <span>Growth:</span>
                                    <span className="font-medium text-accent-green">{r.growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
