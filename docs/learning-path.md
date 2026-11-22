# Learning Path

This path turns the site into a guided programme rather than a collection of disconnected notes. The full route is designed for **26 weeks at 6-8 hours per week** (roughly 156-208 hours). Every phase combines reading, observation, practice, evidence, and reflection.

!!! warning "Authorised environments only"
    Practise only on systems you own or have explicit written permission to assess. Use isolated local machines, purpose-built training targets, or a platform whose rules clearly permit the activity. A lesson is never permission to test a public host.

## Choose your pace

| Route | Time | Best for | Expected result |
|---|---:|---|---|
| Four-week starter | 8-10 hours each week | A new learner who wants a structured trial | One small lab, a network map, a command notebook, and a short report |
| Six-month programme | 6-8 hours each week | A learner building practical junior penetration-testing skills | Repeatable assessment workflow, evidence from several labs, and a defensible capstone report |
| Reference route | Self-paced | Someone filling a specific knowledge gap | Use a section hub, complete its exercises, and record the result |

The four-week route is an introduction, not a compressed replacement for the six-month programme.

## Before week one

Prepare an isolated learning environment before running security tools:

1. Read the [Labs](labs/index.md) rules and choose a local or purpose-built training target.
2. Create separate folders for notes, captures, screenshots, command output, and reports.
3. Record the systems that are in scope, the allowed hours, and any prohibited actions.
4. Take a virtual-machine snapshot before exercises that change a target.
5. Learn how to stop the lab, restore it, and confirm that it cannot reach unrelated networks.
6. Open the [Study Guide](study-guide.md) and copy its session and evidence templates.

Use documentation address ranges such as `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24` in written examples. Replace them only with the address of an authorised lab target when practising.

## The weekly learning loop

Each week follows the same five-part loop:

1. **Understand** -- explain the concept in your own words.
2. **Observe** -- inspect a real request, packet, process, log, or directory object.
3. **Practise** -- complete a bounded exercise inside the lab.
4. **Prove** -- save commands, output, screenshots, and timestamps that support the result.
5. **Improve** -- describe the defensive control and one way to verify the fix.

A week is complete only when its deliverable exists. Reading every page without producing evidence does not complete the week.

## Four-week starter

This starter gives a new student a safe view of the whole workflow before committing to the deeper programme.

### Week 1: Safety, networking, and a lab map

- Read [Networking](networking/index.md), then identify addresses, routes, DNS, and listening services in the lab.
- Learn the difference between a host, service, port, protocol, and application.
- Draw a simple diagram showing the learner machine, target, gateway, and allowed network boundary.
- Write a one-paragraph scope statement and a stop condition.

**Deliverable:** `scope.md` plus a labelled network diagram and a table of known lab assets.

### Week 2: Linux observation and evidence

- Work through [Linux](linux/index.md).
- Navigate the filesystem, inspect permissions, identify running services, and read logs without changing them.
- Build a small command notebook: command, purpose, expected output, and one common mistake.
- Practise saving terminal output to a timestamped evidence file.

**Deliverable:** a ten-command Linux reference and an annotated service inventory from the learner VM.

### Week 3: Follow a web request

- Read [Web Security](web-security/index.md) and [API Security](api-security/index.md).
- Capture one normal request to an intentionally vulnerable local application.
- Label its method, path, headers, cookies or token, body, status code, and response type.
- Write down where authentication, authorization, validation, and logging should happen.

**Deliverable:** one redacted request/response pair with a trust-boundary explanation.

### Week 4: Mini assessment and report

- Follow the workflow in [Penetration Testing](penetration-testing/index.md).
- Use the [Tools](tools/index.md) pages to inventory only the approved lab target.
- Validate one low-risk observation, explain its impact, and propose a fix.
- Use [Cheatsheets](cheatsheets/index.md) for recall, not as a substitute for understanding.

**Deliverable:** a two-page report containing scope, method, evidence, one finding, remediation, limitations, and a retest plan.

## Six-month programme

### Phase 1: Network foundations (weeks 1-5)

Start at [Networking](networking/index.md). The aim is to understand what normal traffic should look like before interpreting security-tool output.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 1 | Ethics, scope, lab isolation, and evidence | Define an authorised boundary; verify snapshots and network isolation; rehearse a stop condition | Signed-off scope sheet, rules of engagement, and lab asset register |
| 2 | OSI/TCP-IP models and encapsulation | Trace a browser request from application data to frames and back; label source and destination at each layer | One-page annotated traffic journey |
| 3 | IPv4, IPv6, CIDR, and subnetting | Calculate network, broadcast, usable range, and host count for sample networks; verify with local tools | Completed subnet worksheet with explanations |
| 4 | ARP, routing, NAT, DNS, DHCP, and common services | Inspect the local route table and DNS resolution; compare TCP and UDP exchanges | Service-to-protocol matrix and a labelled network map |
| 5 | Packet capture and traffic baselining | Capture an authorised DNS lookup and TCP/TLS connection; apply display filters; distinguish observation from inference | Redacted packet capture plus a five-point baseline |

**Phase gate:** Given an unfamiliar packet or connection table, explain who is communicating, over which protocol, and what remains unknown.

### Phase 2: Linux operations (weeks 6-9)

Use [Linux](linux/index.md) to build the operating-system fluency required for both testing and remediation.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 6 | Shell, filesystem, paths, streams, and text processing | Navigate without a graphical file manager; search files; combine safe read-only commands with pipes | Command journal with input, output, and error cases |
| 7 | Users, groups, ownership, and permissions | Explain effective access for several files; compare numeric and symbolic modes; inspect `sudo` policy safely | Permission review table with least-privilege recommendations |
| 8 | Processes, services, packages, and logs | Map a listening port to a process and service; inspect recent service logs; identify startup behaviour | Annotated service inventory and troubleshooting timeline |
| 9 | Networking, SSH, and Bash automation | Inspect interfaces and sockets; use SSH keys in the lab; write a script that inventories the local host without changing it | Commented inventory script, sample output, and limitations |

**Phase gate:** Start with an observed port, identify its process and configuration, find relevant logs, and explain how permissions affect it.

### Phase 3: Assessment method and tools (weeks 10-13)

Move through [Penetration Testing](penetration-testing/index.md) and use [Tools](tools/index.md) only where a question requires a tool.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 10 | Scoping, rules of engagement, threat modelling, and test planning | Turn a fictional client brief into in-scope assets, exclusions, assumptions, contacts, and stop conditions | Assessment plan and risk-aware test matrix |
| 11 | Passive reconnaissance and asset hypotheses | Collect only information intentionally exposed by the lab; separate fact, hypothesis, and unknown | Source log and evidence-backed asset map |
| 12 | Host, port, service, and application enumeration | Compare tool output with manual protocol checks; record scan settings and timestamps | Reproducible enumeration workbook |
| 13 | Vulnerability analysis, safe validation, and evidence quality | Triage findings; eliminate one false positive; validate one issue with the least intrusive method | Finding draft with evidence chain and remediation |

**Phase gate:** Another student can repeat your authorised test from the notes and reach the same conclusion without guessing.

### Phase 4: Web application security (weeks 14-18)

Study [Web Security](web-security/index.md) with a deliberately vulnerable local application or an approved web academy.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 14 | HTTP, browsers, proxies, state, and trust boundaries | Intercept a normal workflow; map requests to application features; identify client- and server-controlled data | Request map and application attack-surface inventory |
| 15 | Identity, authentication, sessions, and account recovery | Compare anonymous and authenticated behaviour; inspect cookie attributes; document session lifecycle | Authentication flow diagram and test checklist |
| 16 | Authorization and access control | Build a user-role-resource matrix; test only lab accounts; distinguish horizontal and vertical access | Access-control matrix and one evidence-backed observation |
| 17 | Input handling, injection, and output encoding | Trace controlled input to its sink using harmless markers; compare server validation with client validation | Input-to-sink table and defensive control notes |
| 18 | Browser-side and server-side weaknesses | Study XSS, CSRF, SSRF, uploads, and path handling in guided labs; focus on root cause and fix verification | Two finding write-ups with safe reproduction and retest steps |

**Phase gate:** For a web feature, identify assets, actors, entry points, trust boundaries, likely failure modes, and suitable tests before opening a scanner.

### Phase 5: API security (weeks 19-21)

Use [API Security](api-security/index.md) to apply web fundamentals to data- and action-oriented interfaces.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 19 | API styles, schemas, inventory, and data classification | Build an endpoint inventory from approved documentation and observed traffic; label sensitive fields | Endpoint-method-role-data matrix |
| 20 | API authentication, tokens, and object/function authorization | Inspect token lifecycle without exposing secrets; compare object access across two lab roles | Token-handling review and authorization test table |
| 21 | Validation, mass assignment, rate limits, and business logic | Test boundary conditions with small controlled inputs; reason about workflow abuse and resource consumption | API test collection and risk-ranked findings summary |

**Phase gate:** Explain the difference between authentication, object-level authorization, function-level authorization, and property-level authorization using one lab workflow.

### Phase 6: Active Directory (weeks 22-24)

Work only in an isolated domain created for training. Start with [Active Directory](active-directory/index.md).

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 22 | Forests, domains, controllers, objects, groups, and DNS | Diagram a small lab domain; trace where identity, policy, and name resolution live | Domain architecture diagram and object inventory |
| 23 | Kerberos, NTLM, LDAP, SMB, and Group Policy | Trace a normal domain sign-in; inspect approved directory attributes and applied policy; map protocol purpose | Authentication sequence and protocol reference |
| 24 | Delegation, permissions, attack paths, hardening, and detection | Review a deliberately misconfigured lab path; identify preventive and detective controls; avoid real credentials | Attack-path narrative with remediation and detection ideas |

**Phase gate:** Explain an identity path from user to resource, including authentication, authorization, inherited permissions, relevant logs, and the least disruptive fix.

### Phase 7: Capstone and reporting (weeks 25-26)

Return to [Labs](labs/index.md), combine the methods, and treat communication as part of the technical work.

| Week | Focus | Guided practice | Weekly deliverable |
|---:|---|---|---|
| 25 | Integrated assessment | Plan and perform a bounded assessment of a fresh authorised target; maintain a live activity log; stop at the agreed limit | Complete evidence pack, asset map, and draft findings register |
| 26 | Analysis, reporting, remediation, and retest | Remove unsupported claims; rank risk in context; write executive and technical sections; peer-review and retest | Final report, remediation tracker, and personal skills retrospective |

**Programme gate:** A reviewer can distinguish verified facts from hypotheses, reproduce each finding, understand the business impact, and verify the proposed fix.

## Assessments without answer memorisation

At the end of every phase, choose a new example rather than replaying the exact walkthrough. Assess yourself in four dimensions:

| Dimension | Beginner evidence | Ready-to-progress evidence |
|---|---|---|
| Explain | Repeat a definition | Explain the concept with a new example and a limitation |
| Observe | Run a command | Select the right source of evidence and interpret it |
| Apply | Follow copied steps | Adapt the method safely to a changed lab |
| Communicate | Save raw output | Write a concise, reproducible conclusion and remediation |

If two dimensions remain at beginner level, repeat targeted exercises before moving on. The calendar is a guide; evidence decides progress.

## Portfolio-safe outputs

Useful public artefacts include a generic network diagram, a sanitised report template, a harmless automation script, a methodology checklist, or a reflection on a purpose-built lab. Before publishing:

- remove names, tokens, cookies, keys, internal addresses, and unique identifiers;
- do not publish live-target steps, client evidence, or platform-prohibited solutions;
- separate what you observed from what the training material told you;
- credit external references and images;
- explain both the weakness and the defensive improvement.

## Continue from here

- Use the [Study Guide](study-guide.md) to plan sessions and judge evidence.
- Look up unfamiliar terms in the [Glossary](glossary.md).
- Keep [Cheatsheets](cheatsheets/index.md) nearby during practice.
- Return to [Labs](labs/index.md) whenever a lesson calls for hands-on work.

