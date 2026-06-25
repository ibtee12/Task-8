import Link from "next/link";
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { getServerSession } from "@/lib/session";
import UpdateForm from "@/components/profile/UpdateForm";

export const metadata = { title: "Update Information — Inkwell" };

/**
 * Update Information — PRIVATE ROUTE (Challenge #1).
 * A dedicated route with a form (Name + Image) to update the user's profile.
 */
export default async function UpdateProfilePage() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login?redirect=/profile/update");
  }

  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-md px-6 py-12">
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
          <header className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold">
              Update Information
            </h1>
            <p className="mt-2 text-sm text-base-content/60">
              Change your display name and profile photo.
            </p>
          </header>

          <UpdateForm />
        </div>
      </div>
    </main>
  );
}
