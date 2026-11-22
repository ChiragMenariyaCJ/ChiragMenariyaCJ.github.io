# 🐧 Linux

Linux is both a common assessment target and the workstation behind many security tools. This four-week track teaches you to administer it deliberately before asking you to investigate it.

!!! warning "Practise in a disposable machine"
    Use a snapshot or container you own. Commands that change accounts, permissions, services, packages, or firewall rules can lock you out of a real system.

## What you will be able to do

- navigate the filesystem and transform text without losing original evidence;
- explain users, groups, modes, ACLs, `sudo`, and special permission bits;
- inspect processes, sockets, services, scheduled tasks, logs, and packages;
- write small Bash scripts with input validation and predictable failure; and
- perform a baseline review and communicate risk without overclaiming.

## Four-week route

| Week | Study | Practice | Deliverable |
|---|---|---|---|
| 1 | [Shell, filesystem, and text](fundamentals.md) | Build a case directory and analyse sample logs | Command journal with explanations |
| 2 | [Identity and permissions](identity-permissions.md) | Model access for three lab users | Permission matrix and fixes |
| 3 | [Processes and services](processes-services.md) | Trace one service from unit file to socket and logs | Service evidence note |
| 4 | [Bash automation and hardening](bash-automation.md) | Create a read-only baseline script | Before/after hardening report |

For every command, learn three things: what it reads, what it changes, and how you will verify the result.

## The investigation loop

1. **Observe:** collect identity, time, host, process, socket, and service facts.
2. **Form a hypothesis:** state what might explain the symptom.
3. **Test narrowly:** choose the least disruptive command that can disprove it.
4. **Corroborate:** compare another source such as logs, package metadata, or configuration.
5. **Record:** save command, timestamp, output, interpretation, and limitations.
6. **Restore:** undo temporary lab changes and verify the original state.

## Capstone

Deploy a minimal Linux VM with SSH and a local web service. Create a standard user and an administrative group, then document:

- filesystem locations and ownership for configuration, content, and logs;
- the service unit, process tree, listener, and startup behaviour;
- a least-privilege access design;
- relevant authentication and service log entries;
- outstanding updates and enabled firewall policy; and
- five defensible hardening recommendations, each with a verification step.

Do not call every unusual item a vulnerability. Separate confirmed weakness, security-relevant observation, and missing evidence.

Use the [Linux cheatsheet](../cheatsheets/linux.md) while practising, then apply these skills in the [Labs](../labs/index.md) track.
