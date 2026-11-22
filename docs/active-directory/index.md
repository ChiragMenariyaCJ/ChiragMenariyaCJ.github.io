# 🏢 Active Directory

Active Directory provides identity, policy, and resource management for Windows domains. These notes introduce the components and protocols used to administer and assess a domain safely.

## Topics

- Domains and domain controllers
- Users, groups, and delegated access
- Kerberos authentication
- NTLM authentication
- LDAP directory queries
- Group Policy
- Authorised Active Directory enumeration

## Five-week study plan

Use a private, host-only Windows lab. Plan for **6-8 hours per week**.

| Week | Focus | Deliverable |
|---|---|---|
| 1 | Forests, domains, DNS, objects, SIDs, groups | Labelled directory and trust diagram |
| 2 | Kerberos, NTLM, LDAP, SMB, and Group Policy | Authentication-flow notes and packet/log observations |
| 3 | Permissions, delegation, service accounts, and administration tiers | Privilege and control-path matrix |
| 4 | Read-only assessment and attack-path reasoning | Authorised lab inventory with prioritised hypotheses |
| 5 | Safe validation, hardening, detection, and reporting | Three findings with remediation and retest plans |

## Course modules

1. [Active Directory foundations](ad-foundations.md) - understand the directory, protocols, objects, policy, and authentication.
2. [AD assessment workflow](ad-assessment.md) - collect a scoped inventory and compare effective privilege with intended design.
3. [Identity attack paths](identity-attack-paths.md) - reason about chains of permissions and misconfiguration without indiscriminate exploitation.
4. [Guided AD labs](../labs/guided-labs.md#active-directory-labs) - practise in an isolated domain you own.

## The identity-control model

For any domain action, identify:

```text
principal -> credential/authentication -> token/groups -> permission
          -> target object/computer/service -> audit event
```

An account can gain influence through direct group membership, nested groups, delegated directory permissions, local administrator rights, Group Policy control, service configuration, certificate templates, or a trust. Effective privilege is the combined path, not just the user's visible role.

## High-value questions

- Which accounts, groups, computers, and service identities are privileged?
- Are administrative identities separated from everyday browsing and email?
- Which nested memberships or delegated ACLs create unexpected control?
- Where are legacy authentication and weak protocol settings still required?
- Who can edit GPOs, scripts, services, tasks, shares, or certificate templates used by privileged systems?
- Are service accounts narrowly scoped, managed, rotated, and denied interactive use?
- Are inactive accounts, stale computers, trusts, and old policy objects removed?
- Can defenders see changes to privileged groups, delegation, directory ACLs, and authentication anomalies?

## Practice standard

Build a lab domain that is disconnected from untrusted networks or isolated with host-only networking. Use synthetic accounts and reversible changes. Start with documented configuration and read-only queries. Do not run password spraying, credential dumping, persistence, or destructive domain operations unless a purpose-built course environment explicitly authorises and contains them.

## Readiness checkpoint

You should be able to explain:

- the difference between a forest, domain, organisational unit, and site;
- why DNS is essential to domain operation;
- how a SID, group membership, and access control entry contribute to access;
- the high-level Kerberos ticket flow and when NTLM may appear;
- how a low-privileged object can control a higher-value object through a chain;
- how to validate and report a path using minimum-impact evidence.
