#!/usr/bin/env bash
# ============================================================
# 随机生成部署密钥：BETTER_AUTH_SECRET / CRON_SECRET
# 并写入 config/.env（完全离线可用，不依赖网络）。
#
# 用法：
#   ./gen-secrets.sh            # 生成并写入 config/.env（自动备份原文件）
#   ./gen-secrets.sh --show     # 仅生成并打印，不写入（可手动复制）
# ============================================================
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT/config/.env"
BUN="$ROOT/bin/bun/bun"

# 使用离线包内置 bun 的 node:crypto 生成 32 字节十六进制（64 位），
# 不依赖系统 openssl 等外部命令；仅当 bun 缺失时兜底 /dev/urandom。
gen_hex() {
  local hex=""
  if [ -x "$BUN" ]; then
    hex="$("$BUN" -e 'console.log(require("crypto").randomBytes(32).toString("hex"))')"
  else
    hex="$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  fi
  if [ "${#hex}" -lt 32 ]; then
    echo "ERROR: 无法生成随机密钥（离线包 bun 与 /dev/urandom 均不可用）" >&2
    return 1
  fi
  echo "$hex"
}

show() {
  local a b
  a="$(gen_hex)" || return 1
  b="$(gen_hex)" || return 1
  echo "BETTER_AUTH_SECRET=${a}"
  echo "CRON_SECRET=${b}"
}

# 更新或追加单行键值（含被注释行则取消注释并替换）
set_key() {
  local key="$1" value="$2"
  if grep -qE "^[[:space:]]*#?[[:space:]]*${key}=" "$ENV_FILE"; then
    sed -E "s|^[[:space:]]*#?[[:space:]]*${key}=.*|${key}=${value}|" "$ENV_FILE" > "$ENV_FILE.tmp"
    mv "$ENV_FILE.tmp" "$ENV_FILE"
  else
    printf '\n%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

do_apply() {
  if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: 找不到 $ENV_FILE" >&2
    return 1
  fi
  local a b
  a="$(gen_hex)" || return 1
  b="$(gen_hex)" || return 1
  cp "$ENV_FILE" "$ENV_FILE.bak.$(date +%Y%m%d%H%M%S)"
  set_key BETTER_AUTH_SECRET "$a"
  set_key CRON_SECRET "$b"
  echo "已生成并写入 $ENV_FILE（原文件已备份为 config/.env.bak.*）"
  echo "BETTER_AUTH_SECRET=${a}"
  echo "CRON_SECRET=${b}"
  echo "提示：运行 ./start.sh restart 使新密钥生效（已登录会话将失效，需重新登录）"
}

case "${1:-apply}" in
  --show|show|-s)
    show
    ;;
  apply|-a|"")
    do_apply
    ;;
  *)
    echo "用法: $0 [--show]" >&2
    exit 1
    ;;
esac
