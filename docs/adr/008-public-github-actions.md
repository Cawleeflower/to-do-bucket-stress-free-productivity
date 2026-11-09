# ADR-008: Public GitHub repo with GitHub Actions

- Status: Accepted
- Date: 2026-11-09
- Decided via Q1 (public repository)

## Context

The project needs branch rules, deployment approval, code and secret scanning and CI minutes at no cost.

## Decision

A public GitHub repository with GitHub Actions. Staging deploys on every merge; production deploys after approval in GitHub, with automatic rollback.

## Rationale

Branch rules, deployment approval, code and secret scanning and CI minutes are all free on public repos.

## Trade-off accepted

Anyone can read the code, so nothing may rely on it being hidden. Nothing secret may ever be committed.

## Revisit when

The code needs to be private (paid plan or GitLab).
