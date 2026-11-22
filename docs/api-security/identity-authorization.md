# API Identity and Authorisation

API security often fails when teams mix up the identity of the user, the identity of the client, and permission for a particular object or action. This module separates those decisions.

## Learning objectives

- distinguish API keys, sessions, access tokens, and service credentials;
- understand OAuth roles and token purpose at a conceptual level;
- review JWT validation requirements without trusting claims blindly;
- model scopes, roles, relationships, properties, and context;
- test token lifecycle and authorisation with synthetic identities.

## 1. Identity layers

A request may involve several principals:

| Principal | Example | Security question |
|---|---|---|
| Human subject | Learner A | Which objects and actions belong to this person? |
| Client | Web app or CLI | Is this client allowed to request this flow and audience? |
| Workload | Background service | Which service identity and least privilege are required? |
| Tenant | Training organisation | Is data isolated from other organisations? |
| Delegator | User granting access | What consent, scope, and duration were granted? |

Log and enforce these separately where the architecture requires it.

## 2. Credential types

### API keys

API keys usually identify a client or project, not a human user. They should be scoped, rotated, stored as secrets, monitored, and transmitted only over protected channels. Do not place them in URLs, public client bundles, examples, or logs.

### Cookie-backed sessions

The browser holds an opaque session identifier while state lives server-side. Protect the cookie, rotate it at identity changes, and invalidate it on logout/revocation. When cookies are ambient, consider cross-site request protections for state changes.

### Bearer access tokens

Possession is sufficient to use a bearer token, so storage, transport, audience, lifetime, and logging discipline matter. A resource server must validate the token for itself, not merely decode it.

### Service credentials

Workloads should have distinct managed identities or short-lived credentials with a narrow audience and permissions. Shared, long-lived secrets make attribution and revocation difficult.

## 3. OAuth roles and flow

OAuth is a delegation framework. Keep these roles distinct:

- **resource owner:** the subject granting access;
- **client:** the application requesting access;
- **authorisation server:** authenticates/grants and issues tokens;
- **resource server:** the API that validates tokens and enforces permission.

An access token is for a resource server. An ID token communicates authentication information to a client; it should not be substituted as an API access token unless the design explicitly defines that use.

Review redirect URIs, client type, state/nonce where applicable, proof-key mechanisms for public clients, consent, scope, token audience, and revocation according to the selected flow.

## 4. JWT validation checklist

A JWT is a format, not an automatic security control. A resource server should:

1. use an approved algorithm configured by the server;
2. verify the signature with the correct trusted key source;
3. require and compare the expected issuer;
4. require that the API is an intended audience;
5. enforce expiry and not-before with a small documented clock tolerance;
6. distinguish token type and purpose;
7. validate required subject/client/tenant claims;
8. apply key rotation and cache rules safely;
9. enforce revocation or short lifetime according to risk;
10. authorise the request using trusted policy, not merely token presence.

Do not place secrets or unnecessary personal data inside JWT claims: signed tokens are commonly readable by the holder even when tamper-resistant.

### Safe review approach

In a local lab, compare a valid supplied token with tokens that are expired, intended for another lab audience, or missing a required claim. Do not attempt to steal signing keys or forge tokens. The learning goal is to verify rejection paths and configuration.

## 5. Scopes, roles, and relationships

- **Scopes** describe delegated capabilities granted to a token/client.
- **Roles** group permissions associated with a subject in a system or tenant.
- **Relationships** express ownership, membership, assignment, or management of a specific object.
- **Attributes/context** include tenant, object state, device, network, time, or assurance level.

A robust decision may require all of them:

```text
token audience is training-api
AND scope contains project:write
AND subject is project owner
AND project tenant equals subject tenant
AND project state is draft
```

Possessing `project:write` should not automatically grant write access to every project.

## 6. Object and property policy

For each route define:

- permitted subjects/roles;
- permitted objects and tenant relationship;
- permitted action and workflow state;
- writable and readable properties;
- required assurance or recent authentication;
- audit event and denial behaviour.

Enforce policy in a shared server-side layer close to the data operation. UI hiding, gateway-only checks, and client-supplied owner/role fields are insufficient.

## 7. Token lifecycle tests

With lab-issued synthetic identities, check:

- access before and after expiry;
- logout or revocation behaviour;
- refresh-token rotation and reuse handling where implemented;
- effect of password reset, role removal, or tenant removal;
- audience separation between two local APIs;
- session/token rotation after privilege increase;
- concurrent sessions and user-visible session management;
- log redaction and correlation.

Record expected lifecycle before the test. A self-contained access token may remain valid until expiry by design; whether that is acceptable depends on lifetime, risk, and revocation strategy.

## 8. Failure response and observability

Clients need stable, non-sensitive errors. Defenders need enough context to investigate.

Useful security events include:

- issuer/audience/type validation failure category (without logging the full token);
- subject, client, tenant, and route identifiers;
- policy rule and allow/deny outcome;
- administrative and ownership changes;
- refresh-token reuse or suspicious replay;
- correlation ID and trusted timestamp.

Avoid logging credentials, full authorisation headers, reset tokens, or sensitive claims.

## Practical exercise: policy before requests

1. Draw the human, client, authorisation server, and resource server roles for a local API.
2. Write policy for five actions using subject, scope, role, object, tenant, fields, and state.
3. Create positive and negative examples for each policy.
4. Verify expired and wrong-audience lab tokens are rejected.
5. Remove a learner from a synthetic project and observe when access ends.
6. Attempt one restricted property change on your own canary object.
7. Specify the audit event and regression test for each denial.

## Knowledge check

1. Why does an API key not normally identify a human?
2. What is the difference between an access token and an ID token?
3. Why is decoding a JWT insufficient?
4. How do scopes and object ownership complement each other?
5. What trade-off exists between self-contained token lifetime and immediate revocation?

Continue to [Active Directory](../active-directory/index.md) to apply identity and policy thinking to Windows domains.
