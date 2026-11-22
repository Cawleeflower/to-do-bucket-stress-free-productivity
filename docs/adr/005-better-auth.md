# ADR-005: Sign-in with Better Auth

- Status: Accepted
- Date: 2026-11-09
- Decided via Q3 (include Google sign-in)

## Context

Users sign in on phones from an installed web app. Passwords would need storage and CPU-heavy hashing that the Workers Free plan can't afford.

## Decision

Sign-in with Better Auth: 6-digit email codes, passkeys and Google. No passwords, no magic links.

## Rationale

No password storage; no CPU-heavy hashing; Google gives one-tap sign-in. Links in email open in Safari on iPhone, not in the installed app, so a code is typed instead.

### Options compared

| Option                       | Strength                                                                                                            | Weakness here                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Better Auth (chosen)         | Open source; users and sessions live in our Postgres; email codes, passkeys and Google as plugins; no per-user fees | We configure and patch it; we send its emails                                                                                       |
| Supabase Auth                | Managed, 50,000 monthly users free, same database                                                                   | Browser SDK keeps tokens in localStorage by default; ties the API to Supabase JWTs; still needs our own SMTP for real email volumes |
| Clerk, Auth0, WorkOS AuthKit | Hosted login pages, bot protection, MFA                                                                             | Another vendor holding our users; redirect flows inside an installed iOS web app need extra testing                                 |

## Trade-off accepted

Email deliverability matters; Resend's 100/day cap; Google sign-in inside an installed iPhone app needs a spike (task 1.08).

## Revisit when

Daily sign-in emails approach 70 a day.
