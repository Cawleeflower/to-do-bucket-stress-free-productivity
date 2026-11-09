# ADR-002: Local-first PWA with in-house push/pull sync

- Status: Accepted
- Date: 2026-11-09

## Context

Working offline is a release-1 requirement (FR-07). Each user's data is small and private to them.

## Decision

A local-first PWA with an in-house push/pull sync protocol.

## Rationale

Offline is a release-1 requirement; per-user data is small; there is no vendor quota to outgrow.

## Trade-off accepted

We own sync correctness. This is mitigated by property-based tests.

## Revisit when

The phase-0 spike fails, or shared multi-user lists arrive (consider PowerSync).
