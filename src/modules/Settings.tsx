import { useState } from 'react';
import { Shield, Bell, CreditCard, Gift, Flag, Smartphone, Plus, X, Check, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import type { CustomRole } from '../store/useAuthStore';
import { ROLE_META, PERMISSION_CATEGORIES, ALL_ROLES } from '../lib/permissions';
import type { Permission } from '../lib/permissions';
import { useChangePasswordMutation } from '../hooks/queries/useChangePasswordMutation';

const tabs = [
    { id: 'roles', label: 'Admin Roles', icon: Shield },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'flags', label: 'Feature Flags', icon: Flag },
    { id: 'commission', label: 'Commission Settings', icon: CreditCard },
    { id: 'rewards', label: 'Reward Rules', icon: Gift },
    { id: 'notifications', label: 'Notification Templates', icon: Bell },
    { id: 'version', label: 'App Version', icon: Smartphone },
    { id: 'security', label: 'Security', icon: Lock },
];

// Using dynamic roles instead
// const roles = [ ... ];

const featureFlags = [
    { name: 'carechat_v2_enabled', label: 'CareChat V2 (Beta)', status: true, env: 'Production' },
    { name: 'fleet_portal_enabled', label: 'Fleet Self-Service Portal', status: false, env: 'Staging' },
    { name: 'instant_payout_enabled', label: 'Instant Garage Payouts', status: true, env: 'Production' },
    { name: 'dark_mode_user_app', label: 'Dark Mode (User App)', status: false, env: 'Staging' },
    { name: 'ai_price_suggestions', label: 'AI Price Suggestions', status: true, env: 'Production' },
    { name: 'referral_v3', label: 'Referral System V3', status: false, env: 'Development' },
];

const notificationTemplates = [
    { id: 'booking_confirmed', name: 'Booking Confirmed', channels: 'Push, Email, SMS', lastEdited: 'Oct 20, 2026' },
    { id: 'payment_received', name: 'Payment Received', channels: 'Push, Email', lastEdited: 'Oct 18, 2026' },
    { id: 'payout_settled', name: 'Payout Settled', channels: 'Email', lastEdited: 'Oct 15, 2026' },
    { id: 'kyc_approved', name: 'KYC Approved', channels: 'Push, Email', lastEdited: 'Oct 12, 2026' },
    { id: 'suspension_notice', name: 'Account Suspended', channels: 'Email, SMS', lastEdited: 'Oct 10, 2026' },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState('roles');

    // Custom Role Editor State
    const { customRoles, createCustomRole, updateCustomRole, deleteCustomRole } = useAuthStore();

    // Change Password State
    const changePasswordMutation = useChangePasswordMutation();
    const [oldPassword, setOldPassword]         = useState('');
    const [newPassword, setNewPassword]         = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld]                 = useState(false);
    const [showNew, setShowNew]                 = useState(false);
    const [showConfirm, setShowConfirm]         = useState(false);
    const [pwMatchError, setPwMatchError]       = useState('');

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setPwMatchError('');
        if (newPassword !== confirmPassword) { setPwMatchError('New passwords do not match.'); return; }
        if (newPassword.length < 6)          { setPwMatchError('Password must be at least 6 characters.'); return; }
        if (newPassword === oldPassword)     { setPwMatchError('New password must differ from the old one.'); return; }
        changePasswordMutation.mutate(
            { oldPassword, newPassword },
            {
                onSuccess: () => {
                    setOldPassword(''); setNewPassword(''); setConfirmPassword('');
                    setTimeout(() => changePasswordMutation.reset(), 4000);
                },
            }
        );
    };
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Partial<CustomRole>>({ name: '', description: '', permissions: [] });

    const handleTogglePermission = (perm: Permission) => {
        setEditingRole(prev => {
            const perms = prev.permissions || [];
            if (perms.includes(perm)) {
                return { ...prev, permissions: perms.filter(p => p !== perm) };
            } else {
                return { ...prev, permissions: [...perms, perm] };
            }
        });
    };

    const handleSaveRole = () => {
        if (!editingRole.name) return;

        if (editingRole.id) {
            updateCustomRole(editingRole.id, editingRole);
        } else {
            createCustomRole(editingRole as Omit<CustomRole, 'id' | 'createdAt'>);
        }
        setIsEditorOpen(false);
    };

    return (
        <div className="space-y-5 animate-fade-in-up">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">⚙ System Settings</h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Admin roles, permissions, feature flags, and platform configuration.</p>
            </div>

            {/* Tab Bar */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in-up" key={activeTab}>
                {activeTab === 'roles' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-white">Platform Roles</h3>
                            <button
                                onClick={() => { setEditingRole({ name: '', description: '', permissions: [] }); setIsEditorOpen(true); }}
                                className="px-4 py-2 bg-accent-cyan text-surface font-bold rounded-lg text-sm hover:bg-accent-cyan/90 transition-all flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Create Custom Role
                            </button>
                        </div>

                        {/* Dynamic Custom Roles array from Zustand */}
                        {customRoles.length > 0 && (
                            <div className="bg-surface-card rounded-2xl border border-accent-cyan/30 overflow-hidden mb-6 relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent-cyan"></div>
                                <div className="p-4 bg-accent-cyan/5 border-b border-accent-cyan/10">
                                    <h4 className="text-accent-cyan font-bold text-sm tracking-wide uppercase">Custom Roles (Dynamic)</h4>
                                </div>
                                <div className="divide-y divide-border-subtle">
                                    {customRoles.map((r) => (
                                        <div key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-hover/30 transition-colors group">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-white font-mono">{r.name}</span>
                                                    <span className="text-[10px] text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/20">Custom</span>
                                                </div>
                                                <p className="text-xs text-text-muted mt-1">{r.description}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-text-secondary">{r.permissions.length} Permissions</span>
                                                <button onClick={() => { setEditingRole(r); setIsEditorOpen(true); }} className="text-xs font-bold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Edit Role</button>
                                                <button onClick={() => deleteCustomRole(r.id)} className="text-xs font-bold text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hardcoded IPO-Ready Roles */}
                        <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
                            <div className="p-4 bg-surface border-b border-border-subtle">
                                <h4 className="text-text-secondary font-bold text-sm tracking-wide uppercase">System Standard Roles (Immutable)</h4>
                            </div>
                            <div className="divide-y divide-border-subtle">
                                {ALL_ROLES.map((r) => {
                                    const meta = ROLE_META[r];
                                    return (
                                        <div key={r} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-hover/30 transition-colors">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-white font-mono">{meta.label}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${meta.color} ${meta.bgColor}`}>{meta.tier}</span>
                                                </div>
                                                <p className="text-xs text-text-muted mt-1">{meta.description}</p>
                                            </div>
                                            <span className="text-xs text-text-secondary">Pwr Lvl: {meta.powerLevel}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'permissions' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">Permission Matrix</h3>
                        <div className="overflow-x-auto">
                            <table className="dark-table w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-3">Module</th>
                                        <th className="p-3 text-center">SUPER_ADMIN</th>
                                        <th className="p-3 text-center">FINANCE</th>
                                        <th className="p-3 text-center">OPS_ADMIN</th>
                                        <th className="p-3 text-center">VIEWER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Dashboard', 'Users', 'Bookings', 'Payments', 'Garages', 'Settings', 'Compliance'].map((mod) => (
                                        <tr key={mod}>
                                            <td className="p-3 text-sm font-medium text-white">{mod}</td>
                                            <td className="p-3 text-center text-accent-green text-sm">✓ Full</td>
                                            <td className="p-3 text-center text-sm">{['Payments', 'Dashboard'].includes(mod) ? <span className="text-accent-green">✓ Full</span> : <span className="text-text-muted">— None</span>}</td>
                                            <td className="p-3 text-center text-sm">{['Dashboard', 'Users', 'Bookings', 'Garages'].includes(mod) ? <span className="text-accent-cyan">✓ Edit</span> : <span className="text-text-muted">— None</span>}</td>
                                            <td className="p-3 text-center text-sm"><span className="text-text-muted">👁 Read</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'flags' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
                        <div className="divide-y divide-border-subtle">
                            {featureFlags.map((f) => (
                                <div key={f.name} className="p-5 flex items-center justify-between hover:bg-surface-hover/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${f.status ? 'bg-accent-green' : 'bg-surface'} border border-border-subtle`}>
                                            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${f.status ? 'left-[18px]' : 'left-1'}`}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{f.label}</p>
                                            <p className="text-xs font-mono text-text-muted">{f.name}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${f.env === 'Production' ? 'text-accent-green bg-accent-green/10 border-accent-green/20' : f.env === 'Staging' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'}`}>{f.env}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'commission' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white">Commission Configuration</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Default Rate', value: '20%' },
                                { label: 'Premium Partner Rate', value: '18%' },
                                { label: 'Enterprise Rate', value: '15%' },
                                { label: 'Franchise Rate', value: '12%' },
                            ].map(c => (
                                <div key={c.label} className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-secondary">{c.label}</label>
                                    <input defaultValue={c.value} className="w-full px-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all" />
                                </div>
                            ))}
                        </div>
                        <button className="px-4 py-2 bg-accent-cyan text-surface font-semibold rounded-xl text-sm hover:bg-accent-cyan/90 transition-all">Save Changes</button>
                    </div>
                )}

                {activeTab === 'rewards' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white">Reward Rules Engine</h3>
                        <div className="space-y-4">
                            {[
                                { rule: 'First Booking Reward', value: '$10 wallet credit', status: true },
                                { rule: 'Referral Bonus (Referrer)', value: '$25 wallet credit', status: true },
                                { rule: 'Referral Bonus (Referee)', value: '$15 wallet credit', status: true },
                                { rule: '5th Booking Loyalty', value: '15% discount code', status: true },
                                { rule: 'Birthday Reward', value: '$20 wallet credit', status: false },
                            ].map(r => (
                                <div key={r.rule} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border-subtle">
                                    <div>
                                        <p className="text-sm font-medium text-white">{r.rule}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{r.value}</p>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full relative cursor-pointer ${r.status ? 'bg-accent-green' : 'bg-surface-hover'} border border-border-subtle`}>
                                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${r.status ? 'left-[18px]' : 'left-1'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
                        <div className="divide-y divide-border-subtle">
                            {notificationTemplates.map(n => (
                                <div key={n.id} className="p-5 flex items-center justify-between hover:bg-surface-hover/30 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-white">{n.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">Channels: {n.channels}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-text-muted">{n.lastEdited}</span>
                                        <button className="text-xs text-accent-cyan hover:underline font-medium">Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="max-w-lg space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Change Password</h3>
                            <p className="text-sm text-text-muted mt-1">Update your account password. You'll need your current password to confirm.</p>
                        </div>

                        {/* Success banner */}
                        {changePasswordMutation.isSuccess && (
                            <div className="flex items-center gap-3 p-4 bg-accent-green/10 border border-accent-green/20 rounded-xl text-accent-green text-sm font-medium">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                Password changed successfully.
                            </div>
                        )}

                        {/* Error banner */}
                        {(changePasswordMutation.error || pwMatchError) && (
                            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                {pwMatchError || (changePasswordMutation.error as any)?.response?.data?.message || 'Failed to change password.'}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} className="space-y-5">
                            {/* Old password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Current Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showOld ? 'text' : 'password'} required
                                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                        disabled={changePasswordMutation.isPending}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all font-mono disabled:opacity-60"
                                    />
                                    <button type="button" onClick={() => setShowOld(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                                        {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* New password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">New Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showNew ? 'text' : 'password'} required
                                        value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setPwMatchError(''); }}
                                        disabled={changePasswordMutation.isPending}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all font-mono disabled:opacity-60"
                                    />
                                    <button type="button" onClick={() => setShowNew(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm new password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'} required
                                        value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPwMatchError(''); }}
                                        disabled={changePasswordMutation.isPending}
                                        placeholder="••••••••"
                                        className={`w-full pl-10 pr-10 py-3 bg-surface border rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all font-mono disabled:opacity-60 ${
                                            confirmPassword && confirmPassword !== newPassword
                                                ? 'border-red-500/50 focus:ring-red-500/20'
                                                : confirmPassword && confirmPassword === newPassword
                                                    ? 'border-accent-green/50 focus:ring-accent-green/20'
                                                    : 'border-border-subtle focus:ring-accent-cyan/30 focus:border-accent-cyan/40'
                                        }`}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPassword && (
                                    <p className={`text-[11px] font-medium mt-1 ${confirmPassword === newPassword ? 'text-accent-green' : 'text-red-400'}`}>
                                        {confirmPassword === newPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={changePasswordMutation.isPending || !oldPassword || !newPassword || !confirmPassword}
                                className="px-6 py-2.5 bg-accent-cyan text-surface font-semibold rounded-xl text-sm hover:bg-accent-cyan/90 transition-all disabled:opacity-60 flex items-center gap-2"
                            >
                                {changePasswordMutation.isPending ? (
                                    <><div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" /> Updating…</>
                                ) : (
                                    'Update Password'
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'version' && (
                    <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white">App Version Control</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: 'iOS Build', version: '2.4.0 (Build 142)', status: 'Live' },
                                { label: 'Android Build', version: '2.4.0 (Build 141)', status: 'Live' },
                                { label: 'Admin Panel', version: '2.4.0-rc.1', status: 'Production' },
                            ].map(v => (
                                <div key={v.label} className="card-glow bg-surface rounded-2xl p-5 border border-border-subtle">
                                    <p className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-2">{v.label}</p>
                                    <p className="text-xl font-extrabold text-white font-mono">{v.version}</p>
                                    <span className="text-xs text-accent-green font-semibold mt-2 block">{v.status}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-white">Force Update Rules</h4>
                            {[
                                { label: 'Minimum iOS Version', value: '2.2.0' },
                                { label: 'Minimum Android Version', value: '2.2.0' },
                                { label: 'Maintenance Mode', value: 'Off' },
                            ].map(r => (
                                <div key={r.label} className="flex items-center justify-between p-3 bg-surface rounded-xl border border-border-subtle">
                                    <span className="text-sm text-text-secondary">{r.label}</span>
                                    <span className="text-sm font-medium text-white font-mono">{r.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Role Editor Modal Overlay */}
            {isEditorOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
                    <div className="bg-surface-card w-full max-w-5xl max-h-[90vh] rounded-2xl border border-border-subtle shadow-2xl flex flex-col overflow-hidden animate-scale-in">
                        {/* Modal Header */}
                        <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-surface">
                            <div>
                                <h2 className="text-xl font-bold text-white">{editingRole.id ? 'Edit Custom Role' : 'Create Custom Role'}</h2>
                                <p className="text-xs text-text-muted mt-1">Select exactly what this role can and cannot do.</p>
                            </div>
                            <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-surface-hover rounded-lg text-text-muted transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-8">
                            {/* Left Col: Basics */}
                            <div className="lg:w-1/3 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-text-secondary">Role Name (ID)</label>
                                    <input
                                        type="text"
                                        value={editingRole.name}
                                        onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value.toUpperCase().replace(/\s+/g, '_') })}
                                        placeholder="e.g. DATA_AUDITOR"
                                        className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-text-secondary">Role Description</label>
                                    <textarea
                                        value={editingRole.description}
                                        onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                                        placeholder="Explain what this role is used for..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 resize-none"
                                    />
                                </div>

                                <div className="p-4 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl space-y-2">
                                    <h4 className="font-bold text-accent-cyan text-sm">Summary</h4>
                                    <p className="text-xs text-accent-cyan/80">This role currently has <strong>{editingRole.permissions?.length || 0} permissions</strong> granted.</p>
                                </div>
                            </div>

                            {/* Right Col: Permissions List */}
                            <div className="lg:w-2/3 space-y-8">
                                {Object.entries(PERMISSION_CATEGORIES).map(([category, perms]) => (
                                    <div key={category} className="space-y-3">
                                        <h3 className="text-sm font-bold text-white border-b border-border-subtle pb-2">{category}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {perms.map(perm => {
                                                const isChecked = editingRole.permissions?.includes(perm);
                                                return (
                                                    <label key={perm} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isChecked ? 'bg-accent-cyan/10 border-accent-cyan/30' : 'bg-surface border-border-subtle hover:border-text-muted/30'}`}>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={isChecked || false}
                                                            onChange={() => handleTogglePermission(perm)}
                                                        />
                                                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors ${isChecked ? 'bg-accent-cyan' : 'border border-text-muted bg-surface-card'}`}>
                                                            {isChecked && <Check className="w-3 h-3 text-surface" />}
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs font-mono font-bold ${isChecked ? 'text-accent-cyan' : 'text-text-primary'}`}>{perm}</p>
                                                        </div>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-border-subtle bg-surface flex justify-end gap-3">
                            <button onClick={() => setIsEditorOpen(false)} className="px-5 py-2.5 text-sm font-bold text-text-muted hover:text-white transition-colors">Cancel</button>
                            <button onClick={handleSaveRole} disabled={!editingRole.name} className="px-6 py-2.5 bg-accent-cyan text-surface font-bold rounded-lg text-sm hover:bg-accent-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                Save Role
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
