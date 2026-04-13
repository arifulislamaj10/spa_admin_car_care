import { DollarSign, Search, Filter, FileText, Download, CheckCircle2, Clock } from 'lucide-react';

const invoices = [
    { id: 'INV-4402', advertiser: 'Ford Mtn View', amount: '$1,250.00', date: '2026-02-25', status: 'Paid', method: 'Credit Card ending in 4242' },
    { id: 'INV-4401', advertiser: 'QuickFix Motors', amount: '$345.50', date: '2026-02-24', status: 'Pending', method: 'Auto-charge scheduled' },
    { id: 'INV-4398', advertiser: 'AutoPro Eastside', amount: '$75.00', date: '2026-02-22', status: 'Overdue', method: 'Failed Charge (Insufficient Funds)' },
    { id: 'INV-4385', advertiser: 'Metro Auto Masters', amount: '$450.00', date: '2026-02-15', status: 'Paid', method: 'Bank Transfer' },
];

export default function AdBilling() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-accent-green" />
                        Ad Billing & Invoicing
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Advertiser billing, payment collection, and outstanding balance tracking.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-green/30 transition-colors">
                    <h3 className="text-text-muted text-sm font-medium">Monthly Ad Revenue</h3>
                    <p className="text-3xl font-bold text-white mt-1">$45.2K</p>
                    <p className="text-xs text-text-muted mt-1 text-accent-green">Collected in February</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                    <h3 className="text-text-muted text-sm font-medium">Pending Collections</h3>
                    <p className="text-3xl font-bold text-white mt-1">$4,120</p>
                    <p className="text-xs text-text-muted mt-1">Scheduled for auto-charge</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-red-500/30 transition-colors">
                    <h3 className="text-text-muted text-sm font-medium">Overdue Balances</h3>
                    <p className="text-3xl font-bold text-white mt-1">$850</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Requires manual follow-up</p>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search invoices, advertisers..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-green/40 focus:ring-1 focus:ring-accent-green/20 transition-all" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Status
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Invoice / Date</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Advertiser</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Amount</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Payment Details</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-surface-hover/30 transition-colors">
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-bold text-white font-mono">{inv.id}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{inv.date}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                                            <FileText className="w-4 h-4 text-text-muted" /> {inv.advertiser}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-accent-green">{inv.amount}</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        {inv.status === 'Paid' && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> Paid</span>}
                                        {inv.status === 'Pending' && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-amber-500/20"><Clock className="w-3.5 h-3.5" /> Pending</span>}
                                        {inv.status === 'Overdue' && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-500/10 text-red-400 text-[11px] font-semibold rounded-md uppercase tracking-wider border border-red-500/20">Overdue</span>}
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className="text-xs text-text-muted">{inv.method}</span>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="p-2 text-text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors border border-transparent hover:border-border-subtle">
                                            <Download className="w-4 h-4" />
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
