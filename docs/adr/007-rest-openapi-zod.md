# ADR-007: REST-style API plus two sync endpoints

- Status: Accepted
- Date: 2026-11-09

## Context

The app has one client (our PWA). Payloads are already described as Zod schemas in `packages/contracts`.

## Decision

A REST-style API plus two sync endpoints (push and pull); OpenAPI is generated from the Zod schemas. No GraphQL.

## Rationale

One client; simple, cacheable, well-tooled.

## Trade-off accepted

Some endpoints are shaped for the one client.

## Revisit when

Third-party clients or integrations are planned.
