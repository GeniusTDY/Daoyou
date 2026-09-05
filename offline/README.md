# 离线部署包

> 断网内网环境一键部署 · 内置全部运行时 · 无需安装任何系统软件 · 无需联网拉取依赖

---

## 快速开始

```bash
# 1. 拷贝整个 offline/ 目录到目标机
# 2. 生成随机密钥
./gen-secrets.sh        # Linux
# gen-secrets.bat       # Windows

# 3. 编辑 config/.env 中的 BETTER_AUTH_URL（实际访问地址）

# 4. 启动
./start.sh              # Windows: start.bat
```

浏览器访问 `http://<服务器IP>:<APP_PORT>` 即可。

---

## 目录结构

```
offline/
├── bin/            # 自包含二进制：bun / pg / redis / nats / migrate
├── app/            # 后端 bundle（index.js + assets）
├── web/            # 前端构建产物（后端同源托管）
├── migrations/     # drizzle / drizzle-auth 迁移 SQL
├── config/
│   ├── .env        # 部署配置（端口/账号/密钥）
│   └── nats-server.conf
├── data/           # 运行时数据（自动生成，备份即备份全部数据）
├── logs/           # 运行日志（自动生成）
├── gen-secrets.*   # 密钥生成脚本
├── start.* / stop.*
└── ...
```

---

## 一键脚本

| 操作 | Linux | Windows |
| --- | --- | --- |
| 启动（自动建库 + 迁移） | `./start.sh` | `start.bat` |
| 重启 | `./start.sh restart` | `start.bat restart` |
| 状态 | `./start.sh status` | `start.bat status` |
| 停止 | `./stop.sh` | `stop.bat` |

> Windows 需使用 Windows 版离线包（`bin/` 下为 `.exe` 二进制），脚本自动兼容 `.exe` / 无扩展名命名。

---

## 配置要点（config/.env）

| 配置项 | 说明 |
| --- | --- |
| `BETTER_AUTH_URL` | 实际访问地址，如 `http://192.168.1.10:3000` |
| `BETTER_AUTH_SECRET` / `CRON_SECRET` | 随机长字符串（运行 gen-secrets 后自动生成） |
| `APP_PORT` / `PG_PORT` / `REDIS_PORT` / `NATS_PORT` | 端口，占用时调整 |
| `DATABASE_URL` / `REDIS_URL` / `NATS_SERVERS` | 连接串，改端口时需同步修改 |

---

## 说明

- **同源托管**：前端与后端同一进程，无需单独部署、无跨域。
- **来源自动信任**：登录时自动信任请求头 Origin/Host，`PUBLIC_WEB_ORIGINS` 留空即可。
- **数据备份**：备份 `data/` 目录即备份全部数据（PG/Redis/NATS）。
- **LLM / SMTP**：离线默认关闭，不影响其余功能。
