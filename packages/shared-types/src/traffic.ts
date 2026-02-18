// ─────────────────────────────────────────────
// Traffic — Live usage telemetry
// ─────────────────────────────────────────────

export type TrafficStatus = "ALLOWED" | "BLOCKED" | "FLAGGED" | "MODIFIED";

export interface TrafficEvent {
  id: string;
  orgId: string;
  apiKeyId: string;
  model: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  status: TrafficStatus;
  policiesTriggered: string[];
  timestamp: string;
}

export interface TrafficSummary {
  totalRequests: number;
  totalTokens: number;
  blockedRequests: number;
  avgLatencyMs: number;
  periodStart: string;
  periodEnd: string;
}
