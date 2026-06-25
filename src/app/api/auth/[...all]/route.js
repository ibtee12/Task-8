import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Mounts all BetterAuth endpoints (sign-in, sign-up, OAuth callbacks,
 * session, sign-out, update-user, etc.) at /api/auth/*.
 *
 * The auth instance is resolved lazily per request so that building the app
 * doesn't require a live MongoDB connection.
 */
async function handler(request) {
  const auth = await getAuth();
  const { GET, POST } = toNextJsHandler(auth);
  return request.method === "GET" ? GET(request) : POST(request);
}

export const GET = handler;
export const POST = handler;
