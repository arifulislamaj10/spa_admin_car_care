import { useState } from 'react';
import {
    Search, MoreVertical, ShieldHalf,
    Loader2, AlertCircle, User, ChevronLeft, ChevronRight,
    ShieldX, Calendar, Clock,
} from 'lucide-react';
import { useUsersQuery } from '../hooks/queries/useUsersQuery';
import { useBlockedUsersQuery } from '../hooks/queries/useBlockedUsersQuery';
import type { ApiUserItem, BlockedBy } from '../services/users.service';
import { getUserId } from '../services/users.service';

/* ─── Role badge colours ─── */
const roleColors: Record<string, string> = {
    superAdmin:  'bg-purple-500/15 text-purple-400 border-purple-500/20',
    mechanic:    'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    garage:      'bg-amber-500/15 text-amber-400 border-amber-500/20',
    fleet:       'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
    user:        'bg-gray-500/15 text-gray-400 border-gray-500/20',
};

const avatarColors: Record<string, string> = {
    superAdmin: 'bg-purple-500/20 text-purple-400',
    mechanic:   'bg-cyan-500/20 text-cyan-400',
    garage:     'bg-amber-500/20 text-amber-400',
    fleet:      'bg-indigo-500/20 text-indigo-400',
    user:       'bg-surface-hover text-text-muted',
};

function getRoleColor(role: string)   { return roleColors[role]   ?? roleColors.user; }
function getAvatarColor(role: string) { return avatarColors[role] ?? avatarColors.user; }

function isBlocked(u: ApiUserItem) { return !!u.blockedBy || !!u.blockedAt; }

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateStr: string) {
    return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function getBlockedByName(blockedBy: BlockedBy | string | null): string {
    if (!blockedBy) return '—';
    if (typeof blockedBy === 'string') return blockedBy;
    return blockedBy.fullName ?? blockedBy.email ?? '—';
}

/* ─── Blocked User Row (extra detail) ─── */
const BlockedUserRow = ({ user, index }: { user: ApiUserItem; index: number }) => (
    <tr className="animate-fade-in-up border-l-2 border-red-500/40"
        style={{ animationDelay: `${0.04 * index}s` }}>
        {/* Avatar + name */}
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                {user.image ? (
                    <div className="relative">
                        <img src={user.image} alt={user.fullName}
                            className="h-10 w-10 rounded-full object-cover border border-red-500/30 opacity-70"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <ShieldX className="w-3.5 h-3.5 text-red-400 absolute -bottom-0.5 -right-0.5" />
                    </div>
                ) : (
                    <div className="relative">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm bg-red-500/10 text-red-400 border border-red-500/20">
                            {user.fullName?.charAt(0) ?? '?'}
                        </div>
                        <ShieldX className="w-3.5 h-3.5 text-red-400 absolute -bottom-0.5 -right-0.5" />
                    </div>
                )}
                <div>
                    <p className="font-medium text-white">{user.fullName}</p>
                    <p className="text-xs text-text-muted font-mono mt-0.5">{user.email}</p>
                    {user.address && (
                        <p className="text-[10px] text-text-muted mt-0.5 max-w-[200px] truncate">{user.address}</p>
                    )}
                </div>
            </div>
        </td>

        {/* Role */}
        <td className="p-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getRoleColor(user.role)}`}>
                {user.role}
            </span>
        </td>

        {/* Blocked by */}
        <td className="p-4">
            <div className="flex items-center gap-1.5 text-red-400 text-xs font-medium">
                <ShieldX className="w-3.5 h-3.5 shrink-0" />
                {getBlockedByName(user.blockedBy)}
            </div>
            {user.blockReason && (
                <p className="text-[10px] text-red-400/60 mt-0.5 max-w-[160px] truncate" title={user.blockReason}>
                    "{user.blockReason}"
                </p>
            )}
        </td>

        {/* Blocked at */}
        <td className="p-4 text-sm text-text-muted">
            {user.blockedAt ? (
                <div>
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(user.blockedAt)}</div>
                    <div className="flex items-center gap-1 text-[11px] mt-0.5"><Clock className="w-3 h-3" />{new Date(user.blockedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            ) : '—'}
        </td>

        {/* Joined */}
        <td className="p-4 text-sm text-text-muted">{formatDate(user.createdAt)}</td>

        {/* Wallet */}
        <td className="p-4 text-right text-sm font-medium text-text-secondary">
            ${user.myWallet.toLocaleString()}
        </td>

        {/* Actions */}
        <td className="p-4 pr-6 text-right">
            <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
            </button>
        </td>
    </tr>
);

/* ─── Blocked Mobile Card ─── */
const BlockedUserCard = ({ user, index }: { user: ApiUserItem; index: number }) => (
    <div className="bg-surface rounded-xl p-4 border border-red-500/20 border-l-2 border-l-red-500/60 animate-fade-in-up"
        style={{ animationDelay: `${0.05 * index}s` }}>
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                {user.image ? (
                    <img src={user.image} alt={user.fullName}
                        className="h-10 w-10 rounded-full object-cover opacity-70 border border-red-500/30" />
                ) : (
                    <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm bg-red-500/10 text-red-400 border border-red-500/20">
                        {user.fullName?.charAt(0) ?? '?'}
                    </div>
                )}
                <div>
                    <p className="font-medium text-white text-sm">{user.fullName}</p>
                    <p className="text-xs text-text-muted font-mono">{user.email}</p>
                </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                <ShieldX className="w-3 h-3" /> Blocked
            </span>
        </div>

        <div className="space-y-1.5 text-[11px] text-text-muted border-t border-border-subtle pt-2.5 mt-2.5">
            <div className="flex justify-between">
                <span>Role</span>
                <span className={`font-semibold px-2 py-0.5 rounded border text-[10px] ${getRoleColor(user.role)}`}>{user.role}</span>
            </div>
            <div className="flex justify-between">
                <span>Blocked by</span>
                <span className="text-red-400 font-medium">{getBlockedByName(user.blockedBy)}</span>
            </div>
            {user.blockedAt && (
                <div className="flex justify-between">
                    <span>Blocked at</span>
                    <span>{formatDateTime(user.blockedAt)}</span>
                </div>
            )}
            {user.blockReason && (
                <div className="flex justify-between gap-4">
                    <span className="shrink-0">Reason</span>
                    <span className="text-red-400/70 text-right truncate">"{user.blockReason}"</span>
                </div>
            )}
            <div className="flex justify-between">
                <span>Wallet</span>
                <span className="text-white font-medium">${user.myWallet.toLocaleString()}</span>
            </div>
        </div>
    </div>
);

/* ─── Mobile Card ─── */
const UserCard = ({ user, index }: { user: ApiUserItem; index: number }) => {
    const blocked = isBlocked(user);
    return (
        <div className="bg-surface rounded-xl p-4 border border-border-subtle animate-fade-in-up"
            style={{ animationDelay: `${0.05 * index}s` }}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    {user.image ? (
                        <img src={user.image} alt={user.fullName}
                            className="h-10 w-10 rounded-full object-cover border border-border-subtle"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(user.role)}`}>
                            {user.fullName?.charAt(0) ?? '?'}
                        </div>
                    )}
                    <div>
                        <p className="font-medium text-white text-sm">{user.fullName}</p>
                        <p className="text-xs text-text-muted font-mono">{user.email}</p>
                    </div>
                </div>
                <button className="p-1.5 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getRoleColor(user.role)}`}>
                    {user.role}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${blocked ? 'bg-red-500' : 'bg-accent-green'}`} />
                    <span className={`text-[11px] ${blocked ? 'text-red-400' : 'text-accent-green'}`}>
                        {blocked ? 'Blocked' : 'Active'}
                    </span>
                </div>
                <span className="text-[11px] text-text-muted ml-auto">{formatDate(user.createdAt)}</span>
            </div>
            {blocked && user.blockReason && (
                <p className="text-[10px] text-red-400/70 mt-2 truncate">Reason: {user.blockReason}</p>
            )}
        </div>
    );
};

/* ─── Skeleton row ─── */
const SkeletonRow = () => (
    <tr>
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-hover animate-pulse" />
                <div className="space-y-2">
                    <div className="w-28 h-3.5 bg-surface-hover rounded animate-pulse" />
                    <div className="w-36 h-3 bg-surface-hover/60 rounded animate-pulse" />
                </div>
            </div>
        </td>
        {[1, 2, 3, 4, 5].map(i => (
            <td key={i} className="p-4">
                <div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" />
            </td>
        ))}
    </tr>
);

/* ─── Props ─── */
interface UsersProps {
    defaultFilter?: string;
    pageTitle?: string;
    pageDesc?: string;
}

const PAGE_LIMIT = 20;
const isSuspendedView = (f: string) => f === 'SUSPENDED';

export default function Users({
    defaultFilter = 'ALL',
    pageTitle = 'User Management',
    pageDesc = 'Manage customers, staff permissions, and garage owners.',
}: UsersProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);

    const isSuspended = isSuspendedView(defaultFilter);

    // Debounce search input
    const handleSearch = (val: string) => {
        setSearchTerm(val);
        clearTimeout((handleSearch as any)._timer);
        (handleSearch as any)._timer = setTimeout(() => {
            setDebouncedSearch(val);
            setPage(1);
        }, 400);
    };

    // Regular users query (disabled for suspended view)
    const usersQuery = useUsersQuery({
        defaultFilter,
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
    });

    // Blocked users query (only for suspended view)
    const blockedQuery = useBlockedUsersQuery(page, PAGE_LIMIT);

    const isLoading = isSuspended ? blockedQuery.isLoading : usersQuery.isLoading;
    const isError   = isSuspended ? blockedQuery.isError   : usersQuery.isError;
    const error     = isSuspended ? blockedQuery.error     : usersQuery.error;

    const users      = isSuspended ? (blockedQuery.data?.users ?? []) : (usersQuery.data?.users ?? []);
    const totalPages = isSuspended ? (blockedQuery.data?.totalPages ?? 1) : (usersQuery.data?.pagination?.totalPages ?? 1);
    const totalCount = isSuspended ? (blockedQuery.data?.totalItems ?? 0) : (usersQuery.data?.pagination?.total ?? users.length);

    return (
        <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">{pageTitle}</h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">{pageDesc}</p>
                </div>
                <button className="px-3 sm:px-4 py-2 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 rounded-lg text-xs sm:text-sm font-medium hover:bg-accent-cyan/20 transition-all flex items-center gap-2">
                    <ShieldHalf className="w-4 h-4" /> Ensure RBAC
                </button>
            </div>

            {/* API error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load users. Check your backend connection.'}
                </div>
            )}

            <div className="bg-surface-card rounded-xl sm:rounded-2xl border border-border-subtle flex-1 flex flex-col overflow-hidden animate-fade-in-up delay-2">

                {/* Toolbar */}
                <div className="p-3 sm:p-4 border-b border-border-subtle flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                        />
                    </div>
                    {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin self-center" />}
                    {totalCount > 0 && !isLoading && (
                        <span className="text-xs text-text-muted self-center">{totalCount} total</span>
                    )}
                </div>

                {/* ── Mobile Card View ── */}
                <div className="md:hidden flex-1 overflow-y-auto p-3 space-y-3">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-surface rounded-xl p-4 border border-border-subtle">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-surface-hover animate-pulse" />
                                    <div className="space-y-2 flex-1">
                                        <div className="w-32 h-3.5 bg-surface-hover rounded animate-pulse" />
                                        <div className="w-40 h-3 bg-surface-hover/60 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-16 h-4 bg-surface-hover rounded animate-pulse" />
                                    <div className="w-12 h-4 bg-surface-hover/60 rounded animate-pulse" />
                                </div>
                            </div>
                        ))
                    ) : users.length > 0 ? (
                        users.map((user, i) =>
                            isSuspended
                                ? <BlockedUserCard key={getUserId(user)} user={user} index={i} />
                                : <UserCard key={getUserId(user)} user={user} index={i} />
                        )
                    ) : (
                        <div className="text-center py-12 text-text-muted text-sm flex flex-col items-center gap-3">
                            {isSuspended ? <ShieldX className="w-10 h-10 opacity-30" /> : <User className="w-10 h-10 opacity-30" />}
                            {isSuspended ? 'No blocked accounts found.' : 'No users found.'}
                        </div>
                    )}
                </div>

                {/* ── Desktop Table View ── */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="dark-table w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Role</th>
                                {isSuspended ? (
                                    <>
                                        <th className="p-4">Blocked By</th>
                                        <th className="p-4">Blocked At</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Phone</th>
                                    </>
                                )}
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Wallet</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                [1, 2, 3, 4, 5, 6].map(i => <SkeletonRow key={i} />)
                            ) : users.length > 0 ? (
                                isSuspended
                                    ? users.map((user, i) => <BlockedUserRow key={getUserId(user)} user={user} index={i} />)
                                    : users.map((user, i) => {
                                        const blocked = isBlocked(user);
                                        return (
                                            <tr key={getUserId(user)} className="animate-fade-in-up"
                                                style={{ animationDelay: `${0.04 * i}s` }}>
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        {user.image ? (
                                                            <img src={user.image} alt={user.fullName}
                                                                className="h-10 w-10 rounded-full object-cover border border-border-subtle"
                                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                        ) : (
                                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(user.role)}`}>
                                                                {user.fullName?.charAt(0) ?? '?'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-medium text-white">{user.fullName}</p>
                                                            <p className="text-xs text-text-muted font-mono mt-0.5">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getRoleColor(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${blocked ? 'bg-red-500' : 'bg-accent-green animate-pulse'}`} />
                                                        <span className={`text-sm ${blocked ? 'text-red-400 font-medium' : 'text-accent-green'}`}>
                                                            {blocked ? 'Blocked' : 'Active'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-text-muted font-mono">
                                                    {user.callingCode}{user.phoneNumber}
                                                </td>
                                                <td className="p-4 text-sm text-text-muted">{formatDate(user.createdAt)}</td>
                                                <td className="p-4 text-right text-sm font-medium text-text-secondary">
                                                    ${user.myWallet.toLocaleString()}
                                                </td>
                                                <td className="p-4 pr-6 text-right">
                                                    <button className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-text-muted">
                                            {isSuspended ? <ShieldX className="w-10 h-10 opacity-30" /> : <User className="w-10 h-10 opacity-30" />}
                                            <span className="text-sm">{isSuspended ? 'No blocked accounts found.' : 'No users found.'}</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalCount > 0 && (
                    <div className="p-3 sm:p-4 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-text-muted mt-auto">
                        <span className="text-xs sm:text-sm">
                            Showing {(page - 1) * PAGE_LIMIT + 1}–{Math.min(page * PAGE_LIMIT, totalCount)} of {totalCount}
                        </span>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover text-text-muted disabled:opacity-30 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pg = i + 1;
                                return (
                                    <button key={pg} onClick={() => setPage(pg)}
                                        className={`px-3 py-1 border rounded-lg text-xs sm:text-sm transition-colors ${pg === page
                                            ? 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan font-medium'
                                            : 'border-border-subtle hover:bg-surface-hover text-text-muted'}`}>
                                        {pg}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover text-text-muted disabled:opacity-30 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
