import Link from "next/link";
import { FiBookOpen, FiCheckCircle } from "react-icons/fi";

/**
 * Shared two-column shell for the login and register pages.
 * Left: branded marketing panel (hidden on small screens).
 * Right: the form (passed as children).
 */
export default function AuthShell({ children, highlights }) {
  const points =
    highlights || [
      "Borrow from a curated digital collection",
      "Filter by Story, Tech, and Science",
      "No late fees — return anytime",
    ];

  return (
    <div className="grid flex-1 lg:grid-cols-2">
      {/* Branded panel */}
      <aside className="relative hidden overflow-hidden bg-primary text-primary-content lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-content/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2 w-fit">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-content/15">
            <FiBookOpen className="h-6 w-6" />
          </span>
          <span className="font-display text-2xl font-bold">Inkwell</span>
        </Link>

        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Your next great read is one click away.
          </h2>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-secondary" />
                <span className="text-primary-content/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-primary-content/70">
          © {new Date().getFullYear()} Inkwell. A modern library experience.
        </p>
      </aside>

      {/* Form column */}
      <main className="flex flex-1 items-center justify-center bg-base-100 px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2 lg:hidden"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-content">
              <FiBookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">Inkwell</span>
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
