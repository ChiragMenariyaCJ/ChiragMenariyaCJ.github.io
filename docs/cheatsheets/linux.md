# Linux command reference

Use this after completing the [Linux track](../linux/index.md). Read-only inspection is grouped separately from changes so you can choose deliberately.

## Identity and system

```bash
id                                  # current identity and groups
whoami                              # effective username
hostnamectl                         # host and OS summary (systemd)
uname -a                            # kernel/system information
date --iso-8601=seconds             # timestamp with offset
uptime                              # uptime and load averages
```

## Files and paths

```bash
pwd
ls -la -- /path
stat -- /path/file
file -- /path/file
readlink -f -- /path/link
find /path -xdev -type f -name '*.conf' -print
du -sh -- /path
df -hT
sha256sum -- file
```

## Text and logs

```bash
less -- file
head -n 20 -- file
tail -n 50 -- file
grep -nF -- 'literal text' file
grep -nE -- 'regex' file
cut -d: -f1 /etc/passwd
sort file | uniq -c | sort -nr
awk '{print $1}' file
sed -n '10,20p' file
journalctl -u service --since '-1 hour'
```

## Permissions

```bash
namei -l -- /full/path/file          # permissions at every path component
stat -c '%A %a %U %G %n' -- file
getfacl -- file
umask -S
sudo -l
getcap -- /path/binary
```

Changes (use in a disposable lab and verify):

```bash
chmod u=rw,g=r,o= -- file
chown user:group -- file
setfacl -m u:reviewer:r-- -- file
setfacl -x u:reviewer -- file
```

## Processes and services

```bash
ps -eo user,pid,ppid,lstart,cmd --forest
pgrep -a process-name
pstree -ap
systemctl --no-pager --full status service
systemctl cat service
systemctl is-enabled service
journalctl -u service --since today
```

Lab service changes:

```bash
sudo systemctl restart service
sudo systemctl enable --now service
sudo systemctl disable --now service
```

## Network

```bash
ip -brief address
ip route
ip route get 192.0.2.10
ip neighbour
ss -lntup
ss -ntp
resolvectl status
dig example.com A
curl -vI https://example.com/
```

## Packages

=== "Debian/Ubuntu"

    ```bash
    dpkg -S /path/file
    dpkg -l
    apt-cache policy package
    apt list --upgradable
    ```

=== "Fedora/RHEL"

    ```bash
    rpm -qf /path/file
    rpm -qa
    dnf info installed package
    dnf check-update
    ```

## Bash safety reminders

```bash
set -Eeuo pipefail
printf '%s\n' "$variable"
command -- "$possibly_unusual_filename"
temporary_directory=$(mktemp -d)
```

- Quote variable expansions.
- Prefer arrays to command strings; avoid `eval`.
- Inspect a list before applying a bulk change.
- Never recursively delete an unchecked or empty path.
- Preserve and hash original evidence before transforming it.

Return to [Cheatsheets](index.md) or study [Bash automation](../linux/bash-automation.md).
