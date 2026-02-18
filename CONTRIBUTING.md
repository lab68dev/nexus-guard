# Contributing to NexusGuard

Thank you for your interest in contributing to NexusGuard. This document outlines the standards and workflow for contributing to this project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Development Guidelines](#development-guidelines)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

All contributors are expected to maintain a respectful and professional environment. Harassment, discrimination, or disruptive behavior of any kind will not be tolerated.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/nexus-guard.git
   cd nexus-guard
   ```

3. **Add the upstream remote:**

   ```bash
   git remote add upstream https://github.com/DongDuong2001/nexus-guard.git
   ```

4. **Install dependencies:**

   ```bash
   # Frontend
   cd apps/web && npm install

   # Backend (requires Java 21 + Maven 3.9+)
   cd services/governance-api && ./mvnw install
   ```

5. **Create a feature branch** (see [Branch Strategy](#branch-strategy)).

---

## Branch Strategy

Use the following naming convention for all branches:

| Prefix | Purpose | Example |
|---|---|---|
| `feat/` | New feature | `feat/pii-redaction-policy` |
| `fix/` | Bug fix | `fix/websocket-reconnect` |
| `docs/` | Documentation only | `docs/update-readme` |
| `refactor/` | Code refactoring, no behavior change | `refactor/proxy-service` |
| `chore/` | Build, tooling, dependency updates | `chore/bump-spring-boot` |
| `test/` | Adding or updating tests | `test/policy-service-unit` |

Branch from `main` and keep branches short-lived and focused on a single concern.

```bash
git checkout main
git pull upstream main
git checkout -b feat/your-feature-name
```

---

## Commit Convention

This project follows the **Conventional Commits** specification.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructuring without feature/fix |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, tooling, dependency updates |
| `ci` | CI/CD configuration changes |
| `revert` | Reverting a previous commit |

### Scopes

Use the relevant scope to clarify which part of the codebase is affected:

- `web` — Next.js frontend (`apps/web`)
- `api` — Spring Boot backend (`services/governance-api`)
- `types` — Shared TypeScript types (`packages/shared-types`)
- `infra` — Infrastructure / `render.yaml`
- `docs` — Documentation files

### Examples

```bash
feat(api): add PII redaction middleware to proxy pipeline

fix(web): resolve WebSocket reconnect loop on token expiry

docs(readme): add project overview and purpose sections

chore(infra): upgrade render.yaml to use standard plan

refactor(api): extract policy evaluation into dedicated service class

test(api): add unit tests for content filter policy
```

### Rules

- Use the **imperative mood** in the short description: "add feature" not "added feature".
- Keep the subject line under **72 characters**.
- Do not end the subject line with a period.
- Reference issues in the footer when applicable: `Closes #42` or `Refs #15`.

---

## Pull Request Process

1. Ensure your branch is up to date with `upstream/main` before opening a PR:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push your branch to your fork:

   ```bash
   git push origin feat/your-feature-name
   ```

3. Open a Pull Request against `DongDuong2001/nexus-guard:main`.
4. Fill in the PR template:
   - **What** — Describe the change.
   - **Why** — Explain the motivation or problem solved.
   - **How** — Summarize the implementation approach.
   - **Testing** — Describe how you tested the change.
5. Ensure all checks pass (lint, build, tests).
6. Request a review. At least **one approval** is required before merging.
7. Squash and merge is preferred to keep the commit history clean.

---

## Development Guidelines

### Frontend (`apps/web`)

- Use **React Server Components** by default. Add `"use client"` only when hooks or browser APIs are required.
- Follow the existing **Brutalist design system** — monochrome palette, Archivo font, square corners.
- Use **Tailwind CSS** utility classes only. No external CSS files.
- Use **`lucide-react`** for all icons.
- All new pages must be placed under `src/app/` following the Next.js App Router convention.

### Backend (`services/governance-api`)

- Use **Java 21** features where appropriate (records, sealed classes, virtual threads).
- New REST endpoints must be documented with inline comments describing the route and expected behavior.
- Reactive (WebFlux) code is used for the proxy pipeline. Blocking calls must not be introduced in the reactive chain.
- All new services must include unit tests under `src/test/`.

### Shared Types (`packages/shared-types`)

- All interfaces shared between frontend and backend must be defined here.
- Keep types minimal and precise. Avoid `any`.
- Export all types from `src/index.ts`.

---

## Reporting Issues

When reporting a bug or requesting a feature, please open a [GitHub Issue](https://github.com/DongDuong2001/nexus-guard/issues) and include:

- **Title:** A concise, descriptive title.
- **Environment:** OS, Node.js version, Java version, browser (if applicable).
- **Steps to reproduce:** Numbered list of exact steps.
- **Expected behavior:** What should happen.
- **Actual behavior:** What actually happens.
- **Logs / Screenshots:** Attach any relevant output.

---

## Questions

For questions or discussion, open a [GitHub Discussion](https://github.com/DongDuong2001/nexus-guard/discussions) rather than an issue.
