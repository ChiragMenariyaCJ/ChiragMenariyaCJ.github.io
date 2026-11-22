# 🛠️ Tools

Tools amplify a method; they do not replace one. Start with a written question, choose the least intrusive capability that can answer it, preserve raw output, and verify important results another way.

!!! warning "Authorised systems only"
    Use these tools only on systems you own or have explicit written permission to test. Set rate, scope, credentials, and stop conditions before you begin.

## Core toolkit

| Tool | Best question | Start with | Evidence to keep |
|---|---|---|---|
| [Nmap](nmap.md) | Which approved hosts and services are reachable? | explicit target file and small port set | exact command, version, XML output |
| [Wireshark](wireshark.md) | What happened on the wire? | narrow capture/display filter | original capture, filter, packet/stream IDs |
| [Burp Suite](burp-suite.md) | How does this web app handle a controlled request? | proxy and HTTP history | raw request/response and account role |
| [Netcat](netcat.md) | Can I make or receive a simple lab TCP/UDP connection? | loopback listener/client | both terminal transcripts and capture |
| [Gobuster](gobuster.md) | Which paths or virtual hosts does the approved app expose? | tiny custom wordlist and low concurrency | command, wordlist hash, response baseline |

Specialist tools such as Metasploit, SQLMap, and Nikto should come later. Learn the underlying protocol and manually confirm a finding before trusting automation.

## Before running anything

Write a short execution card:

```text
Question:
Written scope / exclusions:
Source host:
Targets:
Tool and version:
Command or settings:
Rate / concurrency:
Credentials and role:
Start / stop time and timezone:
Stop conditions:
Evidence path:
```

## Evidence workflow

1. Create a case directory that is not served by a web server.
2. Record tool version and configuration.
3. Save raw, structured output where available.
4. Hash important files after collection.
5. Make analysis notes separately from originals.
6. Reproduce the key observation with a second view.
7. Redact tokens, cookies, credentials, personal data, and internal details before reporting.

## Four-week practice plan

| Week | Focus | Exercise |
|---|---|---|
| 1 | Nmap and service validation | Inventory two lab VMs, then verify listeners on the hosts |
| 2 | Wireshark and packet reasoning | Explain DNS, TCP, and HTTP flows from a short capture |
| 3 | Burp Suite and HTTP | Map an intentionally vulnerable local app through two test roles |
| 4 | Netcat and Gobuster | Build a simple protocol exchange and a rate-limited content inventory |

At the end of each exercise, write what the tool could **not** prove. That habit prevents scanner output from becoming an unsupported finding.
