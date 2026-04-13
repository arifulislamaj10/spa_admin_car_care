import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2, ShieldAlert, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';
import { useForgotPasswordMutation } from '../../hooks/queries/useForgotPasswordMutation';
import { useVerifyEmailMutation } from '../../hooks/queries/useVerifyEmailMutation';
import { useResetPasswordMutation } from '../../hooks/queries/useResetPasswordMutation';

type Step = 'EMAIL' | 'OTP' | 'RESET';

export default function ForgotPassword() {
    const [step, setStep]                   = useState<Step>('EMAIL');
    const [email, setEmail]                 = useState('');
    const [otp, setOtp]                     = useState('');
    const [newPassword, setNewPassword]     = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew]             = useState(false);
    const [showConfirm, setShowConfirm]     = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Tokens flow:  forgotPassword → tempToken → verifyEmail → resetToken → resetPassword
    const [tempToken, setTempToken]   = useState(''); // from forgot-password
    const [resetToken, setResetToken] = useState(''); // from verify-email

    const navigate = useNavigate();

    const forgotMutation = useForgotPasswordMutation();
    const verifyMutation = useVerifyEmailMutation();
    const resetMutation  = useResetPasswordMutation();

    /* ── Step 1: send email ── */
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        forgotMutation.mutate(email, {
            onSuccess: (res) => {
                setTempToken(res.data.attributes.access.token);
                setStep('OTP');
            },
        });
    };

    /* ── Step 2: verify OTP ── */
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verifyMutation.mutate(
            { code: otp, accessToken: tempToken },
            {
                onSuccess: (res) => {
                    setResetToken(res.data.attributes.tokens.access.token);
                    setStep('RESET');
                },
            }
        );
    };

    /* ── Step 3: reset password ── */
    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }
        resetMutation.mutate(
            { password: newPassword, accessToken: resetToken },
            { onSuccess: () => navigate('/login') }
        );
    };

    const emailError = forgotMutation.error
        ? (forgotMutation.error as any)?.response?.data?.message ?? 'Something went wrong. Try again.'
        : '';
    const otpError = verifyMutation.error
        ? (verifyMutation.error as any)?.response?.data?.message ?? 'Invalid code. Please try again.'
        : '';
    const resetError = resetMutation.error
        ? (resetMutation.error as any)?.response?.data?.message ?? 'Failed to reset password. Try again.'
        : '';

    const goBack = () => {
        if (step === 'OTP')   { setStep('EMAIL'); verifyMutation.reset(); setOtp(''); }
        if (step === 'RESET') { setStep('OTP');   resetMutation.reset(); setNewPassword(''); setConfirmPassword(''); setPasswordError(''); }
    };

    /* ── Progress indicator ── */
    const steps = ['Email', 'Verify OTP', 'New Password'];
    const stepIndex = step === 'EMAIL' ? 0 : step === 'OTP' ? 1 : 2;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-6" style={{ fontFamily: "'PT Sans Narrow', sans-serif" }}>

            <div className="w-full max-w-md bg-surface-card rounded-3xl shadow-2xl shadow-black/40 p-8 sm:p-12 border border-border-subtle relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-accent-purple" />

                {/* Back button */}
                {step === 'EMAIL' ? (
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-white transition-colors mb-6 group">
                        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> Back to Login
                    </Link>
                ) : (
                    <button onClick={goBack} className="inline-flex items-center text-sm font-medium text-text-muted hover:text-white transition-colors mb-6 group">
                        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> Back
                    </button>
                )}

                {/* Step progress */}
                <div className="flex items-center gap-2 mb-8">
                    {steps.map((label, i) => (
                        <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                            <div className="flex items-center gap-1.5">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                                    i < stepIndex  ? 'bg-accent-cyan text-surface' :
                                    i === stepIndex ? 'bg-accent-cyan text-surface ring-4 ring-accent-cyan/20' :
                                                     'bg-surface border border-border-subtle text-text-muted'
                                }`}>
                                    {i < stepIndex ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                                </div>
                                <span className={`text-[11px] font-medium hidden sm:block ${i === stepIndex ? 'text-white' : 'text-text-muted'}`}>{label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`flex-1 h-px transition-all ${i < stepIndex ? 'bg-accent-cyan' : 'bg-border-subtle'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Step 1: Email ── */}
                {step === 'EMAIL' && (
                    <div className="animate-fade-in-up">
                        <div className="w-12 h-12 bg-surface border border-border-subtle rounded-2xl flex items-center justify-center mb-6">
                            <Mail className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Recover Password</h1>
                        <p className="text-text-muted text-sm mb-8 leading-relaxed">
                            Enter your authorized work email. We'll send a one-time verification code.
                        </p>

                        {emailError && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />{emailError}
                            </div>
                        )}

                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Work Email</label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type="email" required value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={forgotMutation.isPending}
                                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all disabled:opacity-60"
                                        placeholder="name@carcare24x7.com"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={forgotMutation.isPending || !email}
                                className="w-full py-3 px-4 bg-white text-surface font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-md disabled:opacity-70 flex justify-center items-center">
                                {forgotMutation.isPending
                                    ? <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                                    : 'Send Verification Code'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Step 2: OTP ── */}
                {step === 'OTP' && (
                    <div className="animate-fade-in-up">
                        <div className="w-12 h-12 bg-surface border border-border-subtle rounded-2xl flex items-center justify-center mb-6">
                            <KeyRound className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Enter OTP</h1>
                        <p className="text-text-muted text-sm mb-8 leading-relaxed">
                            A 6-digit code was sent to <span className="font-semibold text-white">{email}</span>. Enter it below.
                        </p>

                        {otpError && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />{otpError}
                            </div>
                        )}

                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Verification Code</label>
                                <input
                                    type="text" inputMode="numeric" maxLength={6} required
                                    value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    disabled={verifyMutation.isPending} autoFocus
                                    className="w-full px-4 py-4 bg-surface border border-border-subtle rounded-xl text-2xl tracking-[0.6em] text-center text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 placeholder:tracking-normal transition-all font-mono disabled:opacity-60"
                                    placeholder="000000"
                                />
                                <p className="text-[11px] text-text-muted mt-1">
                                    Didn't receive the code?{' '}
                                    <button type="button" onClick={() => { setStep('EMAIL'); forgotMutation.reset(); verifyMutation.reset(); setOtp(''); }}
                                        className="text-accent-cyan hover:underline font-medium">Resend</button>
                                </p>
                            </div>
                            <button type="submit" disabled={verifyMutation.isPending || otp.length !== 6}
                                className="w-full py-3 px-4 bg-accent-cyan text-surface font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all shadow-sm shadow-accent-cyan/20 disabled:opacity-70 flex justify-center items-center">
                                {verifyMutation.isPending
                                    ? <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                                    : 'Verify Code'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Step 3: Reset Password ── */}
                {step === 'RESET' && (
                    <div className="animate-fade-in-up">
                        <div className="w-12 h-12 bg-surface border border-border-subtle rounded-2xl flex items-center justify-center mb-6">
                            <Lock className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">New Password</h1>
                        <p className="text-text-muted text-sm mb-8 leading-relaxed">
                            Create a strong new password for your account.
                        </p>

                        {(resetError || passwordError) && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                                {passwordError || resetError}
                            </div>
                        )}

                        {resetMutation.isSuccess && (
                            <div className="mb-6 p-4 bg-accent-green/10 border border-accent-green/20 text-accent-green rounded-xl text-sm font-medium flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                Password reset! Redirecting to login…
                            </div>
                        )}

                        <form onSubmit={handleResetSubmit} className="space-y-5">
                            {/* New password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">New Password</label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showNew ? 'text' : 'password'} required
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={resetMutation.isPending || resetMutation.isSuccess}
                                        className="w-full pl-11 pr-11 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all font-mono disabled:opacity-60"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowNew(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'} required
                                        value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                                        disabled={resetMutation.isPending || resetMutation.isSuccess}
                                        className={`w-full pl-11 pr-11 py-3 bg-surface border rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all font-mono disabled:opacity-60 ${
                                            confirmPassword && confirmPassword !== newPassword
                                                ? 'border-red-500/50 focus:ring-red-500/20'
                                                : confirmPassword && confirmPassword === newPassword
                                                    ? 'border-accent-green/50 focus:ring-accent-green/20'
                                                    : 'border-border-subtle focus:ring-accent-cyan/30 focus:border-accent-cyan/40'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    {/* Live match indicator */}
                                    {confirmPassword && (
                                        <span className={`absolute -bottom-5 right-0 text-[11px] font-medium ${confirmPassword === newPassword ? 'text-accent-green' : 'text-red-400'}`}>
                                            {confirmPassword === newPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-5">
                                <button type="submit"
                                    disabled={resetMutation.isPending || resetMutation.isSuccess || !newPassword || !confirmPassword}
                                    className="w-full py-3 px-4 bg-accent-cyan text-surface font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all shadow-sm shadow-accent-cyan/20 disabled:opacity-70 flex justify-center items-center">
                                    {resetMutation.isPending
                                        ? <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                                        : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <p className="text-xs text-center text-text-muted mt-8 max-w-xs">
                System access is logged. Unauthorized attempts may be subject to legal prosecution.
            </p>
        </div>
    );
}
