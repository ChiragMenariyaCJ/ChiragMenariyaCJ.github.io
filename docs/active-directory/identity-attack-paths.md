# Identity Attack Paths

An identity attack path is a chain of permissions, sessions, configurations, and trust relationships that lets one principal influence a more privileged target. Studying paths helps defenders remove high-leverage weaknesses without relying on dramatic exploitation.

## Learning objectives

- represent identity control as a graph of principals, objects, and rights;
- recognise common path families;
- distinguish direct privilege from control over a credential or policy path;
- choose safe validation and high-leverage remediation;
- define detection around both path creation and path use.

## 1. Think in edges, not labels

Nodes can be users, groups, computers, OUs, GPOs, services, shares, certificate templates, or domains. Edges describe verified control:

```text
User -> member of -> Group
Group -> can modify -> Service Account
Service Account -> administrator on -> Server
Server -> holds privileged session for -> Administrator
```

Record source, target, right, prerequisites, inheritance, evidence time, and confidence for every edge. Graph tools can visualise data, but they do not replace permission interpretation or owner confirmation.

## 2. Privileged group paths

Risk patterns include:

- unnecessary direct membership;
- deeply nested groups whose privilege is not obvious;
- role groups used for both resource access and administration;
- group owners or delegated managers who can change membership;
- stale accounts remaining in privileged groups;
- cross-domain membership through trusts.

**Safe validation:** resolve nested membership and ACLs read-only; compare to the approved role register.

**Remediation:** remove unjustified membership, separate role/resource groups, narrow membership-management rights, use time-bound elevation, and alert on changes.

## 3. Account-control paths

Rights to reset a password, write authentication-related attributes, modify group membership, change an account's owner, or alter its ACL can provide control over the account.

**Safe validation:** show the exact access control entry and calculate effective access on a disposable lab account. Avoid changing a real user's credential.

**Remediation:** delegate only the exact attributes/tasks needed, separate privileged accounts into protected OUs, review inheritance, and monitor ACL plus sensitive attribute changes.

## 4. Service account paths

Service identities often connect applications, hosts, and data. Risk grows when they are shared, highly privileged, interactive, long-lived, or managed by broad groups.

Review:

- owner and business purpose;
- systems and services using the identity;
- SPNs and delegation settings;
- group membership and local rights;
- where credentials are stored;
- rotation and managed-account options;
- interactive logon restrictions;
- dependency and decommission plan.

**Remediation:** use managed service accounts where supported, unique identities per service, least privilege, automated rotation, restricted logon, and monitored use.

## 5. Local administrator and session paths

A principal with local administrative control may be able to influence software, services, tasks, or users on that computer. If a higher-privileged identity uses the same system, the trust boundary collapses.

**Safe validation:** compare local group/policy configuration with privileged logon telemetry and administration design. Do not extract credentials.

**Remediation:** separate administration tiers, use dedicated privileged access workstations, control local admin membership, deploy unique managed local passwords, restrict privileged logons, and reduce standing privilege.

## 6. Group Policy control paths

Control may come from the ability to:

- edit a GPO;
- change a GPO link or filtering;
- write a referenced script, package, or share;
- manage the group used for security filtering;
- alter the OU/object receiving policy.

**Safe validation:** document permissions and use a non-production test OU/GPO if a behavioural demonstration is required.

**Remediation:** narrow editing/link rights, protect referenced content, separate authoring from approval, monitor changes, and keep tested backups.

## 7. Delegation paths

Kerberos delegation lets a service act in another identity context for defined workflows. Risk depends on delegation type, allowed services, account sensitivity, and who controls the delegating principal/computer.

Review whether delegation is required, narrowly targeted, protected from lower-tier control, and monitored. Prefer modern constrained designs supported by the application and mark sensitive privileged accounts so they are not delegated where appropriate.

**Safe validation:** inspect configuration and service flow with lab accounts; do not impersonate real privileged users.

## 8. Certificate and key-based identity paths

Enterprise certificate services can issue credentials used for authentication. Important controls include template enrolment rights, subject construction, intended purposes, approval/signature requirements, issuance policy, CA administration, private-key protection, and revocation.

A dangerous path can exist when a low-privileged subject can obtain a certificate representing a higher-privileged identity or can alter the template/CA policy that permits it.

**Safe validation:** configuration review and a certificate for a disposable lab identity. Avoid requesting a certificate as another real user.

**Remediation:** restrict enrolment/template control, require appropriate approval, constrain subject and usages, secure CA roles and keys, monitor issuance/configuration, and retire unsafe templates.

## 9. Trust paths

Trusts allow authentication relationships between domains or forests, but resource authorisation remains a separate decision. Review direction, transitivity, filtering/protection settings, privileged cross-boundary groups, selective authentication where suitable, and operational ownership.

**Safe validation:** inspect trust configuration and approved group/resource assignments. Do not assume every reachable domain is in assessment scope.

## 10. Legacy protocol and relay paths

Legacy authentication combined with missing signing or channel protections can allow an identity exchange to be redirected or misused in some architectures. Because active validation can affect systems and credentials, begin with audit/configuration evidence and only use a purpose-built isolated lab for behavioural demonstrations.

**Remediation programme:** inventory dependencies, enable auditing, require protections on supported services, remove legacy protocols, segment administration, and monitor anomalous authentication paths.

## 11. Prioritise paths

Rate the path using:

- starting access and exposure;
- number and reliability of edges;
- privilege and systems reached;
- use of protected credentials or user interaction;
- existing detection and containment;
- prevalence of the same edge across the environment;
- remediation leverage.

A long path with a low-privileged start and strong final control can matter more than an isolated misconfiguration. Conversely, do not call a theoretical edge exploitable until prerequisites are verified.

## 12. Break and detect paths

Prefer fixes that remove multiple routes:

- separate privileged identities and logon locations;
- remove broad ACL inheritance on high-value objects;
- narrow service and GPO administration;
- reduce standing group membership;
- manage local and service credentials uniquely;
- retire legacy authentication dependencies;
- protect certificate and trust configuration.

Monitor both **path creation** (group/ACL/GPO/delegation/template changes) and **path use** (unexpected privileged logon, service ticket, certificate authentication, remote administration, or cross-tier access).

## Practical exercise: graph and remediate

In a private lab:

1. Select eight nodes: users, groups, computers, one GPO, and one service identity.
2. Add only edges supported by configuration evidence.
3. Mark intended versus unintended control.
4. Find two paths from a normal user to a privileged target.
5. State the prerequisite and uncertainty for every edge.
6. Choose one safe canary validation.
7. propose two remediations and identify which breaks more paths.
8. define one creation alert and one use alert.
9. retest the graph after the configuration change.

## Knowledge check

1. Why is group membership only one form of privilege?
2. How can control of a GPO script path become a privilege path?
3. Why do privileged sessions matter on locally controlled systems?
4. What distinguishes path creation from path use detection?
5. What makes a remediation high leverage?

Return to the [AD learning path](index.md) or practise in the [guided AD labs](../labs/guided-labs.md#active-directory-labs).
