[CmdletBinding()]
param(
  [switch]$ConfirmReset
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not $ConfirmReset) {
  throw 'Refusing to reset the visitor counter. Re-run with -ConfirmReset when you really want a new counter.'
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $repoRoot 'docs/javascripts/visitor-counter.js'

if (-not (Test-Path -LiteralPath $configPath -PathType Leaf)) {
  throw "Visitor counter file was not found: $configPath"
}

$rawBytes = [IO.File]::ReadAllBytes($configPath)
$hasUtf8Bom = $rawBytes.Length -ge 3 -and
  $rawBytes[0] -eq 0xEF -and
  $rawBytes[1] -eq 0xBB -and
  $rawBytes[2] -eq 0xBF
$utf8 = [Text.UTF8Encoding]::new($hasUtf8Bom)
$content = $utf8.GetString($rawBytes)
$pattern = '(?m)^(?<prefix>\s*const COUNTER_KEY = ")[^"]+(?<suffix>";\s*)$'
$matches = [regex]::Matches($content, $pattern)

if ($matches.Count -ne 1) {
  throw "Expected exactly one COUNTER_KEY declaration in $configPath, found $($matches.Count)."
}

$oldKey = $matches[0].Groups[0].Value.Trim()
$newKey = "cyberwithcj-visitors-$([guid]::NewGuid().ToString('N'))"
$replacement = '${prefix}' + $newKey + '${suffix}'
$updated = [regex]::Replace($content, $pattern, $replacement, 1)

if ($updated -eq $content) {
  throw 'The visitor counter key did not change; nothing was written.'
}

[IO.File]::WriteAllText($configPath, $updated, $utf8)

Write-Host 'Visitor counter reset prepared.' -ForegroundColor Green
Write-Host "Previous declaration: $oldKey"
Write-Host "New key:             $newKey"
Write-Host ''
Write-Host 'Commit and push the changed visitor-counter.js file to activate the new counter.' -ForegroundColor Yellow
Write-Host 'The old remote counter is left untouched, so normal builds and deploys never erase history.'
