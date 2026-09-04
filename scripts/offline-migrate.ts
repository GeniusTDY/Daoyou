/**
 * 离线一键部署用的独立迁移工具。
 *
 * 在无 node_modules 的离线环境里，把本脚本通过
 * `bun build --compile scripts/offline-migrate.ts` 编译为自包含可执行文件，
 * 运行时读取磁盘上的 drizzle 迁移目录（含 meta/_journal.json）并依次执行，
 * 与 drizzle-kit migrate 行为一致（幂等：已应用的迁移通过 journal 表跳过）。
 *
 * 依赖目录通过环境变量指定：
 * - MIGRATIONS_MAIN_DIR：业务表迁移目录（默认 ./drizzle）
 * - MIGRATIONS_AUTH_DIR：Better Auth 迁移目录（默认 ./drizzle-auth）
 * - DATABASE_URL：PostgreSQL 连接串（必需）
 *
 * journal 表布局与既有部署保持一致：均建在 drizzle schema 下，
 * 业务表为 __drizzle_migrations，认证表为 __drizzle_auth_migrations。
 */
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('[offline-migrate] DATABASE_URL is required');
  process.exit(1);
}

const mainDir = process.env.MIGRATIONS_MAIN_DIR?.trim() || './drizzle';
const authDir = process.env.MIGRATIONS_AUTH_DIR?.trim() || './drizzle-auth';

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool);

async function run(label: string, folder: string, table: string) {
  console.log(`[offline-migrate] applying ${label} migrations from ${folder}`);
  await migrate(db, {
    migrationsFolder: folder,
    migrationsSchema: 'drizzle',
    migrationsTable: table,
  });
  console.log(`[offline-migrate] ${label} migrations OK`);
}

try {
  await pool.query('CREATE SCHEMA IF NOT EXISTS drizzle');
  await run('main', mainDir, '__drizzle_migrations');
  await run('auth', authDir, '__drizzle_auth_migrations');
  console.log('[offline-migrate] all migrations applied');
} catch (error) {
  console.error('[offline-migrate] failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
