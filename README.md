# To Do Bucket

A stress-free productivity app. Capture a task in one tap, sort it by effort and place, record its next step, and hand next steps to anyone by email, WhatsApp or Teams without them installing anything. It works offline as an installable web app on desktop and phones, and reminds you by push notification.

## Tech stack

TypeScript everywhere: a React PWA (Vite) and a Hono API, deployed together as one Cloudflare Worker, with PostgreSQL on Supabase reached through Hyperdrive. The reasons for each choice are in the [architecture decision records](docs/adr/README.md).

## Repo layout

| Path                 | What it holds                                                      |
| -------------------- | ------------------------------------------------------------------ |
| `apps/api`           | Cloudflare Worker (Hono): the API, and it serves the built web app |
| `apps/web`           | React PWA (Vite)                                                   |
| `packages/domain`    | Pure TypeScript rules shared by the device and the server          |
| `packages/contracts` | Zod schemas for API payloads, mutations and error codes            |
| `packages/testing`   | Builders, fixtures and fakes for tests                             |
| `packages/config`    | Shared tsconfig and Biome settings                                 |
| `docs/`              | ADRs, engineering standards, runbooks and diagrams                 |

## Prerequisites

- Node.js 24 (the exact version is in `.node-version`)
- pnpm (the version is pinned in `package.json` under `packageManager`)
- [gitleaks](https://github.com/gitleaks/gitleaks), used by the pre-commit hook

## Setup

```sh
pnpm install
```

`pnpm install` also installs the lefthook Git hooks.

Local environment variables and running the app locally: TBD (W8 · 8.08).

## Scripts

| Command              | What it does                               |
| -------------------- | ------------------------------------------ |
| `pnpm check`         | Biome lint and format check                |
| `pnpm fix`           | Biome with fixes applied                   |
| `pnpm typecheck`     | TypeScript in every package                |
| `pnpm test`          | Unit tests in every package                |
| `pnpm test:coverage` | Tests with coverage thresholds             |
| `pnpm lint:deps`     | dependency-cruiser layer and module rules  |
| `pnpm build`         | Dependency rules, then build every package |

## Deployment

TBD (W3 · 3.07, W6 · 6.08).

## Docs

- [Architecture decision records](docs/adr/README.md)
- [Engineering standards](docs/standards.md)
- [Runbooks](docs/runbooks/) (TBD, W6 · 6.09)
- [Security policy](SECURITY.md)

## Contributing

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat(tasks): add next step`. A commit-msg hook checks this.
- Open a pull request against `main`; fill in the PR template's checklist. It merges when every check is green.
- Follow the [engineering standards](docs/standards.md), and add an ADR for any new dependency or pattern.
