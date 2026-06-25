"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/books/CategorySidebar";

/**
 * Interactive All Books page.
 *  - Large search bar (filters by title).
 *  - Category sidebar (Challenge #2) — All / Story / Tech / Science.
 *  - Reads initial state from URL (?search=&category=) so deep links and the
 *    home page's category cards work; keeps the URL in sync as filters change.
 *  - Fetches from /api/books with the active filters.
 */
export default function BooksBrowser({ initialBooks, allCounts }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [books, setBooks] = useState(initialBooks);
  const [loading, setLoading] = useState(false);

  // Counts shown in the sidebar (static — total per category across all books).
  const counts = useMemo(
    () => ({
      all: allCounts.all,
      Story: allCounts.Story || 0,
      Tech: allCounts.Tech || 0,
      Science: allCounts.Science || 0,
    }),
    [allCounts]
  );

  // Debounced fetch whenever search or category changes.
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (category && category !== "all") params.set("category", category);
        const qs = params.toString();

        const res = await fetch(`/api/books${qs ? `?${qs}` : ""}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setBooks(data.books);

        // Keep the URL shareable without adding history entries.
        router.replace(`/books${qs ? `?${qs}` : ""}`, { scroll: false });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const clearAll = () => {
    setSearch("");
    setCategory("all");
  };

  const hasActiveFilters = search.trim() || category !== "all";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      {/* Page header */}
      <header className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          Explore the Collection
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base-content/70">
          Search by title or filter by category to find your next read.
        </p>
      </header>

      {/* Search bar */}
      <div className="mx-auto mb-10 max-w-2xl">
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title…"
            aria-label="Search books by title"
            className="input input-bordered input-lg w-full rounded-full pl-12 pr-12 shadow-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <CategorySidebar
              active={category}
              counts={counts}
              onSelect={setCategory}
            />
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-base-content/60">
              <FiFilter className="h-4 w-4" />
              {loading
                ? "Searching…"
                : `${books.length} ${
                    books.length === 1 ? "book" : "books"
                  } found`}
              {category !== "all" && (
                <span className="badge badge-ghost badge-sm">{category}</span>
              )}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="btn btn-ghost btn-xs gap-1 text-base-content/60"
              >
                <FiX className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] animate-pulse rounded-2xl bg-base-200"
                />
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-base-300 py-20 text-center">
              <p className="font-display text-xl font-semibold">
                No books found
              </p>
              <p className="mt-2 text-base-content/60">
                Try a different search term or category.
              </p>
              <button onClick={clearAll} className="btn btn-primary btn-sm mt-5">
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
