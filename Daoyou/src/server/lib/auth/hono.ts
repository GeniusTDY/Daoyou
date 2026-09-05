import { auth } from '@server/lib/auth/auth';
import type { Context } from 'hono';

const ADMIN_AUTH_PATH = '/api/auth/admin';

export async function handleAuthRequest(context: Context): Promise<Response> {
  if (
    context.req.path === ADMIN_AUTH_PATH ||
    context.req.path.startsWith(`${ADMIN_AUTH_PATH}/`)
  ) {
    return Response.json(
      {
        success: false,
        error: '未找到该接口',
      },
      { status: 404 },
    );
  }

  return auth.handler(context.req.raw);
}