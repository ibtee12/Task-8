import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";

/**
 * Read the current session on the server (in Server Components, route
 * handlers, and server actions). Returns the BetterAuth session object
 * ({ user, session }) or null when signed out.
 *
 * Used by the private routes (Book Details, My Profile, Update Info) to
 * gate access.
 */
export async function getServerSession() {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}
