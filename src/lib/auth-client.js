"use client";

import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth React client.
 *
 * Exposes the same `useSession` / `signOut` surface the navbar and private
 * routes were built against in earlier steps, plus `signIn` / `signUp` for
 * the login and register forms.
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : undefined),
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;
