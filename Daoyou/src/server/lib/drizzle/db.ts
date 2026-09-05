import { betterAuthSchema } from '@server/lib/auth/schema';
import { is } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;
const maxConnections = Number(process.env.DB_MAX_CONNECTIONS || 20);

if (!connectionString) {
  throw new Error('Missing DATABASE_URL');
}

const postgresOptions = [
  '-c search_path=better_auth,public',
  '-c application_name=daoyou-api',
  '-c lock_timeout=3s',
  '-c statement_timeout=30s',
  '-c idle_in_transaction_session_timeout=60s',
].join(' ');

const pool = new Pool({
  // PostgreSQL  DATABASE_URL
  connectionString,
  
  max: maxConnections,
  //  5
  idleTimeoutMillis: 300_000,
  //  30
  connectionTimeoutMillis: 30_000,
  //  TLS
  ssl: false,
  //  PostgreSQL
  options: postgresOptions,
});

pool.on('error', (error) => {
  console.error('[postgres-pool] idle client error', {
    postgresCode: (error as Error & { code?: string }).code ?? null,
    poolTotal: pool.totalCount,
    poolIdle: pool.idleCount,
    poolWaiting: pool.waitingCount,
    error,
  });
});

export const db = drizzle(pool, {
  schema: {
    ...schema,
    ...betterAuthSchema,
  },
});

export type DbClient = typeof db;

export type DbTransaction = Parameters<
  Parameters<DbClient['transaction']>[0]
>[0];

export type DbExecutor = DbClient | DbTransaction;

export function getExecutor(tx?: DbTransaction): DbExecutor {
  return tx ?? db;
}

type DbTask = () => Promise<unknown>;
type DbTaskResults<TTasks extends readonly DbTask[]> = {
  -readonly [TIndex in keyof TTasks]: Awaited<ReturnType<TTasks[TIndex]>>;
};

/**
 * A node-postgres transaction owns one physical client, so its queries must be
 * submitted serially. Pool-backed reads can still use separate clients.
 */
export async function runDbTasks<const TTasks extends readonly DbTask[]>(
  executor: DbExecutor,
  tasks: TTasks,
): Promise<DbTaskResults<TTasks>> {
  if (!is(executor, PgTransaction)) {
    return Promise.all(tasks.map((task) => task())) as Promise<
      DbTaskResults<TTasks>
    >;
  }

  const results: unknown[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results as DbTaskResults<TTasks>;
}
