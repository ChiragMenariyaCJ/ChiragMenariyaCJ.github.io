# Guided Cybersecurity Labs

These exercises practise observation, hypothesis, safe validation, evidence, remediation, and retest. Use only a local or explicitly authorised environment with synthetic data.

## How each lab works

For every exercise submit:

1. scope and safety limit;
2. environment diagram or route/object model;
3. expected behaviour;
4. one positive control;
5. one negative or boundary control;
6. redacted evidence;
7. conclusion and uncertainty;
8. defender fix, logging idea, and retest;
9. cleanup status.

## Penetration testing labs

### Lab 1: rules of engagement

**Goal:** turn a fictional request to "test the lab" into safe operating instructions.

1. Define two targets, one supplied account, and a three-hour window.
2. List allowed discovery and validation actions.
3. Exclude availability tests, external addresses, real credentials, persistence, and bulk data access.
4. Set request/concurrency limits and three stop conditions.
5. Create an emergency contact placeholder and cleanup plan.

**Success:** another learner can correctly decide whether five example actions are permitted.

### Lab 2: service inventory

**Goal:** build an accurate inventory of a local target without broad scanning.

1. Write the exact target address and expected ports.
2. Perform a limited service check against only that host.
3. Make one harmless protocol request to each observed service.
4. Record service evidence, version confidence, owner, exposure, and expected purpose.
5. Create three hypotheses and a minimal next test for each.

**Success:** your table distinguishes confirmed facts, detection guesses, and unknowns.

### Lab 3: validation and finding

**Goal:** convert a lab observation into a bounded finding.

1. Choose an intentionally vulnerable configuration.
2. Write a `Given/When/Then/Impact` claim.
3. define a canary and stop point.
4. capture the prerequisite, control behaviour, and smallest impact proof.
5. write root-cause remediation and two regression tests.

**Success:** a peer can reproduce the finding without collecting additional data.

## Web labs

### Lab 4: HTTP transaction anatomy

**Goal:** explain one state-changing browser workflow.

1. Use a synthetic user to change a harmless profile value.
2. Capture the request and response with browser tools.
3. Label method, URL, host, identity carrier, content type, origin, state change, cookies, redirect, and cache rule.
4. repeat after logout and compare behaviour.

**Success:** you can identify exactly which exchange caused the change and how the server associated it with the user.

### Lab 5: route/role/object matrix

**Goal:** evaluate horizontal and vertical authorisation.

1. Create Learner A, Learner B, and Lab Admin with distinct canary objects.
2. Map ten routes and expected access.
3. capture owner-positive requests.
4. repeat five actions as the wrong same-level user, one canary object at a time.
5. repeat two harmless admin reads as a learner.
6. compare status, body, and resulting state.

**Success:** each tested route has explicit expected policy and paired evidence.

### Lab 6: input to output context

**Goal:** trace a marker through storage and rendering without an active payload.

1. Submit `CJ-LAB-'"<>` to a local profile or comment field.
2. inspect the outgoing request, stored representation if available, response source, and browser DOM.
3. identify each output context and the encoding applied.
4. compare a text-oriented renderer with an intentionally unsafe lab renderer.
5. write a safe-API or contextual-encoding fix.

**Success:** you explain the source, transformations, final sink, and correct context-specific defence.

### Lab 7: upload boundary

**Goal:** evaluate upload and download controls using harmless fixtures.

1. Create a small plain-text file and a tiny image.
2. test expected allowed upload.
3. change only the extension/content-type relationship for a boundary test.
4. inspect storage naming, ownership, download headers, and cross-user access.
5. delete the fixtures and confirm cleanup.

**Success:** no executable or malicious file is needed; the evidence covers validation, storage, serving, and authorisation.

## API labs

### Lab 8: endpoint and schema inventory

**Goal:** turn API documentation and observed traffic into a test plan.

1. Inventory ten method/path pairs.
2. draw four object relationships.
3. mark required, optional, nullable, read-only, sensitive, and server-managed fields.
4. compare documentation with observed routes.
5. create role/action, property, and state-transition matrices.

**Success:** every next test maps to an endpoint, subject, object, property, and expected decision.

### Lab 9: object and property authorisation

**Goal:** compare ownership and writable-field decisions.

1. Create Projects A and B owned by matching learners.
2. capture A reading and updating its own canary project.
3. repeat one read and one update against Project B as A.
4. on Project A, add one server-managed field such as `owner_id` to a harmless update.
5. record response and final state after every request.

**Success:** the conclusion separates object-level and property-level policy.

### Lab 10: token lifecycle and audience

**Goal:** verify resource-server rejection paths.

1. Document expected issuer, audience, token type, lifetime, and required claims.
2. call the local API with a valid lab token.
3. repeat with an expired token and a token minted for a second local API.
4. revoke or remove the synthetic user's access and observe when it ends.
5. inspect logs for useful categories without full token values.

**Success:** you explain validation, authorisation, lifetime/revocation trade-offs, and safe logging. Do not forge tokens or seek signing keys.

### Lab 11: workflow state and replay

**Goal:** test a business invariant with synthetic transactions.

1. model `draft -> submitted -> approved` and permitted roles.
2. complete the legitimate flow once.
3. attempt to skip one state as a normal user.
4. safely replay one already-completed transition.
5. inspect duplicate handling, resulting state, and audit log.

**Success:** remediation enforces transitions and idempotency server-side.

## Active Directory labs

### Lab 12: domain and authentication map

**Goal:** document a small private domain before assessing it.

1. Inventory forest, domain, controller, DNS, site/subnet, OUs, and linked GPOs.
2. map five users, five groups, nested membership, and three computers.
3. trace a user sign-in and file-share access at a high level.
4. identify where Kerberos, DNS, LDAP, and SMB participate.

**Success:** the diagram lets a peer predict which controller, groups, and policy affect a lab user.

### Lab 13: delegated permission review

**Goal:** compare intended help-desk delegation with effective rights.

1. Create a Lab Helpdesk group and a disposable test-user OU.
2. document the exact intended task (for example, reset only lab user passwords).
3. inspect the resulting object ownership, inheritance, and access entries.
4. verify effective access on the disposable account.
5. check that privileged OUs and groups are outside the delegation.

**Success:** the group can perform the intended task and cannot control protected objects. Do not reset a real user's password.

### Lab 14: identity control graph

**Goal:** find and break a multi-step privilege path using configuration evidence.

1. Select users, groups, one member server, one service identity, and one GPO.
2. add only verified membership, ACL, local-admin, service, or policy edges.
3. find one unintended path from a learner to a lab administrator boundary.
4. validate with configuration or a disposable canary object.
5. change the best choke-point permission, rebuild the graph, and retest.

**Success:** the path disappears without breaking intended help-desk or service operation.

## Capstone

### Lab 15: mini assessment

Run a four-session assessment of your isolated environment:

1. **Plan:** scope, rules of engagement, architecture, identities, evidence structure.
2. **Map:** assets, services, routes/endpoints, objects, roles, and directory control paths.
3. **Validate:** two application/API findings and one identity/configuration finding using canaries and stop points.
4. **Report and retest:** executive summary, technical findings, remediation priorities, limitations, cleanup, and one completed retest.

### Capstone grading rubric

| Area | Strong evidence |
|---|---|
| Safety | Exact scope, limits, stop conditions, and cleanup |
| Method | Hypotheses and one-variable comparisons, not tool output alone |
| Evidence | Reproducible, redacted, timestamped, and minimal |
| Reasoning | Expected control, observed behaviour, bounded impact, stated uncertainty |
| Remediation | Root-cause fix, owner/action, regression test, and detection idea |
| Communication | Clear executive summary and concise technical detail |

Use the [assessment report template](report-template.md) for the final deliverable.
