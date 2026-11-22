# HTTP and Browser Foundations

Web testing becomes much easier when every browser action can be translated into an HTTP exchange and every security control can be placed at a trust boundary.

## Learning objectives

- read and explain requests and responses;
- distinguish origin, site, host, and URL;
- understand cookies, sessions, caching, and redirects;
- explain the browser's same-origin model and CORS;
- capture clean baseline evidence in a local lab.

## 1. Anatomy of a request

```http
POST /profile/display-name HTTP/1.1
Host: app.lab.test
Content-Type: application/x-www-form-urlencoded
Cookie: session=[redacted]
Origin: http://app.lab.test
Content-Length: 21

display_name=Student
```

Read it in layers:

| Part | Question |
|---|---|
| Method | Is this intended to read, create, replace, modify, or delete state? |
| Path/query | Which resource and identifiers are selected? |
| Host | Which virtual application should receive the request? |
| Headers | What representation, identity context, origin, and client behaviour are declared? |
| Body | What user-controlled fields cross the boundary? |

Methods describe intent, not permission. A `GET` can still change state in a poorly designed application, and a `POST` is not automatically protected.

## 2. Anatomy of a response

```http
HTTP/1.1 303 See Other
Location: /profile
Set-Cookie: session=[redacted]; Path=/; HttpOnly; SameSite=Lax
Cache-Control: no-store
Content-Length: 0
```

Inspect:

- status and reason for it;
- redirect destination;
- cookies created or expired;
- caching rules;
- content type and character set;
- security policy headers;
- response body, including data not visible in the rendered page.

Do not treat status codes as security controls. An application may return `200` with an error object, `404` to conceal a forbidden object, or `302` while still performing an action.

## 3. URLs, origins, and sites

For `https://shop.lab.test:8443/account?id=7`:

- scheme: `https`;
- host: `shop.lab.test`;
- port: `8443`;
- path: `/account`;
- query: `id=7`;
- origin: scheme + host + port.

Two resources are same-origin only when all three origin components match. "Site" is a different browser concept based broadly on the registrable domain plus scheme. This difference matters for cookie behaviour and cross-origin requests.

### Encoding is not validation

URL encoding, HTML entity encoding, Base64, and JSON escaping change representation. They do not make untrusted input safe for every context. Defence must match the final interpreter: SQL parameters for database queries, contextual output encoding for HTML, and strict allow-lists for server-side destinations.

## 4. Cookies and sessions

A cookie is a browser-managed name/value pair with scope and behaviour attributes.

| Attribute | Security purpose |
|---|---|
| `Secure` | Send only over HTTPS |
| `HttpOnly` | Prevent ordinary script access; it does not stop all session abuse |
| `SameSite` | Restrict some cross-site sending; choose mode based on intended flows |
| `Path` | Limit path matching, not a strong isolation boundary |
| `Domain` | Control host/subdomain scope; narrow is usually safer |
| `Max-Age`/`Expires` | Persistent lifetime; absence normally creates a session cookie |

A session should be rotated after authentication and privilege changes, invalidated on logout or revocation, protected in transit, and bounded by idle and absolute lifetime. Test these behaviours with synthetic accounts, never by collecting another person's token.

## 5. Same-origin policy and CORS

The same-origin policy limits how one origin can read another origin's resources in the browser. Cross-Origin Resource Sharing (CORS) is a server-declared relaxation of that read boundary.

Important distinctions:

- CORS is not an authentication mechanism.
- A request may be sent even when the browser blocks script from reading the response.
- Preflight behaviour depends on method and headers.
- Credentialed cross-origin access needs an explicit allowed origin; broad reflection is risky.
- Server-side clients are not protected by browser CORS enforcement.

When assessing a local lab, record the request `Origin`, response allow-origin value, whether credentials are included, and whether the browser permits the response to be read.

## 6. Browser security controls

### Content Security Policy

CSP limits permitted script, style, frame, and connection sources. It can reduce the impact of some injection mistakes but should not replace output encoding or safe DOM APIs.

### Frame protections

`frame-ancestors` in CSP controls who may embed a page. This helps prevent interface redressing of sensitive actions.

### Transport policy

HTTPS authenticates the server name (subject to certificate trust) and protects traffic in transit. Strict transport policy can instruct a browser to prefer HTTPS for later requests. It does not fix insecure application logic.

### Referrer and permissions policy

These policies reduce unintended metadata disclosure and constrain browser features. Evaluate them against application requirements rather than scoring headers by count.

## 7. Caching and intermediaries

Browsers, reverse proxies, and CDNs may cache responses. Sensitive or user-specific content needs rules that prevent cross-user reuse. Ask:

- Which request values form the cache key?
- Does the response vary by authentication or content negotiation?
- Can private responses be stored by a shared cache?
- Do redirects or errors include sensitive query data?
- Does a logout remove browser-visible state?

## Practical exercise: annotate one transaction

Use browser developer tools against a local application you control.

1. Sign in with a synthetic learner account.
2. Clear the network panel and change a harmless profile field.
3. Export or copy the request and response, redacting the session value.
4. Label method, URL parts, identity carrier, content type, origin, state change, redirect, and cache policy.
5. Repeat after logging out and compare the protected route's response.
6. Write expected and observed behaviour in two sentences.

### Completion criteria

Another learner should be able to explain:

- which request caused the state change;
- how the server associated it with a user;
- which browser controls were relevant;
- what changed after logout;
- which details are observations rather than security conclusions.

## Knowledge check

1. Why is `POST` not itself a security control?
2. Which URL components define an origin?
3. What is the difference between CORS and authorisation?
4. Why is encoding not the same as validation?
5. Which cookie changes should follow a privilege increase?

Next: [Web testing workflow](testing-workflow.md).
