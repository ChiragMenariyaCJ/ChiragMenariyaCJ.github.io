# HTTP request, response, and status reference

HTTP is a request/response application protocol. HTTPS is HTTP carried through TLS. Use this reference with [Burp Suite](../tools/burp-suite.md) and the [Web Security](../web-security/index.md) track.

## Request structure

```http
POST /api/profile?notify=true HTTP/1.1
Host: lab.example.test
Authorization: Bearer REDACTED
Content-Type: application/json
Accept: application/json
Cookie: session=REDACTED
Origin: https://lab.example.test
Content-Length: 31

{"displayName":"Lab Student"}
```

Record method, target, protocol version, host, authentication, content type, cookies, origin, body format, and the role that sent it.

## Response structure

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Set-Cookie: session=REDACTED; Secure; HttpOnly; SameSite=Lax
Content-Length: 24

{"status":"updated"}
```

A status code alone does not prove success or security. Inspect headers, body, state change, and server-side evidence.

## Methods

| Method | Typical purpose | Notes |
|---|---|---|
| `GET` | retrieve a representation | should be safe; query data may appear in logs/history |
| `HEAD` | headers for a `GET` | no response body |
| `POST` | submit/process data | often non-idempotent |
| `PUT` | create or replace a resource | normally idempotent |
| `PATCH` | partially update a resource | semantics depend on media type |
| `DELETE` | remove a resource | authorisation and confirmation matter |
| `OPTIONS` | describe communication options | often relevant to CORS |

## Status families

| Code | Meaning | Investigation note |
|---:|---|---|
| `200` | OK | inspect body and expected state |
| `201` | Created | look for `Location` or resource ID |
| `204` | No Content | successful response with no body |
| `301/308` | permanent redirect | inspect and validate destination |
| `302/303/307` | redirect variants | method handling differs |
| `304` | Not Modified | cache validation, not a redirect |
| `400` | Bad Request | syntax or validation failure |
| `401` | Authentication required/failed | often includes `WWW-Authenticate` |
| `403` | Forbidden | identity understood but access denied, or generic block |
| `404` | Not Found | may intentionally hide existence |
| `405` | Method Not Allowed | inspect `Allow` |
| `409` | Conflict | current resource state conflicts |
| `415` | Unsupported Media Type | verify `Content-Type` |
| `422` | Semantically invalid content | field-level validation is common |
| `429` | Too Many Requests | respect `Retry-After` and stop conditions |
| `500` | Internal Server Error | avoid repeated triggering; correlate logs |
| `502/503/504` | gateway/service/timeout issue | trace proxy and upstream health |

## Security-relevant headers

| Header | Purpose / review point |
|---|---|
| `Content-Security-Policy` | restrict resource execution and framing |
| `Strict-Transport-Security` | tell browsers to use HTTPS for future requests |
| `X-Content-Type-Options: nosniff` | reduce MIME sniffing |
| `Referrer-Policy` | control referrer information |
| `Permissions-Policy` | restrict browser features |
| `Cache-Control` | define caching of sensitive responses |
| `Access-Control-Allow-*` | CORS policy; evaluate as a set |

Headers are context-dependent. Presence is not proof of correct policy, and absence is not always exploitable.

## Cookie attributes

- `Secure`: send only over secure transport.
- `HttpOnly`: hide from normal JavaScript access.
- `SameSite`: control cross-site sending behaviour.
- `Path` / `Domain`: define scope; they are not strong isolation boundaries.
- `Expires` / `Max-Age`: define persistence.

Session identifiers should be unpredictable, rotated at meaningful transitions, invalidated at logout, and never included unredacted in a report.

## curl patterns

```bash
curl -i http://127.0.0.1:8000/
curl -vI https://example.com/
curl --request POST \
  --header 'Content-Type: application/json' \
  --data '{"name":"lab"}' \
  http://127.0.0.1:8000/api/items
curl --output body.bin --dump-header headers.txt http://127.0.0.1:8000/
```

Avoid placing tokens in shell history. Use a protected config or prompt mechanism appropriate to the environment.

## Testing reminders

- Use dedicated accounts and record their roles.
- Change one input at a time.
- Re-fetch anti-CSRF and other volatile values.
- Compare semantic content, not only status or length.
- Confirm state-changing results through the application or authorised server evidence.
- Redact credentials, tokens, personal data, and internal identifiers.

Return to [Cheatsheets](index.md).
