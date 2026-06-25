import { headers } from "next/headers";

/**
 * Build an absolute base URL for server-side fetches to our own API routes.
 * Uses NEXT_PUBLIC_BASE_URL when set, otherwise derives it from the request
 * headers (works on Vercel and locally without extra config).
 */
export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const protocol = h.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

/** Fetch books from our API route, optionally filtered. */
export async function fetchBooks({ search = "", category = "" } = {}) {
  const base = await getBaseUrl();
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const qs = params.toString();

  const res = await fetch(`${base}/api/books${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data.books;
}
