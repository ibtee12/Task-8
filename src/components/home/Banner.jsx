import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiSearch, FiStar } from "react-icons/fi";

/**
 * Hero banner for the home page.
 * Large "Find Your Next Read" headline + "Browse Now" CTA to /books.
 */
export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Decorative gradient glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/70 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur">
            <FiStar className="h-4 w-4 fill-secondary text-secondary" />
            A modern digital library
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-base-content sm:text-6xl lg:text-7xl">
            Find Your{" "}
            <span className="relative inline-block text-primary sm:whitespace-nowrap">
              Next Read
              <svg
                className="absolute -bottom-2 left-0 w-full text-secondary"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C75 3 150 3 298 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-base-content/70 lg:mx-0">
            Explore a curated collection of stories, science, and technology.
            Filter by what moves you, and borrow your next great read in just a
            few clicks.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start sm:justify-center">
            <Link
              href="/books"
              className="btn btn-primary btn-lg group gap-2 px-8 shadow-md"
            >
              Browse Now
              <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/books" className="btn btn-ghost btn-lg gap-2">
              <FiSearch className="h-5 w-5" />
              Search the catalog
            </Link>
          </div>

          {/* Mini stats */}
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-base-300 pt-8 mx-auto lg:mx-0">
            {[
              { value: "12+", label: "Curated titles" },
              { value: "3", label: "Categories" },
              { value: "100%", label: "Digital borrowing" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="font-display text-3xl font-bold text-primary">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-base-content/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: stacked book art */}
        <div className="relative hidden justify-center lg:flex">
          <div className="relative h-104 w-72">
            {/* Back card */}
            <div className="absolute right-0 top-8 h-80 w-52 rotate-6 rounded-2xl bg-primary/90 shadow-2xl" />
            {/* Middle card */}
            <div className="absolute left-0 top-4 h-80 w-52 -rotate-6 rounded-2xl bg-secondary shadow-2xl" />
            {/* Front card */}
            <div className="absolute left-10 top-0 flex h-80 w-52 flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-6 shadow-2xl">
              <FiBookOpen className="h-10 w-10 text-primary" />
              <div>
                <p className="font-display text-2xl font-bold leading-tight">
                  Read more.
                </p>
                <p className="mt-2 text-sm text-base-content/60">
                  Borrow, return, repeat — your library, reimagined.
                </p>
              </div>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
