import { Save } from "lucide-react";
import { updateSettings } from "@/actions/settings";

/* ─────────────────────────────────────────────
   Settings Page — Server Component
   Uses Server Action for form submission.
   ───────────────────────────────────────────── */

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-ng-gray-500 mt-1">
          Organization configuration and preferences.
        </p>
      </div>

      <form action={updateSettings} className="max-w-2xl space-y-8">
        {/* Organization */}
        <section className="ng-card">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">
            Organization
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Organization Name
              </label>
              <input
                name="orgName"
                defaultValue="Acme Corp"
                className="ng-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Slug
              </label>
              <input
                name="slug"
                defaultValue="acme-corp"
                className="ng-input"
              />
            </div>
          </div>
        </section>

        {/* Token Budget */}
        <section className="ng-card">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">
            Token Budget
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Monthly Token Limit
              </label>
              <input
                name="tokenBudget"
                type="number"
                defaultValue={10_000_000}
                className="ng-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="enforceTokenBudget"
                id="enforceTokenBudget"
                defaultChecked
                className="w-5 h-5 border-2 border-ng-black accent-ng-black"
              />
              <label
                htmlFor="enforceTokenBudget"
                className="text-sm font-bold uppercase tracking-wider"
              >
                Hard-enforce token budget (block requests when exceeded)
              </label>
            </div>
          </div>
        </section>

        {/* Proxy Defaults */}
        <section className="ng-card">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">
            Proxy Defaults
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Default Upstream Timeout (ms)
              </label>
              <input
                name="upstreamTimeout"
                type="number"
                defaultValue={30000}
                className="ng-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Max Request Body Size (bytes)
              </label>
              <input
                name="maxBodySize"
                type="number"
                defaultValue={1_048_576}
                className="ng-input"
              />
            </div>
          </div>
        </section>

        {/* Submit */}
        <button type="submit" className="ng-btn ng-btn-primary">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </form>
    </div>
  );
}
