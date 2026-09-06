#!/usr/bin/env bash
# 停止离线部署的所有服务
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$ROOT/start.sh" stop
