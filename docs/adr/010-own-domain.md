# ADR-010: Own the domain from day one

- Status: Accepted
- Date: 2026-11-09
- Related: Q2 (.com at Cloudflare Registrar)

## Context

Passkeys, push subscriptions and app installs are all bound to the origin. Changing the domain later would break every one of them.

An origin is scheme + host + port. `https://example.com`, `https://app.example.com` and `https://example.com:8443` are three different origins, so moving from the apex to a subdomain is a domain change too.

### Push subscriptions

- A service worker is registered by one origin, and its scope can't reach outside it. The push subscription is created on that registration (`registration.pushManager.subscribe()`), so it belongs to that origin as well.
- Notification permission is granted per origin. A new domain starts with no permission and has to ask again.
- The push endpoint (at FCM, Mozilla or Apple) wakes the service worker of the origin that subscribed. Our server can't point an existing subscription at a new domain; it can only keep sending to the old origin's worker, whose notifications open old-domain URLs.
- Browsers refuse redirects when fetching a service worker script, so a 301 from the old domain can't hand the worker over to the new one.
- On iPhone, Web Push only works inside a Home Screen web app ([ADR-006](006-web-push.md)), so losing the install also loses push.

### App installs

- The manifest's `start_url` and `scope` must be on the same origin as the page that links it, and the app's identity (`id`, which defaults to `start_url`) is resolved against that origin. A manifest on a new domain is a new app, not an update to the old one.
- Android and desktop Chrome/Edge install against that identity. The old icon stays on the device and keeps opening the old domain.
- iOS Home Screen web apps record the URL at install time and get their own storage. Navigating to another origin drops out of the standalone view. Users have to delete the icon and add it again.
- IndexedDB, Cache Storage and OPFS are partitioned by origin. In a local-first app ([ADR-002](002-local-first-sync.md)) the device copy of the user's data lives there, so a new origin starts empty and any change not yet pushed stays stranded on the old one.

### What a later move would cost

A redirect only moves the next page load; nothing above can be migrated from the server. Every user would have to sync, install the new app, delete the old one, grant notification permission again and register a new passkey ([ADR-005](005-better-auth.md)). If the old domain then lapsed, whoever registered it would control the origin that old installs and service workers still fetch updates from.

## Decision

Own the domain from day one.

## Rationale

Passkeys, push subscriptions and installs are bound to the origin.

## Trade-off accepted

About RM45–50 a year.

## Revisit when

Never.
