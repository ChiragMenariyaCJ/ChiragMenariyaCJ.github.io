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
