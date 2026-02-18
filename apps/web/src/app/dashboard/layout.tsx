import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  ShieldCheck,
  Activity,
  Key,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/policies", label: "Policies", icon: ShieldCheck },
  { href: "/dashboard/traffic", label: "Live Traffic", icon: Activity },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-ng-black text-ng-white border-r-2 border-ng-white/10 flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-6 border-b-2 border-ng-white/10">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="w-7 h-7" strokeWidth={2.5} />
            <span className="text-lg font-black tracking-tight uppercase">
              NexusGuard
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ng-gray-400 hover:text-ng-white hover:bg-ng-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" strokeWidth={2} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Org Info */}
        <div className="p-6 border-t-2 border-ng-white/10">
          <p className="text-xs font-bold uppercase tracking-widest text-ng-gray-500 mb-1">
            Organization
          </p>
          <p className="text-sm font-bold text-ng-white truncate">
            Acme Corp
          </p>
          <p className="text-xs text-ng-gray-500 mt-0.5">Pro Plan</p>
          <button className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-wider text-ng-gray-500 hover:text-ng-white transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main className="flex-1 overflow-auto bg-ng-gray-100">
        {children}
      </main>
    </div>
  );
}
