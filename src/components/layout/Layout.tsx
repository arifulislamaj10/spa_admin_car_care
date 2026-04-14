import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  ShieldCheck,
  FileCheck,
  Building2,
  ClipboardList,
  BarChart3,
  CalendarCheck,
  Scale,
  RotateCcw,
  Wallet,
  PiggyBank,
  ArrowDownCircle,
  ArrowUpRight,
  Lock,
  Gift,
  Receipt,
  DollarSign,
  Megaphone,
  Database,
  Tag,
  Sparkles,
  Rocket,
  Target,
  CircleDollarSign,
  Hash,
  Headphones,
  Ticket,
  Siren,
  Eye,
  Flag,
  Skull,
  List,
  Bot,
  BookOpen,
  Cpu,
  Bug,
  Stethoscope,
  Car,
  Download,
  Key,
  Link2,
  Server,
  Plug,
  LineChart,
  UserPlus,
  Repeat2,
  ArrowRightLeft,
  MapPin,
  Heart,
  UsersRound,
  ScrollText,
  Fingerprint,
  Landmark,
  FileSpreadsheet,
  Shield,
  Clipboard,
  Settings,
  UserCog,
  Grid3X3,
  Sliders,
  Bell,
  Smartphone,
  CloudCog,
  MapPinned,
  LogOut,
  Search,
  Menu,
  Settings2,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useState, useEffect, useCallback, useRef } from "react";
import { isSectionLocked, ROLE_META } from "../../lib/permissions";
import { AIAssistant } from "./AIAssistant";

interface NavItem {
  name: string;
  to: string;
  icon: any;
}
interface NavSection {
  label: string;
  sectionIcon: any;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: "OVERVIEW",
    sectionIcon: LayoutDashboard,
    items: [
      { name: "Dashboard", to: "/", icon: LayoutDashboard },
      // { name: 'Live Activity', to: '/live-activity', icon: Activity },
      // { name: 'System Alerts', to: '/system-alerts', icon: AlertTriangle },
      // { name: 'Executive Snapshot', to: '/executive-snapshot', icon: Gauge },
      // { name: 'Platform Health', to: '/platform-health', icon: HeartPulse },
    ],
  },
  {
    label: "IDENTITY & USERS",
    sectionIcon: Users,
    items: [
      { name: "Customers", to: "/users/customers", icon: Users },
      //   { name: "Mechanics", to: "/users/mechanics", icon: Wrench },
      { name: "Garage Owners", to: "/users/garages", icon: Store },
      //   { name: "Fleet / Enterprise", to: "/users/fleet", icon: Truck },
      { name: "Admin Users", to: "/users/admins", icon: UserCog },
      { name: "Suspended", to: "/users/suspended", icon: ShieldCheck },
      //   { name: "KYC Verification", to: "/users/kyc", icon: FileCheck },
      //   { name: "AML Monitoring", to: "/users/aml", icon: ShieldAlert },
      //   {
      //     name: "Account Freeze Logs",
      //     to: "/users/freeze-logs",
      //     icon: Snowflake,
      //   },
    ],
  },
  {
    label: "GARAGE NETWORK",
    sectionIcon: Building2,
    items: [
      { name: "All Garages", to: "/garages/all", icon: Building2 },
      //   { name: "In-House Garages", to: "/garages/in-house", icon: Home },
      //   {
      //     name: "Franchise Locations",
      //     to: "/garages/franchise",
      //     icon: GitBranch,
      //   },
      {
        name: "Applications Queue",
        to: "/garages/applications",
        icon: ClipboardList,
      },
      //   {
      //     name: "Subscription Plans",
      //     to: "/garages/subscriptions",
      //     icon: CreditCard,
      //   },
      //   { name: "Commission Rates", to: "/garages/commissions", icon: BarChart3 },
      //   {
      //     name: "Performance Scores",
      //     to: "/garages/performance",
      //     icon: TrendingUp,
      //   },
      //   { name: "SLA Monitoring", to: "/garages/sla", icon: Timer },
      //   { name: "Contracts & Docs", to: "/garages/contracts", icon: FileText },
      //   { name: "Territory Map", to: "/garages/territory-map", icon: Map },
    ],
  },
  {
    label: "BOOKINGS ENGINE",
    sectionIcon: CalendarCheck,
    items: [
      { name: "All Bookings", to: "/bookings/all", icon: CalendarCheck },
      //   { name: "Live Bookings", to: "/bookings/live", icon: Radio },
      //   { name: "Cancelled", to: "/bookings/cancelled", icon: XCircle },
      //   { name: "Disputes", to: "/bookings/disputes", icon: Scale },
      //   { name: "Escalations", to: "/bookings/escalations", icon: ArrowUpCircle },
      { name: "Refund Requests", to: "/bookings/refunds", icon: RotateCcw },
      //   { name: "SLA Tracker", to: "/bookings/sla", icon: Clock },
      //   { name: "Service Insights", to: "/bookings/insights", icon: Layers },
    ],
  },
  {
    label: "COMMUNITY",
    sectionIcon: UsersRound,
    items: [
      { name: "Community Posts", to: "/community/posts", icon: UsersRound },
    ],
  },
  {
    label: "FINTECH CORE",
    sectionIcon: Wallet,
    items: [
      { name: "Platform Float", to: "/fintech/float", icon: Wallet },
      { name: "User Balances", to: "/fintech/balances", icon: PiggyBank },
      { name: "Deposits", to: "/fintech/deposits", icon: ArrowDownCircle },
      { name: "Withdrawals", to: "/fintech/withdrawals", icon: ArrowUpRight },
      //   { name: "Locked Funds", to: "/fintech/locked", icon: Lock },
      //   { name: "Reward Liability", to: "/fintech/rewards", icon: Gift },
      //   { name: "Float by Region", to: "/fintech/float-region", icon: Globe },
      { name: "Transactions", to: "/fintech/transactions", icon: Receipt },
      //   { name: "Failed Payments", to: "/fintech/failed", icon: Ban },
      //   { name: "Chargebacks", to: "/fintech/chargebacks", icon: RotateCw },
      { name: "Refunds", to: "/fintech/refunds", icon: RotateCcw },
      //   { name: "Stripe Logs", to: "/fintech/stripe", icon: Zap },
      //   { name: "Webhook Logs", to: "/fintech/webhooks", icon: Plug },
      {
        name: "Pending Payouts",
        to: "/fintech/payouts-pending",
        icon: DollarSign,
      },
      //   { name: "Settlement Cycles", to: "/fintech/settlements", icon: Repeat },
      //   {
      //     name: "Manual Adjustments",
      //     to: "/fintech/adjustments",
      //     icon: Banknote,
      //   },
      //   {
      //     name: "Payout Failures",
      //     to: "/fintech/payout-failures",
      //     icon: AlertCircle,
      //   },
      //   {
      //     name: "Commission Revenue",
      //     to: "/fintech/rev-commission",
      //     icon: BadgeDollarSign,
      //   },
      //   {
      //     name: "Subscription Rev",
      //     to: "/fintech/rev-subscription",
      //     icon: CreditCard,
      //   },
      { name: "Ad Revenue", to: "/fintech/rev-ads", icon: Megaphone },
      //   {
      //     name: "Franchise Revenue",
      //     to: "/fintech/rev-franchise",
      //     icon: GitBranch,
      //   },
      { name: "Data Revenue", to: "/fintech/rev-data", icon: Database },
      //   {
      //     name: "Net Platform Profit",
      //     to: "/fintech/net-profit",
      //     icon: Calculator,
      //   },
    ],
  },
  {
    label: "MARKETING & ADS",
    sectionIcon: Megaphone,
    items: [
      { name: "Offers", to: "/marketing/offers", icon: Tag },
      {
        name: "Sponsored Listings",
        to: "/marketing/sponsored",
        icon: Sparkles,
      },
      //   { name: "Boosted Garages", to: "/marketing/boosted", icon: Rocket },
      { name: "Ad Campaigns", to: "/marketing/campaigns", icon: Target },
      //   { name: "Ad Billing", to: "/marketing/billing", icon: CircleDollarSign },
      //   { name: "CPM Analytics", to: "/marketing/cpm", icon: BarChart3 },
      //   { name: "Promo Codes", to: "/marketing/promo-codes", icon: Hash },
    ],
  },
  {
    label: "OPERATIONS & RISK",
    sectionIcon: Headphones,
    items: [
      { name: "Support Desk", to: "/ops/support", icon: Headphones },
      { name: "Ticket Queue", to: "/ops/tickets", icon: Ticket },
      //   { name: "Disputes", to: "/ops/disputes", icon: Scale },
      //   { name: "Fraud Monitoring", to: "/ops/fraud", icon: Siren },
      { name: "Suspicious Wallets", to: "/ops/suspicious", icon: Eye },
      //   { name: "Abuse Reports", to: "/ops/abuse", icon: Flag },
      //   { name: "Risk Scores", to: "/ops/risk", icon: Skull },
      //   { name: "Blacklist Control", to: "/ops/blacklist", icon: List },
    ],
  },
  //   {
  //     label: "AI & DATA",
  //     sectionIcon: Bot,
  //     items: [
  //       { name: "CareChat Usage", to: "/ai/carechat", icon: Bot },
  //       { name: "Prompt Library", to: "/ai/prompts", icon: BookOpen },
  //       { name: "Model Versions", to: "/ai/models", icon: Cpu },
  //       { name: "Error Logs", to: "/ai/errors", icon: Bug },
  //       { name: "Service Records", to: "/ai/service-records", icon: Stethoscope },
  //       { name: "Vehicle Insights", to: "/ai/vehicles", icon: Car },
  //       { name: "Export Requests", to: "/ai/exports", icon: Download },
  //       { name: "Data Licensing", to: "/ai/licensing", icon: Key },
  //       { name: "API Clients", to: "/ai/api-clients", icon: Server },
  //       { name: "Third-Party Links", to: "/ai/integrations", icon: Link2 },
  //       { name: "Webhook Monitor", to: "/ai/webhook-monitor", icon: Plug },
  //     ],
  //   },
  {
    label: "ANALYTICS",
    sectionIcon: BarChart3,
    items: [
      { name: "Revenue Analytics", to: "/analytics/revenue", icon: LineChart },
      { name: "User Growth", to: "/analytics/user-growth", icon: UserPlus },
      { name: "Retention Rate", to: "/analytics/retention", icon: Repeat2 },
      {
        name: "Booking Conversion",
        to: "/analytics/conversion",
        icon: ArrowRightLeft,
      },
      //   { name: "Geographic Heatmaps", to: "/analytics/heatmaps", icon: MapPin },
      //   { name: "Service Trends", to: "/analytics/trends", icon: Search },
      //   { name: "Lifetime Value", to: "/analytics/ltv", icon: Heart },
      //   { name: "Cohort Analysis", to: "/analytics/cohorts", icon: UsersRound },
    ],
  },
  {
    label: "COMPLIANCE",
    sectionIcon: Shield,
    items: [
      {
        name: "Admin Action Logs",
        to: "/compliance/admin-logs",
        icon: ScrollText,
      },
      { name: "Audit Trail", to: "/compliance/audit", icon: Fingerprint },
      { name: "KYC / AML Records", to: "/compliance/kyc-aml", icon: FileCheck },
      { name: "Tax Reporting", to: "/compliance/tax", icon: Landmark },
      {
        name: "Regulatory Reports",
        to: "/compliance/regulatory",
        icon: FileSpreadsheet,
      },
      { name: "Privacy Logs", to: "/compliance/privacy", icon: Shield },
      {
        name: "Incident Reports",
        to: "/compliance/incidents",
        icon: Clipboard,
      },
    ],
  },
  //   {
  //     label: "SYSTEM",
  //     sectionIcon: Settings,
  //     items: [
  //       { name: "Admin Roles", to: "/system/roles", icon: UserCog },
  //       { name: "Permissions Matrix", to: "/system/permissions", icon: Grid3X3 },
  //       { name: "Feature Flags", to: "/system/feature-flags", icon: Sliders },
  //       {
  //         name: "Commission Settings",
  //         to: "/system/commission",
  //         icon: DollarSign,
  //       },
  //       { name: "Reward Rules", to: "/system/rewards", icon: Gift },
  //       {
  //         name: "Notification Templates",
  //         to: "/system/notifications",
  //         icon: Bell,
  //       },
  //       { name: "App Versions", to: "/system/versions", icon: Smartphone },
  //       { name: "Environment", to: "/system/environment", icon: CloudCog },
  //       { name: "Region Management", to: "/system/regions", icon: MapPinned },
  //     ],
  //   },
];

/* ─── Collapsible Section ─── */
const SidebarSection = ({
  section,
  isOpen,
  onToggle,
  pathname,
  locked,
}: {
  section: NavSection;
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
  locked?: boolean;
}) => {
  const hasActive = section.items.some(
    (i) => pathname === i.to || (i.to !== "/" && pathname.startsWith(i.to)),
  );
  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 ${
          hasActive
            ? "text-accent-cyan bg-accent-cyan/5"
            : "text-text-muted hover:text-text-secondary hover:bg-surface-hover/30"
        }`}
      >
        <div className="flex items-center gap-2">
          {(() => {
            const SIcon = section.sectionIcon;
            return <SIcon className="h-3.5 w-3.5" />;
          })()}
          <span>{section.label}</span>
          {locked && <Lock className="h-3 w-3 text-text-muted/50" />}
        </div>
        {!locked && (
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
          />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}
      >
        <div className="space-y-0.5 pl-1">
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.to ||
              (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-3 py-[7px] text-[12.5px] font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? "text-accent-cyan bg-accent-cyan/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover/40"
                }`}
              >
                <Icon className="h-[15px] w-[15px] flex-shrink-0 opacity-70" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Mock Notifications ─── */
interface Notification {
  id: string;
  type: "alert" | "info" | "success" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Failed Payout Detected",
    message:
      "Payout to SpeedFix Garage (ID #4821) failed — invalid bank routing number.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "SLA Breach Warning",
    message: "AutoPro Downtown has 3 bookings exceeding 48h completion SLA.",
    time: "18 min ago",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "New Garage Onboarded",
    message:
      "QuickLube Express (Mississauga) completed onboarding and is now live.",
    time: "1h ago",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "CareChat AI Model Updated",
    message:
      "GPT-4o-mini fine-tune v2.7 deployed to production. Latency improved 23%.",
    time: "3h ago",
    read: true,
  },
  {
    id: "5",
    type: "alert",
    title: "Fraud Alert",
    message:
      "Unusual wallet top-up pattern detected for user #7291 — $4,200 in 10 minutes.",
    time: "4h ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "Daily Revenue Report",
    message: "Platform GMV yesterday: $47,832. Commission earned: $3,826.",
    time: "6h ago",
    read: true,
  },
  {
    id: "7",
    type: "warning",
    title: "KYC Queue Growing",
    message: "14 pending KYC verifications older than 72 hours. Review needed.",
    time: "8h ago",
    read: true,
  },
];

const notifColors = {
  alert: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-400",
    text: "text-red-400",
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
    text: "text-amber-400",
  },
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
  },
  info: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    dot: "bg-sky-400",
    text: "text-sky-400",
  },
};

/* ─── Layout ─── */
const Layout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [notifFilter, setNotifFilter] = useState<"all" | "unread">("all");
  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      )
        setSettingsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOneRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const filteredNotifs =
    notifFilter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  // Quick Settings state
  const [pushNotifs, setPushNotifs] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [autoLock, setAutoLock] = useState(true);

  const getInitialOpen = useCallback(() => {
    const s = new Set<string>();
    navSections.forEach((sec) => {
      if (
        sec.items.some(
          (i) =>
            location.pathname === i.to ||
            (i.to !== "/" && location.pathname.startsWith(i.to)),
        )
      )
        s.add(sec.label);
    });
    s.add("OVERVIEW");
    return s;
  }, [location.pathname]);

  const [openSections, setOpenSections] = useState<Set<string>>(getInitialOpen);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const n = new Set(prev);
      if (n.has(label)) n.delete(label);
      else n.add(label);
      return n;
    });
  };

  useEffect(() => {
    navSections.forEach((sec) => {
      if (
        sec.items.some(
          (i) =>
            location.pathname === i.to ||
            (i.to !== "/" && location.pathname.startsWith(i.to)),
        )
      ) {
        setOpenSections((prev) => {
          if (prev.has(sec.label)) return prev;
          const n = new Set(prev);
          n.add(sec.label);
          return n;
        });
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktop(d);
      setSidebarOpen(d);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false);
  }, [location.pathname, isDesktop]);

  return (
    <div className="min-h-screen bg-surface flex relative">
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          style={{ animation: "fadeInUp 0.2s ease-out" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`${isDesktop ? (sidebarOpen ? "w-[270px]" : "w-0 overflow-hidden") : sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${!isDesktop ? "fixed inset-y-0 left-0 w-[280px] z-50" : ""} bg-[#0d1117] text-text-secondary flex flex-col border-r border-border-subtle transition-all duration-300 flex-shrink-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/logo-white.png"
              alt="CC24x7"
              className="h-7 w-auto object-contain flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="min-w-0">
              <h1 className="text-[13px] font-bold text-white tracking-tight truncate">
                CarCare24x7
              </h1>
              <p className="text-[9px] text-text-muted font-semibold tracking-[0.15em] uppercase">
                SUPER ADMIN
              </p>
            </div>
          </div>
          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-surface-hover transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <nav className="flex-1 px-2.5 py-3 space-y-1.5 overflow-y-auto">
          {navSections.map((sec) => {
            const locked = user ? isSectionLocked(user.role, sec.label) : false;
            return (
              <SidebarSection
                key={sec.label}
                section={sec}
                isOpen={openSections.has(sec.label)}
                onToggle={() => !locked && toggleSection(sec.label)}
                pathname={location.pathname}
                locked={locked}
              />
            );
          })}
        </nav>
        <div className="p-2.5 border-t border-border-subtle flex-shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-hover/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold text-xs flex-shrink-0 relative">
              {user?.firstName?.charAt(0) || "S"}
              {user?.lastName?.charAt(0) || "A"}
              {user?.role === "SUPER_ADMIN" && (
                <span className="absolute -top-1 -right-1 text-[10px]">👑</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] text-text-muted truncate">
                {user?.role === "SUPER_ADMIN"
                  ? "CEO • Full Access"
                  : ROLE_META[user?.role || "VIEWER"]?.label}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-1.5 text-text-muted hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors flex-shrink-0"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface-raised/80 backdrop-blur-sm border-b border-border-subtle sticky top-0 z-30">
          <div className="px-3 sm:px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-48 md:w-72 pl-9 pr-12 md:pr-16 py-2 bg-surface-card border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-surface px-1.5 py-0.5 rounded border border-border-subtle font-mono hidden md:inline">
                  ⌘K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors sm:hidden">
                <Search className="h-5 w-5" />
              </button>
              <div className="px-2 sm:px-3 py-1 bg-accent-green/10 border border-accent-green/30 rounded-full text-[10px] sm:text-[11px] font-semibold text-accent-green tracking-wider uppercase hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />{" "}
                PRODUCTION
              </div>

              {/* ── Notification Bell ── */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setSettingsOpen(false);
                  }}
                  className={`relative p-2 rounded-lg transition-colors ${notifOpen ? "text-accent-cyan bg-accent-cyan/10" : "text-text-muted hover:text-text-primary hover:bg-surface-hover"}`}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-surface-raised px-1">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-[420px] max-h-[520px] bg-[#0d1117] border border-border-subtle rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50 animate-scale-in"
                    style={{ animationDuration: "0.15s" }}
                  >
                    {/* Header */}
                    <div className="p-4 pb-3 border-b border-border-subtle">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-white">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllRead}
                            className="text-[11px] font-medium text-accent-cyan hover:text-accent-cyan/80 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {(["all", "unread"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setNotifFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${notifFilter === tab ? "bg-accent-cyan/10 text-accent-cyan" : "text-text-muted hover:text-text-secondary hover:bg-surface-hover/50"}`}
                          >
                            {tab}
                            {tab === "unread" && unreadCount > 0
                              ? ` (${unreadCount})`
                              : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* List */}
                    <div className="overflow-y-auto max-h-[380px] divide-y divide-border-subtle">
                      {filteredNotifs.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="h-8 w-8 text-text-muted mx-auto mb-2 opacity-40" />
                          <p className="text-sm text-text-muted">
                            No {notifFilter === "unread" ? "unread " : ""}
                            notifications
                          </p>
                        </div>
                      ) : (
                        filteredNotifs.map((n) => {
                          const c = notifColors[n.type];
                          return (
                            <button
                              key={n.id}
                              onClick={() => markOneRead(n.id)}
                              className={`w-full text-left px-4 py-3.5 flex gap-3 transition-colors hover:bg-surface-hover/40 ${!n.read ? "bg-accent-cyan/[0.03]" : ""}`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? c.dot : "bg-transparent"}`}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p
                                    className={`text-[12.5px] font-semibold truncate ${!n.read ? "text-white" : "text-text-secondary"}`}
                                  >
                                    {n.title}
                                  </p>
                                  <span className="text-[10px] text-text-muted whitespace-nowrap flex-shrink-0">
                                    {n.time}
                                  </span>
                                </div>
                                <p className="text-[11.5px] text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                                  {n.message}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                    {/* Footer */}
                    <div className="p-3 border-t border-border-subtle">
                      <button
                        onClick={() => {
                          navigate("/system-alerts");
                          setNotifOpen(false);
                        }}
                        className="w-full py-2 text-center text-[12px] font-medium text-accent-cyan hover:bg-accent-cyan/5 rounded-lg transition-colors"
                      >
                        View All System Alerts →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Settings Gear ── */}
              <div ref={settingsRef} className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setSettingsOpen(!settingsOpen);
                    setNotifOpen(false);
                  }}
                  className={`p-2 rounded-lg transition-colors ${settingsOpen ? "text-accent-cyan bg-accent-cyan/10" : "text-text-muted hover:text-text-primary hover:bg-surface-hover"}`}
                >
                  <Settings2
                    className={`h-5 w-5 transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`}
                  />
                </button>

                {settingsOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-[320px] bg-[#0d1117] border border-border-subtle rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50 animate-scale-in"
                    style={{ animationDuration: "0.15s" }}
                  >
                    <div className="p-4 pb-3 border-b border-border-subtle">
                      <h3 className="text-sm font-bold text-white">
                        Quick Settings
                      </h3>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Manage your workspace preferences
                      </p>
                    </div>
                    <div className="p-3 space-y-1">
                      {[
                        {
                          label: "Push Notifications",
                          desc: "Browser push alerts",
                          icon: "🔔",
                          active: pushNotifs,
                          toggle: () => setPushNotifs((p) => !p),
                        },
                        {
                          label: "Sound Effects",
                          desc: "UI interaction sounds",
                          icon: "🔊",
                          active: soundEffects,
                          toggle: () => setSoundEffects((p) => !p),
                        },
                        {
                          label: "Compact View",
                          desc: "Reduce spacing in tables",
                          icon: "📐",
                          active: compactView,
                          toggle: () => setCompactView((p) => !p),
                        },
                        {
                          label: "Auto-Lock Screen",
                          desc: "Lock after inactivity",
                          icon: "🔒",
                          active: autoLock,
                          toggle: () => setAutoLock((p) => !p),
                        },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.toggle}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-hover/40 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base">{item.icon}</span>
                            <div className="text-left">
                              <p className="text-[12.5px] font-medium text-text-primary">
                                {item.label}
                              </p>
                              <p className="text-[10.5px] text-text-muted">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-9 h-5 rounded-full relative transition-colors ${item.active ? "bg-accent-cyan" : "bg-surface-hover border border-border-subtle"}`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all duration-200 ${item.active ? "right-[3px]" : "left-[3px]"}`}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 pt-1 border-t border-border-subtle space-y-1">
                      {[
                        { label: "Timezone", value: "EST (UTC-5)", icon: "🕐" },
                        {
                          label: "Language",
                          value: "English (CA)",
                          icon: "🌐",
                        },
                        {
                          label: "Session Timeout",
                          value: "30 min",
                          icon: "⏱",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-hover/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base">{item.icon}</span>
                            <p className="text-[12.5px] font-medium text-text-primary">
                              {item.label}
                            </p>
                          </div>
                          <span className="text-[11px] text-text-muted bg-surface-card px-2 py-1 rounded-md border border-border-subtle">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border-subtle">
                      <button
                        onClick={() => {
                          navigate("/system/roles");
                          setSettingsOpen(false);
                        }}
                        className="w-full py-2 text-center text-[12px] font-medium text-accent-cyan hover:bg-accent-cyan/5 rounded-lg transition-colors"
                      >
                        Open Full Settings →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
      {/* Global AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Layout;
