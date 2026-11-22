# ADR-006: Web Push to the installed app, email fallback

- Status: Accepted
- Date: 2026-11-09

## Context

Reminders and delegate replies must reach the user within 60 s (FR-06), within a budget that rules out app-store fees.

## Decision

Web Push to the installed app, with email as the fallback. No native apps in release 1.

## Rationale

Fits the budget; one codebase.

## Trade-off accepted

iPhone users must add the app to the Home Screen to receive push.

## Revisit when

The budget allows store fees, or push opt-in on iOS stays low.
