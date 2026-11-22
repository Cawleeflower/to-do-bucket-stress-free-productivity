# ADR-009: Sync ordering by a single locked version counter

- Status: Accepted
- Date: 2026-11-09

## Context

A pull must never skip a change that another push committed at the same time.

## Decision

Order sync changes by a single version counter, locked for each push.

## Rationale

The simplest strategy that never skips a change in a pull.

## Trade-off accepted

All pushes are serialised. This is fine below tens of pushes per second.

## Revisit when

Push latency rises from lock waits; then switch to per-user versions.
