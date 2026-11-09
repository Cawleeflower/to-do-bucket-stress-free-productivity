# ADR-003: PostgreSQL on Supabase Free, reached through Hyperdrive

- Status: Accepted
- Date: 2026-11-09

## Context

Sync needs transactions and row locks to apply pushes correctly, on a zero-cost budget.

## Decision

PostgreSQL on Supabase Free, reached from the Worker through Hyperdrive.

## Rationale

Transactions and locks for correct sync; standard SQL; portable to any Postgres host.

### Options compared

| Option            | Free allowance                                                                                                                                       | Fit for this app                                                                                                         | Main risk                                                                                               | Verdict    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------- |
| Supabase Postgres | 500 MB database, shared CPU with 500 MB RAM, 5 GB egress, 2 active projects; paused after a week of inactivity; no backups or point-in-time recovery | Full Postgres: interactive transactions, row locks, constraints, RLS                                                     | Storage cap and missing backups (both handled in this design)                                           | Chosen     |
| Cloudflare D1     | 5 GB storage, 5 million rows read and 100,000 rows written a day                                                                                     | SQLite; statements in a batch are atomic, but there are no interactive transactions, so the sync push logic gets awkward | Ties data access to a Cloudflare-specific API                                                           | Plan B     |
| Neon              | Free tier that scales compute to zero when idle and meters compute use                                                                               | Postgres with branching (nice for previews)                                                                              | A per-minute reminder job and steady daytime traffic keep compute awake; cold starts after idle periods | Not chosen |

## Trade-off accepted

500 MB cap, no provider backups, and the project pauses if idle for a week.

## Revisit when

The database reaches 350 MB (70%) or the free-tier terms change.
