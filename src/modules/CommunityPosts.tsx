import { useState } from 'react';
import {
    Users, Search, ChevronLeft, ChevronRight, Loader2,
    AlertCircle, Heart, MessageCircle, Tag, Car,
    DollarSign, ThumbsUp, EyeOff, Eye, Clock,
    CheckCircle2, XCircle, TrendingUp, ShieldAlert, BarChart2,
} from 'lucide-react';
import { useCommunityPostsQuery } from '../hooks/queries/useCommunityPostsQuery';
import { useToggleHidePostMutation } from '../hooks/queries/useToggleHidePostMutation';
import type { CommunityPost } from '../services/community.service';

/* ─── Helpers ─── */
function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const URGENCY: Record<string, { label: string; cls: string }> = {
    low:    { label: 'Low',    cls: 'text-accent-green bg-accent-green/10 border-accent-green/20' },
    medium: { label: 'Medium', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20'         },
    high:   { label: 'High',   cls: 'text-red-400 bg-red-500/10 border-red-500/20'               },
};

function UrgencyBadge({ level }: { level: string }) {
    const u = URGENCY[level] ?? URGENCY.low;
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${u.cls}`}>
            <Clock className="w-3 h-3" />{u.label}
        </span>
    );
}

function PostTypeBadge({ type }: { type: string }) {
    const label = type === 'helpost' ? 'Help Post' : type.charAt(0).toUpperCase() + type.slice(1);
    return (
        <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md border text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20">
            {label}
        </span>
    );
}

/* ─── Toggle Hide Button ─── */
function ToggleHideButton({ post }: { post: CommunityPost }) {
    const { mutate, isPending } = useToggleHidePostMutation();
    return (
        <button
            onClick={() => mutate(post._id)}
            disabled={isPending}
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border transition-colors disabled:opacity-50
                ${post.postHide
                    ? 'text-accent-green border-accent-green/30 bg-accent-green/10 hover:bg-accent-green/20'
                    : 'text-orange-400 border-orange-400/30 bg-orange-400/10 hover:bg-orange-400/20'}`}>
            {isPending
                ? <Loader2 className="w-3 h-3 animate-spin" />
                : post.postHide ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />
            }
            {post.postHide ? 'Unhide' : 'Hide'}
        </button>
    );
}

/* ─── Post Card (grid) ─── */
function PostCard({ post, index }: { post: CommunityPost; index: number }) {
    return (
        <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${0.04 * index}s` }}>
            {post.postImage && (
                <div className="relative h-40 overflow-hidden bg-surface">
                    <img src={post.postImage} alt={post.postDescription}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                        <PostTypeBadge type={post.postType} />
                        <UrgencyBadge level={post.urgencyType} />
                    </div>
                    {post.postHide && (
                        <div className="absolute top-2 right-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-orange-400 bg-orange-500/10 border-orange-500/20">
                                <EyeOff className="w-3 h-3" />Hidden
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className="p-4 space-y-3">
                {!post.postImage && (
                    <div className="flex flex-wrap gap-1.5">
                        <PostTypeBadge type={post.postType} />
                        <UrgencyBadge level={post.urgencyType} />
                        {post.postHide && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border text-orange-400 bg-orange-500/10 border-orange-500/20">
                                <EyeOff className="w-3 h-3" />Hidden
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-2.5">
                    {post.user.image ? (
                        <img src={post.user.image} alt={post.user.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-border-subtle shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-accent-cyan" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{post.user.fullName}</p>
                        <p className="text-[11px] text-text-muted truncate">{post.user.email}</p>
                    </div>
                    <span className="ml-auto text-[11px] text-text-muted shrink-0">{formatDate(post.createdAt)}</span>
                </div>

                {post.postDescription && (
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{post.postDescription}</p>
                )}

                <div className="flex flex-wrap gap-2 text-[11px]">
                    {post.carType && (
                        <span className="flex items-center gap-1 text-text-muted bg-surface border border-border-subtle px-2 py-0.5 rounded-md">
                            <Car className="w-3 h-3" />{post.carType}
                        </span>
                    )}
                    {post.issueType && (
                        <span className="flex items-center gap-1 text-text-muted bg-surface border border-border-subtle px-2 py-0.5 rounded-md">
                            {post.issueType}
                        </span>
                    )}
                    {post.budget && (
                        <span className="flex items-center gap-1 text-accent-green bg-accent-green/10 border border-accent-green/20 px-2 py-0.5 rounded-md font-medium">
                            <DollarSign className="w-3 h-3" />{post.budget}
                        </span>
                    )}
                    {post.hasTag && (
                        <span className="flex items-center gap-1 text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-md">
                            <Tag className="w-3 h-3" />{post.hasTag}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border-subtle">
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{post.likeCount}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-accent-cyan" />{post.commentCount}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-accent-green" />{post.offerSend}</span>
                    </div>
                    <ToggleHideButton post={post} />
                </div>
            </div>
        </div>
    );
}

/* ─── Table row ─── */
function PostRow({ post, index }: { post: CommunityPost; index: number }) {
    return (
        <tr className="border-b border-border-subtle hover:bg-surface-hover/30 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${0.04 * index}s` }}>
            <td className="p-4 pl-6">
                <div className="flex items-center gap-3">
                    {post.user.image ? (
                        <img src={post.user.image} alt={post.user.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-border-subtle shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-accent-cyan" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{post.user.fullName}</p>
                        <p className="text-xs text-text-muted truncate">{post.user.email}</p>
                    </div>
                </div>
            </td>
            <td className="p-4 max-w-[200px]">
                <p className="text-sm text-text-primary truncate">{post.postDescription || '—'}</p>
                <div className="mt-1"><PostTypeBadge type={post.postType} /></div>
            </td>
            <td className="p-4">
                <div className="flex flex-col gap-0.5 text-xs">
                    {post.carType && <span className="flex items-center gap-1 text-text-secondary"><Car className="w-3 h-3 text-text-muted" />{post.carType}</span>}
                    {post.issueType && <span className="text-text-muted">{post.issueType}</span>}
                    {post.budget && <span className="flex items-center gap-1 text-accent-green font-medium"><DollarSign className="w-3 h-3" />{post.budget}</span>}
                </div>
            </td>
            <td className="p-4"><UrgencyBadge level={post.urgencyType} /></td>
            <td className="p-4">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{post.likeCount}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-accent-cyan" />{post.commentCount}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-accent-green" />{post.offerSend}</span>
                </div>
            </td>
            <td className="p-4">
                {post.isOpen
                    ? <span className="inline-flex items-center gap-1 text-[11px] text-accent-green font-semibold"><CheckCircle2 className="w-3.5 h-3.5" />Open</span>
                    : <span className="inline-flex items-center gap-1 text-[11px] text-text-muted font-semibold"><XCircle className="w-3.5 h-3.5" />Closed</span>
                }
                {post.postHide && (
                    <p className="inline-flex items-center gap-1 text-[11px] text-orange-400 mt-0.5 ml-1"><EyeOff className="w-3 h-3" />Hidden</p>
                )}
            </td>
            <td className="p-4 text-xs text-text-muted whitespace-nowrap">{formatDate(post.createdAt)}</td>
            <td className="p-4 pr-6"><ToggleHideButton post={post} /></td>
        </tr>
    );
}

/* ─── Skeletons ─── */
const SkeletonCard = () => (
    <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        <div className="h-40 bg-surface-hover animate-pulse" />
        <div className="p-4 space-y-3">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-surface-hover animate-pulse shrink-0" />
                <div className="space-y-1.5 flex-1">
                    <div className="w-28 h-3 bg-surface-hover rounded animate-pulse" />
                    <div className="w-36 h-2.5 bg-surface-hover/60 rounded animate-pulse" />
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="w-full h-3 bg-surface-hover/70 rounded animate-pulse" />
                <div className="w-3/4 h-3 bg-surface-hover/50 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-16 h-5 bg-surface-hover/40 rounded-md animate-pulse" />)}
            </div>
        </div>
    </div>
);

const SkeletonRow = () => (
    <tr className="border-b border-border-subtle">
        <td className="p-4 pl-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-hover animate-pulse shrink-0" />
                <div className="space-y-1.5">
                    <div className="w-24 h-3 bg-surface-hover rounded animate-pulse" />
                    <div className="w-32 h-2.5 bg-surface-hover/60 rounded animate-pulse" />
                </div>
            </div>
        </td>
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <td key={i} className="p-4"><div className="w-20 h-3.5 bg-surface-hover/60 rounded animate-pulse" /></td>
        ))}
    </tr>
);

/* ─── All Posts Tab ─── */
const PAGE_LIMIT = 12;

function AllPostsTab() {
    const [page, setPage]           = useState(1);
    const [search, setSearch]       = useState('');
    const [debSearch, setDebSearch] = useState('');
    const [viewMode, setViewMode]   = useState<'grid' | 'table'>('grid');

    const handleSearch = (val: string) => {
        setSearch(val);
        clearTimeout((handleSearch as any)._t);
        (handleSearch as any)._t = setTimeout(() => { setDebSearch(val); setPage(1); }, 400);
    };

    const { data, isLoading, isError, error } = useCommunityPostsQuery({
        page, limit: PAGE_LIMIT, search: debSearch || undefined,
    });

    const posts      = data?.results   ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalItems = data?.totalItems ?? 0;
    const open       = posts.filter(p => p.isOpen).length;
    const hidden     = posts.filter(p => p.postHide).length;

    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Total Posts',   value: totalItems,           color: 'text-white'          },
                    { label: 'Open',          value: isLoading ? '…' : open,  color: 'text-accent-green'  },
                    { label: 'Closed',        value: isLoading ? '…' : posts.length - open, color: 'text-text-muted' },
                    { label: 'Hidden',        value: isLoading ? '…' : hidden, color: 'text-orange-400'  },
                ].map(s => (
                    <div key={s.label} className="bg-surface-card border border-border-subtle rounded-xl p-4">
                        <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color}`}>
                            {isLoading && s.label === 'Total Posts'
                                ? <span className="inline-block w-10 h-7 bg-surface-hover rounded animate-pulse" />
                                : s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Error */}
            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {(error as any)?.response?.data?.message ?? 'Failed to load posts.'}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                        placeholder="Search posts, users, tags..."
                        className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all" />
                </div>
                <div className="flex items-center gap-3">
                    {isLoading && <Loader2 className="w-4 h-4 text-accent-cyan animate-spin" />}
                    {totalItems > 0 && !isLoading && <span className="text-xs text-text-muted">{totalItems} posts</span>}
                    <div className="flex bg-surface border border-border-subtle rounded-lg overflow-hidden">
                        <button onClick={() => setViewMode('grid')}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            Grid
                        </button>
                        <button onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === 'table' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            Table
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading
                        ? [1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)
                        : posts.length > 0
                            ? posts.map((p, i) => <PostCard key={p._id} post={p} index={i} />)
                            : (
                                <div className="col-span-full flex flex-col items-center gap-3 py-16 text-text-muted">
                                    <Users className="w-10 h-10 opacity-30" /><span className="text-sm">No posts found.</span>
                                </div>
                            )
                    }
                </div>
            )}

            {/* Table */}
            {viewMode === 'table' && (
                <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface/50">
                                    <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Post</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Details</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Urgency</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Engagement</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                                    <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading
                                    ? [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                                    : posts.length > 0
                                        ? posts.map((p, i) => <PostRow key={p._id} post={p} index={i} />)
                                        : (
                                            <tr><td colSpan={8} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-3 text-text-muted">
                                                    <Users className="w-10 h-10 opacity-30" /><span className="text-sm">No posts found.</span>
                                                </div>
                                            </td></tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-text-muted">
                    <span className="text-xs">Showing {(page - 1) * PAGE_LIMIT + 1}–{Math.min(page * PAGE_LIMIT, totalItems)} of {totalItems}</span>
                    <div className="flex gap-1">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pg => (
                            <button key={pg} onClick={() => setPage(pg)}
                                className={`px-3 py-1 border rounded-lg text-xs transition-colors ${pg === page
                                    ? 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan font-medium'
                                    : 'border-border-subtle hover:bg-surface-hover text-text-muted'}`}>
                                {pg}
                            </button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                            className="p-1.5 border border-border-subtle rounded-lg hover:bg-surface-hover disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Help Requests Tab (filtered from all posts) ─── */
function HelpRequestsTab() {
    const { data, isLoading, isError } = useCommunityPostsQuery({ page: 1, limit: 50 });
    const posts = (data?.results ?? []).filter(p => p.postType === 'helpost');

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Help Posts</p>
                    <p className="text-2xl font-bold text-white">{isLoading ? '…' : posts.length}</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Open</p>
                    <p className="text-2xl font-bold text-accent-green">{isLoading ? '…' : posts.filter(p => p.isOpen).length}</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">High Urgency</p>
                    <p className="text-2xl font-bold text-red-400">{isLoading ? '…' : posts.filter(p => p.urgencyType === 'high').length}</p>
                </div>
            </div>

            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />Failed to load help requests.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {isLoading
                    ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
                    : posts.length > 0
                        ? posts.map((p, i) => <PostCard key={p._id} post={p} index={i} />)
                        : (
                            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-text-muted">
                                <Users className="w-10 h-10 opacity-30" /><span className="text-sm">No help requests found.</span>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

/* ─── Trending Tab ─── */
function TrendingTab() {
    const { data, isLoading, isError } = useCommunityPostsQuery({ page: 1, limit: 50 });
    const posts = [...(data?.results ?? [])].sort((a, b) => (b.likeCount + b.commentCount + b.offerSend) - (a.likeCount + a.commentCount + a.offerSend));

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2 text-text-muted text-sm">
                <TrendingUp className="w-4 h-4 text-accent-cyan" />
                <span>Posts ranked by total engagement (likes + comments + offers)</span>
            </div>

            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />Failed to load posts.
                </div>
            )}

            <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface/50">
                                <th className="p-4 pl-6 text-xs font-semibold text-text-muted uppercase tracking-wider w-10">#</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Post</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Likes</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Comments</th>
                                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Offers</th>
                                <th className="p-4 pr-6 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {isLoading
                                ? [1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)
                                : posts.map((p, i) => {
                                    const total = p.likeCount + p.commentCount + p.offerSend;
                                    return (
                                        <tr key={p._id} className="hover:bg-surface-hover/30 transition-colors animate-fade-in-up"
                                            style={{ animationDelay: `${0.04 * i}s` }}>
                                            <td className="p-4 pl-6">
                                                <span className={`text-sm font-bold ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-text-secondary' : i === 2 ? 'text-amber-700' : 'text-text-muted'}`}>
                                                    #{i + 1}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    {p.user.image && (
                                                        <img src={p.user.image} alt={p.user.fullName}
                                                            className="w-7 h-7 rounded-full object-cover border border-border-subtle shrink-0"
                                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                    )}
                                                    <span className="text-sm font-medium text-white">{p.user.fullName}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 max-w-[200px]">
                                                <p className="text-xs text-text-secondary truncate">{p.postDescription || '—'}</p>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="flex items-center justify-center gap-1 text-sm font-semibold text-red-400">
                                                    <Heart className="w-3.5 h-3.5" />{p.likeCount}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="flex items-center justify-center gap-1 text-sm font-semibold text-accent-cyan">
                                                    <MessageCircle className="w-3.5 h-3.5" />{p.commentCount}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="flex items-center justify-center gap-1 text-sm font-semibold text-accent-green">
                                                    <ThumbsUp className="w-3.5 h-3.5" />{p.offerSend}
                                                </span>
                                            </td>
                                            <td className="p-4 pr-6 text-center">
                                                <span className="text-sm font-bold text-white">{total}</span>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ─── Moderation Tab ─── */
function ModerationTab() {
    const { data, isLoading, isError } = useCommunityPostsQuery({ page: 1, limit: 50 });
    const hidden = (data?.results ?? []).filter(p => p.postHide);

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Hidden Posts</p>
                    <p className="text-2xl font-bold text-orange-400">{isLoading ? '…' : hidden.length}</p>
                </div>
                <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">Deleted</p>
                    <p className="text-2xl font-bold text-red-400">{isLoading ? '…' : (data?.results ?? []).filter(p => p.isDelete).length}</p>
                </div>
            </div>

            {isError && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />Failed to load moderation data.
                </div>
            )}

            <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border-subtle flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-semibold text-white">Hidden Posts</span>
                    {!isLoading && <span className="text-xs text-orange-400 font-medium ml-auto">{hidden.length} posts hidden</span>}
                </div>
                <div className="p-3 space-y-3">
                    {isLoading
                        ? [1, 2].map(i => <SkeletonCard key={i} />)
                        : hidden.length > 0
                            ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {hidden.map((p, i) => <PostCard key={p._id} post={p} index={i} />)}
                                </div>
                            )
                            : (
                                <div className="flex flex-col items-center gap-3 py-12 text-text-muted">
                                    <ShieldAlert className="w-10 h-10 opacity-30" />
                                    <span className="text-sm">No hidden posts — feed is clean.</span>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

/* ─── Analytics Tab (static) ─── */
function AnalyticsTab() {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Avg. Engagement', value: '—', color: 'text-accent-cyan'  },
                    { label: 'Offer Rate',       value: '—', color: 'text-accent-green' },
                    { label: 'Resolution Rate',  value: '—', color: 'text-amber-400'   },
                    { label: 'Repeat Posters',   value: '—', color: 'text-text-muted'  },
                ].map(s => (
                    <div key={s.label} className="bg-surface-card border border-border-subtle rounded-xl p-4">
                        <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-8 flex flex-col items-center gap-3 text-text-muted">
                <BarChart2 className="w-12 h-12 opacity-30" />
                <p className="text-sm">Community analytics coming soon.</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Community Page
═══════════════════════════════════════════ */
export default function CommunityPosts() {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all',        label: 'All Posts'      },
        { id: 'help',       label: 'Help Requests'  },
        { id: 'trending',   label: 'Trending'       },
        { id: 'moderation', label: 'Moderation'     },
        { id: 'analytics',  label: 'Analytics'      },
    ];

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <Users className="w-6 h-6 text-accent-cyan" />
                    Community
                </h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                    Monitor posts, help requests, engagement, and content moderation.
                </p>
            </div>

            {/* Tab bar */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'}`}>
                            {tab.label}
                            {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div key={activeTab} className="animate-fade-in-up">
                {activeTab === 'all'        && <AllPostsTab />}
                {activeTab === 'help'       && <HelpRequestsTab />}
                {activeTab === 'trending'   && <TrendingTab />}
                {activeTab === 'moderation' && <ModerationTab />}
                {activeTab === 'analytics'  && <AnalyticsTab />}
            </div>
        </div>
    );
}
