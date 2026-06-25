"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookOpen, FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    toast.success("You have been logged out.");
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-primary/10 text-primary"
        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-content shadow-sm">
            <FiBookOpen className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-base-content">
            Inkwell
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth area */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <span className="h-9 w-24 animate-pulse rounded-lg bg-base-200" />
            ) : user ? (
              <>
                <span className="flex items-center gap-2 rounded-lg bg-base-200 px-3 py-2 text-sm font-medium">
                  <FiUser className="h-4 w-4 text-primary" />
                  <span className="max-w-[10rem] truncate">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline btn-error gap-1.5"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-sm btn-primary px-5">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="dropdown dropdown-end md:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu z-50 mt-3 w-60 gap-1 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "active text-primary" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <div className="divider my-1" />
              {isPending ? null : user ? (
                <>
                  <li className="menu-title flex-row items-center gap-2 px-2">
                    <FiUser className="h-4 w-4 text-primary" />
                    <span className="truncate">{user.name}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login" className="bg-primary text-primary-content">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
