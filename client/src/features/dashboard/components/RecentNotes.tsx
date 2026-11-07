
import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  MoreVertical,
  ArrowRight,
  ArrowUpDown,
} from "lucide-react";

const categories = [
  "All",
  "Personal",
  "Work",
  "Learning",
  "Ideas",
  "Travel",
];

const notes = [
  {
    id: "1",
    title: "React Learning",
    description: "Today I learned about React components, props and state...",
    category: "Learning",
    updatedAt: "Oct 24, 2026 · 10:30 AM",
    timestamp: 6,
  },
  {
    id: "2",
    title: "Project Ideas",
    description: "Ideas for next project and feature list...",
    category: "Ideas",
    updatedAt: "Oct 23, 2026 · 06:15 PM",
    timestamp: 5,
  },
  {
    id: "3",
    title: "Travel Plan",
    description: "Places to visit in Ooty and Varanasi...",
    category: "Travel",
    updatedAt: "Oct 22, 2026 · 09:20 AM",
    timestamp: 4,
  },
  {
    id: "4",
    title: "To Do List",
    description: "Complete DSA practice and work on notes app...",
    category: "Personal",
    updatedAt: "Oct 21, 2026 · 08:45 AM",
    timestamp: 3,
  },
];

const categoryStyles: Record<string, string> = {
  Learning: "bg-blue-100 text-blue-700",
  Ideas: "bg-purple-100 text-purple-700",
  Travel: "bg-red-100 text-red-600",
  Personal: "bg-green-100 text-green-700",
  Work: "bg-amber-100 text-amber-700",
};

const RecentNotes = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("recent");

  const filteredNotes = useMemo(() => {
    const result = notes.filter(
      (note) =>
        activeCategory === "All" ||
        note.category === activeCategory
    );

    return [...result].sort((a, b) =>
      sortOrder === "recent"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );
  }, [activeCategory, sortOrder]);

  const visibleNotes = useMemo(
    () => filteredNotes.slice(0, 4),
    [filteredNotes]
  );

  return (
    <section
      className="
        flex min-w-0 flex-col
        rounded-2xl border border-[#E1EAF8] bg-white
        p-5 shadow-[0_3px_12px_rgba(31,65,114,0.06)]
        sm:p-6
        xl:h-[clamp(440px,31.25vw,480px)]
      "
    >
      {/* Header */}
      <div className="mb-5 flex shrink-0 items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-[#101828]">
            Recent Notes
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Your latest notes at a glance.
          </p>
        </div>

        <Link
          to="/notes"
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#0866F5] transition hover:text-blue-700 sm:flex"
        >
          View All Notes
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Filters and sorting */}
      <div className="mb-4 flex shrink-0 items-center gap-3">

        {/* Horizontally scrollable category filters */}
        <div className="hide-scrollbar min-w-0 flex-1 overflow-x-auto">
          <div className="flex w-max items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? "border-[#0866F5] bg-[#0866F5] text-white"
                    : "border-[#E1EAF8] bg-white text-[#405779] hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div className="relative shrink-0">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#64748B]" />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-9 max-w-[145px] appearance-none rounded-lg border border-[#DCE6F5] bg-white py-1.5 pl-9 pr-7 text-xs font-semibold text-[#344563] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            aria-label="Sort notes"
          >
            <option value="recent">Recently Updated</option>
            <option value="oldest">Oldest Updated</option>
          </select>
        </div>
      </div>

      {/* Notes list */}
      <div className="min-h-0 flex-1 overflow-hidden divide-y divide-[#EDF1F7]">
        {visibleNotes.length > 0 ? (
          visibleNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              className="group flex w-full min-w-0 items-center gap-3 py-3 text-left transition hover:bg-[#F8FAFF]"
            >
              {/* Note icon */}
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F6FC] text-[#405779] shadow-sm transition group-hover:bg-blue-50 group-hover:text-blue-600">
                <FileText className="size-5" strokeWidth={1.8} />
              </div>

              {/* Note information */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#172033]">
                  {note.title}
                </h3>

                <p className="mt-1 truncate text-xs text-[#64748B]">
                  {note.description}
                </p>
              </div>

              {/* Updated date */}
              <span className="hidden shrink-0 text-xs text-[#64748B] 2xl:block">
                {note.updatedAt}
              </span>

              {/* Category badge */}
              <span
                className={`hidden shrink-0 rounded-md px-2.5 py-1 text-xs font-medium sm:inline-flex ${
                  categoryStyles[note.category]
                }`}
              >
                {note.category}
              </span>

              {/* Context menu placeholder */}
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-slate-100"
                aria-label={`More options for ${note.title}`}
              >
                <MoreVertical className="size-4" />
              </span>
            </button>
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <FileText className="size-8 text-slate-300" />

            <p className="text-sm font-semibold text-[#344563]">
              No notes found
            </p>

            <p className="text-xs text-[#64748B]">
              There are no notes in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Mobile View All */}
      <Link
        to="/notes"
        className="mt-4 flex shrink-0 items-center justify-center gap-2 border-t border-[#EDF1F7] pt-4 text-sm font-semibold text-[#0866F5] sm:hidden"
      >
        View All Notes
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
};

export default RecentNotes;
