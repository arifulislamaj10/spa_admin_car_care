import { CreditCard, Check, X, Shield, Zap, Star, ArrowUpRight, ArrowDownRight, Users } from 'lucide-react';

const plans = [
    {
        id: 'free',
        name: 'Basic Listing',
        price: '$0',
        interval: 'forever',
        description: 'Essential platform visibility for small, independent garages.',
        subscribers: 1420,
        mrr: '$0',
        color: 'text-text-muted',
        bg: 'bg-surface-hover',
        border: 'border-border-subtle',
        features: [
            { name: 'Standard Directory Listing', included: true },
            { name: 'Receive Booking Requests', included: true },
            { name: 'Basic Reporting Dashboard', included: true },
            { name: '12% Platform Commission', included: true, info: 'Standard rate' },
            { name: 'Sponsored Placements', included: false },
            { name: 'CareChat AI Summaries', included: false },
            { name: 'Dedicated Account Manager', included: false },
        ],
    },
    {
        id: 'pro',
        name: 'CarCare Pro',
        price: '$99',
        interval: '/ month',
        description: 'Advanced tools to grow revenue and optimize garage throughput.',
        subscribers: 854,
        mrr: '$84,546',
        popular: true,
        color: 'text-accent-cyan',
        bg: 'bg-accent-cyan/10',
        border: 'border-accent-cyan/30',
        features: [
            { name: 'Priority Directory Listing', included: true },
            { name: 'Receive Booking Requests', included: true },
            { name: 'Advanced Cohort Analytics', included: true },
            { name: '9.5% Platform Commission', included: true, info: 'Reduced rate' },
            { name: '1 Sponsored Placement / mo', included: true },
            { name: 'CareChat AI Summaries', included: true },
            { name: 'Dedicated Account Manager', included: false },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Fleet',
        price: '$399',
        interval: '/ month',
        description: 'Full-suite management for multi-location and high-volume garages.',
        subscribers: 112,
        mrr: '$44,688',
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/30',
        features: [
            { name: 'Featured Directory Listing', included: true },
            { name: 'Receive Booking Requests', included: true },
            { name: 'Custom BI Integrations', included: true },
            { name: '7% Platform Commission', included: true, info: 'Lowest rate' },
            { name: 'Unlimited Sponsored Placements', included: true },
            { name: 'CareChat AI Summaries', included: true },
            { name: 'Dedicated Account Manager', included: true },
        ],
    },
];

export default function SubscriptionPlans() {
    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-purple-400" />
                        Subscription Plans
                    </h1>
                    <p className="text-text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        Manage pricing tiers, feature gates, and recurring SaaS revenue from partner garages.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-surface-card border border-border-subtle hover:bg-surface-hover rounded-lg text-sm font-semibold text-text-primary transition-colors flex items-center gap-2">
                        Pricing Settings
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Create New Tier
                    </button>
                </div>
            </div>

            {/* Subscription KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
                            <Shield className="w-5 h-5 text-text-muted" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Total Subscribers</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">2,386</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-accent-green" /> 124 this month
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-accent-cyan" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Total MRR</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">$129.2K</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-accent-green" /> $8.4k this month
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-accent-green/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                            <Star className="w-5 h-5 text-accent-green" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Avg Rev Per User (ARPU)</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">$54.16</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-accent-green" /> Blended rate
                    </p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <X className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-text-muted text-sm font-medium">Net Churn Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">1.8%</p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3 text-accent-green" /> Improvement vs Q1
                    </p>
                </div>
            </div>

            {/* Pricing Tiers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                {plans.map((plan) => (
                    <div key={plan.id} className={`relative flex flex-col bg-surface-card border ${plan.border} rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300`}>
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute top-0 inset-x-0 h-1 bg-accent-cyan" />
                        )}
                        {plan.popular && (
                            <div className="absolute top-5 right-5 px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-[10px] uppercase tracking-wider font-bold rounded-full">
                                Most Popular
                            </div>
                        )}

                        <div className="p-6 border-b border-border-subtle bg-gradient-to-b from-surface to-surface-card">
                            <h3 className={`text-xl font-bold ${plan.color}`}>{plan.name}</h3>
                            <p className="text-xs text-text-muted mt-2 min-h-[32px]">{plan.description}</p>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                                <span className="text-sm text-text-muted font-medium">{plan.interval}</span>
                            </div>
                            <button className={`w-full mt-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${plan.popular
                                    ? 'bg-accent-cyan text-[#0d1117] hover:bg-accent-cyan/90 shadow-[0_0_15px_rgba(0,212,170,0.2)]'
                                    : 'bg-surface-hover text-white hover:bg-surface-hover/80 border border-border-subtle'
                                }`}>
                                Edit Plan Tier
                            </button>
                        </div>

                        <div className="p-6 bg-surface-card flex-1">
                            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Included Features</p>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {feature.included ? (
                                                <Check className={`w-4 h-4 ${plan.color}`} />
                                            ) : (
                                                <X className="w-4 h-4 text-text-muted/40" />
                                            )}
                                        </div>
                                        <div>
                                            <span className={`text-sm block ${feature.included ? 'text-text-secondary' : 'text-text-muted/50'}`}>
                                                {feature.name}
                                            </span>
                                            {feature.info && feature.included && (
                                                <span className="text-[10px] text-text-muted block mt-0.5">{feature.info}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 border-t border-border-subtle bg-surface-hover/20 flex gap-4">
                            <div className="flex-1">
                                <p className="flex items-center gap-1.5 text-xs text-text-muted mb-1"><Users className="w-3.5 h-3.5" /> Subscribers</p>
                                <p className="text-lg font-bold text-white">{plan.subscribers}</p>
                            </div>
                            <div className="w-px bg-border-subtle" />
                            <div className="flex-1">
                                <p className="flex items-center gap-1.5 text-xs text-text-muted mb-1"><Zap className="w-3.5 h-3.5" /> Est. MRR</p>
                                <p className="text-lg font-bold text-white">{plan.mrr}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
