-- ─────────────────────────────────────────────
-- NexusGuard — Database Schema (Neon PostgreSQL)
-- Multi-tenant with org_id isolation
-- ─────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Organizations ──
CREATE TABLE IF NOT EXISTS organizations (
    id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    plan        TEXT NOT NULL DEFAULT 'FREE' CHECK (plan IN ('FREE', 'PRO', 'ENTERPRISE')),
    token_budget BIGINT NOT NULL DEFAULT 1000000,
    tokens_used  BIGINT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);

-- ── Safety Policies ──
CREATE TABLE IF NOT EXISTS safety_policies (
    id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    org_id      TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    type        TEXT NOT NULL CHECK (type IN ('CONTENT_FILTER', 'RATE_LIMIT', 'TOKEN_BUDGET', 'PII_REDACTION', 'MODEL_ALLOWLIST')),
    severity    TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    enabled     BOOLEAN NOT NULL DEFAULT true,
    config      JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_policies_org ON safety_policies(org_id);
CREATE INDEX idx_safety_policies_type ON safety_policies(org_id, type);

-- ── API Keys ──
CREATE TABLE IF NOT EXISTS api_keys (
    id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    org_id      TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    key_hash    TEXT NOT NULL UNIQUE,
    key_prefix  TEXT NOT NULL,
    scopes      TEXT[] NOT NULL DEFAULT '{}',
    expires_at  TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_keys_org ON api_keys(org_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

-- ── Traffic Events ──
CREATE TABLE IF NOT EXISTS traffic_events (
    id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    org_id            TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    api_key_id        TEXT REFERENCES api_keys(id) ON DELETE SET NULL,
    model             TEXT NOT NULL,
    provider          TEXT NOT NULL,
    input_tokens      INTEGER NOT NULL DEFAULT 0,
    output_tokens     INTEGER NOT NULL DEFAULT 0,
    latency_ms        INTEGER NOT NULL DEFAULT 0,
    status            TEXT NOT NULL DEFAULT 'ALLOWED' CHECK (status IN ('ALLOWED', 'BLOCKED', 'FLAGGED', 'MODIFIED')),
    policies_triggered TEXT[] NOT NULL DEFAULT '{}',
    timestamp         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_traffic_events_org ON traffic_events(org_id);
CREATE INDEX idx_traffic_events_timestamp ON traffic_events(org_id, timestamp DESC);

-- ── Row-Level Security (Multi-tenant isolation) ──
ALTER TABLE safety_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_events ENABLE ROW LEVEL SECURITY;
