# Shell, filesystem, and text

The shell combines small programs into repeatable investigations. Precision matters: quote variables, understand redirection, and preserve original data.

## Filesystem map

| Path | Typical purpose | Security question |
|---|---|---|
| `/etc` | system configuration | Who can change security-relevant configuration? |
| `/var/log` | logs (distribution dependent) | Are events retained and access controlled? |
| `/var/lib` | persistent service state | Does a service protect its data? |
| `/run` | volatile runtime state | Which PID files and sockets exist now? |
| `/home` | user data | Are permissions and secrets appropriate? |
| `/tmp` | shared temporary data | Are files created safely? |
| `/proc` | process/kernel view | What does the running system expose? |
| `/usr/bin` | user commands | Which package owns a binary? |

Do not assume every distribution uses identical paths. Confirm with service configuration and package metadata.

## Navigate and inspect

```bash
pwd
ls -la
stat -- /etc/passwd
file -- /bin/sh
readlink -f -- /bin/sh
findmnt
df -hT
du -sh -- ./*
```

The `--` marker ends option parsing. It is valuable when a filename might begin with `-`.

## Quoting and expansion

```bash
name='report one.txt'
printf '%s\n' "$name"       # one argument
printf '%s\n' $name         # two arguments: usually a bug
printf '%s\n' "$PWD"        # variable expansion
printf '%s\n' '$PWD'        # literal text
```

Double-quote variable expansions unless you intentionally need splitting or globbing. Prefer `printf` over `echo` when output must be predictable.

## Streams and pipelines

```bash
command >output.txt          # replace standard output
command >>output.txt         # append standard output
command 2>errors.txt         # replace standard error
command >all.txt 2>&1        # combine both streams
producer | consumer          # producer stdout becomes consumer stdin
```

Redirection happens before the command runs. Never redirect into your only copy of an evidence file. Work from a copy and hash the original.

```bash
sha256sum -- access.log
cp --preserve=timestamps -- access.log working-access.log
sha256sum -- access.log working-access.log
```

## Text tools

```bash
head -n 20 access.log
tail -n 20 access.log
cut -d' ' -f1 access.log
sort addresses.txt | uniq -c | sort -nr
grep -nF ' 404 ' access.log
awk '{count[$9]++} END {for (code in count) print code, count[code]}' access.log
sed -n '10,20p' access.log
```

Use fixed-string `grep -F` when you do not need a regular expression. Locale and input format can affect sorting and field parsing; document assumptions.

## Find files carefully

```bash
find /etc -xdev -type f -name '*.conf' 2>/dev/null
find /var/log -xdev -type f -mtime -1 -print
find . -type f -size +10M -print
```

Start at the narrowest path. `-xdev` prevents crossing filesystem boundaries. Read results before pairing `find` with any action.

## Archives and hashes

```bash
tar -tf evidence.tar.gz
tar -czf notes.tar.gz notes/
sha256sum notes.tar.gz >notes.tar.gz.sha256
sha256sum -c notes.tar.gz.sha256
```

List an untrusted archive before extraction and extract it in an empty disposable directory; archive paths can be surprising.

## Lab: analyse a sample log

Copy a non-sensitive web access log from your lab, or generate requests to a local test server. Produce:

- total request count;
- the five most frequent client addresses;
- counts by response status;
- the ten most requested paths; and
- the first and last timestamp.

Keep the original read-only, record every command, and manually verify at least one aggregate against source lines.

## Checkpoint

Explain the difference between `>`, `>>`, `2>`, and `2>&1`. Then show how quoting changes a variable that contains spaces and a wildcard.

Next: [Identity and permissions](identity-permissions.md).
