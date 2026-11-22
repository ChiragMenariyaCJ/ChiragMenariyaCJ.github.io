# API Foundations

An API is a contract through which a client asks a service to read or change state. Security testing starts by understanding that contract, the identities involved, and the objects protected by it.

## Learning objectives

- recognise common API styles and representations;
- read resource-oriented routes and HTTP semantics;
- use schemas and documentation to build an inventory;
- distinguish transport, authentication, authorisation, and validation;
- capture a safe request/response baseline.

## 1. Common API styles

### REST-like HTTP APIs

Resources are addressed with paths and manipulated using HTTP methods. Not every API is strictly RESTful; document observed behaviour rather than judging it by naming alone.

```http
GET /v1/projects/42
PATCH /v1/projects/42
```

### GraphQL

Clients submit typed queries or mutations, often to one HTTP endpoint. The schema is a powerful map, but field and resolver authorisation still need explicit enforcement.

### RPC and action APIs

Routes express operations such as `/approveInvoice` or `/users/7/suspend`. Function-level permission and workflow state are especially important.

### Webhooks and event APIs

The service sends events to another system. Security depends on destination control, event signing, replay handling, secret rotation, delivery logs, and safe processing by the receiver.

## 2. Resources, identifiers, and relationships

Model the objects before testing routes:

```text
User owns Project
Project contains Task
Organisation grants User a Role
Invoice belongs to Organisation
```

For each object record:

- identifier type and where it appears;
- owner, tenant, or parent relationship;
- lifecycle state;
- sensitive and server-managed properties;
- actions allowed for each role;
- data returned in list versus detail views.

UUIDs and random IDs can reduce accidental discovery, but they do not replace an ownership or policy check.

## 3. HTTP semantics

| Method | Typical intent | Security questions |
|---|---|---|
| `GET` | Read | Is data filtered by caller, tenant, fields, and state? |
| `POST` | Create/action | Who can create it, which fields are client-controlled, and is replay safe? |
| `PUT` | Replace | Can omitted or protected fields be reset? Is ownership checked? |
| `PATCH` | Partial update | Which properties may this caller change? How are null and absent values treated? |
| `DELETE` | Delete | Is deletion authorised, reversible, audited, and scoped to one object? |

Safe and idempotent are protocol properties, not guarantees about a specific implementation. Test observed behaviour with reversible synthetic records.

## 4. Status codes and error bodies

Common patterns:

| Code | Typical meaning | Testing note |
|---:|---|---|
| 200/201/204 | Successful read/create/no-content action | Confirm resulting state, not only the code |
| 400/422 | Invalid request or semantic validation failure | Check consistent field handling without leaking internals |
| 401 | Missing or invalid authentication | Avoid revealing token-validation detail unnecessarily |
| 403 | Authenticated but not permitted | Some services use 404 to conceal object existence |
| 404 | Route or object not found | Compare carefully; existence signals may still appear elsewhere |
| 409 | State conflict | Useful for duplicate or invalid transitions |
| 429 | Request limit reached | Inspect retry guidance and whether limits bind to the right subject |

The body may contain a machine-readable error code, message, field list, and correlation ID. It should not expose stack traces, queries, secrets, or unrelated records.

## 5. JSON and schema thinking

Example response:

```json
{
  "id": "project-alpha",
  "name": "Training project",
  "owner_id": "learner-a",
  "status": "draft"
}
```

Ask of every property:

- Is it required, optional, nullable, or read-only?
- Which type, range, pattern, and size are accepted?
- May the client set it during create or update?
- Is it sensitive in a response?
- Does it imply ownership, tenant, role, price, or workflow state?

Reject unknown properties where practical or handle them explicitly. Silent binding of extra fields can create mass-assignment vulnerabilities.

## 6. API documentation and inventory

OpenAPI, GraphQL schemas, client collections, gateway configuration, code routes, and traffic logs each reveal part of the deployed surface. Compare them.

An endpoint inventory should include:

| Field | Example |
|---|---|
| Service/version | `training-api/v1` |
| Method/path | `PATCH /projects/{id}` |
| Authentication | Bearer access token |
| Allowed roles/scopes | Owner or project admin |
| Object/tenant check | Project organisation equals caller organisation |
| Request schema | Name editable; owner/status read-only |
| Response schema | Project public fields only |
| Rate/resource limit | 30 updates/minute; 32 KiB body |
| Owner | Projects team |
| Lifecycle | Active; v0 retired |

Unknown, deprecated, shadow, and older-version endpoints deserve review because they may bypass current controls.

## 7. Pagination, filtering, and sorting

List endpoints need bounded page size, stable ordering, caller-specific filtering, and careful field selection. Test:

- default and maximum page size;
- negative, zero, duplicate, or very large values;
- cursor reuse across identities;
- filters that cross tenant/owner boundaries;
- expensive sorts or searches;
- total counts that reveal hidden object existence.

Use a tiny synthetic dataset. Resource-exhaustion testing requires explicit permission; functional boundary checks usually do not need load.

## 8. Versioning and deprecation

Version may appear in the path, host, header, or media type. Inventory every reachable version and ask:

- Is it owned and monitored?
- Does it enforce the same identity and policy?
- Are clients notified of retirement?
- Is deprecated code removed from gateways and deployments?
- Are data shapes and default fields different?

## Practical exercise: map a local API

Use a local API or purpose-built training target.

1. Identify its documentation, schema, or client calls.
2. Inventory at least ten method/path pairs.
3. Draw four object relationships and mark ownership.
4. Mark sensitive, writable, and server-managed properties.
5. Capture one successful read and one expected denial with secrets redacted.
6. Compare one list response with one detail response.
7. Note one documentation/deployment difference or explicitly record that none was found.

## Knowledge check

1. Why is a UUID not an authorisation control?
2. What is the difference between an unknown and a read-only property?
3. Why compare documentation, gateway, code, and traffic inventories?
4. How can a list endpoint reveal hidden objects without returning them?
5. What makes a webhook different from a normal inbound request?

Next: [API testing workflow](api-testing-workflow.md).
