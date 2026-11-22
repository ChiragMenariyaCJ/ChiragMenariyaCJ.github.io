# Cybersecurity Glossary

Use this glossary when a lesson introduces an unfamiliar term. The definitions are deliberately concise; follow the linked section for context and practice.

## A

**Access control**  
The rules and enforcement that decide whether a subject may perform an action on an object. See [Web Security](web-security/index.md) and [API Security](api-security/index.md).

**Access control list (ACL)**  
A list attached to a resource or network boundary that states which identities or traffic are allowed or denied.

**Active Directory (AD)**  
Microsoft's directory service for centrally managing identities, computers, policies, and access in a Windows domain. See [Active Directory](active-directory/index.md).

**Address Resolution Protocol (ARP)**  
The local-network protocol used in IPv4 to map an IP address to a link-layer address.

**Application programming interface (API)**  
A defined interface through which software requests data or actions from another component. See [API Security](api-security/index.md).

**Asset**  
Anything valuable that needs protection, such as data, an account, a service, a device, or business availability.

**Attack path**  
A sequence of relationships, permissions, or weaknesses through which an actor could move from an initial position to an objective.

**Attack surface**  
The collection of reachable entry points, identities, features, data flows, and dependencies that could be misused.

**Authentication**  
The process of establishing who or what an entity is. A password, certificate, or security key may contribute to authentication.

**Authorization**  
The decision about what an authenticated or anonymous entity is permitted to do. Authentication does not automatically grant authorization.

**Availability**  
The property that a system or data remains accessible and usable when required.

## B

**Baseline**  
A recorded view of normal configuration, traffic, or behaviour used for comparison and detection.

**Bash**  
A common Unix shell and scripting language. See [Linux](linux/index.md).

**Broken function-level authorization (BFLA)**  
An API weakness where a caller can reach an operation that their role should not be allowed to perform.

**Broken object-level authorization (BOLA)**  
An API weakness where changing or selecting an object identifier permits access to another user's or role's object.

**Broadcast domain**  
The set of devices that receive the same link-layer broadcast traffic, often bounded by a router or VLAN.

**Brute force**  
Systematically trying many candidate values. In an authorised lab, rate and impact limits still apply; defensive controls include rate limiting and multi-factor authentication.

## C

**Certificate authority (CA)**  
An entity that signs digital certificates so relying parties can verify the binding between a public key and an identity.

**CIDR notation**  
A compact way to describe an IP network and prefix length, such as `192.0.2.0/24`.

**CIA triad**  
Confidentiality, integrity, and availability: three common properties used to reason about security impact.

**Client**  
The software or device that initiates a request to a server.

**Command shell**  
An interface that interprets commands, such as Bash or PowerShell.

**Confidentiality**  
The property that information is disclosed only to authorised entities.

**Cookie**  
Small state data a web server asks a browser to store and return under defined conditions. Cookies often carry a session identifier, not the full session itself.

**Cross-origin resource sharing (CORS)**  
HTTP response-header rules that tell a browser which other origins may read a response. CORS is not a server-side authorization system.

**Cross-site request forgery (CSRF)**  
A weakness where a user's browser is induced to send an unwanted authenticated request and the application lacks sufficient request-intent checks.

**Cross-site scripting (XSS)**  
A weakness where untrusted data is interpreted as executable browser script in another user's security context.

**Common Vulnerabilities and Exposures (CVE)**  
A public identifier for a specific disclosed vulnerability. A CVE does not by itself prove that a particular system is affected.

**Common Vulnerability Scoring System (CVSS)**  
A standard way to express technical severity characteristics. Business context and actual exposure still need separate analysis.

**Common Weakness Enumeration (CWE)**  
A catalogue of recurring software and hardware weakness types.

## D

**Default gateway**  
The router a host normally uses to reach destinations outside its directly connected networks.

**Defence in depth**  
Using multiple independent preventive, detective, and responsive controls so one failure is less likely to cause complete loss.

**Directory service**  
A system that stores and exposes structured information about identities, devices, groups, and other objects.

**Directory traversal**  
A path-handling weakness that lets input select files outside an intended directory.

**Domain controller (DC)**  
A server that provides Active Directory domain services, including authentication and directory access.

**Domain Name System (DNS)**  
The distributed naming system that maps names to records such as IP addresses and mail servers.

**Dynamic Host Configuration Protocol (DHCP)**  
A protocol that supplies hosts with network configuration such as addresses, gateways, and DNS servers.

## E

**Egress**  
Traffic leaving a host, segment, or controlled boundary.

**Encoding**  
Representing data in a particular format. Encoding is not encryption and does not provide secrecy by itself.

**Encryption**  
Transforming data using a key so unauthorised parties cannot feasibly read it.

**Endpoint**  
Either a network-connected device or a specific API route, depending on context.

**Enumeration**  
Systematically identifying details about approved hosts, services, users, resources, or application behaviour. See [Penetration Testing](penetration-testing/index.md).

**Evidence**  
Preserved information that supports or challenges a claim, including requests, responses, logs, captures, output, and configuration.

**Exploit**  
Code or a technique that takes advantage of a vulnerability. Safe validation should use the least intrusive proof required by scope.

## F

**False negative**  
A result that fails to identify a condition that is actually present.

**False positive**  
A result that reports a condition that is not actually present or applicable.

**Finding**  
A verified assessment result that explains the affected asset, evidence, impact, root cause, and remediation.

**Firewall**  
A control that permits or blocks traffic according to defined rules and observed connection state.

**Frame**  
A link-layer unit of data, such as an Ethernet frame, carried within a local network segment.

## G

**Group Policy Object (GPO)**  
Active Directory configuration objects used to apply settings to users and computers within a defined scope.

**GUID (globally unique identifier)**  
A large identifier designed to be unique. In Active Directory, objects have GUIDs that remain stable across some name changes.

## H

**Hash**  
A fixed-length output derived from input data by a one-way function. Hashes support integrity checks and, with suitable specialised algorithms and salts, password storage.

**Header**  
Metadata placed before a protocol body, such as HTTP headers that describe content, caching, identity context, or browser security policy.

**Host**  
A device or system participating in a network.

**HTTP**  
The application protocol used for web requests and responses.

**HTTPS**  
HTTP carried over TLS, providing transport encryption and server authentication when correctly validated.

## I

**Identity and access management (IAM)**  
The processes and systems used to create identities, authenticate them, grant access, review privileges, and remove access.

**ICMP**  
The Internet Control Message Protocol, used for network errors and diagnostics such as some `ping` operations.

**IDOR**  
Insecure direct object reference, a common name for an access-control issue caused when an application exposes an object reference without enforcing authorization.

**IDS/IPS**  
An intrusion detection system alerts on suspicious activity; an intrusion prevention system can also take blocking action.

**Ingress**  
Traffic entering a host, segment, or controlled boundary.

**Injection**  
A weakness where untrusted input changes the structure or meaning of a command, query, or interpreter instruction.

**Integrity**  
The property that data and systems are accurate and have not been changed without authorization.

## J

**JSON**  
A text format commonly used to represent structured API data.

**JSON Web Token (JWT)**  
A compact token format for carrying claims. A JWT may be signed, encrypted, or unsecured; it is not automatically confidential, revocable, or secure, so its validation and lifecycle determine those properties.

## K

**Kerberos**  
A ticket-based authentication protocol used by Active Directory domains and other systems.

**Key**  
Secret or public material used by a cryptographic algorithm. Keys require appropriate creation, storage, rotation, and revocation.

## L

**LDAP**  
The Lightweight Directory Access Protocol, used to query and modify directory information when authorised.

**Least privilege**  
Granting only the access needed for a defined task, for only as long as it is needed.

**Local file inclusion (LFI)**  
A server-side file-selection weakness that lets an attacker cause an application to include or read unintended local files.

**Log**  
A timestamped record of system, application, identity, or security events. Logs require context and integrity controls to serve as reliable evidence.

## M

**MAC address**  
A link-layer interface identifier used for local network delivery. It is different from an IP address and is not a trusted identity by itself.

**Mass assignment**  
Binding request properties directly to an internal object in a way that may let a caller change fields they should not control.

**Multi-factor authentication (MFA)**  
Authentication that requires factors from more than one category, such as possession plus knowledge.

**Mitigation**  
A control that reduces likelihood or impact without necessarily removing the root cause.

## N

**NAT**  
Network address translation, which rewrites address or port information between network boundaries. NAT is not a replacement for access-control policy.

**Network segment**  
A bounded portion of a network, commonly separated for routing, performance, or security policy.

**Nonce**  
A value intended for one-time use, often used to prevent replay or provide uniqueness in a cryptographic protocol.

**NTLM**  
A challenge-response family used by Windows for compatibility. Modern domain environments generally prefer Kerberos where possible.

## O

**OAuth 2.0**  
An authorization framework that lets a client obtain limited access to protected resources. OAuth does not by itself define user authentication.

**Object**  
A resource such as a record, file, directory entry, account, or API entity on which actions can be performed.

**OpenID Connect (OIDC)**  
An identity layer built on OAuth 2.0 that adds standard authentication and identity claims.

**Origin**  
In browsers, the combination of scheme, host, and port used for security boundaries such as the same-origin policy.

**OSI model**  
A seven-layer conceptual model for describing network communication and responsibilities.

## P

**Packet**  
A network-layer unit of data, such as an IPv4 or IPv6 packet.

**Payload**  
The data carried inside a protocol unit. In security discussions it can also mean code or input delivered as part of a test; context matters.

**Penetration test**  
An authorised, scoped assessment that safely validates weaknesses and communicates impact and remediation. See [Penetration Testing](penetration-testing/index.md).

**Port**  
A transport-layer number used to direct TCP or UDP traffic to a service endpoint on a host.

**PowerShell**  
Microsoft's object-oriented command shell and automation language.

**Privilege escalation**  
Gaining permissions beyond the starting identity, either vertically to a more powerful role or horizontally to another peer identity.

**Protocol**  
A defined set of rules and message formats used by communicating systems.

**Proxy**  
An intermediary that receives and forwards traffic. An intercepting web proxy helps an authorised tester observe and modify their own lab requests.

## R

**Rate limiting**  
A control that restricts how often an identity, client, or resource may perform an action within a period.

**RBAC**  
Role-based access control, where permissions are assigned to roles and identities receive access through those roles.

**Reconnaissance**  
Collecting information to understand an authorised assessment target before deeper testing.

**Red team**  
An authorised exercise that emulates realistic adversary objectives to test people, process, and technology. It is broader and usually more goal-driven than a vulnerability scan or conventional penetration test.

**Remediation**  
A change that removes or corrects the root cause of a weakness.

**Request and response**  
The common interaction pattern where a client asks for an operation and a server returns a result.

**REST**  
An architectural style for networked applications built around resources, representations, and standard interface semantics.

**Risk**  
The combination of likelihood and impact in a specific context, including assets, threats, exposure, and controls.

**Route**  
A rule that tells a host or router where to send traffic for a destination network.

**Rules of engagement (RoE)**  
The written operational boundaries for an assessment, including scope, allowed techniques, timing, contacts, prohibited actions, and stop conditions.

## S

**Same-origin policy**  
A browser security boundary that restricts how content from one origin can interact with another.

**SameSite**  
A cookie attribute that controls when a browser includes the cookie in cross-site requests.

**Scope**  
The exact systems, accounts, actions, times, and data approved for an assessment, plus explicit exclusions.

**Secure flag**  
A cookie attribute that tells a browser to send the cookie only over secure transport such as HTTPS.

**Security information and event management (SIEM)**  
A system that collects, correlates, searches, and alerts on events from multiple sources.

**Server**  
A system or process that listens for requests and provides a service.

**Session**  
Server- and client-side state that links a sequence of interactions to an identity or workflow.

**Shell**  
A command interpreter. A shell is a normal administrative interface; its permissions are those of the account and environment running it.

**SMB**  
The Server Message Block protocol, commonly used for Windows file, printer, and related network services.

**SQL injection (SQLi)**  
An injection weakness where input changes the structure of a database query.

**SSH**  
The Secure Shell protocol, used for encrypted remote administration and file transfer.

**SSRF**  
Server-side request forgery, where attacker-controlled input causes a server to make unintended requests from its own network position.

**Subnet**  
An IP address range described by a network prefix and used as a routing and administrative boundary.

## T

**TCP**  
The Transmission Control Protocol, which provides connection-oriented, ordered, reliable byte delivery.

**Threat**  
A circumstance or actor capable of causing harm to an asset.

**Threat model**  
A structured view of assets, actors, entry points, trust boundaries, misuse cases, and controls used to prioritise security work.

**TLS**  
Transport Layer Security, the protocol used to authenticate and encrypt many network connections, including HTTPS.

**Token**  
A value that represents an authorization grant, session, identity assertion, anti-CSRF value, or other security state. Its meaning depends on the protocol.

**TTPs**  
Tactics, techniques, and procedures: a way to describe an actor's objectives, methods, and implementation patterns.

**Trust boundary**  
A point where data or execution crosses between components with different identities, privileges, owners, or security assumptions.

## U

**UDP**  
The User Datagram Protocol, which sends independent datagrams without TCP's connection and delivery guarantees.

**URI and URL**  
A URI identifies a resource; a URL is a URI that also describes how and where to locate it.

## V

**Validation**  
Checking that data or behaviour meets defined rules. Security validation should happen at the component that enforces the trust boundary.

**VLAN**  
A virtual LAN that separates link-layer broadcast domains on shared switching infrastructure.

**Vulnerability**  
A weakness that can be used to violate a security requirement or property. Exposure and context determine the resulting risk.

## W

**Web application firewall (WAF)**  
A control that inspects web traffic and may detect or block suspicious requests. It can reduce risk but does not replace secure application design.

**Whitelist/allowlist**  
A set of explicitly permitted values or actions. "Allowlist" is the clearer modern term.

## X

**XML**  
A structured text format used by some documents and APIs. Parsers need secure configuration when processing untrusted XML.

**XML external entity (XXE)**  
A weakness caused when an XML parser resolves attacker-influenced external entities, potentially exposing files or initiating server-side requests.

## Z

**Zero trust**  
A security approach that avoids granting implicit trust based only on network location and continuously evaluates identity, device, resource, and context.

## Related learning hubs

- [Networking](networking/index.md)
- [Linux](linux/index.md)
- [Penetration Testing](penetration-testing/index.md)
- [Web Security](web-security/index.md)
- [API Security](api-security/index.md)
- [Active Directory](active-directory/index.md)
- [Tools](tools/index.md)
- [Cheatsheets](cheatsheets/index.md)
- [Labs](labs/index.md)
