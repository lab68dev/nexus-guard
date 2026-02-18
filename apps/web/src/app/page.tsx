import { Shield, ArrowRight, Activity, Lock, Gauge } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HEADER ── */}
      <header className="border-b-2 border-ng-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" strokeWidth={2.5} />
            <span className="text-xl font-black tracking-tight uppercase">
              NexusGuard
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="ng-btn-primary ng-btn"
            >
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <main className="flex-1">
        <section className="border-b-2 border-ng-black">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ng-gray-500 mb-4">
              AI Governance Platform
            </p>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Control
              <br />
              Every AI
              <br />
              Call.
            </h1>
            <p className="text-lg text-ng-gray-600 max-w-xl mb-10 leading-relaxed">
              Intercept, analyze, and enforce safety policies on every LLM
              request in real-time. Multi-tenant governance at scale.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard" className="ng-btn ng-btn-primary">
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className="ng-btn">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="border-b-2 border-ng-black">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Feature 1 */}
              <div className="ng-card border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ng-black">
                <Activity className="w-10 h-10 mb-6" strokeWidth={2} />
                <h3 className="text-lg font-black uppercase mb-3">
                  Live Traffic Monitor
                </h3>
                <p className="text-sm text-ng-gray-600 leading-relaxed">
                  Real-time WebSocket dashboard showing every AI API call,
                  token usage, latency, and policy enforcement status.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="ng-card border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ng-black">
                <Lock className="w-10 h-10 mb-6" strokeWidth={2} />
                <h3 className="text-lg font-black uppercase mb-3">
                  Safety Policies
                </h3>
                <p className="text-sm text-ng-gray-600 leading-relaxed">
                  Content filtering, PII redaction, token budgets, rate limits,
                  and model allowlists — all configurable per tenant.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="ng-card">
                <Gauge className="w-10 h-10 mb-6" strokeWidth={2} />
                <h3 className="text-lg font-black uppercase mb-3">
                  Multi-Tenant Isolation
                </h3>
                <p className="text-sm text-ng-gray-600 leading-relaxed">
                  Every organization is fully isolated. Scoped API keys,
                  per-tenant policies, and private data boundaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-ng-black text-ng-white border-b-2 border-ng-black">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-black">99.9%</p>
              <p className="text-xs uppercase tracking-widest text-ng-gray-400 mt-1">
                Uptime SLA
              </p>
            </div>
            <div>
              <p className="text-4xl font-black">&lt;5ms</p>
              <p className="text-xs uppercase tracking-widest text-ng-gray-400 mt-1">
                Proxy Latency
              </p>
            </div>
            <div>
              <p className="text-4xl font-black">∞</p>
              <p className="text-xs uppercase tracking-widest text-ng-gray-400 mt-1">
                Scalable Tenants
              </p>
            </div>
            <div>
              <p className="text-4xl font-black">0</p>
              <p className="text-xs uppercase tracking-widest text-ng-gray-400 mt-1">
                Data Leaks
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-ng-black py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-ng-gray-500">
            &copy; 2026 NexusGuard
          </p>
          <p className="text-xs text-ng-gray-400">
            AI Governance &middot; Built for Production
          </p>
        </div>
      </footer>
    </div>
  );
}
