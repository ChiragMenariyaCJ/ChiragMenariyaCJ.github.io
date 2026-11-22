# Reconnaissance and Enumeration

Reconnaissance builds context; enumeration asks precise questions of known assets. The goal is an accurate model, not the largest possible collection of scan output.

!!! warning "Keep discovery scoped"
    Run active discovery only in your own lab or within an assessment that explicitly permits it. Documentation examples use reserved names and addresses; substitute only approved lab targets.

## Learning objectives

- separate passive context gathering from active interaction;
- build a normalised asset and service inventory;
- interpret ports, protocols, certificates, and application behaviour;
- turn observations into testable hypotheses;
- recognise uncertainty and false positives.

## 1. Start with existing knowledge

Ask for architecture diagrams, asset registers, data classifications, role definitions, and change history. These are often more valuable than another scan.

Build an inventory with stable fields:

| Field | Purpose |
|---|---|
| Asset ID | Consistent name used in notes and findings |
| Owner | Person or team responsible for the service |
| Environment | Development, test, staging, or production |
| Address/name | Approved IP, hostname, application route, or tenant |
| Exposure | Local, internal, partner, or internet-facing |
| Service | Protocol and observed port |
| Identity boundary | Anonymous, user, service, or administrator |
| Data sensitivity | Public, internal, confidential, or regulated |
| Evidence | Source and timestamp for the observation |
| Confidence | Confirmed, likely, or unknown |

Do not merge facts merely because two names resolve to the same address. Virtual hosts, reverse proxies, load balancers, and cloud services often share infrastructure.

## 2. Passive versus active work

### Passive context

Passive work uses information already provided or collected without sending traffic to the target. Examples include supplied DNS records, code documentation, certificate inventories, and previous reports. Even public information may be sensitive; follow the engagement's collection and retention rules.

### Active discovery

Active discovery interacts with a target. Begin with the smallest approved set and conservative timing. Record source, time, and exact command.

For a host-only lab on your own computer:

```bash
nmap -sV -p 22,80,443 127.0.0.1 -oN localhost-services.txt
```

Read the command before running it:

- `-sV` asks listening services for version clues;
- `-p` limits the test to three expected ports;
- `127.0.0.1` cannot leave the local host;
- `-oN` keeps a plain-text evidence file.

A service banner is a claim, not proof. Proxies, compatibility strings, and vendor customisation can make version detection wrong.

## 3. Enumerate by protocol

Each protocol has a different set of useful questions.

### DNS

- Does the name resolve as expected from each authorised network segment?
- Are development or administration names unintentionally exposed?
- Do records point to retired or unowned resources?
- Are mail, verification, and service records consistent with the documented design?

In a local exercise, first inspect the operating system's name-resolution path:

```bash
getent ahosts localhost
```

`getent` follows Linux Name Service Switch configuration, so the answer may come
from `/etc/hosts` rather than DNS. If your isolated lab includes its own DNS
server, query a lab-only name from that resolver and compare an expected record
with a deliberately missing name. Record the mechanism, resolver, answer type,
address, and time. DNS results change; timestamps matter.

### HTTP and HTTPS

- Which virtual host and path produce the application?
- What redirects occur?
- Which methods, cookies, headers, and cache rules are present?
- Does the certificate match the name and expected trust chain?
- How do anonymous and authenticated responses differ?

Against a local training service:

```bash
curl --include --max-time 5 http://127.0.0.1:8080/
```

Preserve both request context and response. A status code alone rarely explains the control.

### SSH

- Is the service expected on this asset?
- Which authentication methods are offered?
- Is administrative access limited to the intended segment?
- Do policy and observed configuration agree?

Do not attempt passwords or keys unless credential testing is explicitly authorised. A listening SSH service is an exposure to evaluate, not an invitation to log in.

### File and directory services

- Is anonymous or guest access intended?
- Which identities should list, read, write, or administer?
- Are shares or directory results separated by role?
- Are signing, encryption, and legacy protocol choices aligned with policy?

Use supplied lab accounts and canary files. Never browse real user folders simply to prove that access exists.

## 4. Convert observations to hypotheses

Use an enumeration worksheet:

| Observation | Possible explanation | Testable hypothesis | Minimal next test |
|---|---|---|---|
| Port 8080 responds with HTTP | Internal admin app, proxy, or test service | Service is exposed beyond intended segment | Compare one harmless request from two approved lab segments |
| Cookie lacks an attribute | Framework default or non-sensitive state | Session cookie can be sent in an unsafe context | Identify cookie purpose and inspect behaviour in browser dev tools |
| Certificate name differs | Shared listener or wrong virtual host | Clients may not authenticate the intended service | Repeat with the documented hostname and record full chain |
| Version appears old | Backported fixes or stale component | A specific relevant weakness may apply | Confirm product/build from an authoritative source and test only a safe prerequisite |

The next action should reduce uncertainty. If it cannot change your conclusion, it is probably noise.

## 5. Prioritise what to examine

Score observations qualitatively:

- **Exposure:** Who can reach it?
- **Privilege:** What identity or system privilege is involved?
- **Data:** What information can it read or change?
- **Control gap:** Is the observed behaviour contrary to design?
- **Confidence:** Is the evidence direct, repeatable, and current?
- **Safety:** Can the next test be performed without disruption?

High exposure plus high privilege or sensitive data usually deserves attention first. Low confidence calls for verification, not a higher severity label.

## Practical exercise: inventory a local stack

Use a deliberately created local service or a training VM on a host-only network.

1. Write the allowed IP address and ports before scanning.
2. Capture a limited service scan.
3. For each open port, identify the protocol and expected owner.
4. Make one harmless protocol request.
5. Record redirects, certificates, headers, or banners.
6. Create three hypotheses, each with a minimal next test and stop point.
7. Mark every field as confirmed, likely, or unknown.
8. Compare the inventory to the lab's intended design.

### Deliverable

Your inventory should allow another learner to answer:

- What is definitely exposed?
- What is inferred rather than confirmed?
- Which mismatch matters most and why?
- What is the safest test that would reduce uncertainty?

## Troubleshooting interpretation

| Symptom | Possible causes | What to check |
|---|---|---|
| Host appears down | Discovery probes blocked, wrong route, service stopped | Lab topology, target state, approved discovery mode |
| Port is filtered | Firewall drop, path issue, rate limit | Segment, rules, packet capture on systems you own |
| Version varies | Proxy farm, banner customisation, detection guess | Repeat timing, direct service documentation, server owner |
| HTTP route returns 404 | Wrong host header, base path, or deployment | Approved hostname, application documentation, redirect chain |
| TLS error | Wrong name, missing CA, expired lab certificate | System time, hostname, chain, lab trust store |

## Knowledge check

1. Why should an asset inventory include confidence and timestamp?
2. What is the difference between a service banner and a verified component version?
3. How does protocol-specific enumeration reduce noise?
4. When does an observation become a hypothesis?
5. What makes a next test "minimal"?

Next: [Validation and reporting](validation-reporting.md).
