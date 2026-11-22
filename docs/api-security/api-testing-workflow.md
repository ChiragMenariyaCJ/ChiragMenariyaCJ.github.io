# API Testing Workflow

This workflow uses explicit identities, object relationships, property rules, and positive/negative controls. Perform it only against a local or authorised API with synthetic data.

## Learning objectives

- create an endpoint and object inventory;
- test object-, function-, and property-level authorisation;
- examine schema validation and resource limits safely;
- assess business flows, integrations, and version drift;
- produce reproducible evidence and defensive tests.

## 1. Establish a test dataset

Prepare three synthetic identities:

| Subject | Role | Owned object | Canary value |
|---|---|---|---|
| Learner A | member | Project A | `ALPHA-API-CANARY` |
| Learner B | member | Project B | `BRAVO-API-CANARY` |
| Lab admin | administrator | Admin note | `ADMIN-API-CANARY` |

Record client identity, user identity, tenant, scopes, roles, and token expiry separately. Two requests can use the same user through clients with different permissions.

## 2. Build four matrices

### Endpoint matrix

List method, route, version, authentication, schema, and owner.

### Role/action matrix

| Action | Anonymous | Member | Object owner | Admin |
|---|---:|---:|---:|---:|
| List public projects | Allow | Allow | Allow | Allow |
| Read private project | Deny | Deny | Allow | Allow |
| Change project name | Deny | Deny | Allow | Allow |
| Change project owner | Deny | Deny | Deny | Allow by controlled workflow |

### Property matrix

| Property | Create | Read | Update | Server-managed? |
|---|---|---|---|---|
| `name` | Owner | Allowed roles | Owner | No |
| `owner_id` | Derived from caller | Restricted | Controlled transfer only | Yes |
| `role` | Never direct | Subject/admin | Admin workflow | Yes |
| `created_at` | Never | Allowed roles | Never | Yes |

### State-transition matrix

Document states and which role can move between them. This exposes business logic that route-only checklists miss.

## 3. Capture a clean baseline

For every critical route, save a redacted request and response for the intended subject. Record the resulting database/application state where visible. Then change one dimension at a time:

- remove or expire authentication;
- swap A's object ID for B's canary object;
- keep the object and lower the role;
- add or change one property;
- call the same action in an invalid state;
- try another documented method or version.

One-variable comparisons make evidence defensible.

## 4. Test object-level authorisation

For read, update, delete, export, attachment, comment, and nested routes:

1. perform the action as the owner;
2. repeat as another same-role user against the one canary object;
3. compare status, body, timing, count, and resulting state;
4. stop as soon as the ownership boundary is proven.

Check list filters and child resources as well as direct object routes. A parent route may be protected while `/projects/B/tasks/7` trusts only the task ID.

## 5. Test function-level authorisation

Inventory administrative and privileged actions from documentation, UI traffic, client code, and gateway routes. Compare the administrator's harmless baseline with a standard user's request.

Examples of functions to model:

- user search and support lookup;
- approvals and refunds;
- exports and bulk actions;
- role or membership management;
- configuration and integration settings.

Do not perform destructive administration to prove access. A read-only preview, dry-run, or synthetic object is preferable.

## 6. Test property-level authorisation

Compare fields in create, read, and update schemas. With your own synthetic object:

- add a server-managed field to a create request;
- add one unknown field;
- attempt to update one restricted property with a harmless value;
- request alternate field selections if the API supports them;
- inspect whether sensitive internal fields appear in responses.

The expected result should be defined in advance: reject the request, ignore the field explicitly, or apply a documented policy. Silent acceptance is dangerous.

## 7. Test input and parser boundaries

For each field, test a small set of functional boundaries:

- missing versus null versus empty;
- correct type versus one wrong type;
- minimum/maximum values and just outside them;
- documented enum versus unknown value;
- duplicate JSON keys where parser behaviour is relevant;
- unknown property;
- safe maximum-size fixture.

Avoid large-volume fuzzing unless expressly authorised. The goal is to understand contract enforcement, not create load.

## 8. Test resource and abuse controls

Review controls on pagination, search, export, file processing, batch operations, login/recovery, and expensive computed fields.

Ask:

- Is cost bounded per request and per identity?
- Are limits bound to user, client, tenant, and source appropriately?
- Does a batch endpoint re-check each object's authorisation?
- Can the same operation be replayed?
- Are jobs queued, cancellable, and observable?
- Do failures release resources and avoid duplicate state?

Use a few requests around documented limits, not stress traffic. Availability testing needs separate approval and monitoring.

## 9. Test server-side destinations and webhooks

For an integration in your isolated lab:

1. point it to a listener you own;
2. use a unique event canary;
3. inspect validation of scheme, host, port, redirects, and resolved address;
4. verify event authenticity, timestamp/replay handling, and secret rotation;
5. check that logs redact credentials and bodies as required.

Do not probe cloud metadata, localhost services, or unrelated internal addresses. A controlled listener is sufficient to validate the behaviour.

## 10. Test inventory and version drift

Compare the current API definition to deployed gateway routes and observed client traffic. Look for:

- endpoints missing from documentation;
- older versions with different policy;
- development or debug routes;
- unused methods accepted by the framework;
- retired hosts that still resolve;
- test credentials or examples embedded in documentation.

## 11. Record evidence

Use a compact record:

```text
API/service/version:
Subject, client, tenant, role, scopes:
Object owner/state:
Expected policy:
Baseline request/response:
One variable changed:
Observed request/response/state:
Stop point:
Root-cause hypothesis:
Regression test:
```

Redact access tokens, API keys, cookies, personal data, and unrelated object fields.

## Practical exercise: assess a project API

1. Inventory ten routes and four objects.
2. Build all four matrices.
3. Capture five owner-positive controls.
4. Run five cross-user negative controls against canary objects.
5. Check three restricted properties and three schema boundaries.
6. Examine one pagination route and one state transition.
7. Compare documentation with observed routes.
8. Write one verified finding, one not-reproduced result, and one limitation.
9. Add policy, schema, and logging tests that would prevent recurrence.

Next: [Identity and authorisation](identity-authorization.md).
