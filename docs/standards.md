# Engineering standards

How code in this repo is written and checked. Some checks listed here arrive in later tasks; until then, the PR checklist and review cover them.

## Glossary

Use these words everywhere: code, UI, docs and commit messages.

| Term       | Meaning                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| Inbox      | Where every captured task lands, with only a title, until it is sorted.                                         |
| Next step  | The next physical action that moves a task forward.                                                             |
| Place      | A user-defined place where a task can be done (home, office, errands); lists filter by it.                      |
| Waiting on | A task blocked on a person, with a follow-up date.                                                              |
| Delegation | A next step handed to a contact through a private one-task link.                                                |
| Effort     | The task's bucket: Quick (≤ 2 min), Session (> 2 min) or Long (days or weeks, can become a project with steps). |

## Standards

### Clean code & naming

- **What it means:** the same words everywhere (see the glossary). Names say intent (`completeTask`, not `handle2`). Small functions with one job.
- **How it's checked:** glossary in this file; PR checklist; Biome naming rules.

### DRY without over-abstraction

- **What it means:** share rules and schemas (`domain`, `contracts`). For UI code, wait for the third copy before abstracting.
- **How it's checked:** review; knip for unused exports.

### SOLID where it helps

- **What it means:** single responsibility for services and repositories; dependency inversion through adapters for email, push, clock and ids. No class hierarchies for their own sake.
- **How it's checked:** adapters have contract tests; review.

### Separation of concerns

- **What it means:** routes handle HTTP, services hold use cases, repositories hold SQL, and the domain package holds rules and imports nothing else.
- **How it's checked:** dependency-cruiser layer rules fail CI.

### High cohesion, low coupling

- **What it means:** modules own their tables; others use the module's public service or its events.
- **How it's checked:** dependency-cruiser module rules; no cross-module schema imports.

### Consistent patterns

- **What it means:** one way to write a route, a mutation, an error, a log line and a migration; a scaffold script creates new modules.
- **How it's checked:** scaffold output reviewed once; PR checklist.

### Error handling

- **What it means:** typed errors, problem details, no swallowed exceptions, fail closed on permission errors, user-facing messages that say what to do.
- **How it's checked:** error-path tests; Semgrep rule for empty `catch`; weekly Sentry review.

### Secure coding

- **What it means:** OWASP ASVS Level 1 and the OWASP Cheat Sheets; no secrets in code; validate at every boundary.
- **How it's checked:** Semgrep, gitleaks, OSV-Scanner, ZAP; ASVS checklist per release.

### Automated testing

- **What it means:** the test mix from the design (unit for rules, integration for SQL, E2E for journeys); every bug fix starts with a failing test.
- **How it's checked:** coverage thresholds; CI must be green.

### Performance from measurement

- **What it means:** budgets first; profile before optimising; no speculative caches.
- **How it's checked:** bundle budget, Lighthouse CI, k6 reports, `EXPLAIN` in PRs.

### Maintainability & extensibility

- **What it means:** new features arrive as modules behind flags; significant choices get an ADR.
- **How it's checked:** new-module checklist; ADR present for each new dependency or pattern.

### Accessibility

- **What it means:** WCAG 2.2 AA: keyboard paths, visible focus, labels, contrast, reduced motion, 200% zoom.
- **How it's checked:** axe (zero serious or critical) in CI; manual checklist per release.

### Observability

- **What it means:** a structured log line per request with a request id; errors to Sentry; every alert has a runbook line.
- **How it's checked:** log-shape test; monthly test alert.

### Documentation

- **What it means:** README, ADRs, runbooks, generated API docs; docs change in the same PR as the code.
- **How it's checked:** PR checklist item; link checker in CI (optional).

### Dependencies & technical debt

- **What it means:** monthly upgrade day; a `tech-debt` label on issues; about one day in five on debt and upkeep.
- **How it's checked:** Dependabot PRs older than 14 days flagged; debt issues reviewed monthly.

## Conventions

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat(tasks): add next step`. Enforced by `scripts/check-commit-msg.mjs` through lefthook.
- **Pull requests:** each one is under a day of work, uses the PR template, and merges only when every check is green.
- **Docs:** change in the same PR as the code they describe.

## Layer rules

```
routes → service → repository
```

- Every layer may use `packages/domain`; `packages/domain` imports nothing outside itself.
- A module's tables, repository and internals are private. Other modules import only its `index.ts` service or react to its events.
- Vendors sit behind adapters in `platform/` (email, push, clock, ids), so business code never imports a vendor SDK.

`.dependency-cruiser.cjs` enforces the layer, module, pure-domain and no-circular rules; run it with `pnpm lint:deps`.
