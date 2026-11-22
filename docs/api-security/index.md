# 🔌 API Security

APIs expose data and actions. Strong identity, authorization, validation, and monitoring controls make that exposure deliberate and measurable.

## Topics

- REST API design
- HTTP methods and status codes
- JSON validation and schema enforcement
- Authentication and token handling
- JWT design and common failure modes
- Authorization and object-level access control
- IDOR and broken object-level authorization (BOLA)
- Rate limiting and abuse prevention
- API enumeration and inventory
- OWASP API Security Top 10

## Five-week study plan

Plan for **6-8 hours per week** with a local API and synthetic data.

| Week | Focus | Deliverable |
|---|---|---|
| 1 | HTTP, JSON, resources, schemas, and documentation | Annotated API collection and object model |
| 2 | Authentication and token lifecycle | Identity-flow diagram and token-validation checklist |
| 3 | Object, function, and property authorisation | Role/object/action matrix with paired tests |
| 4 | Input, resource use, integrations, and business flows | Abuse-case worksheet and safe lab evidence |
| 5 | Reporting and defence | Three findings plus contract and policy regression tests |

## Course modules

1. [API foundations](api-foundations.md) - learn resources, contracts, identifiers, status, and common API styles.
2. [API testing workflow](api-testing-workflow.md) - inventory endpoints and test controls systematically.
3. [Identity and authorisation](identity-authorization.md) - reason about API keys, sessions, OAuth, JWTs, scopes, roles, and object ownership.
4. [Guided API labs](../labs/guided-labs.md#api-labs) - practise with two users, canary objects, and a local endpoint.

## The API security model

For every request identify:

```text
caller identity + client identity + action + object + fields + context
                             -> policy decision -> bounded response
```

Authentication establishes who or what presented a credential. Authorisation decides whether that subject may perform this action on this object and these properties right now. Validation checks whether the request matches the contract. These are related but separate controls.

## High-value questions

- Does every deployed endpoint appear in an owned inventory?
- Can caller A read or change caller B's synthetic object?
- Can a normal user invoke an administrative function?
- Can the client write server-managed properties such as role, owner, approval state, or price?
- Are responses limited to fields the caller needs?
- Are tokens checked for issuer, audience, signature, time, purpose, and revocation policy?
- Are expensive operations, pagination, exports, and batch requests bounded?
- Can a user influence a server-side destination, webhook, or callback?
- Are errors and logs useful without exposing secrets?

## Practice standard

Use an API you own, a local training API, or an expressly authorised target. Keep two same-role users and one administrator, give each synthetic canary data, and change one request element at a time. Never collect whole datasets when one canary object proves a boundary.

## Readiness checkpoint

You are ready to progress when you can:

- read an OpenAPI document and build an endpoint inventory;
- separate client, user, token, scope, role, object, and property decisions;
- capture positive and negative controls for an API route;
- explain why an unguessable identifier is not authorisation;
- propose a policy test and a schema/contract test for a finding.
