# Official Learning Resources

Use this page when a lesson introduces a term, protocol, control, or tool and
you need the source that defines it. The list is intentionally short: every
entry is maintained by a standards body, government publisher, project owner,
or product vendor.

!!! warning "Documentation is not permission"
    A command shown in an official manual can still be disruptive. Keep the
    written scope, rate limits, target list, and stop conditions from the
    [Study Guide](study-guide.md) in force while following any external source.

**Last link review:** 19 November 2026.

## A useful reference order

For most study sessions, work in this order:

1. Read the relevant lesson on this site for the mental model and bounded task.
2. Check the official source for exact syntax, current behaviour, and limits.
3. Practise only in the isolated environment described in [Labs](labs/index.md).
4. Save the command, version, result, and interpretation in your evidence notes.

Official documentation often describes every feature, including risky ones. Do
not turn a reference manual into a checklist of actions to run.

## Networking and protocols

Use these alongside the [Networking](networking/index.md) track.

- [RFC Editor](https://www.rfc-editor.org/) is the authoritative catalogue for
  Internet RFCs; use it when you need the actual protocol definition rather
  than a simplified port or packet summary.
- [IANA protocol-number registry](https://www.iana.org/assignments/protocol-numbers/)
  maps the IPv4 Protocol and IPv6 Next Header values to their assigned
  protocols and defining RFCs.
- [IANA service-name and port registry](https://www.iana.org/assignments/service-names-port-numbers/)
  confirms registered TCP, UDP, SCTP, and DCCP service names; remember that a
  registered port does not prove which application generated observed traffic.
- [TCP specification, RFC 9293](https://datatracker.ietf.org/doc/html/rfc9293)
  is the current core TCP standard to consult when flags, states, sequence
  numbers, retransmissions, or connection teardown need a precise explanation.

Do not memorise an entire registry. Learn how to look up a value, follow its
reference, and compare the specification with packet evidence.

## Linux and shell work

Use these alongside the [Linux](linux/index.md) track.

- [Linux kernel documentation](https://docs.kernel.org/) explains kernel
  interfaces, administration topics, networking internals, and user-space APIs
  when a command summary is not enough.
- [Linux man-pages project](https://man7.org/linux/man-pages/) provides browsable
  renderings of Linux system-call, library, file-format, and administration
  manuals; begin with the locally installed `man` page when possible because it
  matches the lab machine.
- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
  is the source for quoting, expansion, pipelines, redirection, exit status,
  functions, and scripting behaviour.

Record the distribution and command version in lab notes. A correct option for
one release may be missing or behave differently on another.

## Assessment method, risk, and reporting

Use these with [Penetration Testing](penetration-testing/index.md) and the
reporting exercises in [Labs](labs/index.md).

- [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final) provides a
  structured reference for planning technical security tests, conducting them,
  analysing findings, and developing mitigations; use its concepts, then adapt
  them to the engagement's current rules of engagement.
- [FIRST CVSS v4.0](https://www.first.org/cvss/v4.0/) contains the specification,
  user guide, calculator, and examples for communicating technical severity;
  keep business context separate from the base score.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/matrices/enterprise/)
  connects observed adversary behaviours to tactics, techniques, mitigations,
  and detection ideas; do not treat it as a penetration-test checklist.

A named framework improves consistency, but evidence still has to demonstrate
what was observed in the assessed environment.

## Web application security

Use these alongside [Web Security](web-security/index.md).

- [OWASP Web Security Testing Guide 4.2](https://wstg.owasp.org/v4.2/) is the
  stable, versioned test-method reference; cite its WSTG identifiers in notes
  when a lesson maps to a defined test scenario.
- [OWASP ASVS 5.0](https://asvs.owasp.org/) supplies testable application
  security requirements; use it to decide what a control should achieve and
  the WSTG to help decide how to examine it.
- [OWASP Top 10](https://owasp.org/projects/top-ten/) is an awareness and
  communication document for common web risks, not a complete testing plan.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) gives focused
  implementation and remediation guidance for controls such as authentication,
  session management, input handling, and file uploads.

Prefer the versioned WSTG link in a report. Use development or “latest” pages to
learn about upcoming changes, not as a stable citation.

## API security

Use these alongside [API Security](api-security/index.md).

- [OWASP API Security Top 10: 2023](https://api-security.owasp.org/)
  describes the current released API risk categories and their mitigations;
  map them to real endpoints, identities, objects, properties, and workflows.
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
  is a concise defensive reference for HTTPS, access control, JWT handling,
  input validation, status codes, audit logging, and management endpoints.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) defines the
  format used by many REST-style API descriptions; use it to understand an
  approved schema and inventory, not to assume undocumented behaviour is safe.

An API risk label is only a starting hypothesis. Your evidence should name the
endpoint, method, role, object or action, observed response, and expected rule.

## Active Directory and Windows identity

Use these alongside [Active Directory](active-directory/index.md).

- [Active Directory Domain Services overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
  explains the directory, schema, global catalogue, search, replication, and
  policy concepts used throughout the track.
- [Kerberos authentication overview](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview)
  traces Windows ticket-based authentication and links to Microsoft protocol
  specifications for implementation details.
- [Windows authentication architecture](https://learn.microsoft.com/en-us/windows-server/security/windows-authentication/windows-authentication-architecture)
  places Kerberos, NTLM, Negotiate, Schannel, credentials, tokens, and local
  security components in one architecture.
- [PowerShell documentation](https://learn.microsoft.com/en-us/powershell/)
  is the authoritative starting point for cmdlet syntax, help, scripting, and
  module references used in Windows lab observation.
- [Microsoft Learn AD DS path](https://learn.microsoft.com/en-us/training/paths/active-directory-domain-services/)
  provides vendor-maintained exercises on forests, domains, sites, controllers,
  organisational units, users, groups, certificates, and Group Policy.

Microsoft Entra ID, Microsoft Entra Domain Services, and traditional AD DS are
related but different systems. Confirm which one a source and lab describe.

## Tool manuals

Use the local [Tools](tools/index.md) lessons for a safe workflow and these
sources for complete, current syntax.

- [Nmap Reference Guide](https://nmap.org/book/man.html) defines target syntax,
  scan types, service detection, timing, scripts, output formats, and port-state
  meanings; check the installed version before copying an option.
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html/) explains
  capture setup, packet panes, capture filters, display filters, streams, and
  statistics; learn the difference between hiding packets and excluding them
  from a capture.
- [Burp Suite desktop documentation](https://portswigger.net/burp/documentation/desktop)
  covers proxy scope, HTTP history, Repeater, configuration, and testing
  workflows for Community and Professional editions.
- [Gobuster project repository](https://github.com/OJ/gobuster) is the project
  owner's source for installation, modes, flags, examples, releases, and known
  issues; use content discovery only against an explicitly approved lab host.

Avoid third-party command lists when the tool's own manual answers the question.
Short copied commands often hide defaults, traffic volume, and version changes.

## Purpose-built practice targets

These projects are deliberately vulnerable. They still belong on an isolated
lab network and should never be exposed to the public Internet.

- [OWASP Juice Shop](https://owasp.org/projects/juice-shop/) is a modern
  intentionally insecure application with guided challenges spanning common
  web and API weaknesses.
- [OWASP WebGoat](https://owasp.org/projects/webgoat/) teaches common web
  weaknesses and their defensive lessons in a self-contained Java application.

Before launching either target, read its current installation instructions,
bind it only to the intended lab interface, take a snapshot, and verify the
stop/reset procedure.

## When sources disagree

1. Check whether the documents describe the same product, protocol, version,
   and deployment model.
2. Prefer the current standard or the documentation matching the installed
   version over an undated tutorial.
3. Reproduce the behaviour safely and save the smallest useful evidence set.
4. Record the discrepancy and uncertainty instead of forcing a conclusion.
5. Recheck the source during remediation and retesting; controls and defaults
   change over time.

Return to the [Learning Path](learning-path.md) to place a reference back into a
week, exercise, and deliverable.
