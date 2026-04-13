import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { useLoginMutation } from '../../hooks/queries/useLoginMutation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => navigate('/'),
            }
        );
    };

    const errorMessage = loginMutation.error
        ? (loginMutation.error as any)?.response?.data?.message ?? 'Login failed. Please try again.'
        : '';

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-surface" style={{ fontFamily: "'PT Sans Narrow', sans-serif" }}>

            {/* Left side: Branding */}
            <div className="hidden md:flex w-full md:w-1/2 bg-[#0d1117] flex-col justify-between p-12 relative overflow-hidden border-r border-border-subtle">
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at center, #00d4aa 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-cyan blur-[128px] opacity-20 rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <img src="/logo.png" alt="CarCare24x7 Logo" className="h-12 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-4xl font-bold text-white mb-6">CarCare24x7 Administration Platform</h1>
                    <p className="text-text-muted text-lg leading-relaxed">
                        Authorized personnel only. Access to this platform is strictly monitored and logged via IP tracing.
                    </p>
                    <div className="mt-12 flex items-center gap-4 text-sm font-medium text-text-muted">
                        <ShieldAlert className="w-5 h-5 text-accent-cyan" />
                        Zero-Trust Architecture Enabled
                    </div>
                </div>

                <div className="relative z-10 text-sm text-text-muted font-mono">
                    v2.4.0-production • Server: us-east-1
                </div>
            </div>

            {/* Right side: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 relative bg-surface-raised">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="md:hidden flex justify-center mb-10">
                        <img src="/logo.png" alt="CarCare24x7 Logo" className="h-10 w-auto object-contain" />
                    </div>

                    <div className="space-y-8 animate-fade-in-up">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Login</h2>
                            <p className="text-text-muted mt-2">Enter your corporate credentials to continue.</p>
                        </div>

                        {errorMessage && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary block">Work Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                    className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all disabled:opacity-60"
                                    placeholder="name@carcare24x7.com"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-text-secondary block">Password</label>
                                    <Link to="/forgot-password" className="text-sm font-medium text-accent-cyan hover:underline">Forgot password?</Link>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                    className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/40 transition-all font-mono disabled:opacity-60"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="w-full py-3 px-4 bg-accent-cyan text-surface font-semibold rounded-xl hover:bg-accent-cyan/90 focus:ring-4 focus:ring-accent-cyan/20 transition-all shadow-sm shadow-accent-cyan/20 flex justify-center items-center disabled:opacity-70"
                            >
                                {loginMutation.isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="mr-2">Sign In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
