# Web Testing Workflow

A reliable web assessment maps the application first, then compares security decisions across identities, objects, routes, and states. The workflow below is designed for local or explicitly authorised targets.

## Learning objectives

- build route, input, and role inventories;
- establish repeatable baselines;
- test authentication, sessions, and authorisation;
- trace data into security-sensitive operations;
- capture minimal evidence and convert it into findings.

## 1. Prepare the test identities

Create synthetic accounts that make comparisons possible:

| Account | Intended role | Own canary object | Purpose |
|---|---|---|---|
| Anonymous | none | none | Public surface and access-denial baseline |
| Learner A | standard user | `ALPHA-CANARY` | Permitted user/object baseline |
| Learner B | standard user | `BRAVO-CANARY` | Horizontal access checks |
| Lab admin | administrator | `ADMIN-CANARY` | Vertical role checks |

Use distinct browser profiles or isolated cookie jars so sessions do not become confused. Keep tokens redacted in notes.

## 2. Map the application

Browse every major workflow manually before automating anything. Record:

- routes, methods, and content types;
- parameters in path, query, body, headers, and cookies;
- redirects and background requests;
- anonymous, user, and administrator functions;
- object identifiers and ownership;
- uploads, exports, imports, webhooks, URL previews, and integrations;
- client-side routes that call hidden APIs;
- error cases and logout/session transitions.

Build a role/route matrix:

| Route/action | Anonymous | User A | User B | Admin | Expected owner check |
|---|---:|---:|---:|---:|---|
| View public article | Allow | Allow | Allow | Allow | None |
| View A profile | Deny | Allow | Deny | Allow | `profile.owner == subject` or admin |
| Edit A profile | Deny | Allow | Deny | Allow | Owner plus allowed fields |
| Review users | Deny | Deny | Deny | Allow | Admin role |

The expected column is essential: without it, a surprising response cannot be classified correctly.

## 3. Establish baselines

For each important action capture:

1. one successful request with the intended user;
2. one logged-out request;
3. one request with the wrong same-level user;
4. one lower-role request for privileged functions;
5. the application state before and after.

Change one variable at a time. If the method, token, object ID, and body all change together, you cannot tell which control produced the result.

## 4. Test authentication and session lifecycle

Questions to answer:

- Are sign-in responses and timing suitably non-revealing for nonexistent users?
- Are rate and abuse controls present where required by the lab design?
- Does the session identifier rotate after sign-in and role change?
- Are old sessions revoked after password reset or explicit revocation?
- Does logout invalidate server-side state rather than only clearing the browser?
- Are sensitive actions protected by recent authentication when appropriate?
- Are recovery and invitation flows bound to the correct user, purpose, and lifetime?

Use only provided synthetic accounts. Do not perform password guessing unless a lab explicitly defines a tiny, safe exercise and rate limit.

## 5. Test authorisation

### Horizontal checks

Keep the role the same and change the object owner. Compare A accessing A's object with A accessing B's canary object.

### Vertical checks

Keep the action the same and change the role. Compare an administrator's harmless read-only request with the standard user's version.

### Contextual checks

Test state and relationship: draft versus published, team member versus outsider, active versus revoked, or step one versus step three of a workflow.

Check every server-side route and method. Hiding a button or using an unpredictable identifier does not enforce permission.

## 6. Trace input to sinks

Inventory input sources:

- form and JSON fields;
- URL paths and queries;
- headers and cookies;
- filenames and file contents;
- stored profile values or imported records;
- webhook and integration data.

Then identify sensitive sinks:

| Sink | Primary risk | Durable control |
|---|---|---|
| Database query | Query meaning altered | Parameterised queries and least privilege |
| HTML/DOM | Script or markup interpretation | Contextual output encoding and safe DOM APIs |
| Operating-system command | Command interpretation | Avoid shell; fixed arguments and strict allow-lists |
| Filesystem path | Escaping intended directory | Server-generated names and canonical path checks |
| Server-side URL fetch | Internal or unintended destinations | Destination allow-list and egress controls |
| Template engine | Template expression interpretation | Logic-free templates and safe variable handling |

In a lab, begin with a benign marker such as `CJ-BOUNDARY-'"<>` and observe how each context stores, logs, and renders it. A marker is a diagnostic, not a universal payload.

## 7. Test state-changing requests

For actions such as profile changes, purchases, invitations, or permission updates, verify:

- the correct authenticated subject;
- object and function authorisation;
- intended origin or anti-forgery control;
- server-side validation of all fields;
- replay and duplicate-submission behaviour;
- transaction integrity and audit logging;
- confirmation for unusually sensitive changes.

Use reversible changes to synthetic records. Restore the starting state when finished.

## 8. Test file handling

With harmless text or image fixtures, examine:

- size and type validation based on content, not only filename;
- server-generated storage names;
- separation from executable application paths;
- authorisation for upload, list, read, replace, and delete;
- download content type and disposition;
- malware scanning or quarantine workflow where required;
- metadata and filename disclosure;
- cleanup of abandoned files.

Never upload active malware. A plain-text test file and a mismatched extension are enough to study most validation paths in a training lab.

## 9. Observe errors and logging

Trigger safe failures: missing required field, unknown identifier, expired session, unsupported method, and oversized-but-within-lab-limit input. Check whether responses reveal stack traces, secrets, filesystem paths, or other users' data.

From the defender view, confirm logs capture the actor, action, target, result, correlation ID, and time without storing passwords, full tokens, or sensitive request bodies.

## 10. Triage results

For each observation, record:

```text
Control expected:
Baseline request:
Single variable changed:
Observed decision:
Reproduced?:
Bounded impact:
Root-cause hypothesis:
Defensive test:
```

Prioritise broken access control, session failures, sensitive data exposure, server-side interpreter boundaries, and business logic over cosmetic hardening gaps.

## Practical exercise: two-user assessment

1. Create the four identities in the table or use equivalent supplied lab users.
2. Map ten routes and at least three state-changing actions.
3. Fill a role/route/object matrix before testing.
4. Capture a positive and negative control for five routes.
5. Trace three inputs to their final sink or stored representation.
6. Test one harmless upload and its download controls.
7. Record one verified, one not-reproduced, and one inconclusive result.
8. Write a finding with root-cause remediation and a regression test.

## Exit checkpoint

You should be able to hand your notes to another learner who can repeat the decisions without needing your browser history or undocumented intuition.

Next: [Vulnerability classes](vulnerability-classes.md).
