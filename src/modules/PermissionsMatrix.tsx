import React from 'react';
import { Shield, Key, Search, Users, Check, X } from 'lucide-react';

const roles = ['GUEST', 'CUSTOMER', 'GARAGE_STAFF', 'GARAGE_OWNER', 'SUPPORT_AGENT', 'OPS_MANAGER', 'FINANCE', 'SUPER_ADMIN'];
const resources = [
    { group: 'Finance', items: ['revenue.view', 'payouts.process', 'refunds.approve', 'invoices.manage'] },
    { group: 'Garage Network', items: ['garages.list', 'garages.edit', 'contracts.sign', 'sla.override'] },
    { group: 'Marketing & Ads', items: ['ads.view', 'ads.create', 'cpm.manage', 'promos.generate'] },
    { group: 'Operations', items: ['tickets.view', 'disputes.mediate', 'reports.resolve', 'users.ban'] },
];

export default function PermissionsMatrix() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Shield className="w-8 h-8 text-indigo-500" />
                        Permissions Matrix
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Visual Role-Based Access Control (RBAC). Map 64+ granular capabilities across 8 system roles.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2">
                        <Key className="w-4 h-4" /> Save Configuration
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input type="text" placeholder="Search resources or actions..." className="w-full sm:w-80 bg-[#0d1117] border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-text-muted/50" />
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
                        <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> Granted</span>
                        <span className="flex items-center gap-1"><X className="w-4 h-4 text-red-500" /> Denied</span>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b-2 border-border-subtle">
                                <th className="py-3 px-4 text-xs font-bold text-white uppercase tracking-wider sticky left-0 bg-surface min-w-[200px] z-10 border-r border-border-subtle">Resource Action</th>
                                {roles.map(r => (
                                    <th key={r} className="py-3 px-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center group cursor-pointer hover:bg-surface-hover transition-colors">
                                        <span className="flex flex-col items-center gap-1">
                                            <Users className="w-4 h-4 group-hover:text-white transition-colors" />
                                            {r.replace('_', ' ')}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle/50">
                            {resources.map((group) => (
                                <React.Fragment key={group.group}>
                                    <tr className="bg-surface-card/80">
                                        <td colSpan={roles.length + 1} className="py-2 px-4 text-xs font-bold text-indigo-400 uppercase tracking-wider sticky left-0 border-r border-border-subtle bg-surface-card z-10">
                                            {group.group}
                                        </td>
                                    </tr>
                                    {group.items.map(item => (
                                        <tr key={item} className="hover:bg-surface-hover/30 transition-colors group/row text-sm">
                                            <td className="py-3 px-4 font-mono text-text-secondary sticky left-0 bg-surface group-hover/row:bg-surface-hover/80 transition-colors border-r border-border-subtle z-10">{item}</td>
                                            {roles.map((r, roleIdx) => {
                                                // Mock logic to scatter permissions
                                                const isOwnerAdmin = roleIdx >= 3;
                                                const isSuperAdmin = r === 'SUPER_ADMIN';
                                                const isFinanceStaff = r === 'FINANCE' && item.startsWith('re');
                                                const hasAccess = isSuperAdmin || (isOwnerAdmin && !item.includes('ban')) || isFinanceStaff || (roleIdx > 0 && item.includes('view') && !item.includes('revenue'));

                                                return (
                                                    <td key={`${item}-${r}`} className="py-3 px-4 text-center border-l border-border-subtle/30 hover:bg-surface-hover cursor-pointer transition-colors">
                                                        {hasAccess ? (
                                                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                                                        ) : (
                                                            <X className="w-4 h-4 text-red-500/50 mx-auto" />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
