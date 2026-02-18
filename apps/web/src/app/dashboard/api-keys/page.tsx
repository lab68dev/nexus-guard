import { Key, Plus, Copy, Trash2 } from "lucide-react";

/* ─────────────────────────────────────────────
   API Keys Page — Server Component
   ───────────────────────────────────────────── */

const MOCK_KEYS = [
  {
    id: "key_001",
    name: "Production",
    keyPrefix: "ng_live_a1b2c...",
    scopes: ["proxy:write", "policies:read"],
    lastUsedAt: "2026-02-17T08:12:00Z",
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "key_002",
    name: "Staging",
    keyPrefix: "ng_test_x9y8z...",
    scopes: ["proxy:write", "policies:read", "policies:write"],
    lastUsedAt: "2026-02-16T22:45:00Z",
    createdAt: "2026-01-20T14:00:00Z",
  },
  {
    id: "key_003",
    name: "CI / CD Pipeline",
    keyPrefix: "ng_ci_m4n5o...",
    scopes: ["proxy:write"],
    lastUsedAt: null,
    createdAt: "2026-02-10T09:00:00Z",
  },
];

export default function ApiKeysPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            API Keys
          </h1>
          <p className="text-sm text-ng-gray-500 mt-1">
            Manage tenant-scoped API keys for LLM proxy access.
          </p>
        </div>
        <button className="ng-btn ng-btn-primary">
          <Plus className="w-4 h-4" />
          Generate Key
        </button>
      </div>

      {/* Keys Table */}
      <div className="ng-card p-0">
        <table className="ng-table border-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Scopes</th>
              <th>Last Used</th>
              <th>Created</th>
              <th className="w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_KEYS.map((k) => (
              <tr key={k.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-ng-gray-400" strokeWidth={2} />
                    <span className="font-bold text-sm">{k.name}</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-ng-gray-500">
                  {k.keyPrefix}
                </td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {k.scopes.map((s) => (
                      <span key={s} className="ng-badge text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-xs text-ng-gray-500">
                  {k.lastUsedAt
                    ? new Date(k.lastUsedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Never"}
                </td>
                <td className="text-xs text-ng-gray-500">
                  {new Date(k.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="p-2 border-2 border-ng-black hover:bg-ng-black hover:text-ng-white transition-colors">
                      <Copy className="w-3 h-3" strokeWidth={2} />
                    </button>
                    <button className="p-2 border-2 border-ng-black hover:bg-ng-danger hover:text-ng-white hover:border-ng-danger transition-colors">
                      <Trash2 className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
