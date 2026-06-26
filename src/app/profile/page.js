import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FiEdit3,
  FiMail,
  FiUser,
  FiCheckCircle,
  FiCalendar,
  FiHash,
} from "react-icons/fi";
import { getServerSession } from "@/lib/session";

// Session-gated, DB-backed route — never prerender at build time.
export const dynamic = "force-dynamic";

export const metadata = { title: "My Profile — Inkwell" };

/**
 * My Profile — PRIVATE ROUTE.
 * Shows all of the signed-in user's information, with a link to the
 * Update Information page (Challenge #1).
 */
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login?redirect=/profile");
  }

  const user = session.user;
  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const info = [
    { icon: FiUser, label: "Full name", value: user.name || "—" },
    { icon: FiMail, label: "Email", value: user.email || "—" },
    {
      icon: FiCheckCircle,
      label: "Email verified",
      value: user.emailVerified ? "Yes" : "No",
    },
    { icon: FiCalendar, label: "Member since", value: joined },
    { icon: FiHash, label: "User ID", value: user.id, mono: true },
  ];

  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-2 text-base-content/60">
            Your account details at a glance.
          </p>
        </header>

        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          {/* Banner */}
          <div className="relative h-32 bg-primary">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-content/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 left-10 h-44 w-44 rounded-full bg-secondary/30 blur-2xl" />
          </div>

          <div className="px-6 pb-8 sm:px-10">
            {/* Avatar + name + edit */}
            <div className="-mt-14 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-base-100 bg-base-200 shadow-lg">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User avatar"}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-3xl font-bold text-base-content/40">
                      {(user.name || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="pb-1 text-center sm:text-left">
                  <h2 className="font-display text-2xl font-bold">
                    {user.name}
                  </h2>
                  <p className="text-base-content/60">{user.email}</p>
                </div>
              </div>

              <Link
                href="/profile/update"
                className="btn btn-primary gap-2"
              >
                <FiEdit3 className="h-4 w-4" />
                Update Information
              </Link>
            </div>

            {/* Info grid */}
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {info.map(({ icon: Icon, label, value, mono }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-xl border border-base-300 bg-base-200/40 p-4"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs uppercase tracking-wide text-base-content/50">
                      {label}
                    </dt>
                    <dd
                      className={`mt-0.5 wrap-break-word font-medium ${
                        mono ? "font-mono text-sm" : ""
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
