import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { initAnalytics } from "./lib/analytics";
import Dashboard from "./modules/Dashboard";
import Users from "./modules/Users";
import Bookings from "./modules/Bookings";
import Payments from "./modules/Payments";
import Settings from "./modules/Settings";
import Login from "./modules/Auth/Login";
import ForgotPassword from "./modules/Auth/ForgotPassword";

// New Modules
import GarageNetwork from "./modules/GarageNetwork";
import InHouseGarages from "./modules/InHouseGarages";
import FranchiseLocations from "./modules/FranchiseLocations";
import ApplicationsQueue from "./modules/ApplicationsQueue";
import SubscriptionPlans from "./modules/SubscriptionPlans";
import CommissionRates from "./modules/CommissionRates";
import PerformanceScores from "./modules/PerformanceScores";
import SLAMonitoring from "./modules/SLAMonitoring";
import GarageContracts from "./modules/GarageContracts";
import TerritoryMap from "./modules/TerritoryMap";

// Marketing & Ads
import SponsoredListings from "./modules/SponsoredListings";
import BoostedGarages from "./modules/BoostedGarages";
import AdCampaigns from "./modules/AdCampaigns";
import AdBilling from "./modules/AdBilling";
import CPMAnalytics from "./modules/CPMAnalytics";
import PromoCodeEngine from "./modules/PromoCodeEngine";

// Analytics
import UserGrowth from "./modules/UserGrowth";
import RetentionRate from "./modules/RetentionRate";
import BookingConversion from "./modules/BookingConversion";
import GeographicHeatmaps from "./modules/GeographicHeatmaps";
import ServiceTrendAnalysis from "./modules/ServiceTrendAnalysis";
import LifetimeValue from "./modules/LifetimeValue";
import CohortAnalysis from "./modules/CohortAnalysis";

// Operations & Risk
import TicketQueue from "./modules/TicketQueue";
import Disputes from "./modules/Disputes";
import FraudMonitoring from "./modules/FraudMonitoring";
import SuspiciousWalletActivity from "./modules/SuspiciousWalletActivity";
import AbuseReports from "./modules/AbuseReports";
import RiskScoreDashboard from "./modules/RiskScoreDashboard";
import BlacklistControl from "./modules/BlacklistControl";

// System Control
import PermissionsMatrix from "./modules/PermissionsMatrix";
import FeatureFlags from "./modules/FeatureFlags";
import CommissionSettings from "./modules/CommissionSettings";
import RewardEngineRules from "./modules/RewardEngineRules";
import NotificationTemplates from "./modules/NotificationTemplates";
import AppVersionControl from "./modules/AppVersionControl";
import RegionManagement from "./modules/RegionManagement";

import WalletEngine from "./modules/WalletEngine";
import Payouts from "./modules/Payouts";
import RevenueEngine from "./modules/RevenueEngine";
import Marketing from "./modules/Marketing";
import SupportDesk from "./modules/SupportDesk";
import CareChatAI from "./modules/CareChatAI";
import CareChartData from "./modules/CareChartData";
import ApiIntegrations from "./modules/ApiIntegrations";
import AnalyticsDashboard from "./modules/AnalyticsDashboard";
import Compliance from "./modules/Compliance";
import LiveActivity from "./modules/LiveActivity";
import SystemAlerts from "./modules/SystemAlerts";
import ExecutiveSnapshot from "./modules/ExecutiveSnapshot";
import PlatformHealth from "./modules/PlatformHealth";

/* ─── Enterprise Placeholder Page ─── */
const EP = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc?: string;
  icon?: string;
}) => (
  <div className="h-full flex items-center justify-center animate-scale-in">
    <div className="text-center max-w-lg">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-5">
        <span className="text-2xl sm:text-3xl">{icon || "🚧"}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-text-muted text-sm leading-relaxed">
        {desc ||
          "This module is under development and will be available in a future release."}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-subtle rounded-full text-xs text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
        Planned for Q3 2026
      </div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* ── OVERVIEW ── */}
          <Route index element={<Dashboard />} />
          <Route path="live-activity" element={<LiveActivity />} />
          <Route path="system-alerts" element={<SystemAlerts />} />
          <Route path="executive-snapshot" element={<ExecutiveSnapshot />} />
          <Route path="platform-health" element={<PlatformHealth />} />

          {/* ── IDENTITY & USERS ── */}
          <Route
            path="users/customers"
            element={
              <Users
                defaultFilter="CUSTOMER"
                pageTitle="Customers"
                pageDesc="Manage individual customers and app users."
              />
            }
          />
          <Route
            path="users/mechanics"
            element={
              <Users
                defaultFilter="MECHANIC"
                pageTitle="Mechanics"
                pageDesc="Manage independent and garage-affiliated mechanics."
              />
            }
          />
          <Route
            path="users/garages"
            element={
              <Users
                defaultFilter="GARAGE_OWNER"
                pageTitle="Garage Owners"
                pageDesc="Manage business accounts for garage owners."
              />
            }
          />
          <Route
            path="users/fleet"
            element={
              <Users
                defaultFilter="FLEET"
                pageTitle="Fleet / Enterprise"
                pageDesc="Manage corporate fleet and B2B enterprise accounts."
              />
            }
          />
          <Route
            path="users/admins"
            element={
              <Users
                defaultFilter="SUPER_ADMIN"
                pageTitle="Admin Users"
                pageDesc="Platform administrators with elevated permissions."
              />
            }
          />
          <Route
            path="users/suspended"
            element={
              <Users
                defaultFilter="SUSPENDED"
                pageTitle="Suspended Accounts"
                pageDesc="Review and manage suspended or banned users."
              />
            }
          />
          <Route
            path="users/kyc"
            element={
              <EP
                title="KYC Verification Queue"
                desc="Document verification pipeline for identity compliance. Review pending, approved, and rejected KYC submissions."
                icon="🪪"
              />
            }
          />
          <Route
            path="users/aml"
            element={
              <EP
                title="AML Monitoring"
                desc="Anti-money laundering watchlist triggers, suspicious patterns, and regulatory flags."
                icon="🔍"
              />
            }
          />
          <Route
            path="users/freeze-logs"
            element={
              <EP
                title="Account Freeze Logs"
                desc="Audit trail of all frozen accounts, timestamps, freeze reasons, and admin actions."
                icon="🧊"
              />
            }
          />

          {/* ── GARAGE NETWORK ── */}
          <Route path="garages/all" element={<GarageNetwork />} />
          <Route path="garages/in-house" element={<InHouseGarages />} />
          <Route path="garages/franchise" element={<FranchiseLocations />} />
          <Route path="garages/applications" element={<ApplicationsQueue />} />
          <Route path="garages/subscriptions" element={<SubscriptionPlans />} />
          <Route path="garages/commissions" element={<CommissionRates />} />
          <Route path="garages/performance" element={<PerformanceScores />} />
          <Route path="garages/sla" element={<SLAMonitoring />} />
          <Route path="garages/contracts" element={<GarageContracts />} />
          <Route path="garages/territory-map" element={<TerritoryMap />} />

          {/* ── BOOKINGS ENGINE ── */}
          <Route path="bookings/all" element={<Bookings />} />
          <Route
            path="bookings/live"
            element={
              <EP
                title="Live Bookings"
                desc="Real-time feed of bookings currently in progress across all garages."
                icon="📡"
              />
            }
          />
          <Route
            path="bookings/cancelled"
            element={
              <EP
                title="Cancelled Bookings"
                desc="Cancellation log with reasons, refund status, and pattern detection."
                icon="❌"
              />
            }
          />
          <Route
            path="bookings/disputes"
            element={
              <EP
                title="Booking Disputes"
                desc="Customer-garage disputes requiring mediation. Escalation workflow and resolution tracking."
                icon="⚖️"
              />
            }
          />
          <Route
            path="bookings/escalations"
            element={
              <EP
                title="Escalations"
                desc="High-priority issues escalated beyond L1 support. SLA-bound resolution pipeline."
                icon="🔺"
              />
            }
          />
          <Route
            path="bookings/refunds"
            element={
              <EP
                title="Refund Requests"
                desc="Pending refund approvals, auto-refund rules, and refund rate analytics."
                icon="↩️"
              />
            }
          />
          <Route
            path="bookings/sla"
            element={
              <EP
                title="Booking SLA Tracker"
                desc="Booking lifecycle SLA: confirmation, arrival, completion, and follow-up targets."
                icon="⏰"
              />
            }
          />
          <Route
            path="bookings/insights"
            element={
              <EP
                title="Service Category Insights"
                desc="Breakdown by service type, trending services, seasonal patterns, and pricing analytics."
                icon="📊"
              />
            }
          />

          {/* ── FINTECH CORE ── */}
          <Route path="fintech/float" element={<WalletEngine />} />
          <Route
            path="fintech/balances"
            element={
              <EP
                title="User Wallet Balances"
                desc="Individual wallet balance lookup, top-up history, and spending patterns."
                icon="🐷"
              />
            }
          />
          <Route
            path="fintech/deposits"
            element={
              <EP
                title="Deposit Activity"
                desc="Inbound wallet deposits: bank transfers, card top-ups, and reward credits."
                icon="⬇️"
              />
            }
          />
          <Route
            path="fintech/withdrawals"
            element={
              <EP
                title="Withdrawal Activity"
                desc="Outbound withdrawal requests, processing times, and failure tracking."
                icon="⬆️"
              />
            }
          />
          <Route
            path="fintech/locked"
            element={
              <EP
                title="Locked Funds"
                desc="Funds held in escrow for active bookings, disputed transactions, and compliance holds."
                icon="🔒"
              />
            }
          />
          <Route
            path="fintech/rewards"
            element={
              <EP
                title="Reward Liability"
                desc="Outstanding reward points/credits balance across all users. Burn rate projections."
                icon="🎁"
              />
            }
          />
          <Route
            path="fintech/float-region"
            element={
              <EP
                title="Float Exposure by Region"
                desc="Geographic breakdown of wallet float concentrations and regional risk assessment."
                icon="🌍"
              />
            }
          />
          <Route
            path="fintech/transactions"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "FINANCE_ADMIN"]}>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="fintech/failed"
            element={
              <EP
                title="Failed Payments"
                desc="Payment failures, decline codes, retry logic, and customer impact analysis."
                icon="🚫"
              />
            }
          />
          <Route
            path="fintech/chargebacks"
            element={
              <EP
                title="Chargebacks"
                desc="Chargeback disputes, evidence submission pipeline, and win-rate analytics."
                icon="🔄"
              />
            }
          />
          <Route
            path="fintech/refunds"
            element={
              <EP
                title="Refunds"
                desc="Refund processing queue, auto-refund rules, and net refund impact on revenue."
                icon="↩️"
              />
            }
          />
          <Route
            path="fintech/stripe"
            element={
              <EP
                title="Stripe Logs"
                desc="Raw Stripe API event logs, payment intents, and charge lifecycle tracking."
                icon="⚡"
              />
            }
          />
          <Route
            path="fintech/webhooks"
            element={
              <EP
                title="Webhook Logs"
                desc="Inbound and outbound webhook delivery, retry queue, and failure debugging."
                icon="🔌"
              />
            }
          />
          <Route path="fintech/payouts-pending" element={<Payouts />} />
          <Route
            path="fintech/settlements"
            element={
              <EP
                title="Settlement Cycles"
                desc="T+1 / T+3 settlement schedules, batch history, and reconciliation dashboard."
                icon="🔁"
              />
            }
          />
          <Route
            path="fintech/adjustments"
            element={
              <EP
                title="Manual Adjustments"
                desc="Admin-initiated balance adjustments, credits, and debit corrections with audit trail."
                icon="💵"
              />
            }
          />
          <Route
            path="fintech/payout-failures"
            element={
              <EP
                title="Payout Failures"
                desc="Failed payout attempts, bank rejection codes, and retry management."
                icon="⚠️"
              />
            }
          />
          <Route path="fintech/rev-commission" element={<RevenueEngine />} />
          <Route
            path="fintech/rev-subscription"
            element={
              <EP
                title="Subscription Revenue"
                desc="MRR, ARR, churn, and upgrade/downgrade analytics for garage subscriptions."
                icon="💳"
              />
            }
          />
          <Route
            path="fintech/rev-ads"
            element={
              <EP
                title="Ad Revenue"
                desc="Revenue from sponsored listings, boosted garages, and targeted campaign placements."
                icon="📢"
              />
            }
          />
          <Route
            path="fintech/rev-franchise"
            element={
              <EP
                title="Franchise Revenue"
                desc="Franchise licensing fees, royalty tracking, and franchise P&L statements."
                icon="🔗"
              />
            }
          />
          <Route
            path="fintech/rev-data"
            element={
              <EP
                title="Data Revenue"
                desc="B2B data licensing revenue from CareChart vehicle and service intelligence."
                icon="🗄"
              />
            }
          />
          <Route
            path="fintech/net-profit"
            element={
              <EP
                title="Net Platform Profit"
                desc="Consolidated P&L: all revenue streams minus COGS, opex, and payouts."
                icon="🧮"
              />
            }
          />

          {/* ── MARKETING & ADS ── */}
          <Route path="marketing/offers" element={<Marketing />} />
          <Route path="marketing/sponsored" element={<SponsoredListings />} />
          <Route path="marketing/boosted" element={<BoostedGarages />} />
          <Route path="marketing/campaigns" element={<AdCampaigns />} />
          <Route path="marketing/billing" element={<AdBilling />} />
          <Route path="marketing/cpm" element={<CPMAnalytics />} />
          <Route path="marketing/promo-codes" element={<PromoCodeEngine />} />

          {/* ── OPERATIONS & RISK ── */}
          <Route path="ops/support" element={<SupportDesk />} />
          <Route path="ops/tickets" element={<TicketQueue />} />
          <Route path="ops/disputes" element={<Disputes />} />
          <Route path="ops/fraud" element={<FraudMonitoring />} />
          <Route path="ops/suspicious" element={<SuspiciousWalletActivity />} />
          <Route path="ops/abuse" element={<AbuseReports />} />
          <Route path="ops/risk" element={<RiskScoreDashboard />} />
          <Route path="ops/blacklist" element={<BlacklistControl />} />

          {/* ── AI & DATA ── */}
          <Route path="ai/carechat" element={<CareChatAI />} />
          <Route
            path="ai/prompts"
            element={
              <EP
                title="Prompt Library"
                desc="Custom prompt templates for CareChat behavior, tone, and domain-specific responses."
                icon="📖"
              />
            }
          />
          <Route
            path="ai/models"
            element={
              <EP
                title="Model Versions"
                desc="Active model deployments, A/B test results, and rollback management."
                icon="🧠"
              />
            }
          />
          <Route
            path="ai/errors"
            element={
              <EP
                title="AI Error Logs"
                desc="CareChat failure logs, hallucination flags, and user dissatisfaction markers."
                icon="🐛"
              />
            }
          />
          <Route path="ai/service-records" element={<CareChartData />} />
          <Route
            path="ai/vehicles"
            element={
              <EP
                title="Vehicle Data Insights"
                desc="Make/model analytics, common repair patterns, and predictive maintenance signals."
                icon="🚗"
              />
            }
          />
          <Route
            path="ai/exports"
            element={
              <EP
                title="Export Requests"
                desc="Pending and completed data export requests for B2B clients and internal teams."
                icon="📥"
              />
            }
          />
          <Route
            path="ai/licensing"
            element={
              <EP
                title="Data Licensing Clients"
                desc="Active B2B data licensing agreements, revenue tracking, and access control."
                icon="🔑"
              />
            }
          />
          <Route path="ai/api-clients" element={<ApiIntegrations />} />
          <Route
            path="ai/integrations"
            element={
              <EP
                title="Third-Party Connections"
                desc="Active integrations: Stripe, Twilio, Google Maps, insurance APIs, and OEM feeds."
                icon="🔗"
              />
            }
          />
          <Route
            path="ai/webhook-monitor"
            element={
              <EP
                title="Webhook Monitor"
                desc="Real-time webhook event monitoring, delivery status, and retry queue management."
                icon="🔌"
              />
            }
          />

          {/* ── ANALYTICS ── */}
          <Route path="analytics/revenue" element={<AnalyticsDashboard />} />
          <Route path="analytics/user-growth" element={<UserGrowth />} />
          <Route path="analytics/retention" element={<RetentionRate />} />
          <Route path="analytics/conversion" element={<BookingConversion />} />
          <Route path="analytics/heatmaps" element={<GeographicHeatmaps />} />
          <Route path="analytics/trends" element={<ServiceTrendAnalysis />} />
          <Route path="analytics/ltv" element={<LifetimeValue />} />
          <Route path="analytics/cohorts" element={<CohortAnalysis />} />

          {/* ── COMPLIANCE ── */}
          <Route path="compliance/admin-logs" element={<Compliance />} />
          <Route
            path="compliance/audit"
            element={
              <EP
                title="Audit Trail"
                desc="Immutable event log for SOC2 / ISO 27001 compliance. Export-ready format."
                icon="🔏"
              />
            }
          />
          <Route
            path="compliance/kyc-aml"
            element={
              <EP
                title="KYC / AML Records"
                desc="Combined identity verification and anti-money laundering compliance records."
                icon="📋"
              />
            }
          />
          <Route
            path="compliance/tax"
            element={
              <EP
                title="Tax Reporting"
                desc="Automated GST/HST calculations, tax remittance schedules, and CRA-ready reports."
                icon="🏛"
              />
            }
          />
          <Route
            path="compliance/regulatory"
            element={
              <EP
                title="Regulatory Reports"
                desc="FINTRAC, PIPEDA, and provincial regulatory filing queue and status tracking."
                icon="📑"
              />
            }
          />
          <Route
            path="compliance/privacy"
            element={
              <EP
                title="Privacy Logs (PIPEDA/GDPR)"
                desc="Data access requests, deletion requests, consent management, and breach notifications."
                icon="🛡"
              />
            }
          />
          <Route
            path="compliance/incidents"
            element={
              <EP
                title="Incident Reports"
                desc="Security incidents, data breaches, service outages, and post-mortem documentation."
                icon="📄"
              />
            }
          />

          {/* ── SYSTEM CONTROL ── */}
          <Route path="system/roles" element={<Settings />} />
          <Route path="system/permissions" element={<PermissionsMatrix />} />
          <Route path="system/feature-flags" element={<FeatureFlags />} />
          <Route path="system/commission" element={<CommissionSettings />} />
          <Route path="system/rewards" element={<RewardEngineRules />} />
          <Route
            path="system/notifications"
            element={<NotificationTemplates />}
          />
          <Route path="system/versions" element={<AppVersionControl />} />
          <Route
            path="system/environment"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN", "TECH_ROOT"]}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="system/regions" element={<RegionManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
