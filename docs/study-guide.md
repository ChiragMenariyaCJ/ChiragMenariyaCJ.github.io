# Study Guide

Security skills grow through repeated observation and explanation, not through collecting commands. This guide provides a weekly system for turning the lessons into evidence that you can review, reproduce, and discuss.

## The rule for every session

Before touching a lab, be able to answer all five questions:

1. **Where am I allowed to work?** Name the exact host, application, account, or network.
2. **What am I trying to learn?** State one observable outcome.
3. **What may I do?** List the permitted actions and tools.
4. **When must I stop?** Define a time, impact, uncertainty, or boundary that ends the exercise.
5. **What evidence will prove the result?** Choose the command output, capture, log, or screenshot before testing.

!!! danger "Stop on uncertainty"
    If a hostname resolves outside the lab, an address is not in the written scope, a tool behaves differently from your expectation, or an action may affect another user, stop. Re-check the environment and permission before continuing.

## A practical weekly rhythm

A 6-8 hour week can be split into four focused sessions:

| Session | Time | Work | Output |
|---|---:|---|---|
| Learn | 90 minutes | Read one lesson, follow its references, and write questions | A concept map and three retrieval questions |
| Observe | 90 minutes | Inspect normal traffic, configuration, logs, or behaviour | Annotated raw evidence |
| Practise | 2-3 hours | Complete a bounded lab exercise and repeat it once without the walkthrough | Timestamped activity log and reproducible steps |
| Explain | 90 minutes | Write the result, remediation, and limits; review earlier questions | One finished artefact and a short retrospective |

Shorter sessions are fine. Stop while the notes are still clear enough to record what happened.

## Build an evidence workspace

Use a predictable structure for each authorised lab:

```text
lab-name/
|-- 00-scope/
|   |-- scope.md
|   `-- asset-register.csv
|-- 01-notes/
|   |-- activity-log.md
|   `-- questions.md
|-- 02-evidence/
|   |-- commands/
|   |-- captures/
|   `-- screenshots/
|-- 03-findings/
|   `-- finding-01.md
`-- 04-report/
    `-- report.md
```

Keep secrets out of filenames and notes. Redact tokens, passwords, cookies, personal data, and recovery codes. Raw evidence from a real engagement belongs only in the approved storage location, never in a public repository.

## Scope template

Copy this before a lab and complete every field:

```markdown
# Exercise scope

- Owner or training platform:
- Purpose:
- Start and end time:
- In-scope hosts/applications/accounts:
- Explicitly out of scope:
- Allowed actions:
- Prohibited actions:
- Data-handling rules:
- Stop conditions:
- Recovery or rollback plan:
- Source of permission/rules:
```

For a real assessment, use the organisation's approved rules of engagement rather than this learning template.

## Session note template

Write notes while the work is happening. Reconstructing a session later loses errors and assumptions that may matter.

```markdown
## Session: YYYY-MM-DD HH:MM timezone

### Objective
One observable result for this session.

### Environment
- Learner system and address:
- Approved target and address:
- Snapshot or reset state:
- Relevant tool versions:

### Activity log
| Time | Action | Reason | Evidence file | Result |
|---|---|---|---|---|
| | | | | |

### Interpretation
- Verified facts:
- Inferences:
- Unknowns:

### Safety check
- Scope stayed valid:
- Unexpected effects:
- Cleanup or restoration performed:

### Next step
One question to answer next time.
```

## Command note template

Do not keep a command unless you understand its boundary and output.

```markdown
### Command name

- Question it answers:
- Safe lab example:
- Important options:
- Expected output:
- What the output does not prove:
- Common error:
- Defensive or administrative use:
```

This format prevents a cheatsheet from becoming a list of unexplained copy-and-paste instructions.

## Evidence quality

Good evidence is relevant, attributable, repeatable, and protected.

| Quality | Ask yourself |
|---|---|
| Relevant | Does this output support the exact claim? |
| Attributable | Does it show the target, time, role, and request or command context? |
| Complete | Did I capture the request and response, not only the interesting line? |
| Repeatable | Could an authorised reviewer reproduce the observation from my notes? |
| Minimal | Did I collect only what was needed, without unnecessary sensitive data? |
| Intact | Is the original evidence preserved separately from annotations or edits? |

Never edit raw evidence to make a result look clearer. Keep the original and create a redacted or annotated copy.

## From observation to finding

An unusual response is not automatically a vulnerability. Move through this chain:

```text
observation -> hypothesis -> controlled test -> supporting evidence
            -> impact in context -> root cause -> remediation -> retest
```

Ask these questions before writing a finding:

- Can the behaviour be reproduced?
- Is it intended, documented, or protected by another control?
- Which asset and security property are affected?
- What preconditions and privileges are required?
- What is the smallest safe proof?
- What evidence would disprove the hypothesis?
- Can the proposed fix be verified?

## Finding template

```markdown
# Finding title

- Status: Draft / Verified / Retested / Closed
- Affected asset:
- Severity and rationale:
- Security property affected:

## Summary
What is wrong and where, in plain language.

## Evidence
Minimal, redacted evidence that supports the claim.

## Reproduction
Numbered, authorised steps with prerequisites and expected result.

## Impact
What a realistic actor could achieve in this environment, including limits.

## Root cause
The missing or ineffective control.

## Remediation
Specific preventive control plus any useful detection or monitoring.

## Retest
How to verify the fix and what a secure result looks like.

## References
Primary documentation or a recognised standard.
```

Avoid inflated language such as "complete compromise" unless the evidence actually demonstrates it within scope.

## Retrieval practice

At the end of a lesson, close the page and answer from memory:

1. What problem does this concept solve?
2. Where does it sit in the system?
3. What normal evidence would reveal it?
4. How can it fail or be misconfigured?
5. Which preventive and detective controls apply?
6. What can the evidence not tell me?

Return after one day, one week, and one month. Re-answer the questions with a different example. Use the [Glossary](glossary.md) only after attempting recall.

## Explain command output in layers

For any tool result, write four lines:

1. **Raw fact:** what the output literally says.
2. **Interpretation:** what that fact probably means.
3. **Uncertainty:** what remains unverified.
4. **Next evidence:** the least intrusive way to reduce that uncertainty.

Example:

> Raw fact: TCP port 443 responded on the authorised lab host. Interpretation: a service is accepting TCP connections there. Uncertainty: the service and application identity are not yet verified. Next evidence: inspect the TLS certificate and make a normal HTTPS request.

This habit reduces false positives and overconfident reporting.

## Self-assessment rubric

Score each dimension from 0 to 3 at the end of a phase.

| Score | Understanding | Practice | Evidence | Communication |
|---:|---|---|---|---|
| 0 | I cannot yet explain it | I have not attempted it | Nothing saved | No written result |
| 1 | I recognise terms | I followed a walkthrough | Output exists without context | Notes are incomplete |
| 2 | I can explain a new example | I repeated it without the walkthrough | Evidence supports the claim | Another learner can follow the result |
| 3 | I can explain limits and trade-offs | I adapted safely to a changed lab | Evidence is minimal, reproducible, and well labelled | I can brief technical and non-technical readers |

Progress when every dimension scores at least 2. A lower score is a study target, not a failure.

## When an exercise does not work

Troubleshoot in this order:

1. Confirm that the target is the authorised target.
2. Confirm connectivity, name resolution, time, and the expected service state.
3. Read the exact error instead of rerunning the command unchanged.
4. Compare tool version and platform assumptions with the documentation.
5. Reduce the exercise to the smallest normal interaction.
6. Check logs on systems you administer.
7. Record the failed attempt and the reason it failed.
8. Reset the lab if state may have changed.

A well-explained negative result is valuable evidence. Do not force a vulnerable result when the data does not support one.

## Peer review checklist

Before calling a report or lab complete, ask a classmate or future-you to review it:

- [ ] Scope and permission are visible.
- [ ] Dates, targets, accounts, and tool versions are recorded.
- [ ] Facts, inferences, and unknowns are separated.
- [ ] Every claim points to evidence.
- [ ] Reproduction steps are minimal and safe.
- [ ] Impact matches demonstrated access and context.
- [ ] Remediation addresses the root cause.
- [ ] Retest steps describe the secure result.
- [ ] Secrets and personal data are removed from the shareable copy.
- [ ] Limitations and untested areas are honest.

## Monthly retrospective

At the end of each four-week block, write one page:

- three concepts you can now explain without notes;
- two tasks you can reproduce safely;
- one mistake that changed your method;
- one weak area to revisit;
- one useful artefact you produced;
- one defensive control you understand better;
- the next month's measurable goal.

Compare this record with the phase gates in the [Learning Path](learning-path.md). Change the pace when the evidence shows that you need more practice.

## Publishing work safely

Public notes should demonstrate judgement without exposing an organisation or spoiling a restricted lab. Publish a sanitised copy, never the evidence archive.

- Replace real identifiers with documentation examples.
- Remove cookies, tokens, keys, usernames, email addresses, and unique error IDs.
- Do not publish client names, internal diagrams, raw scan output, or platform flags.
- State that the work occurred in an authorised lab.
- Include remediation and lessons learned, not only the weakness.
- Check the platform's write-up rules before sharing.

The strongest portfolio piece is often a concise report with careful reasoning, not the largest collection of tool output.

