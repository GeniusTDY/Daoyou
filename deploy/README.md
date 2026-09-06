# 离线部署包

> 断网内网环境一键部署 · 内置全部运行时 · 无需安装任何系统软件 · 无需联网拉取依赖

---

## 快速开始

```bash
# 1. 拷贝整个 deploy/ 目录到目标机
# 2. 首次启动（自动创建 config/.env 并写入随机密钥，随后启动全部服务）
./start.sh

# 可选：如需自定义，先编辑 config/.env（首次生成后已存在）
#    - BETTER_AUTH_URL：实际访问地址
#    - 如需离线接通生成型玩法，配置内网 LLM（见下方"接入离线内网 LLM"）
#    改完后执行 ./start.sh restart 生效

# 其他：停止/状态/重启
./stop.sh
./start.sh restart
./start.sh status
```

浏览器访问 `http://<服务器IP>:<APP_PORT>` 即可。

---

## 目录结构

```
deploy/
├── bin/            # 自包含二进制：bun / pg / redis / nats / migrate
├── app/            # 后端 bundle（index.js + assets）
├── web/            # 前端构建产物（后端同源托管）
├── migrations/     # drizzle / drizzle-auth 迁移 SQL
├── config/
│   ├── .env        # 部署配置（端口/账号/密钥）
│   └── nats-server.conf
├── data/           # 运行时数据（自动生成，备份即备份全部数据）
├── logs/           # 运行日志（自动生成）
├── gen-secrets.sh   # 密钥生成脚本
├── start.sh / stop.sh
└── ...
```

---

## 一键脚本

| 操作 | 命令 |
| --- | --- |
| 启动（自动建库 + 迁移） | `./start.sh` |
| 重启 | `./start.sh restart` |
| 状态 | `./start.sh status` |
| 停止 | `./stop.sh` |

---

## 配置要点（config/.env）

| 配置项 | 说明 |
| --- | --- |
| `BETTER_AUTH_URL` | 实际访问地址，如 `http://192.168.1.10:3000` |
| `BETTER_AUTH_SECRET` / `CRON_SECRET` | 随机长字符串（运行 gen-secrets 后自动生成） |
| `APP_PORT` / `PG_PORT` / `REDIS_PORT` / `NATS_PORT` | 端口，占用时调整 |
| `DATABASE_URL` / `REDIS_URL` / `NATS_SERVERS` | 连接串，改端口时需同步修改 |
| `LLM_PROVIDER` / `OPENAI_BASE_URL` / `OPENAI_API_KEY` | 接入内网 OpenAI 兼容推理端，接通生成型玩法（见下方） |
| `NATS_PASSWORD` / `PG_PASSWORD` | 内网默认口令 `Daoyou`（服务仅绑定 127.0.0.1），如需自订改后 restart 生效 |

---

## 账号与管理员

游戏账号使用**道号 + 密码**注册/登录，无需邮箱（系统仅在内部维护一个与道号对应的唯一标识，用户全程无感知）。

> 首个注册的账号**不会自动成为管理员**，管理员需登记。

**最省事的登记方式**：在 `config/.env` 中配置 `ADMIN_DAOHAOS`，**直接填道号即可**，无需查用户 ID、无需邮箱映射：

```bash
# 单个道号
ADMIN_DAOHAOS=admin

# 多个道号用英文逗号分隔
ADMIN_DAOHAOS=admin,张三
```

保存后执行 `./start.sh restart` 生效，对应道号的账号即为管理员，可访问后台管理（广播、物品库、模板配置等）功能。

> - `ADMIN_DAOHAOS` 之外，另可 `ADMIN_USER_IDS=<系统用户ID>` 按用户 ID 登记（需先查库拿到 ID，一般用不到）。
> - **账号管理**模块需额外在 `ADMIN_USER_IDS` 登记，DAOHAOS 不覆盖该模块。

---

## 接入离线内网 LLM（生成型玩法）

游戏大量生成型功能（炼丹、命名、黑市谈判、人物生成、副本叙事等）依赖 LLM。
离线部署通过**自带私有的内网 OpenAI 兼容推理服务**（[Ollama](https://ollama.com) / [vLLM](https://docs.vllm.ai) 等）来驱动，只会访问局域网、不依赖公网。

在 `config/.env` 里配置三处即可（配置模板见 `config/.env.example`）：

```bash
LLM_PROVIDER=openai/<模型名>       # 如 openai/qwen2.5:7b
OPENAI_BASE_URL=http://<内网IP>:<端口>/v1
OPENAI_API_KEY=<任意非空值>         # 内网服务通常不校验 key，但必须有值才会启用
```

要点：
- `OPENAI_API_KEY` 必须非空（写 `ollama`/`empty` 即可），代码据此判定该供应商已启用。
- 模型名写在 `LLM_PROVIDER` 里（`openai/<模型名>`）；不写则用默认 `qwen3.7-flash`。
- `OPENAI_BASE_URL` 也支持 `OPENAI_COMPAT_BASE_URL` 作为别名。
- 未配置任何 LLM 时，生成型玩法按无 LLM 兜底**降级**，其余功能（战斗、任务、邮件、交易等）不受影响。

## 说明

- **同源托管**：前端与后端同一进程，无需单独部署、无跨域。
- **来源自动信任**：登录时自动信任请求头 Origin/Host，`PUBLIC_WEB_ORIGINS` 留空即可。
- **数据备份**：备份 `data/` 目录即备份全部数据（PG/Redis/NATS）。
- **LLM**：默认关闭。如需生成型玩法，按上面"接入离线内网 LLM"指向自备内网推理端；未配置时该玩法降级、不影响其余功能。
- **SMTP**：默认关闭，不影响其余功能。
