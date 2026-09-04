# ============================================================
# 离线一键部署启动脚本（Windows 版，由 start.bat 调用）。
# 内置 PostgreSQL / Redis / NATS / 应用服务，全自包含、断网可用，
# 仅依赖 Windows 自带 PowerShell，无需额外安装任何软件。
#
# 用法：
#   start.bat            启动
#   start.bat restart    重启
#   start.bat status     查看状态
#   stop.bat             停止
# ============================================================
param(
    [string]$Action = 'start'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bin  = Join-Path $root 'bin'
$data = Join-Path $root 'data'
$logs = Join-Path $root 'logs'
New-Item -ItemType Directory -Force -Path $data, $logs | Out-Null

function Write-Log([string]$msg) {
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $msg"
}

# 解析二进制路径：优先 .exe（Windows 构建），否则按无扩展名（Linux 构建）
function Get-BinPath([string]$rel) {
    $withExt = Join-Path $bin "$rel.exe"
    if (Test-Path $withExt) { return $withExt }
    return (Join-Path $bin $rel)
}

# 为路径加引号（Start-Process 拼接参数时不会自动处理含空格路径）
function Q([string]$s) { return '"' + $s + '"' }

# 加载 config\.env 到当前进程环境
function Load-Env {
    $envFile = Join-Path $root 'config\.env'
    if (-not (Test-Path $envFile)) {
        Write-Host "ERROR: 找不到 $envFile" -ForegroundColor Red
        exit 1
    }
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { return }
        $eq = $line.IndexOf('=')
        if ($eq -lt 1) { return }
        $key = $line.Substring(0, $eq).Trim()
        $val = $line.Substring($eq + 1).Trim()
        if ($val.Length -ge 2 -and $val[0] -eq '"' -and $val[$val.Length - 1] -eq '"') {
            $val = $val.Substring(1, $val.Length - 2)
        }
        Set-Item -Path "Env:$key" -Value $val
    }
    # 计算静态目录绝对路径（保证任意工作目录启动都能命中）
    $env:STATIC_DIR = Join-Path $root 'web'
}

function Test-PidAlive([string]$pidFile) {
    if (-not (Test-Path $pidFile)) { return $false }
    $pidVal = (Get-Content $pidFile -Raw).Trim()
    if ($pidVal -eq '') { return $false }
    return [bool](Get-Process -Id ([int]$pidVal) -ErrorAction SilentlyContinue)
}

function Test-HttpOk([string]$path) {
    try {
        Invoke-WebRequest -Uri "http://127.0.0.1:$env:APP_PORT$path" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# ---------- PostgreSQL ----------
function Test-PgUp {
    & (Get-BinPath 'pg\bin\pg_isready') -h 127.0.0.1 -p $env:PG_PORT *> $null
    return ($LASTEXITCODE -eq 0)
}

function Start-Pg {
    $pgData = Join-Path $data 'pg'
    $pgLog  = Join-Path $logs 'pg.log'
    if (-not (Test-Path (Join-Path $pgData 'PG_VERSION'))) {
        Write-Log "[pg] initdb -> $pgData"
        New-Item -ItemType Directory -Force -Path $pgData | Out-Null
        # 生成 postgres 超级用户随机密码（后续建库/建角色复用），落盘保存
        $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
        try {
            $bytes = New-Object byte[] 32
            $rng.GetBytes($bytes)
        } finally {
            $rng.Dispose()
        }
        $pgPass = ($bytes | ForEach-Object { $_.ToString('x2') }) -join ''
        Set-Content -Path (Join-Path $data 'pg-postgres.pw') -Value $pgPass -NoNewline -Encoding ascii
        $pwFile = Join-Path $pgData 'postgres.pw'
        Set-Content -Path $pwFile -Value $pgPass -NoNewline -Encoding ascii
        & (Get-BinPath 'pg\bin\initdb') -D $pgData -U postgres --pwfile=$pwFile --no-locale --encoding=UTF8 --auth-local=trust --auth-host=scram-sha-256 *>> $pgLog
        if ($LASTEXITCODE -ne 0) {
            Write-Log "[pg] initdb FAILED, see $pgLog"
            Get-Content $pgLog -Tail 20 -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_ }
            return $false
        }
    }
    if (Test-PgUp) { Write-Log '[pg] already running'; return $true }
    Write-Log "[pg] starting on 127.0.0.1:$env:PG_PORT"
    & (Get-BinPath 'pg\bin\pg_ctl') -D $pgData -l $pgLog start -o "-p $env:PG_PORT -c listen_addresses=127.0.0.1" | Out-Null
    $i = 0
    while (-not (Test-PgUp)) {
        Start-Sleep -Seconds 1
        $i++
        if ($i -ge 30) {
            Write-Log '[pg] FAILED to start, tail pg.log:'
            Get-Content $pgLog -Tail 30 -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_ }
            return $false
        }
    }
    # 建用户与库（幂等）：用保存的超级用户密码连接
    $env:PGPASSWORD = (Get-Content (Join-Path $data 'pg-postgres.pw') -Raw).Trim()
    $psql = Get-BinPath 'pg\bin\psql'
    $r = & $psql -h 127.0.0.1 -p $env:PG_PORT -U postgres -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='$env:PG_USER'" 2>$null
    if (-not ($r -and $r.Trim() -eq '1')) {
        Write-Log "[pg] create role $env:PG_USER"
        & $psql -h 127.0.0.1 -p $env:PG_PORT -U postgres -d postgres -c "CREATE ROLE $env:PG_USER LOGIN PASSWORD '$env:PG_PASSWORD'" *> $null
        if ($LASTEXITCODE -ne 0) { Write-Log '[pg] create role FAILED'; return $false }
    }
    $r2 = & $psql -h 127.0.0.1 -p $env:PG_PORT -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$env:PG_DB'" 2>$null
    if (-not ($r2 -and $r2.Trim() -eq '1')) {
        Write-Log "[pg] create database $env:PG_DB"
        & $psql -h 127.0.0.1 -p $env:PG_PORT -U postgres -d postgres -c "CREATE DATABASE $env:PG_DB OWNER $env:PG_USER" *> $null
        if ($LASTEXITCODE -ne 0) { Write-Log '[pg] create database FAILED'; return $false }
    }
    Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
    Write-Log '[pg] ready'
    return $true
}

function Stop-Pg {
    if (Test-PgUp) {
        Write-Log '[pg] stopping'
        & (Get-BinPath 'pg\bin\pg_ctl') -D (Join-Path $data 'pg') stop -m fast | Out-Null
    } else {
        Write-Log '[pg] not running'
    }
}

# ---------- Redis ----------
function Start-Redis {
    $pidFile = Join-Path $data 'redis.pid'
    if (Test-PidAlive $pidFile) { Write-Log '[redis] already running'; return $true }
    Write-Log "[redis] starting on 127.0.0.1:$env:REDIS_PORT"
    New-Item -ItemType Directory -Force -Path (Join-Path $data 'redis') | Out-Null
    Start-Process -FilePath (Get-BinPath 'redis\redis-server') `
        -ArgumentList @('--port', "$env:REDIS_PORT", '--bind', '127.0.0.1', '--dir', Q(Join-Path $data 'redis'), '--dbfilename', 'dump.rdb', '--pidfile', Q($pidFile)) `
        -RedirectStandardOutput (Join-Path $logs 'redis.log') `
        -RedirectStandardError (Join-Path $logs 'redis.err') `
        -WindowStyle Hidden | Out-Null
    $i = 0
    while (-not (Test-PidAlive $pidFile)) {
        Start-Sleep -Seconds 1
        $i++
        if ($i -ge 15) { Write-Log '[redis] FAILED to start'; return $false }
    }
    Write-Log '[redis] ready'
    return $true
}

function Stop-Redis {
    $pidFile = Join-Path $data 'redis.pid'
    if (Test-PidAlive $pidFile) {
        Write-Log '[redis] stopping'
        Stop-Process -Id ([int]((Get-Content $pidFile -Raw).Trim())) -Force -ErrorAction SilentlyContinue
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    } else {
        Write-Log '[redis] not running'
    }
}

# ---------- NATS ----------
function Start-Nats {
    $pidFile = Join-Path $data 'nats.pid'
    if (Test-PidAlive $pidFile) { Write-Log '[nats] already running'; return $true }
    Write-Log "[nats] starting on 127.0.0.1:$env:NATS_PORT (JetStream)"
    New-Item -ItemType Directory -Force -Path (Join-Path $data 'nats') | Out-Null
    $p = Start-Process -FilePath (Get-BinPath 'nats\nats-server') `
        -ArgumentList @('--addr', '127.0.0.1', '--port', "$env:NATS_PORT", '--user', "$env:NATS_USER", '--pass', "$env:NATS_PASSWORD", '--js', '--store_dir', Q(Join-Path $data 'nats'), '-c', Q(Join-Path $root 'config\nats-server.conf')) `
        -RedirectStandardOutput (Join-Path $logs 'nats.log') `
        -RedirectStandardError (Join-Path $logs 'nats.err') `
        -WindowStyle Hidden -PassThru
    Set-Content -Path $pidFile -Value $p.Id -NoNewline
    $i = 0
    while (-not (Test-PidAlive $pidFile)) {
        Start-Sleep -Seconds 1
        $i++
        if ($i -ge 15) { Write-Log '[nats] FAILED to start'; return $false }
    }
    Write-Log '[nats] ready'
    return $true
}

function Stop-Nats {
    $pidFile = Join-Path $data 'nats.pid'
    if (Test-PidAlive $pidFile) {
        Write-Log '[nats] stopping'
        Stop-Process -Id ([int]((Get-Content $pidFile -Raw).Trim())) -Force -ErrorAction SilentlyContinue
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    } else {
        Write-Log '[nats] not running'
    }
}

# ---------- 数据库迁移 ----------
function Invoke-Migrate {
    Write-Log '[migrate] applying database migrations'
    $env:DATABASE_URL = $env:DATABASE_URL
    $env:MIGRATIONS_MAIN_DIR = Join-Path $root 'migrations\drizzle'
    $env:MIGRATIONS_AUTH_DIR = Join-Path $root 'migrations\drizzle-auth'
    & (Get-BinPath 'migrate\migrate')
    if ($LASTEXITCODE -ne 0) {
        Write-Log '[migrate] FAILED'
        return $false
    }
    Write-Log '[migrate] done'
    return $true
}

# ---------- 应用服务 ----------
function Start-App {
    $pidFile = Join-Path $data 'app.pid'
    if (Test-PidAlive $pidFile) {
        Write-Log "[app] already running (pid $((Get-Content $pidFile -Raw).Trim()))"
        return $true
    }
    Write-Log "[app] starting on 0.0.0.0:$env:APP_PORT"
    $p = Start-Process -FilePath (Get-BinPath 'bun\bun') `
        -ArgumentList @(Q(Join-Path $root 'app\index.js')) `
        -WorkingDirectory $root `
        -RedirectStandardOutput (Join-Path $logs 'app.log') `
        -RedirectStandardError (Join-Path $logs 'app.err') `
        -WindowStyle Hidden -PassThru
    Set-Content -Path $pidFile -Value $p.Id -NoNewline
    $i = 0
    while (-not (Test-HttpOk '/api/health-check')) {
        Start-Sleep -Seconds 1
        $i++
        if ($i -ge 40) {
            Write-Log '[app] health check failed, tail app.log:'
            Get-Content (Join-Path $logs 'app.log') -Tail 40 -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_ }
            return $false
        }
    }
    Write-Log '[app] ready'
    return $true
}

function Stop-App {
    $pidFile = Join-Path $data 'app.pid'
    if (Test-PidAlive $pidFile) {
        Write-Log '[app] stopping'
        Stop-Process -Id ([int]((Get-Content $pidFile -Raw).Trim())) -Force -ErrorAction SilentlyContinue
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    } else {
        Write-Log '[app] not running'
    }
}

function Show-Status {
    Write-Host '--- 服务状态 ---'
    $app   = if (Test-PidAlive (Join-Path $data 'app.pid'))  { "RUNNING (pid $((Get-Content (Join-Path $data 'app.pid') -Raw).Trim()))" } else { 'STOPPED' }
    $nats  = if (Test-PidAlive (Join-Path $data 'nats.pid')) { "RUNNING (pid $((Get-Content (Join-Path $data 'nats.pid') -Raw).Trim()))" } else { 'STOPPED' }
    $redis = if (Test-PidAlive (Join-Path $data 'redis.pid')) { "RUNNING (pid $((Get-Content (Join-Path $data 'redis.pid') -Raw).Trim()))" } else { 'STOPPED' }
    $pg    = if (Test-PgUp) { 'RUNNING' } else { 'STOPPED' }
    Write-Host "app    : $app"
    Write-Host "nats   : $nats"
    Write-Host "redis  : $redis"
    Write-Host "pg     : $pg"
}

# ---------- 聚合操作 ----------
function Do-Start {
    Load-Env
    if (-not (Start-Pg))      { exit 1 }
    if (-not (Start-Redis))   { exit 1 }
    if (-not (Start-Nats))    { exit 1 }
    if (-not (Invoke-Migrate)){ exit 1 }
    if (-not (Start-App))     { exit 1 }
    Write-Host '=== ALL SERVICES STARTED ==='
    Write-Host "访问地址: http://<本机IP>:$env:APP_PORT  (前端已同源托管)"
    Show-Status
}

function Do-Stop {
    Load-Env
    Stop-App
    Stop-Nats
    Stop-Redis
    Stop-Pg
    Write-Host '=== ALL SERVICES STOPPED ==='
}

switch ($Action.ToLower()) {
    'start'   { Do-Start }
    'restart' { Do-Stop; Do-Start }
    'status'  { Load-Env; Show-Status }
    default   {
        Write-Host '用法: start.bat {start|restart|status}' -ForegroundColor Yellow
        exit 1
    }
}
