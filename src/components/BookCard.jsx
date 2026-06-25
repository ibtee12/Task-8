import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const CATEGORY_STYLES = {
  Story: "badge-accent",
  Tech: "badge-primary",
  Science: "badge-info",
};

/**
 * Reusable book card used on the home page (Featured) and the All Books grid.
 * Shows cover, category, title, author, availability, and a "View Details" CTA.
 */
export default function BookCard({ book }) {
  const outOfStock = book.available_quantity <= 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-base-200">
        <Image
          src={book.image_url}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`badge ${
            CATEGORY_STYLES[book.category] || "badge-neutral"
          } absolute left-3 top-3 border-0 font-medium shadow-sm`}
        >
          {book.category}
        </span>
        {outOfStock && (
          <span className="badge badge-error absolute right-3 top-3 border-0 font-medium shadow-sm">
            Out of stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-bold leading-snug line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-base-content/60">by {book.author}</p>

        <div className="mt-1 flex items-center gap-2 text-xs">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              outOfStock ? "bg-error" : "bg-success"
            }`}
          />
          <span className="text-base-content/70">
            {outOfStock
              ? "Currently unavailable"
              : `${book.available_quantity} ${
                  book.available_quantity === 1 ? "copy" : "copies"
                } available`}
          </span>
        </div>

        <Link
          href={`/books/${book.id}`}
          className="btn btn-outline btn-primary btn-sm mt-auto w-full gap-1.5"
        >
          View Details
          <FiArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
