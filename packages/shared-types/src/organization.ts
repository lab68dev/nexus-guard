// ─────────────────────────────────────────────
// Organization — Multi-tenant Entity
// ─────────────────────────────────────────────

export type OrgPlan = "FREE" | "PRO" | "ENTERPRISE";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: OrgPlan;
  tokenBudget: number;
  tokensUsed: number;
  createdAt: string;
  updatedAt: string;
}
