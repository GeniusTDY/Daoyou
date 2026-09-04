# 离线部署包（Offline Bundle）

完全断网（内网隔离）环境下的一键部署包。内置全部运行时依赖，无需安装任何系统软件，
也无需连接外网拉取依赖。

## 目录结构

```
offline/
├── bin/               # 全部自包含二进制
│   ├── bun/           # Bun 运行时（用于运行后端 bundle）
│   ├── pg/            # 可移植 PostgreSQL 16（bin/lib/share）
│   ├── redis/         # 可移植 Redis 7
│   ├── nats/          # NATS Server（JetStream）
│   └── migrate/       # 独立数据库迁移工具（无 node_modules 依赖）
├── app/               # 后端服务器 bundle（index.js + assets + battle worker）
├── web/               # 前端 SPA 构建产物（由后端同源托管）
├── migrations/
│   ├── drizzle/       # 业务表迁移 SQL
│   └── drizzle-auth/  # Better Auth 认证表迁移 SQL
├── config/
│   ├── .env           # 部署配置（端口/账号/认证密钥，务必按需修改）
│   └── nats-server.conf
├── data/              # 运行时数据（pg/redis/nats），自动生成
├── logs/              # 运行日志，自动生成
├── gen-secrets.sh     # Linux：随机生成密钥并写入 config/.env
├── gen-secrets.bat    # Windows：同上（调用 gen-secrets.ps1）
├── gen-secrets.ps1    # Windows 密钥生成逻辑（.bat 自动调用）
├── start.sh           # 一键启动/停止/状态/重启
└── stop.sh            # 一键停止
```

## 使用步骤

1. 将整个 `offline/` 目录拷贝到目标内网服务器（无需安装任何依赖）。

2. 生成随机密钥（推荐，任选平台）：

   ```bash
   # Linux（在服务器上执行）
   ./gen-secrets.sh          # 自动生成两个 64 位随机密钥并写入 config/.env（自动备份原文件）
   ./gen-secrets.sh --show   # 只生成并打印，不写入（可手动复制）
   ```

   ```bat
   :: Windows（可在拷贝前先配置好；双击或命令行执行）
   gen-secrets.bat           :: 生成并写入 config\.env（自动备份原文件）
   gen-secrets.bat --show    :: 只生成并打印
   ```

   密钥生成只依赖离线包自带 bun（Linux）或系统自带 PowerShell（Windows），无需联网。

3. 编辑 `config/.env`：
   - `BETTER_AUTH_URL`：改为实际对外访问地址，如 `http://192.168.1.10:3000`
     （若 HTTPS 则填 `https://游戏域名`）。
   - `BETTER_AUTH_SECRET` / `CRON_SECRET`：若已用 gen-secrets.sh 生成可跳过；
     否则改为随机长字符串。
   - 端口若被占用可调整 `APP_PORT` / `PG_PORT` / `REDIS_PORT` / `NATS_PORT`，
     并同步修改 `DATABASE_URL` / `REDIS_URL` / `NATS_SERVERS` 中的端口。

4. 启动：

   ```bash
   ./start.sh          # 首次启动：自动 initdb 建库、建角色、执行迁移、启动全部服务
   ./start.sh status   # 查看状态
   ./stop.sh           # 停止
   ./start.sh restart  # 重启
   ```

5. 浏览器访问 `http://<服务器IP>:<APP_PORT>` 即可。

## 说明

- 前端与后端同源（由同一 Bun 进程托管），无需单独部署前端，也无需配置跨域。
- 登录/注册使用"动态来源"自动信任：只要请求头携带正确的 Origin/Host，
  即可放行，无需把部署 IP/域名加入白名单（`PUBLIC_WEB_ORIGINS` 留空即可）。
- 数据持久化目录为 `data/`，备份该目录即备份全部数据（数据库/Redis/NATS）。
- LLM 文案与 SMTP 邮件功能在离线环境默认关闭，不影响其余功能；如需使用，
  需在 `config/.env` 配置可达的 LLM / SMTP 服务地址。
