import { FiSearch, FiBookmark, FiClock } from "react-icons/fi";

const STEPS = [
  {
    icon: FiSearch,
    title: "Discover",
    text: "Search the catalog or filter by category to find a book that speaks to you.",
  },
  {
    icon: FiBookmark,
    title: "Borrow",
    text: "Sign in and borrow with a single click — your selection is reserved instantly.",
  },
  {
    icon: FiClock,
    title: "Read & Return",
    text: "Enjoy your read at your own pace, then return it digitally. No late fees.",
  },
];

/**
 * Extra section #2 — How It Works.
 * A simple three-step explainer of the borrowing flow.
 */
export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
          Simple as 1-2-3
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          How Borrowing Works
        </h2>
      </div>

      <ol className="relative mt-14 grid gap-10 md:grid-cols-3">
        {/* Connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-base-300 md:block" />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-base-300 bg-primary text-primary-content shadow-md">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-secondary">
                Step {i + 1}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-base-content/70">
                {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
