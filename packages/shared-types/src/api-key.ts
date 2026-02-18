// ─────────────────────────────────────────────
// API Key — Tenant-scoped credentials
// ─────────────────────────────────────────────

export interface ApiKey {
  id: string;
  orgId: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
}
