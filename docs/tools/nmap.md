# Nmap

Nmap is a network discovery and security auditing tool. Use it only against systems you own or are explicitly authorised to test. The examples use `192.0.2.10`, a documentation-only address from [RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737).

!!! warning "Authorisation required"
    Scanning someone else’s infrastructure without permission can be unlawful and disruptive.

## Basic scan

Discover hosts and common services on a target:

```bash
nmap 192.0.2.10
```

## Service detection

Probe discovered services for version information:

```bash
nmap -sV 192.0.2.10
```

## All-port scan

Scan all TCP ports on a target (this can take longer and create more traffic):

```bash
nmap -p- 192.0.2.10
```

## Common options

| Option | Purpose |
|---|---|
| `-sV` | Probe for service versions |
| `-p-` | Scan ports 1–65535 |
| `-Pn` | Treat host as online (when discovery is blocked) |
| `-oN file.txt` | Save normal output to a file |

## Example output

```text
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.6
80/tcp open  http    nginx
```

## Think in phases

Do not begin with every probe. Move from the smallest useful question to more detailed validation:

1. **Scope preparation:** convert written scope into an exact target file and exclusions.
2. **Host reachability:** determine which approved systems respond, accounting for blocked discovery probes.
3. **Port inventory:** test an agreed port set at a conservative rate.
4. **Service identification:** probe only discovered ports for protocol and version clues.
5. **Manual validation:** connect with a protocol-aware client and compare host-side listeners where possible.
6. **Reporting:** keep raw XML and explain uncertainty.

## Target handling

For a real engagement, store one authorised address or CIDR per line in a reviewed file:

```bash
nmap -iL approved-targets.txt --excludefile exclusions.txt -sn -oA evidence/discovery
```

`-oA` writes normal, grepable, and XML forms. XML is the best source for later parsing; keep the normal output for human review. Treat target files and results as sensitive.

Before running, preview the expanded list without scanning:

```bash
nmap -sL -n -iL approved-targets.txt --excludefile exclusions.txt
```

Compare the preview with the written scope. DNS can change, and a hostname may resolve to third-party infrastructure that is not authorised.

## Host discovery

```bash
nmap -sn 192.0.2.0/28
```

On a local Ethernet network, Nmap may use ARP discovery. Across routed networks it uses other probes. A host that does not answer discovery may still be online. `-Pn` skips discovery and treats each target as up; it can greatly increase traffic, so apply it only to a small approved list.

## Port states

| State | What Nmap observed | What it does not prove |
|---|---|---|
| `open` | an application accepted or answered the probe | service identity, safety, or vulnerability |
| `closed` | host responded but no service accepted that port | future state or every network path |
| `filtered` | probes were blocked or no decisive response arrived | which control dropped traffic |
| `open|filtered` | response did not distinguish open from filtered | that the port is open |
| `unfiltered` | port is reachable by the probe | whether it is open |

Record scan source and path. A result from inside a server VLAN may differ from one outside the firewall.

## Focused service inventory

```bash
nmap -sV --version-light -p 22,80,443 192.0.2.10 -oA evidence/services
```

Version detection sends application probes. `--version-light` reduces intensity. Banners can be absent, proxied, or misleading, so validate important identifications manually.

If the rules of engagement allow a full TCP-port review, run it separately and slowly, then apply service detection only to ports found open. Separating phases reduces unnecessary probes and makes evidence easier to explain.

## Timing and rate

Nmap timing templates and rate flags can change network and service impact. Faster is not always better. Prefer defaults or conservative settings, schedule sensitive systems separately, and agree on stop conditions.

Watch for packet loss, latency, target alarms, service instability, and defensive blocks. If results become inconsistent, stop and coordinate rather than escalating speed.

## NSE scripts

The Nmap Scripting Engine includes discovery, authentication, vulnerability, brute-force, and intrusive categories. Script names are not a safety guarantee.

```bash
nmap --script-help safe
nmap --script-help http-title
nmap -p 80 --script http-title 192.0.2.10
```

Read each script's source/documentation, categories, arguments, and traffic behaviour. Select named scripts explicitly. Do not run broad script categories on production systems without approval.

## Compare with the target

On a Linux lab target:

```bash
ss -lntup
```

Compare bound sockets with Nmap results from another lab host. Differences teach you about loopback-only binds, host firewalls, routing, address families, and service timing.

## Lab: two-host inventory

Create two isolated VMs. On one, expose SSH and a temporary HTTP server; leave another chosen port closed. From the second VM:

1. preview the exact target;
2. perform host discovery;
3. scan only the three chosen ports;
4. run light version detection on open ports;
5. save all output formats;
6. compare results with `ss -lntup` on the target; and
7. stop the web server and repeat the focused port test.

Write a finding only if there is a security-relevant condition. An expected SSH listener with appropriate controls is inventory, not a vulnerability.

## Evidence checklist

- Written scope and exclusions match the expanded target preview.
- Nmap version, command, source host, time, and timezone are recorded.
- Raw XML is preserved and hashed.
- Important services are manually confirmed.
- The report distinguishes observed state from inferred cause.
- Limitations such as filtered paths or unavailable credentials are stated.

Return to the [Tools track](index.md) or review the [Networking track](../networking/index.md).
