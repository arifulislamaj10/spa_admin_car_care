import { Radio, Activity } from 'lucide-react';

export default function LiveActivity() {
  return (
    <div className="p-4 sm:p-6 bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle h-full flex flex-col animate-fade-in-up">
      <div className="mb-4 sm:mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <Radio className="w-6 h-6 sm:w-7 sm:h-7 text-accent-cyan" />
            Live Activity Stream
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1">
            Real-time WebSocket connection to the global CarCare dispatch grid.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
          </span>
          <span className="text-[11px] font-semibold text-accent-cyan tracking-wide">LIVE</span>
        </div>
      </div>

      <div className="flex-1 bg-surface rounded-xl p-4 sm:p-6 relative overflow-hidden flex flex-col items-center justify-center text-center border border-border-subtle">
        {/* Radar Background grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #00d4aa 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Radar Scanning Line */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
             <div className="w-[150%] h-[150%] absolute rounded-full border border-accent-cyan/10 animate-[spin_10s_linear_infinite]"
                  style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 212, 170, 0.4) 100%)' }} />
             <Activity className="w-32 h-32 text-accent-cyan animate-pulse absolute" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 py-12 sm:pt-24 sm:pb-24 border border-accent-cyan/20 bg-surface-card/60 backdrop-blur-md rounded-xl sm:rounded-2xl w-full max-w-2xl shadow-2xl shadow-black/50">
          <span className="relative flex h-6 w-6 mx-auto mb-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-6 w-6 bg-accent-cyan" />
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">Listening for Events...</h3>
          <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
            When a booking, payment, or user action happens anywhere in the network, it will instantly appear here on the map.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
             <div className="flex items-center gap-2 text-xs text-text-muted bg-surface-hover/30 px-3 py-1.5 rounded-md border border-border-subtle">
                 <span className="text-accent-green">●</span> Connected to WSS US-East
             </div>
             <div className="flex items-center gap-2 text-xs text-text-muted bg-surface-hover/30 px-3 py-1.5 rounded-md border border-border-subtle">
                 <span className="text-accent-cyan font-mono">24ms</span> Latency
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
