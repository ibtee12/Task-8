import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCpu, FiActivity } from "react-icons/fi";

const CATEGORY_META = {
  Story: {
    icon: FiBookOpen,
    blurb: "Novels, sagas, and mysteries to lose yourself in.",
    accent: "from-accent/20 to-accent/5 text-accent",
  },
  Tech: {
    icon: FiCpu,
    blurb: "Engineering, architecture, and the craft of code.",
    accent: "from-primary/20 to-primary/5 text-primary",
  },
  Science: {
    icon: FiActivity,
    blurb: "From quantum fields to living cells and the cosmos.",
    accent: "from-info/20 to-info/5 text-info",
  },
};

/**
 * Extra section #1 — Browse by Category.
 * Three cards linking to the All Books page pre-filtered by category.
 */
export default function CategoryShowcase({ counts = {} }) {
  return (
    <section className="bg-base-200/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Find your shelf
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-3 text-base-content/70">
            Jump straight to what you love — every title is organized into three
            curated collections.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Object.entries(CATEGORY_META).map(([name, meta]) => {
            const Icon = meta.icon;
            const count = counts[name] || 0;
            return (
              <Link
                key={name}
                href={`/books?category=${name}`}
                className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-5 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${meta.accent}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-bold">{name}</h3>
                  <span className="badge badge-ghost badge-sm">
                    {count} {count === 1 ? "book" : "books"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-base-content/70">{meta.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore {name}
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
