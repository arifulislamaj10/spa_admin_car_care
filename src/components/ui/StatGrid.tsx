import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface StatItem {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    color?: string;
}

export default function StatGrid({ stats }: { stats: StatItem[] }) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-4`}>
            {stats.map((s, i) => (
                <div
                    key={s.label}
                    className="card-glow bg-surface-card rounded-2xl p-5 border border-border-subtle animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                >
                    <p className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-2">{s.label}</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-extrabold text-white">{s.value}</h3>
                        {s.trend && (
                            <div className={`flex items-center gap-0.5 text-xs font-semibold ${s.trendUp !== false ? 'text-accent-green' : 'text-red-400'}`}>
                                {s.trendUp !== false ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                {s.trend}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
