
import type { ReactNode } from "react";

interface NotesHeaderProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export function NotesHeader({
  title = "All Notes",
  description = "Manage, search and organize your notes.",
  actions,
}: NotesHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
}
