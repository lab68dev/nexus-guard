import { LiveTrafficFeed } from "@/components/live-traffic-feed";

/* ─────────────────────────────────────────────
   Live Traffic Page — Server Component shell
   with client-side WebSocket feed.
   ───────────────────────────────────────────── */

export default function TrafficPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Live Traffic
        </h1>
        <p className="text-sm text-ng-gray-500 mt-1">
          Real-time stream of AI API calls flowing through NexusGuard.
        </p>
      </div>

      {/* Live Feed (Client Component) */}
      <LiveTrafficFeed />
    </div>
  );
}
