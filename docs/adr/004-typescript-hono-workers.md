# ADR-004: TypeScript everywhere; Hono on Cloudflare Workers

- Status: Accepted
- Date: 2026-11-09

## Context

The device and the server must run the same domain rules and schemas so offline edits and server re-validation agree.

## Decision

TypeScript everywhere; the API is Hono on Cloudflare Workers.

## Rationale

One language; domain rules shared with the device; generous free compute.

## Trade-off accepted

10 ms CPU per request on the Free plan; the Workers runtime differs slightly from Node.

## Revisit when

CPU limit errors appear in Observability.
