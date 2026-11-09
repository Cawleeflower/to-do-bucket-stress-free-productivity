# Architecture decision records

Each file records one significant decision: its context, the choice, why, the trade-off accepted and what should reopen it. Copy [`000-template.md`](000-template.md) to start a new one.

**Rule:** a new dependency or pattern needs a new ADR, in the same PR that introduces it.

| ADR                                        | Decision                                                |
| ------------------------------------------ | ------------------------------------------------------- |
| [001](001-modular-monolith.md)             | Modular monolith in one Worker                          |
| [002](002-local-first-sync.md)             | Local-first PWA with in-house push/pull sync            |
| [003](003-postgres-supabase-hyperdrive.md) | PostgreSQL on Supabase Free, reached through Hyperdrive |
| [004](004-typescript-hono-workers.md)      | TypeScript everywhere; Hono on Cloudflare Workers       |
| [005](005-better-auth.md)                  | Sign-in with Better Auth                                |
| [006](006-web-push.md)                     | Web Push to the installed app, email fallback           |
| [007](007-rest-openapi-zod.md)             | REST-style API plus two sync endpoints                  |
| [008](008-public-github-actions.md)        | Public GitHub repo with GitHub Actions                  |
| [009](009-single-version-counter.md)       | Sync ordering by a single locked version counter        |
| [010](010-own-domain.md)                   | Own the domain from day one                             |
| [011](011-no-extra-infra.md)               | No extra infrastructure beyond Cloudflare Queues        |
| [012](012-delegate-links.md)               | Delegates don't use the app; they get a one-task link   |
| [013](013-user-written-motivation.md)      | Motivational messages are written by each user          |
