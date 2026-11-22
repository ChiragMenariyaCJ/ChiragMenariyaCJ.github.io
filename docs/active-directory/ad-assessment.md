# Active Directory Assessment Workflow

An AD assessment should explain where identity control differs from intended design. Begin with architecture and read-only inventory, form hypotheses, and validate only the minimum required in an isolated or explicitly authorised domain.

## Learning objectives

- define an AD-specific scope and safety plan;
- collect a structured inventory with built-in administrative tools;
- compare direct and transitive privilege;
- review authentication, delegation, policy, and operational hygiene;
- produce evidence that administrators can verify and fix.

## 1. Scope the identity plane

Clarify:

- forest/domain names and trust relationships;
- in-scope controllers, servers, clients, and certificate services;
- supplied user and administrator lab identities;
- permitted queries and prohibited credential techniques;
- whether configuration changes or service restarts are allowed;
- sensitive accounts, systems, and business windows;
- log collection, traffic identification, and emergency contact;
- cleanup and snapshot/rollback plan.

!!! warning "High-impact techniques need separate approval"
    Password spraying, credential extraction, ticket abuse, relay, persistence, GPO modification, and domain-wide changes can cause harm. They are not implied by permission to perform read-only enumeration.

## 2. Collect supplied context first

Request diagrams, privileged-role lists, service-account register, trust inventory, GPO design, tiering standard, password/authentication policy, exception register, and previous findings.

Write expected state before querying observed state. This prevents every complex configuration from being mislabeled as a vulnerability.

## 3. Build a read-only inventory

On a lab management host with the ActiveDirectory PowerShell module and an authorised account, start with narrow queries:

```powershell
Get-ADForest
Get-ADDomain
Get-ADDomainController -Filter *
Get-ADTrust -Filter *
```

Inventory OUs and GPO links with standard administration tooling. For accounts and computers, select only fields you need rather than exporting every attribute.

```powershell
Get-ADUser -Filter * -Properties Enabled,LastLogonDate |
  Select-Object SamAccountName,Enabled,LastLogonDate

Get-ADComputer -Filter * -Properties Enabled,OperatingSystem,LastLogonDate |
  Select-Object Name,Enabled,OperatingSystem,LastLogonDate
```

Treat `LastLogonDate` and similar replicated/convenience values as evidence with limitations, not a perfect activity record. Agree inactivity criteria with the system owner.

## 4. Review privileged identities

Start from the organisation's privileged-role definition, then examine:

- direct and nested membership of privileged groups;
- accounts with delegated control over privileged objects;
- owners and ACL editors of privileged groups/OUs;
- identities that can edit or link influential GPOs;
- local administration on controllers and management hosts;
- service, scheduled task, backup, and automation identities;
- emergency/break-glass accounts and monitoring;
- separation between admin and everyday identities.

Do not assume that a non-member is non-privileged. Control over an administrator's account, group, system, policy, or credential path can be equivalent.

## 5. Review account hygiene

Evaluate against documented lifecycle policy:

- disabled versus removed accounts;
- stale users and computers;
- accounts without an owner;
- password-not-required or non-expiring exceptions;
- interactive sign-in rights for service identities;
- managed service-account adoption;
- joiner/mover/leaver timing;
- privileged account naming and use;
- lockout, recovery, and multi-factor controls in the wider identity design.

Avoid dumping password-related material. Configuration and lifecycle evidence are sufficient for many findings.

## 6. Review delegation and directory permissions

For high-value OUs, groups, accounts, computers, GPOs, and certificate-related objects, record:

- owner;
- explicit and inherited access entries;
- principal receiving the right;
- exact right and affected attributes;
- business justification;
- whether the path crosses a trust/tier boundary.

Look for rights that permit membership change, password reset, attribute modification, child-object creation, ownership change, or ACL modification. Validate with the owner and configuration evidence before attempting a change.

## 7. Review authentication and protocol policy

With administrators, examine:

- Kerberos encryption and delegation requirements;
- duplicate or unexpected SPNs;
- NTLM audit data and legacy dependencies;
- LDAP signing/channel-binding posture according to supported systems;
- SMB signing and legacy SMB usage;
- privileged logon locations;
- time synchronisation and DNS health;
- local administrator password management;
- remote administration restrictions.

Avoid one-setting recommendations that break required legacy services. Provide a staged migration: inventory, audit, remediate dependencies, enforce, and monitor.

## 8. Review Group Policy

For each high-impact GPO:

- purpose, owner, link location, precedence, and filtering;
- who can edit the GPO and who can change the link;
- permissions on referenced scripts, installers, or shares;
- security settings and preference items;
- whether it applies to controllers or privileged workstations;
- change monitoring, backup, and recovery.

An apparently safe GPO can be controlled indirectly through a writable script path.

## 9. Build control paths

Represent observations as edges:

```text
Helpdesk Group --can reset password of--> App Admin
App Admin --local admin on--> Management Server
Management Server --used by--> Domain Operator
```

For each path, ask:

- Is every edge verified and current?
- What prerequisite identity is required?
- Does the path cross an intended administrative tier?
- Which single remediation breaks the most risky paths?
- What audit event would show use or modification of the edge?

## 10. Validate safely

Prefer, in order:

1. documented configuration and ACL evidence;
2. effective-access calculation with administrators;
3. a disposable canary object in a test OU;
4. a reversible change in the isolated lab with a snapshot;
5. more invasive proof only if specifically required and authorised.

Never reset a real user's password, add yourself to a production group, or alter a live GPO simply to demonstrate a permission.

## 11. Report for remediation

A useful AD finding identifies:

- starting principal and required access;
- each verified control edge;
- target privilege or system;
- intended versus observed design;
- minimum proof and evidence source;
- realistic impact and constraints;
- root-cause remediation at the best choke point;
- monitoring and retest plan.

## Practical exercise: read-only lab review

1. Define scope and prohibited techniques.
2. Inventory forest, domain, controllers, trusts, OUs, and GPOs.
3. Select only the necessary user/computer fields.
4. Map nested membership for three role groups.
5. Review owners/ACLs of five high-value objects.
6. trace two control paths and mark every assumption.
7. choose a configuration-based or canary validation.
8. write remediation that breaks the path without disrupting legitimate delegation.
9. define a detection signal and retest.

Next: [Identity attack paths](identity-attack-paths.md).
