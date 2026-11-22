# ⚔️ Penetration Testing

Penetration testing is an authorised, scoped assessment that finds and validates security weaknesses so they can be fixed. A clear scope, repeatable evidence, and useful remediation guidance matter as much as the technical finding.

!!! warning "Permission first"
    Test only systems you own or have explicit written permission to test.

## Workflow

1. Define scope and rules of engagement.
2. Perform reconnaissance.
3. Enumerate approved hosts, services, and applications.
4. Assess vulnerabilities and security controls.
5. Validate findings safely and capture evidence.
6. Report impact, reproduction steps, and remediation.

## What you will learn

By the end of this track you should be able to:

- translate a scope into a safe, testable plan;
- keep an evidence trail and a decision log;
- move from discovery to service-specific enumeration;
- form and test vulnerability hypotheses without unnecessary exploitation;
- distinguish a scanner observation from a verified finding;
- describe likelihood, impact, affected assets, and practical remediation;
- write a report that both engineers and decision-makers can use.

## Suggested six-week route

Plan for **6-8 hours each week**. Reading alone is not enough: every week produces an artefact for your portfolio.

| Week | Focus | Study | Practical deliverable |
|---|---|---|---|
| 1 | Engagement safety | Scope, rules of engagement, evidence handling, communication | Rules-of-engagement summary and stop conditions |
| 2 | Asset discovery | Passive context, host discovery, service inventory, DNS | Asset and service inventory for your lab |
| 3 | Enumeration | Protocol questions, banners, versions, configuration | Enumeration worksheet with hypotheses |
| 4 | Validation | Manual verification, false positives, proof selection | Two safely validated findings in a local lab |
| 5 | Risk and remediation | Root cause, attack path, likelihood, business impact | Finding write-ups with actionable fixes |
| 6 | Reporting | Executive summary, technical appendix, retest | Complete assessment report and a five-minute briefing |

## Course modules

1. [Methodology and rules of engagement](methodology.md) - turn authorisation into a repeatable assessment plan.
2. [Reconnaissance and enumeration](reconnaissance-enumeration.md) - create an accurate inventory before testing hypotheses.
3. [Validation and reporting](validation-reporting.md) - prove impact safely and write useful findings.
4. [Guided labs](../labs/guided-labs.md) - practise the workflow on isolated, intentionally vulnerable targets.
5. [Report template](../labs/report-template.md) - record evidence in a professional structure.

## The assessment loop

Use this loop for every asset rather than running an unstructured list of tools:

1. **Observe:** What is exposed? What behaviour can be measured without changing state?
2. **Model:** What trust boundary, identity, data flow, or security control is involved?
3. **Hypothesise:** What specific weakness might explain the observation?
4. **Test:** What is the smallest reversible action that can confirm or reject it?
5. **Record:** What request, response, timestamp, and environment detail makes the result reproducible?
6. **Explain:** What could an authorised user or attacker achieve, and what root-cause fix removes that path?
7. **Clean up:** Remove test accounts, files, payloads, and configuration changes agreed in the rules of engagement.

## Core habits

### Keep four views separate

| View | Question | Example |
|---|---|---|
| Asset | What system is being assessed? | `training-app` web service |
| Observation | What did you directly see? | Response lacks a security header |
| Hypothesis | What might that permit? | Browser protections may be weaker |
| Finding | What has been verified and matters? | A reproducible attack path with defined impact |

A missing header, an old version string, or a scanner alert is not automatically a vulnerability. Verification and context are what turn observations into findings.

### Prefer low-impact proof

- Read a harmless canary record rather than collecting real personal data.
- Create a lab-only file with a unique marker rather than modifying an existing file.
- Demonstrate access to a single synthetic object rather than enumerating an entire dataset.
- Stop after proving the agreed impact; do not extend access simply because it is technically possible.

### Make every action traceable

At minimum, record:

```text
UTC time:
Tester:
Asset and port/URL:
Action performed:
Expected result:
Observed result:
Evidence file:
State change or cleanup required:
```

## Readiness checkpoint

Before moving to specialised web, API, or Active Directory testing, make sure you can answer these without a tool:

- What is in scope and explicitly out of scope?
- Which actions require advance approval?
- Who should be contacted if availability or data integrity is affected?
- How will sensitive evidence be stored and destroyed?
- What would make you stop the test?
- How will you distinguish a verified weakness from an informational observation?

## Continue by specialism

- [Web Security](../web-security/index.md) for browser/server trust boundaries and application testing.
- [API Security](../api-security/index.md) for object, function, and property authorisation.
- [Active Directory](../active-directory/index.md) for Windows identity and delegated privilege.
- [Networking](../networking/index.md) and [Linux](../linux/index.md) for the foundations behind every assessment.

## Ethics and professional standard

Good testing reduces uncertainty without creating new risk. Do not retain credentials, private data, or access beyond the engagement. Report accidental exposure immediately, follow the agreed communication path, and make claims only as strong as the evidence supports.
