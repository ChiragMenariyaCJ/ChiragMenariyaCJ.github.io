# Processes, services, logs, and packages

A running service connects configuration on disk to a process, a user identity, one or more sockets, and logs. Trace all of them to understand exposure.

## Processes

```bash
ps -eo user,pid,ppid,lstart,cmd --forest
pgrep -a sshd
pstree -ap
top
```

`/proc/<pid>` exposes the live process view:

```bash
pid=$(pgrep -n sshd)
readlink -f "/proc/$pid/exe"
tr '\0' ' ' <"/proc/$pid/cmdline"; printf '\n'
grep -E '^(Name|State|Uid|Gid|Cap)' "/proc/$pid/status"
```

Command lines and environments may contain secrets. Minimise collection and redact reports appropriately.

## Signals and lifecycle

Signals request process actions. Prefer the service manager for managed services because it preserves dependencies and logging.

```bash
kill -TERM PID       # request graceful termination
kill -HUP PID        # often reload; verify the program's documentation
```

Do not start with `SIGKILL`; it cannot be handled and may prevent cleanup.

## systemd

```bash
systemctl status ssh.service
systemctl is-enabled ssh.service
systemctl cat ssh.service
systemctl show ssh.service -p User -p Group -p ExecStart -p FragmentPath
systemd-analyze security ssh.service
```

A unit may be modified by drop-ins. `systemctl cat` reveals the combined source. Treat `systemd-analyze security` as a review aid, not a vulnerability scanner.

When changing a lab service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart example.service
systemctl --no-pager --full status example.service
journalctl -u example.service --since '-5 minutes'
```

## Sockets and interfaces

```bash
ss -lntup
ss -ntp
ip -brief address
ip route
ip neighbour
```

Interpret bind addresses:

- `127.0.0.1`: loopback only;
- a specific interface address: reachable through that interface/routing path;
- `0.0.0.0`: all IPv4 interfaces, subject to firewall and routing;
- `::`: IPv6 wildcard and, depending on configuration, possibly dual-stack behaviour.

An open listener is not proof that an external host can reach it. Verify each control in the path.

## Logs

```bash
journalctl -u ssh.service --since today
journalctl -p warning..alert --since '-1 hour'
journalctl _PID=1234
journalctl --list-boots
```

Some distributions also use files under `/var/log`. Record timezone, boot, hostname, and collection point. Absence of an event can mean it was not logged, not retained, filtered out, or collected from the wrong host.

## Scheduled execution

```bash
systemctl list-timers --all
crontab -l
sudo ls -la /etc/cron.d /etc/cron.daily
```

Review the schedule, identity, executable path, configuration, and permissions of every component. Relative paths and writable scripts are security-relevant even when the scheduler itself is configured correctly.

## Packages and updates

=== "Debian/Ubuntu"

    ```bash
    dpkg -S /usr/bin/curl
    apt-cache policy curl
    apt list --upgradable
    ```

=== "Fedora/RHEL"

    ```bash
    rpm -qf /usr/bin/curl
    dnf info installed curl
    dnf check-update
    ```

An available update is not automatically exploitable. Record installed version, vendor advisory, affected configuration, reachability, and compensating controls.

## Lab: trace one service

Choose a harmless service in your VM, such as the local web server used in the networking track. Document:

1. how it starts and whether it starts at boot;
2. executable path and package/source;
3. user, group, working directory, and environment source;
4. configuration and content ownership;
5. listening address and port;
6. one successful and one failed request in the logs; and
7. a safe stop/start verification.

## Checkpoint

A service is “running” but a remote client cannot connect. Build an ordered diagnostic plan that covers bind address, socket, local firewall, route, upstream control, and application logs.

Next: [Bash automation and hardening](bash-automation.md).
