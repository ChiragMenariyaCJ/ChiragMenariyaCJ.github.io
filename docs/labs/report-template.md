# Assessment Report Template

Copy this structure into your lab notes. Replace every placeholder and remove sections that do not apply. Do not include live credentials, full tokens, private keys, real personal data, or unnecessary raw output.

## Document control

| Field | Value |
|---|---|
| Assessment | `[lab or engagement name]` |
| Version | `[v1.0]` |
| Date | `[YYYY-MM-DD]` |
| Tester | `[name]` |
| Owner/contact | `[lab owner or contact]` |
| Classification | `[training / confidential as agreed]` |
| Evidence retention | `[location and deletion date]` |

## Executive summary

### Objective

`[One paragraph: what was assessed and what question the work was meant to answer.]`

### Overall result

`[One paragraph: strongest themes, what is working, what creates the most risk, and confidence/limitations.]`

### Priority actions

1. `[Highest-leverage root-cause action]`
2. `[Second action]`
3. `[Third action]`

Avoid tool names and technical reproduction detail here. Explain decisions and outcomes.

## Scope and rules

### In scope

| Asset/identity | Environment | Allowed activity | Owner |
|---|---|---|---|
| `[asset]` | `[lab/test]` | `[read-only discovery, canary validation, ...]` | `[owner]` |

### Out of scope

- `[asset, technique, data type, or time window]`

### Operating limits

- Window and time zone: `[value]`
- Request/concurrency limit: `[value]`
- Maximum test object/file size: `[value]`
- Data access stop point: `[one synthetic object]`
- Stop conditions: `[instability, unexpected data, wrong address, ...]`
- Emergency contact: `[value]`
- Cleanup/reset method: `[value]`

## Environment and methodology

### Architecture

```text
[client] -> [edge/app] -> [API/service] -> [data/identity]
```

### Test identities

| Identity | Role/tenant | Synthetic object | Purpose |
|---|---|---|---|
| `[Learner A]` | `[member]` | `[ALPHA-CANARY]` | `[owner baseline]` |

### Method

1. Reviewed scope, architecture, and expected policy.
2. Built asset, route/endpoint, object, role, and control inventories.
3. Captured intended positive controls.
4. Changed one security-relevant variable at a time.
5. Used synthetic canaries and stopped at minimum proof.
6. Recorded impact, root cause, remediation, and regression tests.
7. Cleaned up or reverted the environment.

### Limitations

- `[Unavailable role, excluded technique, environment difference, time limit, or untested area.]`

Never describe an excluded or untested area as secure.

## Results overview

| ID | Title | Severity | Confidence | Affected asset | Status |
|---|---|---|---|---|---|
| F-01 | `[Behaviour and component]` | `[High/Medium/Low/Info]` | `[Confirmed/Inconclusive]` | `[asset]` | `[Open/Resolved]` |

## Finding F-01: [behaviour plus affected component]

### Rating

- Severity: `[rating]`
- Confidence: `[confirmed / likely / inconclusive]`
- Affected asset/version: `[exact value]`
- Required access: `[anonymous / user / role / network position]`

### Summary

`[Two to four sentences: failed control, affected boundary, and bounded consequence.]`

### Expected control

`[What the application, API, host, or directory should enforce and why.]`

### Preconditions

- `[identity, object state, configuration, or network position]`

### Reproduction

1. `[Establish baseline state.]`
2. `[Perform permitted positive control.]`
3. `[Change one variable.]`
4. `[Observe the decision/state.]`
5. `[Stop at the defined canary.]`

### Evidence

```text
UTC time: [timestamp]
Subject/client/role: [redacted identifier]
Target/object: [synthetic object]
Expected: [result]
Observed: [result]
Evidence file/hash: [reference]
```

Include only redacted request/response excerpts necessary to reproduce the claim.

### Impact

`[Realistic confidentiality, integrity, availability, privilege, or workflow consequence. State scale and assumptions. Do not claim more than was proven.]`

### Root cause

`[The missing or incorrect server-side control. Distinguish it from the visible symptom.]`

### Remediation

1. `[Specific root-cause change.]`
2. `[Related control or migration step.]`
3. `[Logging/detection improvement.]`

### Regression tests

- Positive: `[legitimate behaviour that must continue to work]`
- Negative: `[unauthorised/boundary behaviour that must be denied]`
- Related cases: `[roles, methods, fields, object types, states, or versions]`

### Retest

| Field | Value |
|---|---|
| Date/version | `[value]` |
| Original negative test | `[pass/fail]` |
| Positive control | `[pass/fail]` |
| Related cases | `[result]` |
| Final status | `[Resolved / Partially resolved / Not resolved / Unable to retest]` |

## Informational observations

Use this section for inventory or hardening notes without verified security impact. Keep them separate from findings.

| Observation | Evidence | Recommendation |
|---|---|---|
| `[value]` | `[value]` | `[value]` |

## Defensive coverage

| Finding/control | Preventive control | Expected log/event | Alert or review owner |
|---|---|---|---|
| `[F-01]` | `[policy/validation/configuration]` | `[actor, action, object, outcome, correlation]` | `[team]` |

## Cleanup and residual risk

- Test accounts/roles removed: `[yes/no/not applicable]`
- Tokens/keys revoked: `[yes/no/not applicable]`
- Files/records removed: `[yes/no/not applicable]`
- Configuration reverted: `[yes/no/not applicable]`
- Snapshot restored: `[yes/no/not applicable]`
- Raw evidence handled per plan: `[yes/no]`
- Residual uncertainty: `[value]`

## Evidence index

| Evidence ID | Description | UTC time | Storage/classification | Redacted? |
|---|---|---|---|---|
| E-001 | `[request/response or configuration export]` | `[time]` | `[location]` | `[yes]` |

## Final quality check

- [ ] Scope, limitations, and stop points are explicit.
- [ ] Every finding has direct, reproducible evidence.
- [ ] Tokens, credentials, personal data, and unrelated records are redacted.
- [ ] Impact is no broader than the proof.
- [ ] Remediation addresses root cause and includes regression tests.
- [ ] Positive controls prove the fix did not break intended use.
- [ ] Cleanup and evidence retention are recorded.
- [ ] Executive language is understandable without technical tools.
