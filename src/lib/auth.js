import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb, getMongoClient } from "@/lib/mongodb";

/**
 * BetterAuth server instance (lazily initialized).
 *
 * We build the auth instance on first use rather than at module load so that
 * importing this file never opens a MongoDB connection eagerly — that would
 * break `next build` when the database is unreachable. The route handler and
 * server helpers await `getAuth()` instead.
 *
 * Configured with:
 *   - email & password (sign-up + sign-in), no email verification
 *   - Google social login (credentials from env vars)
 *
 * `transaction: false` keeps the adapter working against a standalone local
 * MongoDB (no replica set). On Atlas you may remove it.
 */
let authInstance;

export async function getAuth() {
  if (authInstance) return authInstance;

  const db = await getDb();
  const client = await getMongoClient();

  // Enforce one account per email at the database level (safety net on top of
  // BetterAuth's own duplicate handling). Index creation is idempotent.
  try {
    await db.collection("user").createIndex({ email: 1 }, { unique: true });
  } catch {
    /* index may already exist — ignore */
  }

  authInstance = betterAuth({
    database: mongodbAdapter(db, { client, transaction: false }),
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: false, // after register, send the user to the login page
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // refresh once per day
    },
  });

  return authInstance;
}
