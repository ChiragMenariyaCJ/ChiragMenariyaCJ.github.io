# Bash automation and hardening

Automation should make an investigation more repeatable, not merely faster. A trustworthy script validates input, avoids surprising expansion, reports failure, and separates collection from interpretation.

## A safe starting pattern

```bash
#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

usage() {
  printf 'Usage: %s OUTPUT_PARENT_DIRECTORY\n' "${0##*/}" >&2
}

if (($# != 1)); then
  usage
  exit 2
fi

output_parent=$1

if [[ ! -d $output_parent || -L $output_parent || ! -w $output_parent ]]; then
  printf 'Parent must be a writable, non-symlink directory: %s\n' "$output_parent" >&2
  exit 1
fi

run_id=$(date -u +'%Y%m%dT%H%M%SZ')-$$
output_dir=$output_parent/evidence-$run_id
if ! mkdir -m 0700 -- "$output_dir"; then
  printf 'Could not create a new evidence directory: %s\n' "$output_dir" >&2
  exit 1
fi

printf 'Collected: %s\n' "$(date --iso-8601=seconds)" >"$output_dir/metadata.txt"
uname -a >"$output_dir/uname.txt"
id >"$output_dir/identity.txt"
ss -lntup >"$output_dir/listeners.txt" 2>"$output_dir/listeners.err" || true
```

Understand the trade-offs:

- `-e` exits on many unhandled failures, but has context-dependent exceptions;
- `-u` treats an unset variable as an error;
- `pipefail` exposes a failure before the last pipeline command;
- a unique, private run directory prevents accidental evidence overwrites; and
- `|| true` should be reserved for a deliberately non-fatal command and accompanied by captured error output.

## Input and path handling

```bash
case $1 in
  /*) target=$1 ;;
  *)  printf 'Use an absolute path\n' >&2; exit 2 ;;
esac

if [[ -L $target ]]; then
  printf 'Refusing symbolic link: %s\n' "$target" >&2
  exit 1
fi
```

Quote expansions and pass `--` where supported. Do not build a command as a string and feed it to `eval`. Use arrays when arguments must be assembled:

```bash
options=(-n --color=never)
grep "${options[@]}" -- "$pattern" "$file"
```

## Temporary data and cleanup

```bash
work_dir=$(mktemp -d)
cleanup() {
  rm -rf -- "$work_dir"
}
trap cleanup EXIT
```

Only remove a directory that your script created and retained explicitly. Never construct a recursive-deletion target from unchecked input.

## Functions, exit codes, and logs

```bash
log() {
  printf '%s %s\n' "$(date --iso-8601=seconds)" "$*" >&2
}

require_command() {
  command -v -- "$1" >/dev/null 2>&1 || {
    log "Missing required command: $1"
    return 1
  }
}
```

Use stdout for machine-readable results and stderr for progress or errors. Return distinct non-zero codes when callers need to distinguish usage, collection, and validation failures.

## Baseline categories

A read-only host baseline can collect:

- hostname, time, timezone, kernel, and distribution;
- current identity and group membership;
- interfaces, routes, neighbours, and listening sockets;
- running and enabled services;
- scheduled timers and cron locations;
- mounted filesystems and disk usage;
- recent high-priority logs;
- relevant security-control status; and
- installed package/update metadata.

Label commands that require elevated access. Do not silently escalate, change settings, or collect secrets.

## Hardening as a verified change

Use this loop for each lab change:

1. state the risk and desired policy;
2. save current configuration and metadata;
3. change one control;
4. validate syntax before reload when supported;
5. apply or reload;
6. test allowed and denied behaviour;
7. inspect logs; and
8. document rollback.

Examples include narrowing a bind address, removing an unused service, applying a least-privilege mode, or enabling a host firewall for a specific lab port.

## Lab: baseline script

Extend the starter pattern into a script that collects at least eight read-only categories into a timestamped directory. It must:

- accept an explicit output directory;
- refuse invalid input;
- record failures without hiding them;
- never alter system configuration;
- create a SHA-256 manifest for its outputs; and
- include a README stating collection time, timezone, host, script version, and limitations.

Run [ShellCheck](https://www.shellcheck.net/) locally if available, test as an unprivileged account, and compare output with manual commands.

## Final assessment

Review a fresh VM and produce a short report with:

- an asset and exposure summary;
- three confirmed configuration facts;
- three risks with evidence and confidence;
- remediation ordered by impact and effort;
- exact verification commands; and
- anything you could not determine.

Return to the [Linux track](index.md), keep the [Linux cheatsheet](../cheatsheets/linux.md) nearby, or continue to the [Tools](../tools/index.md) track.
