import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft, FiUser, FiTag, FiCheckCircle } from "react-icons/fi";
import { fetchBook } from "@/lib/api";
import { getServerSession } from "@/lib/session";
import BorrowButton from "@/components/books/BorrowButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await fetchBook(id);
  return { title: book ? `${book.title} — Inkwell` : "Book — Inkwell" };
}

/**
 * Single Book Details — PRIVATE ROUTE.
 * Only logged-in users may view this; otherwise we redirect to login and
 * send them back here afterwards.
 */
export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  // Gate access: redirect signed-out users to login (with return path).
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/login?redirect=/books/${id}`);
  }

  const book = await fetchBook(id);
  if (!book) notFound();

  const outOfStock = book.available_quantity <= 0;

  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to all books
        </Link>

        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          {/* Left: Cover */}
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-xl">
              <Image
                src={book.image_url}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <span
              className={`badge badge-lg mb-4 w-fit border-0 ${
                book.category === "Story"
                  ? "badge-accent"
                  : book.category === "Tech"
                  ? "badge-primary"
                  : "badge-info"
              }`}
            >
              <FiTag className="mr-1 h-3.5 w-3.5" />
              {book.category}
            </span>

            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              {book.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-lg text-base-content/70">
              <FiUser className="h-5 w-5" />
              by <span className="font-semibold text-base-content">{book.author}</span>
            </p>

            <div className="divider my-6" />

            <h2 className="mb-2 font-display text-lg font-semibold">
              About this book
            </h2>
            <p className="leading-relaxed text-base-content/80">
              {book.description}
            </p>

            {/* Availability */}
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 px-5 py-4">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full ${
                  outOfStock
                    ? "bg-error/10 text-error"
                    : "bg-success/10 text-success"
                }`}
              >
                <FiCheckCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">
                  {outOfStock
                    ? "Out of stock"
                    : `${book.available_quantity} ${
                        book.available_quantity === 1 ? "copy" : "copies"
                      } left`}
                </p>
                <p className="text-sm text-base-content/60">
                  {outOfStock
                    ? "Check back soon for availability."
                    : "Available to borrow right now."}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8">
              <BorrowButton
                bookId={book.id}
                title={book.title}
                available={book.available_quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
