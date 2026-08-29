[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [ValidateSet("code", "codex")]
    [string]$Executable = "code",

    [Parameter(Position = 1, ValueFromRemainingArguments = $true)]
    [string[]]$ArgumentList = @()
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$dotenvPath = Join-Path $repositoryRoot ".env.local"

if (-not (Test-Path -LiteralPath $dotenvPath -PathType Leaf)) {
    throw "Missing .env.local: $dotenvPath"
}

$apiKeyLine = Get-Content -LiteralPath $dotenvPath | Where-Object {
    $_ -match '^\s*(?:export\s+)?MICROCMS_API_KEY\s*='
} | Select-Object -First 1

if ($null -eq $apiKeyLine) {
    throw ".env.local does not define MICROCMS_API_KEY."
}

$assignment = [regex]::Match(
    $apiKeyLine,
    '^\s*(?:export\s+)?MICROCMS_API_KEY\s*=\s*(.*)\s*$'
)
$apiKey = $assignment.Groups[1].Value.Trim()

if ($apiKey.Length -ge 2) {
    $firstCharacter = $apiKey[0]
    $lastCharacter = $apiKey[$apiKey.Length - 1]
    $doubleQuote = [char]34
    $singleQuote = [char]39
    if (($firstCharacter -eq $doubleQuote -and $lastCharacter -eq $doubleQuote) -or
        ($firstCharacter -eq $singleQuote -and $lastCharacter -eq $singleQuote)) {
        $apiKey = $apiKey.Substring(1, $apiKey.Length - 2)
    }
}

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    throw "MICROCMS_API_KEY is empty in .env.local."
}

$commandInfo = Get-Command -Name $Executable -CommandType Application -ErrorAction Stop |
    Select-Object -First 1
$commandPath = $commandInfo.Source
if ([string]::IsNullOrWhiteSpace($commandPath)) {
    $commandPath = $commandInfo.Definition
}

if ($Executable -eq "code") {
    Write-Warning "Close all existing VS Code windows before launching. An existing process may not inherit this environment variable."
}

# Keep the secret process-scoped and restore any previous value after the child exits.
$previousApiKey = [Environment]::GetEnvironmentVariable("MICROCMS_API_KEY", "Process")
$hadPreviousApiKey = $null -ne $previousApiKey
[Environment]::SetEnvironmentVariable("MICROCMS_API_KEY", $apiKey, "Process")

try {
    Write-Host "Launching $Executable with MICROCMS_API_KEY (value hidden)."
    & $commandPath @ArgumentList
    $exitCode = if ($null -ne $LASTEXITCODE) { $LASTEXITCODE } else { 0 }
}
finally {
    if ($hadPreviousApiKey) {
        [Environment]::SetEnvironmentVariable("MICROCMS_API_KEY", $previousApiKey, "Process")
    }
    else {
        [Environment]::SetEnvironmentVariable("MICROCMS_API_KEY", $null, "Process")
    }
}

exit $exitCode
