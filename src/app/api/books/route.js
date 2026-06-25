import { NextResponse } from "next/server";
import { getBooks } from "@/lib/books";

/**
 * GET /api/books
 * Optional query params:
 *   - search:   filter by title (case-insensitive substring)
 *   - category: filter by category (Story | Tech | Science | all)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const books = getBooks({ search, category });

  return NextResponse.json({ count: books.length, books });
}
