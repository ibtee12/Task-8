import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import BookCard from "@/components/BookCard";

/**
 * Featured Books — shows the top 4 books.
 * Receives books as a prop (fetched server-side from /api/books on the
 * home page) so this stays a presentational section.
 */
export default function FeaturedBooks({ books = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Handpicked
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Featured Books
          </h2>
          <p className="mt-2 max-w-md text-base-content/70">
            A taste of the collection — fresh titles our readers are loving
            right now.
          </p>
        </div>

        <Link href="/books" className="btn btn-ghost gap-2 text-primary">
          View all books
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
