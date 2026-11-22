# Windows and PowerShell reference

These commands support authorised administration and lab investigation. Start PowerShell without elevation; elevate only for a specific approved task.

## Identity and host

```powershell
whoami
whoami /groups
Get-Date -Format o
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, OsBuildNumber
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime
Get-TimeZone
```

## Files and hashes

```powershell
Get-Location
Get-ChildItem -Force -LiteralPath 'C:\Path'
Get-Item -Force -LiteralPath 'C:\Path\file.txt' | Format-List *
Get-FileHash -Algorithm SHA256 -LiteralPath 'C:\Path\file.txt'
Get-Acl -LiteralPath 'C:\Path\file.txt' | Format-List
Get-AuthenticodeSignature -LiteralPath 'C:\Path\program.exe'
```

Use `-LiteralPath` when input should not treat `*`, `?`, or brackets as wildcards.

## Processes and services

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 20
Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId, Name, CommandLine
Get-Service | Sort-Object Status, Name
Get-Service -Name 'Spooler'
Get-CimInstance Win32_Service -Filter "Name='Spooler'" |
  Select-Object Name, State, StartMode, StartName, PathName
```

Command lines can contain sensitive values. Limit collection and redact exports.

## Network

```powershell
Get-NetIPConfiguration
Get-NetIPAddress
Get-NetRoute -AddressFamily IPv4
Get-NetNeighbor
Get-NetTCPConnection -State Listen
Get-NetUDPEndpoint
Resolve-DnsName example.com
Test-NetConnection 192.0.2.10 -Port 443 -InformationLevel Detailed
```

## Events

```powershell
Get-WinEvent -ListLog * | Select-Object LogName, RecordCount, IsEnabled
Get-WinEvent -FilterHashtable @{LogName='System'; Level=1,2,3; StartTime=(Get-Date).AddHours(-1)}
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624; StartTime=(Get-Date).AddHours(-1)} -MaxEvents 20
```

Access to the Security log may require elevation. Event IDs have version- and context-specific fields; inspect the full event rather than relying only on the ID.

## Tasks and startup

```powershell
Get-ScheduledTask | Select-Object TaskPath, TaskName, State
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location, User
Get-ItemProperty 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Run'
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
```

Review the execution identity, action path, arguments, triggers, and permissions on every referenced file and directory.

## Defender and firewall state

```powershell
Get-NetFirewallProfile | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction
Get-NetFirewallRule -Enabled True | Select-Object DisplayName, Direction, Action, Profile
Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated
```

Availability depends on edition, installed security product, policy, and permissions. Do not disable controls for troubleshooting; inspect their logs and policy.

## PowerShell habits

```powershell
Get-Help Get-WinEvent -Full
Get-Command Get-NetTCPConnection -Syntax
Get-Member -InputObject (Get-Process | Select-Object -First 1)
```

- Keep objects in the pipeline until final display or export.
- Prefer explicit parameter names in scripts.
- Use `-WhatIf` and `-Confirm` when a changing cmdlet supports them.
- Do not download and execute unreviewed scripts.
- Do not weaken execution policy as a substitute for understanding trust and signing.
- Export sensitive evidence only to an approved protected location.

## Evidence export

```powershell
$casePath = 'C:\Lab\case-001'
New-Item -ItemType Directory -Path $casePath -ErrorAction Stop
Get-NetTCPConnection | Export-Csv -NoTypeInformation -LiteralPath "$casePath\tcp.csv"
Get-FileHash -Algorithm SHA256 -LiteralPath "$casePath\tcp.csv"
```

This example creates files. Use a lab path you own and record collection time, account, host, and timezone.

Return to [Cheatsheets](index.md) or continue to [Active Directory](../active-directory/index.md).
