import { Clock, FileText, Pin, Plus, Search, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export type NotesEmptyKind =
  | "none"
  | "category"
  | "search"
  | "pinned"
  | "recent"
  | "favourites";

interface NotesEmptyStateProps {
  kind: NotesEmptyKind;
  category?: string;
  onAddNote?: () => void;
}

const copy: Record<
  NotesEmptyKind,
  { title: string; description: string }
> = {
  none: {
    title: "No notes yet",
    description: "Create your first note to capture your ideas, tasks and more.",
  },
  category: {
    title: "No notes in this category",
    description: "You haven't created any notes in this category yet.",
  },
  search: {
    title: "No notes found",
    description: "Try another title or keyword.",
  },
  pinned: {
    title: "No pinned notes",
    description: "Pin a note from its menu to keep it in this view.",
  },
  recent: {
    title: "No recent notes",
    description: "Notes you update will show up here.",
  },
  favourites: {
    title: "No favourite notes",
    description: "Star a note to keep it in this list.",
  },
};

export function NotesEmptyState({
  kind,
  category,
  onAddNote,
}: NotesEmptyStateProps) {
  const content = copy[kind];
  const title =
    kind === "category" && category
      ? `No notes in "${category}"`
      : content.title;
  const showAdd = kind === "none" || kind === "category";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative mb-5 flex size-28 items-center justify-center">
        <span className="absolute size-24 rounded-full bg-[#E8F1FF]" />
        <EmptyIcon kind={kind} />
      </div>

      <h2 className="text-lg font-semibold text-[#172033]">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-[#64748B]">
        {content.description}
      </p>

      {showAdd && onAddNote && (
        <Button
          onClick={onAddNote}
          className="mt-5 h-10 gap-2 rounded-lg bg-[#0866F5] px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="size-4" />
          Add Note
        </Button>
      )}
    </div>
  );
}

function EmptyIcon({ kind }: { kind: NotesEmptyKind }) {
  if (kind === "none") {
    return (
      <>
        <FileText className="relative size-11 text-[#0866F5]" strokeWidth={1.6} />
        <Sparkles className="absolute top-4 right-4 size-5 text-[#60A5FA]" />
      </>
    );
  }

  const Icon =
    kind === "pinned" ? Pin : kind === "recent" ? Clock : kind === "favourites" ? Star : Search;

  return <Icon className="relative size-10 text-[#0866F5]" strokeWidth={1.7} />;
}
