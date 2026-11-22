# Validation and Reporting

Validation determines whether an observation is real, reproducible, and meaningful. Reporting turns that evidence into a decision: what must be fixed, why it matters, and how the organisation can confirm the fix.

## Learning objectives

- design a minimal and reversible proof;
- separate prerequisites, behaviour, and impact;
- classify false positives and environmental limitations;
- rate risk transparently;
- write reproducible findings and verify remediation.

## 1. Define the claim before testing

A testable claim contains four parts:

```text
Given [preconditions and identity],
when [a specific action occurs],
the system [observed behaviour],
which permits [bounded security impact].
```

Example for a two-user training application:

```text
Given learner A is signed in,
when A requests learner B's synthetic profile identifier,
the API returns B's canary nickname,
which demonstrates missing object ownership enforcement.
```

This is stronger than "the app has IDOR" because the evidence, boundary, and impact are explicit.

## 2. Choose the least harmful proof

Before performing a validation step, ask:

1. Can configuration, code review, or logs answer the question without exploitation?
2. Can a synthetic account or canary object demonstrate the boundary?
3. Can the action be read-only?
4. Can the request be limited to one object and one attempt?
5. Is there a clean rollback?
6. Does the rules-of-engagement document permit it?

Write the stop point in advance. "Stop after one cross-account canary value is returned" is much safer than "see how much data is accessible."

## 3. Validate in layers

### Layer 1: prerequisite

Confirm the component and condition exist. Examples: a route is reachable, a role can make the request, or a configuration value is active.

### Layer 2: control behaviour

Compare expected and observed decisions. Use paired tests:

- permitted identity versus non-permitted identity;
- valid object versus another account's synthetic object;
- intended method versus unsupported method;
- normal input versus a harmless boundary case.

### Layer 3: security impact

Show the smallest consequence needed to establish confidentiality, integrity, or availability impact. Do not automatically escalate to persistence, broad collection, or lateral movement.

### Layer 4: root cause

Where access permits, correlate the result with code, configuration, logs, or architecture. Root cause makes remediation precise and reduces recurrence.

## 4. Handle negative and uncertain results

A failed proof does not necessarily mean the system is secure. Record limitations:

- required role or state was unavailable;
- a protective gateway masked application behaviour;
- environment differed from production;
- time or safety limits prevented a test;
- evidence was inconsistent or could not be repeated.

Use clear states:

| State | Meaning |
|---|---|
| Verified | Reproduced with direct evidence and bounded impact |
| Not reproduced | Tested as planned but expected weakness was not observed |
| Inconclusive | Evidence or preconditions were insufficient |
| Informational | Useful hardening or inventory observation without demonstrated impact |
| Out of scope | Not assessed because asset or technique was not authorised |

Never turn "not tested" into "secure."

## 5. Rate risk transparently

Risk is context, not just a scanner score. Explain likelihood factors (access, exposure, complexity, reliability, and detection) and impact factors (data, privilege, affected users, operations, and realistic chaining). State assumptions instead of hiding them inside a numeric score.

## 6. Write a finding

A useful finding contains:

1. **Title:** behaviour plus affected component.
2. **Severity and confidence:** rating with a short rationale.
3. **Affected assets:** exact environment, route, service, or role.
4. **Summary:** control failure and bounded consequence.
5. **Preconditions:** access, identity, configuration, and state.
6. **Reproduction:** minimal numbered steps with redacted evidence.
7. **Observed versus expected:** the failed security decision.
8. **Impact:** realistic scenario, not maximum imagination.
9. **Root cause:** where known, distinguish from symptom.
10. **Remediation:** specific change, owner, and verification idea.
11. **References:** internal standard or authoritative external guidance.

### Example structure

```markdown
## Cross-account access to synthetic profile names

Severity: Medium | Confidence: Confirmed

Learner accounts can read the display name of another learner's lab profile
because the object lookup verifies authentication but not ownership.

Affected route: GET /api/profiles/{profile_id}
Required role: learner

Expected: the API returns 403 or a non-revealing 404 for another learner's ID.
Observed: it returns 200 with the other account's canary display name.

Remediation: enforce object-level authorisation in the service layer using the
authenticated subject and object owner; add positive and negative integration tests.
```

Do not include working tokens, private records, or unnecessary payload detail in the report.

## 7. Write the report around audiences

- **Executive summary:** goal, scope, exposure, themes, priority actions, and limitations in plain language.
- **Technical findings:** reproducible evidence, affected components, root cause, and repair guidance.
- **Appendices:** methodology, scope, roles, inventory, evidence index, and unresolved limitations.

Keep secrets and raw sensitive data in a protected evidence store, not the general report.

## 8. Retest remediation

1. Confirm the intended fix and deployed version.
2. Reproduce the original preconditions.
3. Repeat the original negative test.
4. Run a positive control to ensure legitimate behaviour still works.
5. Check nearby roles, routes, methods, or object types for the same root cause.
6. Record: resolved, partially resolved, not resolved, or unable to retest.

## Practical exercise: produce one complete finding

Use a deliberately vulnerable local application with two synthetic users.

1. Write the testable claim and one-object stop point.
2. Capture a permitted request as a positive control.
3. Capture a denied or vulnerable cross-account request.
4. Redact secrets and unrelated data.
5. Describe the failed control in plain language.
6. Rate likelihood and impact with assumptions.
7. Recommend a root-cause fix and two regression tests.
8. Ask another learner to reproduce the result from your write-up.

### Quality gate

The finding is ready only if every claim is supported, the steps use no hidden knowledge, the impact does not exceed what was proven, remediation addresses the control, and a retest can produce an unambiguous result.

## Knowledge check

1. What distinguishes a prerequisite from impact?
2. Why should a validation test have a pre-written stop point?
3. When is a result inconclusive rather than not vulnerable?
4. What makes remediation root-cause focused?
5. Why does a retest need both negative and positive controls?

Continue with the [guided labs](../labs/guided-labs.md) or use the [report template](../labs/report-template.md).
