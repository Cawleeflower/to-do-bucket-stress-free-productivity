# ADR-011: No extra infrastructure beyond Cloudflare Queues

- Status: Accepted
- Date: 2026-11-09

## Context

Expected load is about 10k visits a month (≈ 1,500 monthly users), sized against free-tier quotas.

## Decision

No server-side cache, search engine, message broker or containers beyond Cloudflare Queues.

## Rationale

Load is small; each would add cost and failure modes.

## Trade-off accepted

Some later features (full-text search) will need work when they arrive.

## Revisit when

Measured latency or quota pressure shows a need.
