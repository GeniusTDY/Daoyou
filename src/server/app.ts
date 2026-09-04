import { existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { handleAuthRequest } from '@server/lib/auth/hono';
import { apiIpRateLimit } from '@server/lib/hono/apiIpRateLimit';
import { jsonError, redisLockErrorResponse } from '@server/lib/hono/middleware';
import { requestLogger } from '@server/lib/hono/requestLogger';
import type { AppEnv } from '@server/lib/hono/types';
import { runWithContext } from '@server/lib/http/context';
import { apiCorsOptions } from '@server/lib/http/cors';
import { unsafeRequestOriginGuard } from '@server/lib/http/originGuard';
import apiRouter from '@server/routes/api';
import internalRouter from '@server/routes/internal';
import { LlmByokConfigSchema } from '@shared/config/llm';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

/**
 *  STATIC_DIR  SPA
 *  Bun  SPA
 *
 * -  STATIC_DIR  index.html " API"
 *    Cloudflare Pages +
 * -  /api/internal Bun.file
 *    Content-Type HTML  index.html
 */
function staticDirIfReady(): string | null {
  const dir = process.env.STATIC_DIR?.trim();
  if (!dir) {
    return null;
  }
  return existsSync(join(dir, 'index.html')) ? dir : null;
}

const serveStaticApp = () => {
  const app = new Hono<AppEnv>();
  const staticDir = staticDirIfReady();
  if (!staticDir) {
    return app;
  }

  const root = normalize(staticDir);
  app.use('*', async (context, next) => {
    const path = context.req.path;
    if (path.startsWith('/api/') || path.startsWith('/internal/')) {
      return next();
    }

    const rawRelative = path === '/' ? '/index.html' : path;
    const decoded = decodeURIComponent(rawRelative);
    const filePath = normalize(join(root, decoded));
    if (filePath !== root && !filePath.startsWith(`${root}/`)) {
      return context.text('404 Not Found', 404);
    }

    const file = Bun.file(filePath);
    if (await file.exists()) {
      const headers =
        filePath.endsWith('.html') || filePath.endsWith('.htm')
          ? { 'Content-Type': 'text/html; charset=utf-8' }
          : undefined;
      return new Response(file, { headers });
    }

    const accept = context.req.header('accept') ?? '';
    if (accept.includes('text/html')) {
      const index = Bun.file(join(root, 'index.html'));
      if (await index.exists()) {
        return new Response(index, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
    }

    return next();
  });
  return app;
};

const app = new Hono<AppEnv>();

app.use('/api/*', requestLogger());
app.use('/internal/*', requestLogger());

app.use('*', async (context, next) => runWithContext(context, next));

app.use('/api/*', cors(apiCorsOptions));
app.use('/api/*', unsafeRequestOriginGuard());

app.use('*', async (context, next) => {
  const provider = context.req.header('x-llm-provider');
  const apiKey = context.req.header('x-llm-api-key');
  const model = context.req.header('x-llm-model');

  if (provider !== undefined || apiKey !== undefined || model !== undefined) {
    const parsed = LlmByokConfigSchema.safeParse({ provider, apiKey, model });
    if (!parsed.success) {
      return context.json(
        {
          success: false,
          error: 'LLM 配置不完整或格式无效',
        },
        400,
      );
    }
    context.set('llmConfig', parsed.data);
  }

  await next();
});

app.use('/api/*', apiIpRateLimit());
// TEMP-DEBUG():  auth
app.use('/api/auth/*', async (context, next) => {
  const allHeaders: Record<string, string> = {};
  context.req.raw.headers.forEach((value, key) => {
    allHeaders[key] = value;
  });
  console.log('[auth-hdrs]', JSON.stringify(allHeaders));
  await next();
});
app.all('/api/auth/*', handleAuthRequest);
app.use('/api/*', jsonError());
app.use('/internal/*', jsonError());

app.route('/api', apiRouter);
app.route('/internal', internalRouter);

//  SPA STATIC_DIR
//  API notFound  /api/internal  API
app.route('/', serveStaticApp());

//  404
// API  JSON 404
app.notFound((c) =>
  c.req.path.startsWith('/api/')
    ? c.json({ error: 'Not Found' }, 404)
    : c.text('404 Not Found', 404),
);

app.onError((error, c) => {
  const lockErrorResponse = redisLockErrorResponse(error);
  if (lockErrorResponse) {
    return lockErrorResponse;
  }
  console.error('Unhandled Hono error:', error);
  return c.json(
    {
      success: false,
      error: '服务器内部错误',
    },
    500,
  );
});

export default app;
