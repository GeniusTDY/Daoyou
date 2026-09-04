# ============================================================
# 离线一键停止脚本（Windows 版，由 stop.bat 调用）。
# 停止应用 / NATS / Redis / PostgreSQL（顺序与启动相反）。
# ============================================================
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bin  = Join-Path $root 'bin'
$data = Join-Path $root 'data'
$logs = Join-Path $root 'logs'

# 解析二进制路径：优先 .exe（Windows 构建），否则按无扩展名（Linux 构建）
function Get-BinPath([string]$rel) {
    $withExt = Join-Path $bin "$rel.exe"
    if (Test-Path $withExt) { return $withExt }
    return (Join-Path $bin $rel)
}

# 读取 config\.env 中的 PG_PORT
function Load-Env {
    $envFile = Join-Path $root 'config\.env'
    if (-not (Test-Path $envFile)) {
        Write-Host "WARN: 找不到 $envFile，按默认端口 5432 尝试停止" -ForegroundColor Yellow
        Set-Item -Path 'Env:PG_PORT' -Value '5432'
        return
    }
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { return }
        $eq = $line.IndexOf('=')
        if ($eq -lt 1) { return }
        Set-Item -Path ("Env:" + $line.Substring(0, $eq).Trim()) -Value $line.Substring($eq + 1).Trim()
    }
}

function Test-PidAlive([string]$pidFile) {
    if (-not (Test-Path $pidFile)) { return $false }
    $pidVal = (Get-Content $pidFile -Raw).Trim()
    if ($pidVal -eq '') { return $false }
    return [bool](Get-Process -Id ([int]$pidVal) -ErrorAction SilentlyContinue)
}

function Test-PgUp {
    & (Get-BinPath 'pg\bin\pg_isready') -h 127.0.0.1 -p $env:PG_PORT *> $null
    return ($LASTEXITCODE -eq 0)
}

function Stop-ByPid([string]$name, [string]$pidFile) {
    if (Test-PidAlive $pidFile) {
        Write-Host "[$name] stopping"
        Stop-Process -Id ([int]((Get-Content $pidFile -Raw).Trim())) -Force -ErrorAction SilentlyContinue
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    } else {
        Write-Host "[$name] not running"
    }
}

Load-Env
Stop-ByPid 'app'   (Join-Path $data 'app.pid')
Stop-ByPid 'nats'  (Join-Path $data 'nats.pid')
Stop-ByPid 'redis' (Join-Path $data 'redis.pid')
if (Test-PgUp) {
    Write-Host '[pg] stopping'
    & (Get-BinPath 'pg\bin\pg_ctl') -D (Join-Path $data 'pg') stop -m fast | Out-Null
} else {
    Write-Host '[pg] not running'
}
Write-Host '=== ALL SERVICES STOPPED ==='
