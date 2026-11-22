# Burp Suite

Burp Suite is an intercepting web proxy and collection of HTTP testing tools. Use it with a dedicated browser profile and only against applications listed in the assessment scope.

## Safe setup

1. Start the target in an isolated training environment.
2. Create a temporary browser profile with no personal sessions.
3. Configure the browser to use Burp's loopback proxy.
4. Install Burp's local CA only in that temporary profile.
5. Set **Target scope** before browsing.
6. Disable or carefully constrain automated features until the rate and impact are approved.
7. Remove the CA/profile after the lab.

Never install an assessment CA into a system-wide trust store unless the environment explicitly requires and authorises it.

## Learn the request model

```http
POST /profile/email HTTP/1.1
Host: lab.example
Content-Type: application/x-www-form-urlencoded
Cookie: session=REDACTED
Content-Length: 25

email=student%40example.test
```

For every request, identify method, scheme/host/port, path/query, headers, cookies, body format, authentication material, and the user role that caused it.

## Core workflow

### Proxy and HTTP history

Browse normally with interception off, then use HTTP history as a site map. Filter to in-scope hosts and annotate requests that change state or reveal role-specific data.

### Repeater

Send one approved request to Repeater and change one variable at a time. Compare status, headers, body, length, and timing. Re-fetch volatile tokens through the application rather than reusing stale values blindly.

### Decoder and Comparer

Decoder helps inspect common encodings; encoding is not encryption. Comparer highlights precise differences between responses from two inputs or roles.

## Testing categories

- **Authentication:** registration, login, logout, recovery, session rotation, and lockout.
- **Authorisation:** same-role and cross-role object access using accounts you control.
- **Input handling:** server-side validation across query, path, header, cookie, and body fields.
- **State changes:** CSRF defences, confirmation, idempotency, and audit events.
- **Transport and headers:** TLS, cookie flags, content type, caching, and browser policy headers.

Use non-destructive markers and test accounts. Do not access another person's data merely to prove an authorisation issue.

## Evidence quality

Save the smallest request/response pair that proves the issue. Include preconditions, account role, expected result, actual result, and server-side consequence. Redact session tokens while keeping names and structure useful.

## Lab

Use an intentionally vulnerable local application and two test accounts. Create a map containing:

- authentication endpoints;
- five state-changing requests;
- request body formats;
- cookies and their flags;
- one feature available to each role; and
- one security control you verified behaves correctly.

Replay one harmless request in Repeater. Change exactly one parameter, predict the outcome, run it, and explain any difference from your prediction.

## Checkpoint

Explain why a `200 OK` does not prove a test succeeded, and why two responses with equal length can still have different security meaning.

Continue with the [HTTP cheatsheet](../cheatsheets/http.md) or [Web Security](../web-security/index.md).
