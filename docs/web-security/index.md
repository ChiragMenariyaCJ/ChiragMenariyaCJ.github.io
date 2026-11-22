# 🌍 Web Security

Understand how web applications handle requests, identity, and data, then learn how to identify and reduce common weaknesses.

## Topics

- HTTP requests and responses
- Cookies and sessions
- Authentication and authorization
- SQL injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Server-side request forgery (SSRF)
- Secure file uploads
- Access control
- OWASP Top 10

## Five-week study plan

Allow **6-8 hours per week** and complete the practical deliverable before moving on.

| Week | Theme | Questions to answer | Deliverable |
|---|---|---|---|
| 1 | HTTP and browser model | How are requests routed, state stored, and origins separated? | Annotated request/response pair |
| 2 | Application mapping | Which pages, roles, inputs, and state changes exist? | Route, role, and data-flow map |
| 3 | Identity and access | Where are authentication, session, and authorisation decisions made? | Two-user access-control matrix |
| 4 | Input and server behaviour | Where can untrusted data reach interpreters, files, URLs, or templates? | Source-to-sink worksheet |
| 5 | Validation and defence | Which issues are reproducible, what is their root cause, and how should they be fixed? | Three lab findings with regression tests |

## Course modules

1. [HTTP and browser foundations](http-foundations.md) - understand the protocol, state, origins, cookies, and browser enforcement.
2. [Web testing workflow](testing-workflow.md) - map an application and test controls systematically.
3. [Vulnerability classes](vulnerability-classes.md) - study common root causes, safe lab tests, and durable mitigations.
4. [Guided web labs](../labs/guided-labs.md#web-labs) - turn each concept into evidence.

## A useful mental model

A web application is a chain of trust decisions:

```text
browser -> edge/proxy -> route -> authentication -> authorisation
        -> validation -> business logic -> data/service -> response rendering
```

Ask four questions at every step:

1. What input crosses this boundary?
2. Which identity is attached to it?
3. What decision should be enforced here?
4. What evidence shows that the decision actually occurred?

## Testing priorities

Start with controls that protect real outcomes:

- Can one user read or change another user's objects?
- Can a lower role reach administrative functions?
- Can a logged-out or expired session repeat a protected action?
- Are state-changing actions bound to the intended user and origin?
- Does untrusted input reach a database, template, shell, file path, URL fetcher, or browser interpreter?
- Are uploads stored and served with safe type, name, and execution rules?
- Do errors, logs, and caches expose secrets or cross-user data?

Headers and version strings matter, but they should not distract from broken trust boundaries and business logic.

## Practice standard

Use a local application, a purposely vulnerable training target, or an explicitly authorised programme. Create synthetic users and canary data. Record both a positive control (what should work) and a negative control (what should be denied). Stop after the smallest proof of impact.

## Readiness checkpoint

You are ready to move into API testing when you can:

- reconstruct a raw HTTP request from browser developer tools;
- explain origin, site, cookie scope, and session state;
- create a route/role/object matrix;
- trace one input from source to security-sensitive sink;
- write a finding that identifies the failed control and a regression test.

Continue with [API Security](../api-security/index.md) when the application's primary interface is JSON, GraphQL, or another machine-consumed API.
