# 🧪 Labs

This area contains notes from authorised learning environments. Exercises should stay inside the stated lab scope and follow each platform's rules.

- TryHackMe
- Hack The Box
- Metasploitable
- Local virtual machines
- University labs

!!! note "Authorised learning"
    These are authorised practice environments. Keep all testing inside the lab scope and avoid scanning unrelated systems.

## Start here

1. [Build a safe lab](lab-build-guide.md) - isolate targets, plan identities, snapshot state, and protect evidence.
2. [Guided labs](guided-labs.md) - complete practical exercises across penetration testing, web, API, and Active Directory.
3. [Assessment report template](report-template.md) - turn observations into professional evidence and remediation.

## Twelve-week practical route

Allow **4-6 hands-on hours per week** in addition to reading.

| Week | Lab focus | Output |
|---|---|---|
| 1 | Isolation, scope, snapshots, and evidence | Lab diagram and rules of engagement |
| 2 | Host and service inventory | Normalised asset table |
| 3 | Protocol and application enumeration | Hypothesis worksheet |
| 4 | HTTP request/response analysis | Annotated transaction |
| 5 | Web route, role, and object mapping | Access-control matrix |
| 6 | Web input and file-handling boundaries | Source-to-sink notes |
| 7 | API inventory and schema | Endpoint/object/property matrices |
| 8 | API object and function authorisation | Paired positive/negative evidence |
| 9 | API token lifecycle and business state | Policy and state-transition tests |
| 10 | AD objects, groups, DNS, and policy | Domain map |
| 11 | AD delegated control and attack paths | Verified control graph |
| 12 | Capstone assessment and retest | Full report and short briefing |

## Lab rules

- Use host-only or otherwise tightly controlled networking.
- Confirm target addresses before every scan or scripted request.
- Use synthetic users, records, tokens, and files.
- Set request, size, and time limits before testing.
- Stop when the agreed canary proves the boundary.
- Do not bridge an intentionally vulnerable machine to public or shared networks.
- Revert snapshots and delete test artefacts after the exercise.
- Keep a decision log, including things you deliberately did not test.

## Learning journal

For every session, record:

```text
Date/time (UTC):
Lab and objective:
Scope and safety limit:
Starting snapshot/state:
Hypothesis:
Actions and evidence:
Expected vs observed:
What I learned:
Cleanup/revert status:
Next question:
```

Progress is not the number of tools run. It is your ability to predict behaviour, design a safe test, explain the result, and recommend a verifiable fix.

## Completion standard

A lab is complete when another student can reproduce it from your notes, the evidence supports the conclusion, the impact is not exaggerated, the environment is returned to a known state, and the defender-side fix has a clear regression test.
