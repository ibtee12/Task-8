"use client";

/**
 * TEMPORARY auth stub.
 *
 * In Step 7 this file is replaced by the real BetterAuth React client
 * (createAuthClient from "better-auth/react"), which exposes the same
 * `useSession` / `signIn` / `signOut` surface. Building the UI against
 * this shape now means the navbar and private routes won't need rewrites
 * once real auth lands.
 *
 * To preview the logged-in navbar before Step 7, set a value in the
 * browser console:  localStorage.setItem("demo-user", JSON.stringify({ name: "Ada Lovelace", email: "ada@example.com" }))
 * and reload.
 */
import { useEffect, useState } from "react";

export function useSession() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem("demo-user")
          : null;
      if (raw) setData({ user: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setIsPending(false);
  }, []);

  return { data, isPending };
}

export async function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("demo-user");
    window.location.href = "/";
  }
}
