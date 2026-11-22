# Identity and permissions

Linux access decisions combine numeric identities, group membership, file modes, ACLs, capabilities, service policy, and sometimes SELinux or AppArmor. Inspect the full chain before declaring a permission problem.

## Users and groups

```bash
id
id alice
getent passwd alice
getent group analysts
groups alice
```

`/etc/passwd` stores account metadata, not password hashes. Password hashes are normally restricted in `/etc/shadow`. Applications may use directory services or other identity sources, so prefer `getent` over reading local files alone.

## Mode bits

```text
-rwxr-x--- 1 alice analysts 4200 Nov 19 09:00 review.sh
```

- owner `alice`: read, write, execute;
- group `analysts`: read, execute;
- others: no access.

For a directory, read lists names, write changes directory entries, and execute traverses or accesses known names. Directory permissions behave differently from file permissions.

```bash
stat -c '%A %a %U %G %n' -- review.sh
chmod u=rw,g=r,o= -- report.txt
chgrp analysts -- report.txt
```

Prefer symbolic modes when they express intent more clearly than memorised octal.

## Umask

The umask removes permissions from an application's requested mode.

```bash
umask
umask -S
( umask 077; touch private-note.txt; stat -c '%a %n' private-note.txt )
```

Test in a subshell so the temporary umask does not affect the rest of your session.

## ACLs

ACLs add named user or group entries beyond the basic owner/group/other model.

```bash
getfacl -- report.txt
setfacl -m u:reviewer:r-- report.txt
getfacl -- report.txt
setfacl -x u:reviewer report.txt
```

The ACL mask can limit effective permissions. If `ls -l` ends the mode with `+`, inspect the ACL before explaining access.

## Special bits

| Bit | On files/directories | Review question |
|---|---|---|
| setuid | execute a file with its owner's effective ID | Is it required, maintained, and non-writable? |
| setgid | file effective group; directories inherit group | Does it support controlled collaboration? |
| sticky | users cannot remove others' entries in a shared directory | Is a shared writable directory protected? |

Inventory in a lab without crossing mounted filesystems:

```bash
find / -xdev -type f -perm /6000 -print 2>/dev/null
find / -xdev -type d -perm -0002 ! -perm -1000 -print 2>/dev/null
```

These results are review candidates, not automatic vulnerabilities.

## `sudo` and least privilege

```bash
sudo -l
sudo -k
```

Review the exact executable, arguments, environment handling, wildcards, and whether the allowed program can run other commands or edit protected files. Configure with `visudo` so syntax is checked. Avoid broad rules when a narrow service action or purpose-built helper is sufficient.

## Capabilities and mandatory controls

Linux capabilities split some root powers into smaller units:

```bash
getcap -r /usr/bin /usr/sbin 2>/dev/null
getpcaps "$$"
```

SELinux and AppArmor can deny access even when normal modes allow it. Inspect status and audit evidence rather than disabling a control to make an error disappear.

```bash
getenforce 2>/dev/null || true
aa-status 2>/dev/null || true
```

## Lab: collaborative directory

In a disposable VM, design `/srv/review` so members of a lab group can create and edit shared files, new entries inherit the group, and unrelated users have no access. Test with two non-privileged accounts.

Document:

- owner, group, and directory mode;
- whether a default ACL is needed;
- each test command and expected result; and
- how you removed the lab accounts and directory.

## Checkpoint

A file shows `-rw-r-----+`. A user belongs to the file's group but cannot read it. List at least four facts you would inspect before changing anything.

Next: [Processes and services](processes-services.md).
