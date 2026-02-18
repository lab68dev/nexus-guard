import { ToggleLeft, ToggleRight, Pencil, Trash2 } from "lucide-react";
import type { SafetyPolicy, PolicyType, PolicySeverity } from "@nexusguard/shared-types";
import { CreatePolicyForm } from "@/components/create-policy-form";

/* ─────────────────────────────────────────────
   Policies Page — Server Component
   Lists and manages safety policies.
   ───────────────────────────────────────────── */

const MOCK_POLICIES: SafetyPolicy[] = [
  {
    id: "pol_001",
    orgId: "org_acme",
    name: "Block Hate Speech",
    description: "Filters any content classified as hate speech or harassment.",
    type: "CONTENT_FILTER",
    severity: "CRITICAL",
    enabled: true,
    config: { categories: ["hate", "harassment", "violence"] },
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-15T12:00:00Z",
  },
  {
    id: "pol_002",
    orgId: "org_acme",
    name: "Global Rate Limit",
    description: "Max 1000 requests per minute per API key.",
    type: "RATE_LIMIT",
    severity: "HIGH",
    enabled: true,
    config: { maxRequestsPerMinute: 1000 },
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-02-14T09:00:00Z",
  },
  {
    id: "pol_003",
    orgId: "org_acme",
    name: "PII Auto-Redact",
    description: "Automatically redact emails, phone numbers, and SSNs from prompts.",
    type: "PII_REDACTION",
    severity: "HIGH",
    enabled: true,
    config: { patterns: ["email", "phone", "ssn"] },
    createdAt: "2026-01-15T14:00:00Z",
    updatedAt: "2026-02-10T16:00:00Z",
  },
  {
    id: "pol_004",
    orgId: "org_acme",
    name: "Monthly Token Budget",
    description: "Cap total token usage at 10M tokens per month.",
    type: "TOKEN_BUDGET",
    severity: "MEDIUM",
    enabled: false,
    config: { monthlyLimit: 10_000_000 },
    createdAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-02-01T08:00:00Z",
  },
  {
    id: "pol_005",
    orgId: "org_acme",
    name: "Model Allowlist",
    description: "Only allow calls to approved model endpoints.",
    type: "MODEL_ALLOWLIST",
    severity: "LOW",
    enabled: true,
    config: { models: ["gpt-4o", "claude-4", "gemini-2.5-pro"] },
    createdAt: "2026-02-05T11:00:00Z",
    updatedAt: "2026-02-15T08:00:00Z",
  },
];

function severityBadge(severity: PolicySeverity) {
  const map: Record<PolicySeverity, string> = {
    CRITICAL: "ng-badge ng-badge-danger",
    HIGH: "ng-badge ng-badge-warning",
    MEDIUM: "ng-badge",
    LOW: "ng-badge",
  };
  return map[severity];
}

function typeBadge(_type: PolicyType) {
  return "ng-badge bg-ng-gray-100";
}

export default function PoliciesPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Safety Policies
          </h1>
          <p className="text-sm text-ng-gray-500 mt-1">
            Configure governance rules applied to every AI call.
          </p>
        </div>
        <CreatePolicyForm />
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_POLICIES.map((policy) => (
          <div key={policy.id} className="ng-card">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-black uppercase">
                    {policy.name}
                  </h3>
                  {policy.enabled ? (
                    <ToggleRight className="w-5 h-5 text-ng-success" strokeWidth={2} />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-ng-gray-400" strokeWidth={2} />
                  )}
                </div>
                <p className="text-sm text-ng-gray-600">{policy.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="p-2 border-2 border-ng-black hover:bg-ng-black hover:text-ng-white transition-colors">
                  <Pencil className="w-4 h-4" strokeWidth={2} />
                </button>
                <button className="p-2 border-2 border-ng-black hover:bg-ng-danger hover:text-ng-white hover:border-ng-danger transition-colors">
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-ng-gray-200">
              <span className={typeBadge(policy.type)}>
                {policy.type.replace("_", " ")}
              </span>
              <span className={severityBadge(policy.severity)}>
                {policy.severity}
              </span>
              <span className="text-xs text-ng-gray-400 ml-auto">
                Updated{" "}
                {new Date(policy.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
