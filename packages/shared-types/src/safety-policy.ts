// ─────────────────────────────────────────────
// SafetyPolicy — Core Governance Entity
// ─────────────────────────────────────────────

export type PolicyType =
  | "CONTENT_FILTER"
  | "RATE_LIMIT"
  | "TOKEN_BUDGET"
  | "PII_REDACTION"
  | "MODEL_ALLOWLIST";

export type PolicySeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface SafetyPolicy {
  id: string;
  orgId: string;
  name: string;
  description: string;
  type: PolicyType;
  severity: PolicySeverity;
  enabled: boolean;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSafetyPolicyRequest {
  name: string;
  description: string;
  type: PolicyType;
  severity: PolicySeverity;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface UpdateSafetyPolicyRequest extends Partial<CreateSafetyPolicyRequest> {
  id: string;
}
