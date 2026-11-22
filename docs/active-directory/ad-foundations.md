# Active Directory Foundations

Active Directory Domain Services (AD DS) combines an identity directory, authentication, authorisation data, configuration, and policy distribution. Reliable assessment starts with understanding how those pieces fit together.

## Learning objectives

- distinguish forests, domains, sites, organisational units, and domain controllers;
- understand objects, SIDs, groups, tokens, and ACLs;
- describe Kerberos, NTLM, LDAP, DNS, SMB, and Group Policy roles;
- recognise common administrative tiers and service identities;
- map a small lab domain from design documents and read-only queries.

## 1. Logical and physical structure

| Component | Purpose | Security relevance |
|---|---|---|
| Forest | Top-level security and schema/configuration boundary | Forest-wide administrators and trusts have broad influence |
| Domain | Administrative and replication partition with its own DNS name | Domain policy, controllers, users, groups, computers |
| Organisational unit (OU) | Container for delegation and Group Policy targeting | Not a security boundary by itself; permissions and policy matter |
| Site | Maps network subnets to directory locations | Influences controller discovery and replication |
| Domain controller (DC) | Hosts directory, authentication, and related services | Highly privileged identity infrastructure |
| Global catalog | Searchable partial view across forest domains | Supports logon and forest-wide lookup |

A forest is not simply a collection of unrelated domains. Compromise or misadministration of forest-level control can affect every domain within it.

## 2. Directory objects

Common object types include users, groups, computers, managed service accounts, OUs, Group Policy containers, and trust objects. Each has attributes, an owner, and a security descriptor.

Important identifiers:

- **Distinguished name (DN):** location in the directory tree.
- **Security identifier (SID):** stable security principal identifier used in access decisions.
- **GUID:** stable object identifier within the directory.
- **User principal name (UPN):** sign-in style name, often user plus suffix.
- **sAMAccountName:** legacy-compatible account name.

Names can change. Access control usually relies on SIDs, so stale permissions can survive renaming.

## 3. Groups and access tokens

Groups organise permission. Scope and type affect where they can be used.

| Scope | Typical use |
|---|---|
| Global | Accounts from one domain grouped by role |
| Domain local | Permission assignment to resources in one domain |
| Universal | Cross-domain grouping where appropriate |

A common design pattern is accounts -> role group -> resource permission group -> access. Nested membership makes administration scalable but can hide effective privilege.

At sign-in, the system builds an access token containing the user's SID, applicable group SIDs, privileges, and other claims. Changes to membership may not affect an existing token until it is renewed.

## 4. ACLs and delegated control

An access control list contains entries that allow or deny a principal specific rights. Directory rights may include reading or writing attributes, resetting a password, changing membership, creating child objects, modifying permissions, or taking ownership.

Ask:

- Which principal owns the object?
- Are permissions explicit or inherited?
- Does a broad group receive a narrow right or full control?
- Can the principal change another object that leads to privilege?
- Does the user interface hide a permission that still exists in the ACL?

Effective control is often a chain: a help-desk group may manage a group, that group controls a server, and the server hosts a privileged service.

## 5. DNS and service discovery

AD relies on DNS service records so clients can find controllers and services. Domain members use DNS to locate LDAP, Kerberos, global catalog, and site-appropriate controllers.

Troubleshooting sequence:

1. confirm client time and network configuration;
2. confirm the client uses the intended domain DNS service;
3. resolve the domain and controller records;
4. verify site/subnet mapping;
5. check controller health and replication;
6. review client and server event logs.

Incorrect DNS often appears as an authentication problem.

## 6. Kerberos at a high level

Kerberos uses tickets so a password is not sent to each service.

```text
client -> authentication service: request initial identity ticket
client -> ticket-granting service: request ticket for a named service
client -> service: present service ticket
service -> client: optionally prove its identity
```

The Key Distribution Center role runs on domain controllers. Time, service principal names (SPNs), DNS, account keys, delegation settings, and ticket lifetimes all affect the flow.

Security questions:

- Is the requested service identity the intended one?
- Are service account privileges and key lifecycle appropriate?
- Is delegation necessary and narrowly configured?
- Are encryption types and legacy exceptions documented?
- Are privileged tickets used only from controlled systems?

## 7. NTLM

NTLM is a challenge-response family used in some legacy, fallback, local-account, or incompatible scenarios. Its presence can increase relay and credential-exposure risk depending on protocol protections and architecture.

A mature environment inventories where NTLM is used, enables relevant auditing, fixes dependencies, enforces signing/channel protections where supported, and reduces use deliberately rather than disabling it without impact analysis.

## 8. LDAP and directory queries

LDAP is used to read and modify directory data. Security depends on authentication, transport/channel protection, signing/binding policies, query permissions, and least privilege.

Directory read access is often broad by design. The risk comes from sensitive attributes, unintended delegated writes, exposed credentials, or paths from readable configuration to privileged control.

## 9. SMB and Group Policy

SMB supports file shares, policy distribution, scripts, and administration. Signing, access control, share/NTFS permission interaction, and legacy protocol removal matter.

Group Policy applies settings based on site/domain/OU links, security filtering, WMI filtering, inheritance, and precedence. Assess both the policy settings and who can edit the GPO, its links, and referenced scripts/files.

## 10. Administrative tiers

Separate identities and workstations by control plane:

- directory/identity administration;
- server and application administration;
- user endpoint administration;
- everyday productivity.

The exact model varies, but the principle is stable: highly privileged credentials should not be exposed to lower-trust systems, web browsing, email, or routine user tasks.

## Practical exercise: draw your lab domain

In a private lab, document:

1. forest and domain names;
2. controllers, member servers, clients, and subnets;
3. five users, five groups, and nested memberships;
4. OU tree and linked GPOs;
5. service accounts and SPNs;
6. three delegated rights;
7. authentication paths for a user sign-in and a file-share connection;
8. trust boundaries and administrative tiers.

## Knowledge check

1. Why is an OU not automatically a security boundary?
2. What is the relationship between group SIDs and an access token?
3. Why can a membership change take time to affect access?
4. How does DNS support Kerberos and LDAP discovery?
5. Why must GPO file/script permissions be reviewed as well as GPO settings?

Next: [AD assessment workflow](ad-assessment.md).
