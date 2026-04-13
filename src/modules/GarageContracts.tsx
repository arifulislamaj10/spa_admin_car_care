import { FileText, Search, Filter, ShieldCheck, FileWarning, Clock, Download, ExternalLink } from 'lucide-react';

const contracts = [
    { id: 'DOC-901', garage: 'AutoPro Eastside', type: 'Platform Master Agreement', added: '2023-11-15', status: 'Active', size: '2.4 MB' },
    { id: 'DOC-902', garage: 'AutoPro Eastside', type: 'Insurance Certificate (CGL)', added: '2025-01-10', status: 'Expiring Soon', expires: '2026-03-01', size: '1.1 MB' },
    { id: 'DOC-905', garage: 'CarCare24x7 North York', type: 'Commercial Lease', added: '2022-04-01', status: 'Active', size: '4.8 MB' },
    { id: 'DOC-912', garage: 'Speedy Auto Waterloo', type: 'Franchise Addendum B', added: '2024-06-20', status: 'Expired', expires: '2025-12-31', size: '0.9 MB' },
    { id: 'DOC-915', garage: 'Metro Auto Masters', type: 'WSIB Clearance Certificate', added: '2026-02-01', status: 'Active', expires: '2026-05-01', size: '1.5 MB' },
];

export default function GarageContracts() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        Contracts & Documents
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Centralized document repository. Manage legal contracts, NDAs, insurance certificates, and compliance docs.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Upload Document
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-text-muted" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Valid Contracts</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">1,402</p>
                    <p className="text-xs text-text-muted mt-1">Legally binding and current</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Expiring Soon (&lt;30d)</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">18</p>
                    <p className="text-xs text-text-muted mt-1">Requires partner upload</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <FileWarning className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Missing/Expired</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">5</p>
                    <p className="text-xs text-text-muted mt-1 text-red-400">Compliance breach risk</p>
                </div>
            </div>

            {/* Directory Table */}
            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col min-h-[500px]">
                {/* Toolbar */}
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50 rounded-t-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search documents, garages..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-purple-400/40 focus:ring-1 focus:ring-purple-400/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-hover border border-border-subtle rounded-lg text-sm text-text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filter Type
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-hover/20">
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Document Type</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Garage Entity</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Date Added</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status / Expiry</th>
                                <th className="py-3 px-5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {contracts.map((doc) => (
                                <tr key={doc.id} className="hover:bg-surface-hover/30 transition-colors group">
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-surface-card border border-border-subtle flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 text-text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white truncate max-w-[250px]">{doc.type}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[11px] px-1.5 py-0.5 bg-surface border border-border-subtle rounded text-text-muted font-mono">{doc.id}</span>
                                                    <span className="text-[11px] text-text-muted uppercase">{doc.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm font-semibold text-white">{doc.garage}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-text-secondary">{doc.added}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            {doc.status === 'Active' && <span className="text-[11px] font-semibold text-accent-green uppercase tracking-wider">Active</span>}
                                            {doc.status === 'Expiring Soon' && <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Expiring Soon</span>}
                                            {doc.status === 'Expired' && <span className="text-[11px] font-semibold text-red-500 uppercase tracking-wider">Expired</span>}
                                            {doc.expires && <span className="text-xs text-text-muted font-mono">{doc.expires}</span>}
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-text-secondary hover:text-white hover:bg-surface-hover rounded-lg transition-colors border border-transparent hover:border-border-subtle" title="Download PDF">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:text-accent-cyan hover:bg-surface-hover rounded-lg transition-colors border border-transparent hover:border-border-subtle" title="View Document">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
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
