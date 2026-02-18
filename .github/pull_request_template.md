## Summary

<!-- Describe the change and the motivation behind it. -->

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Refactor (code change that neither fixes a bug nor adds a feature)
- [ ] Documentation update
- [ ] CI/CD / Infrastructure change

## Affected Services

- [ ] `apps/web` — Next.js Frontend
- [ ] `services/governance-api` — Spring Boot Backend
- [ ] `packages/shared-types` — Shared TypeScript Types
- [ ] CI/CD / GitHub Actions

## Testing

<!-- Describe the tests you ran and how to reproduce them. -->

- [ ] I have run `npm run lint` and `npm run build` locally (for web changes)
- [ ] I have run `./mvnw test` locally (for API changes)
- [ ] I have tested the changes manually in a local environment

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have added/updated relevant documentation
- [ ] My changes do not introduce new linting errors
- [ ] I have reviewed the diff and removed any debug/temporary code
- [ ] Sensitive values (API keys, tokens) are **not** hardcoded — they use environment variables
