# Observability

How we see what the app is doing in production. The rule lives in [standards](standards.md#observability); this page explains why and what each part must contain.

## Why it matters

You can't fix what you can't see. Once the app is live, users won't tell you that a sync failed or a delegation link broke. Observability means we find out first, can trace what happened and know what to do.
- **Logs** say what happened on a given request.
- **Errors (Sentry)** say what broke, where in the code and for how many users.
- **Alerts** say something needs attention now, and the runbook line says what to do.

The **request id** ties them together. The same id is in the log line, the Sentry event and the `x-request-id` response header, so one user report leads to everything about that request.

## Log line

One structured JSON line per request.

| Field             | Why                                                                               |
| ----------------- | --------------------------------------------------------------------------------- |
| `timestamp`       | When it happened.                                                                 |
| `level`           | `info`, `warn` or `error`, so lines can be filtered.                              |
| `requestId`       | Links the log line, the error and the user report.                                |
| `method`, `route` | Route pattern (`/tasks/:id`), not the raw URL, so lines group and ids don't leak. |
| `status`          | HTTP status code.                                                                 |
| `durationMs`      | Spots slow endpoints.                                                             |
| `userId`          | Opaque id: who was affected, without personal data.                               |
| `release`         | Which deploy served the request.                                                  |
| `event`           | Optional domain action, e.g. `task.completed`, `delegation.sent`.                 |

**Never log:** passwords, tokens, delegation link secrets, emails, task titles or any other user content.

## Error

Sent to Sentry for unexpected failures only. Expected 4xx errors, such as validation failures, stay out so they don't bury real problems.
- Stack trace, with source maps so it points at the TypeScript source.
- `requestId` as a tag.
- `release` and `environment` (production or preview).
- Opaque `userId`, to count affected users.
- Route and method.
- Breadcrumbs: the steps just before the error (DB query, external call, throw).

## Alert

| Part          | Example                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| What fired    | "5xx rate > 2% for 5 min".                                                                          |
| Severity      | Page now, or fix next working day.                                                                  |
| Impact        | "Users can't capture tasks".                                                                        |
| Where to look | Link to the dashboard, Sentry query or log filter.                                                  |
| Runbook line  | First step, e.g. "Check last deploy; roll back if within 1h", with a link to [runbooks](runbooks/). |

Alert on symptoms users feel (error rate, latency, failed email or push), not causes like CPU. If nobody would act on an alert, delete it.

## How it's checked

- **Log-shape test:** a test makes a request and asserts the log line is valid JSON with every required field, including `requestId`, and no banned fields. Breaking logging turns CI red.
- **Monthly test alert:** fire a fake alert and confirm it arrives, reaches the right person and that its runbook link still works. Alerts break silently otherwise.
