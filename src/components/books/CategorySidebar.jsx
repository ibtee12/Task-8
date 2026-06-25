"use client";

import { FiBookOpen, FiCpu, FiActivity, FiLayers } from "react-icons/fi";

const ITEMS = [
  { value: "all", label: "All Books", Icon: FiLayers },
  { value: "Story", label: "Story", Icon: FiBookOpen },
  { value: "Tech", label: "Tech", Icon: FiCpu },
  { value: "Science", label: "Science", Icon: FiActivity },
];

/**
 * Category filter sidebar for the All Books page (Challenge #2).
 * Controlled — the parent owns the active category and book counts.
 */
export default function CategorySidebar({ active, counts, onSelect }) {
  return (
    <nav aria-label="Filter by category" className="space-y-1">
      <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-base-content/50">
        Categories
      </h2>
      {ITEMS.map(({ value, label, Icon }) => {
        const isActive = active === value;
        const count =
          value === "all" ? counts.all : counts[value] ?? 0;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            aria-current={isActive ? "true" : undefined}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/75 hover:bg-base-200"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              {label}
            </span>
            <span
              className={`badge badge-sm border-0 ${
                isActive
                  ? "bg-primary-content/20 text-primary-content"
                  : "bg-base-200 text-base-content/60"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
