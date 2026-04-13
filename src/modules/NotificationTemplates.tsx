import { BellRing, Mail, MessageSquare, Smartphone, Search, Filter } from 'lucide-react';

const templates = [
    { name: 'Booking Confirmation', channel: 'Email', type: 'Transactional', trigger: 'booking.created', modified: '2 days ago' },
    { name: 'Booking Reminder', channel: 'Push', type: 'Transactional', trigger: 'booking.upcoming_24h', modified: '1 week ago' },
    { name: 'Mechanic En Route', channel: 'SMS', type: 'Operational', trigger: 'service.en_route', modified: '1 month ago' },
    { name: 'Review Request', channel: 'Email', type: 'Engagement', trigger: 'service.completed_24h', modified: '3 months ago' },
    { name: 'Promo: Winter Tires', channel: 'Push', type: 'Marketing', trigger: 'Manual Campaign', modified: '4 hours ago' },
];

export default function NotificationTemplates() {
    return (
        <div className="space-y-6 animate-fade-in-up flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <BellRing className="w-8 h-8 text-amber-500" />
                        Notification Engine
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage Email, SMS, and Push notification templates with variable substitution.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-amber-500 text-[#0d1117] hover:bg-amber-400 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        New Template
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-[500px]">
                {/* Template List */}
                <div className="flex-[3] bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input type="text" placeholder="Search templates..." className="w-full sm:w-64 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-amber-500/40" />
                        </div>
                        <button className="p-1.5 bg-surface hover:bg-surface-hover border border-border-subtle rounded text-text-muted transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-1">
                            {templates.map((t, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${i === 0 ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-transparent border border-transparent hover:bg-surface-hover/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-surface-card border border-border-subtle shrink-0 ${t.channel === 'Email' ? 'text-blue-400' : t.channel === 'Push' ? 'text-purple-400' : 'text-emerald-400'}`}>
                                            {t.channel === 'Email' ? <Mail className="w-4 h-4" /> : t.channel === 'Push' ? <Smartphone className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-bold ${i === 0 ? 'text-amber-400' : 'text-white'}`}>{t.name}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-text-muted font-mono">{t.trigger}</span>
                                                <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${t.type === 'Transactional' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : t.type === 'Marketing' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-surface-hover border-border-subtle text-text-secondary'}`}>{t.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-text-secondary hidden sm:block">
                                        {t.modified}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Preview Mockup */}
                <div className="flex-[4] bg-surface border border-border-subtle rounded-xl flex flex-col">
                    <div className="p-4 border-b border-border-subtle bg-surface-card">
                        <h2 className="text-sm font-bold text-white mb-2">Editing: Booking Confirmation</h2>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span>Channel: <strong className="text-white">Email</strong></span>
                            <span>•</span>
                            <span>Trigger: <strong className="font-mono text-amber-400">booking.created</strong></span>
                        </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col bg-[#0d1117] relative">
                        <div className="mb-4">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">Subject Line</label>
                            <div className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 text-sm text-white font-medium flex gap-1">
                                Booking Confirmed: <span className="text-amber-400 font-mono bg-amber-500/10 px-1 rounded">{"{{service.name}}"}</span> on <span className="text-amber-400 font-mono bg-amber-500/10 px-1 rounded">{"{{service.date}}"}</span>
                            </div>
                        </div>

                        <div className="flex-1 border border-border-subtle rounded-lg bg-white overflow-hidden flex flex-col relative text-black isolate">
                            {/* Email Preview Mockup */}
                            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>Preview rendered HTML</span>
                                <button className="text-blue-600 hover:text-blue-800 transition-colors">Switch to Code Editor</button>
                            </div>

                            <div className="flex-1 p-8 max-w-xl mx-auto w-full">
                                <img src="https://placehold.co/120x40/0d1117/white?text=CarCare24x7" alt="Logo" className="mb-8 rounded" />
                                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your booking is confirmed, <span className="bg-yellow-200 px-1 outline-dashed outline-1 outline-yellow-400 rounded">Evan</span>!</h1>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Thanks for choosing CarCare24x7. We've received your booking for a <strong className="text-gray-900 bg-yellow-200 px-1 outline-dashed outline-1 outline-yellow-400 rounded">Full Synthetic Oil Change</strong>.
                                </p>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-2">Booking Details</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="text-gray-500">Date:</span> <strong className="text-gray-900 block mt-1 bg-yellow-200 px-1 outline-dashed outline-1 outline-yellow-400 inline-block rounded">Tomorrow at 10:00 AM</strong></div>
                                        <div><span className="text-gray-500">Garage:</span> <strong className="text-gray-900 block mt-1 bg-yellow-200 px-1 outline-dashed outline-1 outline-yellow-400 inline-block rounded">Downtown Auto Masters</strong></div>
                                    </div>
                                </div>
                                <button className="w-full bg-[#10b981] text-white font-bold py-3 rounded-lg text-center">Manage Booking</button>
                            </div>

                            {/* Overlay Tooltip */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                                <div className="bg-surface-card/90 backdrop-blur-md border border-border-subtle p-4 rounded-xl shadow-2xl pointer-events-auto">
                                    <p className="text-sm text-white font-medium flex items-center gap-2"><BellRing className="w-4 h-4 text-amber-500" /> Live Variable Injection Mockup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
