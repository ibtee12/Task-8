import booksData from "@/data/books.json";

/**
 * Local data-access layer for books.
 * The 12 books live in src/data/books.json and are served through the
 * Next.js route handlers in src/app/api/books/*.
 */

export const CATEGORIES = ["Story", "Tech", "Science"];

/** Return every book. */
export function getAllBooks() {
  return booksData;
}

/**
 * Return books filtered by an optional title search and category.
 * @param {{ search?: string, category?: string }} options
 */
export function getBooks({ search = "", category = "" } = {}) {
  let result = booksData;

  if (category && category.toLowerCase() !== "all") {
    result = result.filter(
      (book) => book.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const term = search.trim().toLowerCase();
    result = result.filter((book) =>
      book.title.toLowerCase().includes(term)
    );
  }

  return result;
}

/** Find a single book by its id. */
export function getBookById(id) {
  return booksData.find((book) => String(book.id) === String(id)) || null;
}

/** Top N books to feature on the home page (first N by default). */
export function getFeaturedBooks(count = 4) {
  return booksData.slice(0, count);
}
