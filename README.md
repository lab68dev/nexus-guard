# NexusGuard

> AI Governance & API Proxying — Multi-tenant SaaS Platform

---

## Project Overview

NexusGuard is an open-source, multi-tenant SaaS platform that acts as an intelligent governance layer between your applications and AI/LLM providers. It intercepts, inspects, and enforces safety policies on every API call made to large language models — giving teams full visibility and control over their AI usage.

The platform is built as a monorepo with a Next.js 16 frontend dashboard and a Spring Boot 3.4 backend that functions as a reactive reverse proxy. All traffic flows through NexusGuard before reaching the upstream AI provider, enabling real-time enforcement, logging, and analytics.

---

## Purpose

Modern teams integrating LLMs into their products face a common set of challenges:

- **Safety & Compliance** — How do you prevent prompt injection, PII leakage, or policy violations at scale?
- **Cost Control** — How do you enforce token budgets and rate limits across multiple teams or tenants?
- **Observability** — How do you get a unified view of all AI API traffic, latency, and model usage?
- **Multi-tenancy** — How do you manage governance rules independently for each organization or team?

NexusGuard solves all of these by providing:

| Capability | Description |
|---|---|
| **AI Traffic Proxy** | Reactive reverse proxy (Spring WebFlux) that intercepts all LLM API calls |
| **Safety Policies** | Configurable rules: Content Filter, Rate Limit, Token Budget, PII Redaction, Model Allowlist |
| **Live Traffic Monitor** | Real-time WebSocket feed of API events with status (ALLOWED / BLOCKED / FLAGGED / MODIFIED) |
| **API Key Management** | Issue and manage scoped API keys per organization |
| **Multi-tenant Architecture** | Isolated governance rules and data per organization via Neon PostgreSQL schemas |
| **Secure Auth** | JWT-based authentication via OAuth2 Resource Server |

---

## Architecture

```
nexusguard/
├── apps/
│   └── web/                    # Next.js 16+ Frontend (App Router)
│       ├── src/app/dashboard/  # Dashboard: Overview, API Keys, Policies, Traffic, Settings
│       └── src/actions/        # Server Actions (API key & policy management)
├── services/
│   └── governance-api/         # Spring Boot 3.4+ Backend (Java 21)
│       ├── Reactive proxy       # WebFlux — LLM traffic interception
│       ├── WebSocket server     # Live traffic streaming
│       └── REST API             # Management endpoints
├── packages/
│   └── shared-types/           # Shared TypeScript interfaces
│       ├── SafetyPolicy         # Policy types & severity levels
│       ├── TrafficEvent         # Live telemetry model
│       ├── Organization         # Tenant model
│       └── ApiKey               # API key model
├── render.yaml                 # Render.com Infrastructure Blueprint
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16+, React 19, Tailwind CSS, Turbopack |
| Backend | Java 21, Spring Boot 3.4+, Virtual Threads, WebFlux |
| Real-time | Spring WebSocket (STOMP) |
| Database | Neon (PostgreSQL) — Multi-tenant schema |
| Security | Spring Security, OAuth2 Resource Server, JWT |
| Infrastructure | Render.com (Blueprints, Private Networking) |

---

## Getting Started

### Prerequisites

- Node.js 22+
- Java 21 (GraalVM or Temurin)
- Maven 3.9+

### Frontend

```bash
cd apps/web
cp .env.example .env.local
# Fill in GOVERNANCE_API_URL and GOVERNANCE_SERVICE_TOKEN
npm install
npm run dev
```

### Backend

```bash
cd services/governance-api
# Set NEON_DATABASE_URL, NEON_DATABASE_USER, NEON_DATABASE_PASSWORD in your environment
./mvnw spring-boot:run
```

### Full Stack (Render.com)

Push to `main` — the `render.yaml` blueprint auto-deploys both services with private networking between them.

---

## Dashboard Pages

| Page | Path | Description |
|---|---|---|
| Overview | `/dashboard` | Traffic summary, request stats, quick actions |
| API Keys | `/dashboard/api-keys` | Create and manage organization API keys |
| Policies | `/dashboard/policies` | Configure safety and governance policies |
| Traffic | `/dashboard/traffic` | Live real-time traffic monitor via WebSocket |
| Settings | `/dashboard/settings` | Organization and account settings |

---

## Safety Policy Types

| Type | Description |
|---|---|
| `CONTENT_FILTER` | Block or flag requests matching prohibited content patterns |
| `RATE_LIMIT` | Enforce request-per-minute limits per API key or organization |
| `TOKEN_BUDGET` | Cap total token consumption over a defined period |
| `PII_REDACTION` | Automatically redact personally identifiable information from prompts |
| `MODEL_ALLOWLIST` | Restrict usage to a pre-approved list of AI models |

---

## Design System

- **Theme:** Pure Monochrome (#000000 / #FFFFFF)
- **Font:** Archivo
- **Style:** Brutalist — square corners, thick borders, high contrast
- **Icons:** Lucide React

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

## License

Proprietary — All rights reserved.
