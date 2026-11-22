# Build a Safe Cybersecurity Lab

A good lab contains risk by design. It gives you enough realism to practise identity, network, application, and reporting skills without sending traffic to systems you do not own.

## Learning objectives

- choose an isolation model and verify it;
- plan lab networks, hosts, identities, and synthetic data;
- use snapshots and reset procedures;
- collect reproducible evidence without retaining secrets;
- define safe operating limits and cleanup.

## 1. Choose the smallest useful lab

Start with the learning question, then add only required components.

| Goal | Minimum environment |
|---|---|
| HTTP and web testing | Browser plus one local training application |
| API testing | API service, data store or fixture, and two synthetic users |
| Network enumeration | Tester VM and one target VM on a host-only segment |
| Active Directory | One DC, one member server, one client, and a tester/admin workstation |
| Capstone | Tester, web/API target, identity service, and logging view |

More machines do not automatically create better learning. Complexity should answer a question.

## 2. Network isolation models

### Loopback/local process

Bind a training service to `127.0.0.1` when only the host needs access. This is the safest default for browser, HTTP, and API exercises.

### Host-only virtual network

VMs communicate with the host and one another but not the external network. Use a dedicated private range and verify routes before starting.

### NAT with controlled updates

Some labs need temporary outbound access for operating-system or dependency updates. Keep vulnerable targets stopped while changing network mode, update from trusted sources, then return to isolation and verify it.

### Avoid bridged mode for vulnerable targets

Bridging places the VM on the same network as other devices. That increases the chance of accidental scanning, compromise, or exposure. Do not use it for intentionally vulnerable machines.

## 3. Verify isolation

Do not rely only on a hypervisor label. Record:

- interface names and addresses;
- routing table and default route;
- DNS server;
- hypervisor network mode;
- host firewall rules;
- listening services and bind addresses.

From the tester, confirm only the intended private addresses are reachable. From the target, confirm there is no unintended default route. Recheck after importing appliances or changing adapters.

!!! warning "Confirm before scanning"
    Write the exact lab CIDR or host addresses in your notes. Resolve names and compare the returned addresses with that allow-list before any active command.

## 4. Plan addresses and names

Example host-only layout:

| Host | Role | Example lab address | Notes |
|---|---|---|---|
| Tester | Browser/CLI/evidence | `192.168.56.10` | No shared personal folders |
| Target | Web/API training app | `192.168.56.20` | Intentionally vulnerable; isolated |
| DC | Directory/DNS | `192.168.56.30` | Lab-only domain |
| Member | File/app server | `192.168.56.40` | Synthetic shares and services |
| Client | Standard user workstation | `192.168.56.50` | Synthetic learner accounts |

These addresses are examples inside a private range. Use only addresses assigned to your actual host-only network.

Use a lab-only DNS namespace that cannot be confused with a real organisation. Do not reuse employer, university, or customer names.

## 5. Separate identities and data

Create dedicated lab identities:

- Learner A and Learner B for horizontal checks;
- Lab Admin for vertical checks;
- one narrowly scoped service identity;
- optional help-desk/delegated operator;
- canary files and records with unmistakably synthetic values.

Never copy real password databases, customer records, production tokens, corporate certificates, or personal documents into the lab. Use generated fixtures.

## 6. Protect the host

- Keep the hypervisor and host patched.
- Disable clipboard, drag-and-drop, and shared folders unless an exercise requires them.
- Share only a dedicated exchange directory with non-sensitive files.
- Do not reuse host passwords or SSH keys inside targets.
- Treat imported appliances as untrusted until isolated and inspected.
- Do not sign into personal or work accounts from a vulnerable VM.
- Keep endpoint protection and the host firewall enabled.

## 7. Snapshots and reset strategy

Create labelled snapshots at useful boundaries:

```text
00-clean-install
10-patched-and-isolated
20-lab-identities-and-data
30-intentionally-vulnerable-state
```

Before each exercise, note the starting snapshot. Afterward, either perform documented cleanup and verify it or revert. Periodically rebuild from a trusted source; snapshots are convenient, not proof of integrity.

For multi-VM domains, application and directory state may span machines. Shut down cleanly and snapshot a consistent set rather than reverting one machine arbitrarily.

## 8. Define operating limits

Write a mini rules-of-engagement file:

```text
Targets: exact lab IPs/URLs
Window: start and end time
Allowed: read-only discovery, synthetic account tests, reversible changes
Not allowed: external addresses, denial of service, real credentials, persistence
Limits: request rate, concurrency, maximum body/file size
Stop: instability, unexpected route, non-synthetic data, loss of isolation
Reset: snapshot name and cleanup checklist
```

Even in your own lab, this discipline builds professional habits.

## 9. Evidence workstation

Keep an engagement directory:

```text
lab-session/
  scope/
  notes/
  requests/
  screenshots/
  tool-output/
  findings/
  report/
```

Use UTC timestamps, stable asset names, and redaction. Hash important artefacts if you want to practise evidence integrity. Do not store working passwords or full bearer tokens in screenshots or reports.

## 10. Add observability

A lab is more educational when you can see both sides:

- application request and error logs;
- authentication and authorisation events;
- Windows event logs and PowerShell operational logs;
- Linux service journal;
- reverse proxy logs;
- network capture on interfaces you own;
- audit events for changes to users, groups, roles, and policy.

Ask after each test: what would a defender see, and which missing event would make investigation difficult?

## 11. Baseline and health check

Before testing:

1. record VM state and time synchronisation;
2. verify isolation and target address;
3. confirm expected services and accounts;
4. perform one legitimate user workflow;
5. confirm logs receive the event;
6. take a baseline snapshot or backup;
7. start the decision log.

If the legitimate workflow already fails, fix the lab before interpreting negative security tests.

## 12. Cleanup checklist

- remove test accounts, roles, API keys, and tokens;
- delete uploaded files and synthetic records if not reverting;
- undo policy, ACL, service, and configuration changes;
- stop vulnerable services and VMs;
- remove temporary network adapters or forwarding rules;
- archive redacted notes; securely delete unnecessary raw evidence;
- verify the host network and firewall returned to normal;
- record the final snapshot or revert result.

## Build exercise

1. Select one goal and minimum topology.
2. Create a host-only network and address table.
3. Verify route/DNS isolation from every VM.
4. create synthetic identities and canary data.
5. enable at least two log sources.
6. take a clean and vulnerable-state snapshot.
7. write operating limits and a stop condition.
8. complete a legitimate workflow and find it in logs.
9. test the reset procedure before beginning the course.

Continue to the [guided labs](guided-labs.md).
