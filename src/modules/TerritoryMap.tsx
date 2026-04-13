import { Map, MapPin, ZoomIn, ZoomOut, Target, Layers } from 'lucide-react';

export default function TerritoryMap() {
    return (
        <div className="space-y-6 animate-fade-in-up h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Map className="w-8 h-8 text-accent-cyan" />
                        Territory Map View
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Geographic coverage map. Analyze density zones, identify white-space expansion targets.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-surface-card border border-border-subtle rounded-lg flex items-center p-1">
                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-surface-hover rounded-md">Densities</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-white transition-colors">White-space</button>
                    </div>
                    <button className="px-3 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-text-muted hover:text-white transition-colors flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Map Container (Mocked visually) */}
            <div className="flex-1 bg-[#0a0d14] border border-border-subtle rounded-xl relative overflow-hidden flex">

                {/* Mock Controls */}
                <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10">
                    <button className="w-10 h-10 bg-surface border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-surface-hover shadow-lg transition-colors">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-surface border border-border-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-surface-hover shadow-lg transition-colors">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Mock Map Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* Mock Regions / Heatmap Globs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-amber-500/10 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />

                {/* Sidebar Panel */}
                <div className="w-80 border-r border-border-subtle bg-surface/80 backdrop-blur-xl z-10 flex flex-col shrink-0">
                    <div className="p-5 border-b border-border-subtle">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Region Selector</h3>
                        <select className="w-full bg-[#0d1117] border border-border-subtle text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-accent-cyan/50">
                            <option>Greater Toronto Area (GTA)</option>
                            <option>Metro Vancouver</option>
                            <option>Calgary Region</option>
                            <option>Montreal Island</option>
                        </select>
                    </div>

                    <div className="p-5 flex-1 overflow-y-auto space-y-6">
                        <div>
                            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Coverage Stats</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-2xl font-bold text-white">42</p>
                                        <p className="text-xs text-text-secondary">Active Garages</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-accent-cyan">8.5km</p>
                                        <p className="text-xs text-text-secondary">Avg Distance</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-text-muted">Population Covered</span>
                                        <span className="text-accent-green font-bold">84%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
                                        <div className="h-full bg-accent-green rounded-full" style={{ width: '84%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Target className="w-3.5 h-3.5 text-amber-500" />
                                Expansion Targets
                            </p>
                            <div className="space-y-3">
                                <div className="p-3 bg-surface-card border border-border-subtle rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                                    <p className="text-sm font-bold text-white">Markham East</p>
                                    <p className="text-[11px] text-text-muted mt-1">High demand density, 0 coverage in 15km radius. Priority 1.</p>
                                </div>
                                <div className="p-3 bg-surface-card border border-border-subtle rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                                    <p className="text-sm font-bold text-white">Oakville North</p>
                                    <p className="text-[11px] text-text-muted mt-1">Growing fleet contracts, need commercial bay capacity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Area Pins (Mocked) */}
                <div className="flex-1 relative">

                    <div className="absolute top-[30%] left-[40%] group">
                        <div className="w-12 h-12 bg-accent-cyan/10 rounded-full flex items-center justify-center animate-ping-slow pointer-events-none" />
                        <MapPin className="w-6 h-6 text-accent-cyan absolute top-3 left-3 -translate-x-1.5 -translate-y-2.5 filter drop-shadow-[0_0_8px_rgba(0,212,170,0.8)] cursor-pointer" />

                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-surface-card border border-border-subtle p-3 rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                            <p className="text-sm font-bold text-white">Downtown Hub</p>
                            <p className="text-xs text-text-muted mt-0.5">Capacity: 95%</p>
                            <div className="mt-2 pt-2 border-t border-border-subtle flex justify-between text-[10px]">
                                <span className="text-accent-green">Online</span>
                                <span className="text-text-secondary">4.8 ★</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-[50%] left-[60%] group">
                        <MapPin className="w-5 h-5 text-purple-400 absolute filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] cursor-pointer" />
                    </div>

                    <div className="absolute top-[20%] left-[70%] group">
                        <MapPin className="w-5 h-5 text-purple-400 absolute filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] cursor-pointer" />
                    </div>

                    <div className="absolute top-[65%] left-[30%] group">
                        <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/50 border-dashed rounded-full flex items-center justify-center animate-spin-slow">
                        </div>
                        <Target className="w-4 h-4 text-amber-500 absolute top-2 left-2 cursor-pointer" />
                    </div>

                </div>

            </div>
        </div>
    );
}
