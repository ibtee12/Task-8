import { Suspense } from "react";
import BooksBrowser from "@/components/books/BooksBrowser";
import { fetchBooks } from "@/lib/api";

export const metadata = { title: "All Books — Inkwell" };

export default async function BooksPage() {
  // Fetch the full catalog server-side for the initial render + sidebar counts.
  const books = await fetchBooks();

  const allCounts = books.reduce(
    (acc, b) => {
      acc.all += 1;
      acc[b.category] = (acc[b.category] || 0) + 1;
      return acc;
    },
    { all: 0 }
  );

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center py-32">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        }
      >
        <BooksBrowser initialBooks={books} allCounts={allCounts} />
      </Suspense>
    </main>
  );
}
