import { NextResponse } from "next/server";
import { getBookById } from "@/lib/books";

/**
 * GET /api/books/:id
 * Returns a single book, or 404 if it does not exist.
 */
export async function GET(_request, { params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    return NextResponse.json(
      { message: `Book with id "${id}" not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json({ book });
}
