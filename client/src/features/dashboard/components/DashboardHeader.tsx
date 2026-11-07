import { useState, type ReactNode } from "react";
import { Bell, Search, X } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  variant?: "page" | "bar";
}

const libraryPaths = ["/notes", "/favourites"];

const HeaderActions = ({ spread = false }: { spread?: boolean }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState("");
  const isLibrary = libraryPaths.includes(pathname);
  const value = isLibrary ? (searchParams.get("q") ?? "") : localQuery;

  const updateQuery = (next: string) => {
    if (!isLibrary) {
      setLocalQuery(next);
      return;
    }

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next) params.set("q", next);
        else params.delete("q");
        return params;
      },
      { replace: true },
    );
  };

  const search = (
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

        <Input
          value={value}
          onChange={(event) => updateQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !isLibrary) {
              const next = localQuery.trim();
              navigate(next ? `/notes?q=${encodeURIComponent(next)}` : "/notes");
            }
          }}
          placeholder="Search your notes..."
          aria-label="Search your notes"
          className={`h-10 border-slate-200 bg-white pl-9 shadow-none focus-visible:ring-blue-500 ${value ? "pr-9" : ""}`}
        />

        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => updateQuery("")}
            className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
  );

  const tools = (
    <>
      <button
        type="button"
        className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-blue-500 ring-2 ring-white" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
            />
          }
        >
          <Avatar className="size-9 cursor-pointer">
            <AvatarFallback className="bg-blue-100 font-medium text-blue-700">
              AK
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  if (spread) {
    return (
      <>
        {search}
        <div className="flex shrink-0 items-center gap-3">{tools}</div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {search}
      {tools}
    </div>
  );
};

const DashboardHeader = ({
  title = "Dashboard",
  description = "Welcome back, Aman 👋",
  actions,
  variant = "page",
}: DashboardHeaderProps) => {
  if (variant === "bar") {
    return (
      <header className="flex items-center justify-between gap-4">
        <HeaderActions spread />
      </header>
    );
  }

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <HeaderActions />
        {actions}
      </div>
    </header>
  );
};

export default DashboardHeader;
