# ============================================================
# 随机生成部署密钥：BETTER_AUTH_SECRET / CRON_SECRET
# 并写入 config\.env（Windows 版，由 gen-secrets.bat 调用）。
# 使用 .NET 密码学安全随机数（RandomNumberGenerator），完全离线可用。
# ============================================================
param(
    [string]$Mode = 'apply'
)

$ErrorActionPreference = 'Stop'
$root     = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile  = Join-Path $root 'config\.env'

# 生成 32 字节（256 bit）十六进制（64 位）
function New-SecretHex {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
    } finally {
        $rng.Dispose()
    }
    return (($bytes | ForEach-Object { $_.ToString('x2') }) -join '')
}

$secretA = New-SecretHex
$secretB = New-SecretHex

if ($Mode -eq '--show') {
    Write-Host "BETTER_AUTH_SECRET=$secretA"
    Write-Host "CRON_SECRET=$secretB"
    exit 0
}

if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: 找不到 $envFile" -ForegroundColor Red
    exit 1
}

$stamp = Get-Date -Format 'yyyyMMddHHmmss'
Copy-Item $envFile "$envFile.bak.$stamp"

$content = [System.IO.File]::ReadAllText($envFile)
$content = $content -replace '(?m)^[ \t]*#?[ \t]*BETTER_AUTH_SECRET=.*$', "BETTER_AUTH_SECRET=$secretA"
$content = $content -replace '(?m)^[ \t]*#?[ \t]*CRON_SECRET=.*$', "CRON_SECRET=$secretB"
# 若文件中不存在对应行则追加
if ($content -notmatch '(?m)^[ \t]*#?[ \t]*BETTER_AUTH_SECRET=') {
    $content += "`n`nBETTER_AUTH_SECRET=$secretA`n"
}
if ($content -notmatch '(?m)^[ \t]*#?[ \t]*CRON_SECRET=') {
    $content += "`nCRON_SECRET=$secretB`n"
}
# 统一为 LF 行尾，保证 Linux 服务器上 start.sh 的 source 兼容
$content = $content -replace "`r`n", "`n"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($envFile, $content, $utf8NoBom)

Write-Host "已生成并写入 $envFile（原文件已备份为 config\.env.bak.$stamp）"
Write-Host "BETTER_AUTH_SECRET=$secretA"
Write-Host "CRON_SECRET=$secretB"
Write-Host '提示：将 offline 目录拷到 Linux 服务器后运行 ./start.sh restart 使新密钥生效'
exit 0
