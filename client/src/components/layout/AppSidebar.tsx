import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router";
import {
  LayoutDashboard,
  NotebookText,
  Star,
  Trash2,
  Plus,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { NOTE_CATEGORIES } from "@/features/notes/data/categories";
import { useNotes } from "@/features/notes/data/notes";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Notes",
    href: "/notes",
    icon: NotebookText,
  },
  {
    title: "Favourites",
    href: "/favourites",
    icon: Star,
  },
  {
    title: "Trash",
    href: "/trash",
    icon: Trash2,
  },
];

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AppSidebar = () => {
  const notes = useNotes();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const onLibraryPage = pathname === "/notes" || pathname === "/favourites";

  return (
    <aside className="sticky top-0 flex h-dvh w-[260px] shrink-0 flex-col overflow-hidden border-r border-[#E2EAF5] bg-white">
      {/* Logo */}
      <div className="mb-5 flex items-center gap-2 px-3 shrink-0">
        <a href="/dashboard">
          <img
            src="/images/notenest-logo.png"
            className="h-16 fill-[#0866F5] text-[#0866F5] mt-4"
          />
        </a>
      </div>
      <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto px-5">
        {/* Main navigation */}
        <nav className="space-y-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8F1FF] text-[#0866F5]"
                      : "text-[#344563] hover:bg-[#F4F7FC] hover:text-[#0866F5]"
                  }`
                }
              >
                <Icon className="size-5 shrink-0" strokeWidth={2} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Categories */}
        <div className="mt-6 border-t border-[#E5ECF6] pt-5">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-[#344563]">Categories</h2>

            <button
              type="button"
              aria-label="Add category"
              className="flex size-8 items-center justify-center rounded-lg border border-[#E1EAF8] text-[#344563] transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="space-y-1">
            {NOTE_CATEGORIES.map((category) => {
              const selected =
                onLibraryPage && activeCategory === category.name;
              const count = notes.filter(
                (note) => note.category === category.name,
              ).length;

              return (
                <button
                  key={category.name}
                  type="button"
                  aria-current={selected ? "true" : undefined}
                  onClick={() => {
                    if (selected && pathname === "/notes") {
                      navigate("/notes");
                      return;
                    }

                    navigate(
                      `/notes?category=${encodeURIComponent(category.name)}`,
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-[#F4F7FC]"
                  style={
                    selected
                      ? { backgroundColor: hexToRgba(category.color, 0.12) }
                      : undefined
                  }
                >
                  <span
                    className="size-3.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: category.color,
                      boxShadow: `0 0 0 3px ${hexToRgba(category.color, 0.12)},
                0 0 10px 2px ${hexToRgba(category.color, 0.2)}`,
                    }}
                  />

                  <span className="flex-1 text-sm font-medium text-[#344563]">
                    {category.name}
                  </span>

                  <span className="rounded-full bg-[#F0F4FA] px-2.5 py-1 text-xs font-medium text-[#344563]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-3">
        <div className="rounded-xl border border-[#DCE8FF] bg-gradient-to-br from-[#F5F8FF] to-[#E2ECFF] p-3">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF1C9] text-[#D99A20]">
              <Crown size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold text-[#17233D]">
                Upgrade to Pro
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Unlock more with NoteNest
              </p>
            </div>
          </div>

          <Button className="h-8 w-full rounded-lg bg-[#2F65ED] text-xs font-semibold text-white shadow-sm hover:bg-[#2457D6]">
            Explore Plans
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
