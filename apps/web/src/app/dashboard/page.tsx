import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Dashboard Overview — Server Component
   Fetches summary data from the governance API.
   ───────────────────────────────────────────── */

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

const STATS: StatCard[] = [
  {
    label: "Total Requests (24h)",
    value: "1,248,031",
    change: "+12.3%",
    icon: Activity,
  },
  {
    label: "Active Policies",
    value: "24",
    change: "+2",
    icon: ShieldCheck,
  },
  {
    label: "Blocked Calls",
    value: "3,891",
    change: "-8.1%",
    icon: AlertTriangle,
  },
  {
    label: "Avg Latency",
    value: "2.4ms",
    change: "-0.3ms",
    icon: Zap,
  },
];

const RECENT_EVENTS = [
  {
    id: "evt_001",
    model: "gpt-4o",
    status: "ALLOWED",
    tokens: 1243,
    latency: "2.1ms",
    time: "2s ago",
  },
  {
    id: "evt_002",
    model: "claude-4",
    status: "BLOCKED",
    tokens: 0,
    latency: "0.8ms",
    time: "5s ago",
  },
  {
    id: "evt_003",
    model: "gpt-4o",
    status: "FLAGGED",
    tokens: 892,
    latency: "3.4ms",
    time: "12s ago",
  },
  {
    id: "evt_004",
    model: "gemini-2.5",
    status: "ALLOWED",
    tokens: 2104,
    latency: "1.9ms",
    time: "18s ago",
  },
  {
    id: "evt_005",
    model: "claude-4",
    status: "MODIFIED",
    tokens: 567,
    latency: "4.2ms",
    time: "25s ago",
  },
];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    ALLOWED: "ng-badge-success",
    BLOCKED: "ng-badge-danger",
    FLAGGED: "ng-badge-warning",
    MODIFIED: "ng-badge",
  };
  return `ng-badge ${map[status] ?? ""}`;
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-ng-gray-500 mt-1">
          Real-time governance metrics for your organization.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`ng-card ${i < STATS.length - 1 ? "border-r-0 md:border-r-2" : ""} border-ng-black`}
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon className="w-6 h-6" strokeWidth={2} />
              <span className="text-xs font-bold text-ng-gray-500">
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-ng-gray-500 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Traffic */}
      <div className="ng-card p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ng-black">
          <h2 className="text-sm font-black uppercase tracking-widest">
            Recent Traffic
          </h2>
          <Link
            href="/dashboard/traffic"
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ng-gray-500 hover:text-ng-black transition-colors"
          >
            View All
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <table className="ng-table border-0">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Model</th>
              <th>Status</th>
              <th>Tokens</th>
              <th>Latency</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_EVENTS.map((evt) => (
              <tr key={evt.id}>
                <td className="font-mono text-xs">{evt.id}</td>
                <td className="font-bold text-xs uppercase">{evt.model}</td>
                <td>
                  <span className={statusBadge(evt.status)}>{evt.status}</span>
                </td>
                <td className="font-mono text-sm">
                  {evt.tokens.toLocaleString()}
                </td>
                <td className="font-mono text-sm">{evt.latency}</td>
                <td className="text-xs text-ng-gray-500">{evt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
