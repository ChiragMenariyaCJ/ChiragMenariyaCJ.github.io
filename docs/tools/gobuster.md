# Gobuster

Gobuster makes many HTTP or DNS requests from a wordlist. Even against an authorised target it can create load, fill logs, trigger rate controls, or change state if the application handles unexpected methods badly. Start with a tiny, purpose-built list and low concurrency.

## Establish a baseline

Before enumeration, request:

- a known existing path;
- a random nonexistent path;
- the same path twice; and
- if relevant, the application with and without authentication.

Record status, length, redirect location, content type, and a stable body marker. Some applications return `200` for every path or serve custom errors, so status alone is insufficient.

## Directory mode in a local lab

Create a small wordlist from expected application language, for example:

```text
admin
api
assets
health
login
```

Then run against an application you own:

```bash
gobuster dir \
  --url http://127.0.0.1:8000/ \
  --wordlist ./lab-paths.txt \
  --threads 2 \
  --delay 250ms \
  --output gobuster-paths.txt
```

Flags vary by version; check `gobuster dir --help`. Add extensions only when the application's technology and scope justify them. Larger public wordlists are not automatically better.

## Virtual-host mode

Virtual-host testing changes the HTTP `Host` header. Use a lab domain that resolves to your own server and a small approved wordlist:

```bash
gobuster vhost \
  --url http://lab.example.test/ \
  --wordlist ./lab-hosts.txt \
  --threads 2
```

Wildcard behaviour and default virtual hosts can generate false positives. Compare each candidate with a random hostname and verify manually.

## Interpreting output

| Observation | Possible meaning | Manual check |
|---|---|---|
| `200`, distinct content | accessible resource | request in browser or `curl -i` |
| `301/302` | canonical path, auth flow, or redirect rule | inspect `Location` and redirect chain |
| `401` | authentication required | inspect challenge; do not guess credentials |
| `403` | access denied or generic block | compare body, headers, and known paths |
| identical lengths everywhere | wildcard/custom error | compare body hash and random names |
| intermittent `429` | rate limit | stop or reduce rate per rules of engagement |

Discovery is not automatically a vulnerability. Explain why the resource matters, what is exposed, and whether controls are missing.

## Evidence and stop conditions

Record Gobuster version, full command, exact wordlist and hash, scope, source IP, start/end time, and output. Stop for unexpected instability, `429` responses beyond the approved rate, account lockout warnings, or any sign of out-of-scope routing.

## Lab

Build a local static site with three known paths and a custom `404` page. Create a ten-word list containing three valid and seven invalid names. Predict results, run at two threads, and manually validate every hit. Then change the server to return `200` for missing paths and design a filter based on the baseline.

Return to the [Tools track](index.md) or apply the same evidence discipline in [Web Security](../web-security/index.md).
