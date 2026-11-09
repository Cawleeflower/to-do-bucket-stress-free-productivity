# ADR-001: Modular monolith in one Worker

- Status: Accepted
- Date: 2026-11-09

## Context

One developer builds and runs the whole app. The web app and the API change together in most releases.

## Decision

A modular monolith, deployed as one Cloudflare Worker that serves both the app and the API.

## Rationale

Fewest moving parts for one developer; UI and API are released atomically.

## Trade-off accepted

Every deploy ships everything; one module's bug can affect the rest.

## Revisit when

A module needs a different runtime or scaling profile.
