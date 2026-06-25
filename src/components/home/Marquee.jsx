import { FiStar } from "react-icons/fi";

/**
 * Infinite scrolling marquee for announcements.
 * Pure CSS (no library) — the track is duplicated and animated -50% so the
 * loop is seamless. Items follow the required pattern:
 *   "New Arrivals: [Book Name] | Special Discount on Memberships..."
 */
export default function Marquee({ items = [] }) {
  const messages = [
    ...items.map((title) => `New Arrivals: ${title}`),
    "Special Discount on Memberships — Join Today!",
    "Borrow up to 5 books at once with a Premium card",
    "Free returns, always. No late fees this month.",
  ];

  // Render the list twice so the -50% translate loops seamlessly.
  const loop = [...messages, ...messages];

  return (
    <div className="group relative flex overflow-hidden border-y border-base-300 bg-primary text-primary-content">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary to-transparent" />

      <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-8 py-3 pr-8 group-hover:[animation-play-state:paused]">
        {loop.map((msg, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium"
          >
            <FiStar className="h-3.5 w-3.5 fill-secondary text-secondary" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
