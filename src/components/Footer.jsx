import Link from "next/link";
import {
  FiBookOpen,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://twitter.com", label: "Twitter / X", Icon: FaXTwitter },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://github.com", label: "GitHub", Icon: FaGithub },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300/70 bg-base-200/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="space-y-4 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-content">
              <FiBookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">Inkwell</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-base-content/70">
            A modern home for readers. Explore a curated collection, filter by
            what you love, and borrow your next great read — all in a few clicks.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore links */}
        <nav className="space-y-3">
          <h3 className="font-display text-base font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="hover:text-primary">
                All Books
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-primary">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Us */}
        <div className="space-y-3" id="contact">
          <h3 className="font-display text-base font-semibold">Contact Us</h3>
          <ul className="space-y-3 text-sm text-base-content/70">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>123 Reading Lane, Booktown, BD 1207</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:hello@inkwell.app" className="hover:text-primary">
                hello@inkwell.app
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+8801000000000" className="hover:text-primary">
                +880 1000-000000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-base-content/60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Inkwell. All rights reserved.</p>
          <p>Built with Next.js, BetterAuth &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
