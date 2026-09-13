# Nmap

Nmap is a network discovery and security auditing tool. Use it only against systems you own or are explicitly authorised to test.

!!! warning "Authorisation required"
    Scanning someone else’s infrastructure without permission can be unlawful and disruptive.

## Basic scan

```bash
nmap 192.0.2.10
```

## Service detection

```bash
nmap -sV 192.0.2.10
```

## All-port scan

```bash
nmap -p- 192.0.2.10
```

## Common options

| Option | Purpose |
|---|---|
| `-sV` | Probe for service versions |
| `-p-` | Scan ports 1–65535 |
| `-Pn` | Treat host as online (when discovery is blocked) |
| `-oN file.txt` | Save normal output |

## Example output

```text
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.6
80/tcp open  http    nginx
```
