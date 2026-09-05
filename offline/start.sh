#!/usr/bin/env bash
# ============================================================
# 离线一键部署启动脚本（无网络环境）
# 内置 PostgreSQL / Redis / NATS / 应用服务，全自包含。
#
# 用法：
#   ./start.sh            # 启动（等价 start）
#   ./start.sh start
#   ./start.sh status
#   ./start.sh restart
#   ./stop.sh             # 停止
# ============================================================
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN="$ROOT/bin"
DATA="$ROOT/data"
LOG="$ROOT/logs"
mkdir -p "$DATA" "$LOG"

PG_BIN="$BIN/pg/bin"
PG_DATA="$DATA/pg"
PG_OS_USER="${PG_OS_USER:-daoyou}"
REDIS_BIN="$BIN/redis"
NATS_BIN="$BIN/nats"
BUN="$BIN/bun/bun"
MIGRATE="$BIN/migrate/migrate"
APP_JS="$ROOT/app/index.js"
WEB_DIR="$ROOT/web"

# ---- 加载配置（导出到子进程环境）----
set -a
# shellcheck disable=SC1091
source "$ROOT/config/.env"
set +a

# 计算静态目录绝对路径（保证任何工作目录下启动都能命中）
export STATIC_DIR="$WEB_DIR"

log() { echo "[$(date '+%F %T')] $*"; }

# ---------- 工具 ----------
pg_is_up() {
  "$PG_BIN/pg_isready" -h 127.0.0.1 -p "$PG_PORT" >/dev/null 2>&1
}

# 端口/HTTP 可达性探测（不依赖 curl：curl > wget > bash /dev/tcp 兜底）
http_ok() {
  local host="$1" port="$2" path="$3"
  if command -v curl >/dev/null 2>&1; then
    curl -fsS "http://$host:$port$path" >/dev/null 2>&1
    return $?
  fi
  if command -v wget >/dev/null 2>&1; then
    wget -q -O /dev/null "http://$host:$port$path" 2>/dev/null
    return $?
  fi
  # bash 原生 /dev/tcp：仅探测端口可连通（足以判断服务已监听）
  if (exec 3<>"/dev/tcp/$host/$port") 2>/dev/null; then
    return 0
  fi
  return 1
}

pid_alive() {
  local pid="$1"
  [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null
}

wait_pid() {
  local pid="$1" timeout="${2:-20}"
  local i=0
  while [ "$i" -lt "$timeout" ]; do
    if ! pid_alive "$pid"; then return 0; fi
    sleep 1
    i=$((i + 1))
  done
  return 1
}

# ---------- PostgreSQL ----------
# PostgreSQL 拒绝以 root 运行：以 root 启动时自动创建专用系统用户并用其运行。
ensure_pg_user() {
  if [ "$(id -u)" = "0" ] && ! id -u "$PG_OS_USER" >/dev/null 2>&1; then
    useradd -r -M -s /usr/sbin/nologin "$PG_OS_USER" 2>/dev/null \
      || adduser -D -H -s /usr/sbin/nologin "$PG_OS_USER" 2>/dev/null \
      || true
  fi
}

pg_as_user() {
  if [ "$(id -u)" = "0" ]; then
    if command -v runuser >/dev/null 2>&1; then
      runuser -u "$PG_OS_USER" -- "$@"
    else
      su -s /bin/sh "$PG_OS_USER" -c "$(printf '%q ' "$@")"
    fi
  else
    "$@"
  fi
}

start_pg() {
  ensure_pg_user
  if [ ! -f "$PG_DATA/PG_VERSION" ]; then
    log "[pg] initdb -> $PG_DATA (user: $PG_OS_USER)"
    mkdir -p "$PG_DATA" && chown -R "$PG_OS_USER" "$PG_DATA"
    pg_as_user "$PG_BIN/initdb" -D "$PG_DATA" -U postgres \
      --no-locale --encoding=UTF8 \
      --auth-local=trust --auth-host=scram-sha-256 \
      >"$LOG/pg-initdb.log" 2>&1 \
      || { log "[pg] initdb FAILED, see $LOG/pg-initdb.log"; tail -n 20 "$LOG/pg-initdb.log"; return 1; }
  fi
  if pg_is_up; then
    log "[pg] already running"
    return 0
  fi
  log "[pg] starting on 127.0.0.1:$PG_PORT"
  touch "$LOG/pg.log" && chown "$PG_OS_USER" "$LOG/pg.log"
  pg_as_user "$PG_BIN/pg_ctl" -D "$PG_DATA" -l "$LOG/pg.log" start \
    -o "-p $PG_PORT -c listen_addresses=127.0.0.1" >/dev/null 2>&1

  local i=0
  until pg_is_up; do
    sleep 1
    i=$((i + 1))
    [ "$i" -ge 30 ] && { log "[pg] FAILED to start, tail pg.log:"; tail -n 30 "$LOG/pg.log"; return 1; }
  done

  # 建用户与库（幂等）：经 unix socket（local=trust）以 postgres 身份管理
  local psql=( "$PG_BIN/psql" -p "$PG_PORT" -U postgres -d postgres -tAc )
  if [ "$("${psql[@]}" "SELECT 1 FROM pg_roles WHERE rolname='$PG_USER'")" != "1" ]; then
    log "[pg] create role $PG_USER"
    "${psql[@]}" "CREATE ROLE $PG_USER LOGIN PASSWORD '$PG_PASSWORD'" >/dev/null
  fi
  if [ "$("${psql[@]}" "SELECT 1 FROM pg_database WHERE datname='$PG_DB'")" != "1" ]; then
    log "[pg] create database $PG_DB"
    "${psql[@]}" "CREATE DATABASE $PG_DB OWNER $PG_USER" >/dev/null
  fi
  log "[pg] ready"
}

stop_pg() {
  if pg_is_up; then
    log "[pg] stopping"
    pg_as_user "$PG_BIN/pg_ctl" -D "$PG_DATA" stop -m fast >/dev/null 2>&1
  else
    log "[pg] not running"
  fi
}

# ---------- Redis ----------
start_redis() {
  if [ -f "$DATA/redis.pid" ] && pid_alive "$(cat "$DATA/redis.pid")"; then
    log "[redis] already running"
    return 0
  fi
  log "[redis] starting on 127.0.0.1:$REDIS_PORT"
  mkdir -p "$DATA/redis"
  nohup "$REDIS_BIN/redis-server" \
    --port "$REDIS_PORT" --bind 127.0.0.1 \
    --dir "$DATA/redis" --dbfilename dump.rdb \
    --pidfile "$DATA/redis.pid" \
    >>"$LOG/redis.log" 2>&1 &
  local i=0
  until pid_alive "$(cat "$DATA/redis.pid" 2>/dev/null)"; do
    sleep 1
    i=$((i + 1))
    [ "$i" -ge 15 ] && { log "[redis] FAILED to start"; return 1; }
  done
  log "[redis] ready"
}

stop_redis() {
  if [ -f "$DATA/redis.pid" ] && pid_alive "$(cat "$DATA/redis.pid")"; then
    log "[redis] stopping"
    kill "$(cat "$DATA/redis.pid")"
    wait_pid "$(cat "$DATA/redis.pid")" || kill -9 "$(cat "$DATA/redis.pid")" 2>/dev/null
  else
    log "[redis] not running"
  fi
}

# ---------- NATS ----------
start_nats() {
  if [ -f "$DATA/nats.pid" ] && pid_alive "$(cat "$DATA/nats.pid")"; then
    log "[nats] already running"
    return 0
  fi
  log "[nats] starting on 127.0.0.1:$NATS_PORT (JetStream)"
  mkdir -p "$DATA/nats"
  nohup "$NATS_BIN/nats-server" \
    --addr 127.0.0.1 --port "$NATS_PORT" \
    --user "$NATS_USER" --pass "$NATS_PASSWORD" \
    --js --store_dir "$DATA/nats" \
    -c "$ROOT/config/nats-server.conf" \
    >>"$LOG/nats.log" 2>&1 &
  echo $! > "$DATA/nats.pid"
  local i=0
  until pid_alive "$(cat "$DATA/nats.pid")"; do
    sleep 1
    i=$((i + 1))
    [ "$i" -ge 15 ] && { log "[nats] FAILED to start"; return 1; }
  done
  log "[nats] ready"
}

stop_nats() {
  if [ -f "$DATA/nats.pid" ] && pid_alive "$(cat "$DATA/nats.pid")"; then
    log "[nats] stopping"
    kill "$(cat "$DATA/nats.pid")"
    wait_pid "$(cat "$DATA/nats.pid")" || kill -9 "$(cat "$DATA/nats.pid")" 2>/dev/null
  else
    log "[nats] not running"
  fi
}

# ---------- 数据库迁移 ----------
run_migrate() {
  log "[migrate] applying database migrations"
  if ! DATABASE_URL="$DATABASE_URL" \
    MIGRATIONS_MAIN_DIR="$ROOT/migrations/drizzle" \
    MIGRATIONS_AUTH_DIR="$ROOT/migrations/drizzle-auth" \
    "$MIGRATE"; then
    log "[migrate] FAILED"
    return 1
  fi
  log "[migrate] done"
}

# ---------- 应用服务 ----------
start_app() {
  if [ -f "$DATA/app.pid" ] && pid_alive "$(cat "$DATA/app.pid")"; then
    log "[app] already running (pid $(cat "$DATA/app.pid"))"
    return 0
  fi
  log "[app] starting on 0.0.0.0:$APP_PORT"
  cd "$ROOT"
  nohup "$BUN" "$APP_JS" >>"$LOG/app.log" 2>&1 &
  echo $! > "$DATA/app.pid"
  local i=0
  until http_ok 127.0.0.1 "$APP_PORT" "/api/health-check"; do
    sleep 1
    i=$((i + 1))
    if [ "$i" -ge 40 ]; then
      log "[app] health check failed, tail app.log:"
      tail -n 40 "$LOG/app.log" || true
      return 1
    fi
  done
  log "[app] ready"
}

stop_app() {
  if [ -f "$DATA/app.pid" ] && pid_alive "$(cat "$DATA/app.pid")"; then
    log "[app] stopping (graceful SIGTERM)"
    kill "$(cat "$DATA/app.pid")"
    wait_pid "$(cat "$DATA/app.pid")" 25 || kill -9 "$(cat "$DATA/app.pid")" 2>/dev/null
  else
    log "[app] not running"
  fi
}

# ---------- 聚合操作 ----------
do_start() {
  start_pg || return 1
  start_redis || return 1
  start_nats || return 1
  run_migrate || return 1
  start_app || return 1
  log "=== ALL SERVICES STARTED ==="
  log "访问地址: http://<本机IP>:$APP_PORT  (前端已同源托管)"
  status
}

do_stop() {
  stop_app
  stop_nats
  stop_redis
  stop_pg
  log "=== ALL SERVICES STOPPED ==="
}

status() {
  echo "--- 服务状态 ---"
  echo "app    : $([ -f "$DATA/app.pid" ] && pid_alive "$(cat "$DATA/app.pid")" && echo "RUNNING (pid $(cat "$DATA/app.pid"))" || echo "STOPPED")"
  echo "nats   : $([ -f "$DATA/nats.pid" ] && pid_alive "$(cat "$DATA/nats.pid")" && echo "RUNNING (pid $(cat "$DATA/nats.pid"))" || echo "STOPPED")"
  echo "redis  : $([ -f "$DATA/redis.pid" ] && pid_alive "$(cat "$DATA/redis.pid")" && echo "RUNNING (pid $(cat "$DATA/redis.pid"))" || echo "STOPPED")"
  echo "pg     : $(pg_is_up && echo "RUNNING" || echo "STOPPED")"
}

# ---------- 入口 ----------
case "${1:-start}" in
  start)   do_start ;;
  stop)    do_stop ;;
  restart) do_stop; do_start ;;
  status)  status ;;
  *)
    echo "用法: $0 {start|stop|restart|status}" >&2
    exit 1
    ;;
esac
