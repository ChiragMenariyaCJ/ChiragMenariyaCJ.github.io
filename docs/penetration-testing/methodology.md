# Methodology and Rules of Engagement

A methodology prevents tools and curiosity from pulling an assessment outside its purpose. It makes the work repeatable, reviewable, and safer for everyone involved.

## Learning objectives

After this module you should be able to:

- extract testable boundaries from an engagement scope;
- write useful rules of engagement;
- create stop conditions and an escalation path;
- plan evidence handling and cleanup;
- organise an assessment around assets, questions, and risk.

## 1. Translate authorisation into boundaries

Written authorisation should identify the asset owner, tester, dates, targets, and permitted activity. Convert it into a working scope matrix before touching the environment.

| Scope field | Questions to resolve |
|---|---|
| Assets | Which hosts, domains, applications, tenants, APIs, and physical locations? |
| Identities | Which supplied accounts and roles? May new accounts be created? |
| Time | Start/end time, time zone, maintenance windows, blackout periods? |
| Techniques | Are automated scans, social engineering, password testing, or denial-of-service excluded? |
| Data | May records be viewed, downloaded, changed, or only proven with a canary? |
| Third parties | Which cloud, CDN, SaaS, or shared-hosting systems are not owned by the client? |
| Communication | Who is the operational contact and who owns incident escalation? |
| Cleanup | Which accounts, files, logs, or configuration changes must be removed? |

!!! tip "Treat ambiguity as out of scope"
    If ownership or permission is unclear, pause that line of testing and ask the engagement contact. Do not infer permission from technical reachability.

## 2. Write rules of engagement

Rules of engagement turn the scope into operating instructions.

### Contacts and cadence

- named primary and backup contacts;
- normal check-in schedule;
- urgent communication channel;
- required notice before high-risk tests;
- reporting expectations for critical findings.

### Traffic identification

Document tester source addresses, user-agent conventions, test account names, and unique markers. This lets defenders distinguish authorised work from unrelated activity.

### Safety limits

Define rate limits, concurrency, request volume, maximum file size, and any fragile services. State prohibited actions explicitly. Common exclusions include availability testing, phishing, persistence, destructive payloads, and access to production customer data.

### Stop conditions

Stop and contact the owner when any of these occur:

- unexpected service degradation or instability;
- evidence of a real compromise or unrelated intruder;
- access to sensitive data beyond the minimum proof;
- a target resolves to an unlisted third party;
- testing begins to affect other tenants or environments;
- an action would exceed the authorised technique set;
- the emergency contact requests a pause.

## 3. Model the environment

Before scanning, sketch the system at a useful level:

```text
User -> reverse proxy -> web application -> API -> database
                         |              -> identity provider
                         -> background worker -> object storage
```

For each trust boundary, ask:

- What identity crosses it?
- What data changes format or owner?
- What enforces authorisation?
- What is logged?
- What fails open or closed?
- Which component is internet-facing, privileged, or shared?

This model produces targeted test questions and reduces noisy, indiscriminate scanning.

## 4. Build a test plan

Organise the plan by security question rather than by tool.

| Security question | Evidence source | Safe test idea | Stop point |
|---|---|---|---|
| Are services limited to the intended network? | Port and firewall inventory | Compare exposure from approved lab segments | Inventory complete |
| Does each role see only its own records? | Two synthetic accounts | Request one canary object across accounts | One object proves allow/deny |
| Are administrative actions protected? | Role matrix and request logs | Replay a harmless read-only admin request as a lower role | Clear authorisation decision |
| Is input handled as data? | Validation response and server log | Submit benign boundary characters in a local lab | Behaviour classified |

Prioritise by exposure, privilege, data sensitivity, change history, and known threat paths. Keep a backlog for interesting but lower-value observations.

## 5. Manage evidence

Good evidence is sufficient, reproducible, minimal, and protected.

### Evidence naming

Use a predictable structure:

```text
ENGAGEMENT/
  notes/
  screenshots/
  requests/
  tool-output/
  findings/
```

Name files with UTC date, asset, and purpose, for example:

```text
2026-11-19T1422Z_training-api_object-auth-response.txt
```

### Evidence record

For every important result, capture:

- asset and environment;
- tester identity and source;
- UTC timestamp;
- exact preconditions;
- redacted request and response;
- expected versus observed behaviour;
- hash or filename of supporting artefacts;
- any state change and cleanup status.

Never place live secrets in a report. Redact tokens, cookies, passwords, personal data, internal keys, and unrelated records. Store raw evidence only where the engagement agreement permits it.

## 6. Track decisions

A decision log explains why the tester changed direction or stopped.

| Time (UTC) | Decision | Reason | Owner/approval |
|---|---|---|---|
| 10:15 | Reduced request rate | Lab became slow at five concurrent requests | Tester; within RoE |
| 11:40 | Did not test shared upload bucket | Ownership was not documented | Awaiting client contact |
| 14:05 | Stopped after one canary object | Impact proven; further access unnecessary | Test plan stop point |

## Practical exercise: write a mini engagement pack

Use only a local application or intentionally vulnerable training platform.

1. Name one target, one test account, and a two-hour testing window.
2. Write five in-scope and five out-of-scope actions.
3. Define request-rate and data-access limits.
4. Add three stop conditions and an escalation contact placeholder.
5. Draw a four-component data-flow diagram.
6. Create five security questions and one minimal test for each.
7. Prepare the evidence folder structure and decision-log table.

### Completion criteria

You are finished when another student can read the pack and correctly explain:

- what they may touch;
- what they must not do;
- when they must stop;
- how to record evidence;
- how success will be judged.

## Common mistakes

| Mistake | Why it matters | Better habit |
|---|---|---|
| Copying a generic checklist | It misses the system's actual trust boundaries | Derive questions from the architecture and risk |
| Treating a domain as permission for every subdomain | Assets may have different owners | Confirm exact names, ranges, tenants, and third parties |
| Capturing excessive data | Proof becomes a privacy incident | Use synthetic canaries and stop at minimum evidence |
| No operational contact | A safe pause becomes a prolonged incident | Test the contact path before starting |
| Tool-first planning | Produces noise without answering security questions | Map each command to a hypothesis and stop point |

## Knowledge check

1. Why is a public hostname not proof of authorisation?
2. What information belongs in a stop condition?
3. How does a test plan differ from a list of tools?
4. What makes evidence minimal but sufficient?
5. When should an ambiguous asset be tested?

Next: [Reconnaissance and enumeration](reconnaissance-enumeration.md).
