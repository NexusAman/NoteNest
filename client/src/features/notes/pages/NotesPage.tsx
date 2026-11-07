import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { NoteCard } from "@/features/notes/components/NoteCard";
import { NoteComposerDialog } from "@/features/notes/components/NoteComposerDialog";
import {
  NotesCategorySelect,
  NotesStatusFilter,
  type NotesStatus,
} from "@/features/notes/components/NotesFilters";
import {
  NotesEmptyState,
  type NotesEmptyKind,
} from "@/features/notes/components/NotesEmptyState";
import {
  NOTES_PAGE_SIZE,
  NotesPagination,
} from "@/features/notes/components/NotesPagination";
import {
  NotesToolbar,
  type NotesView,
} from "@/features/notes/components/NotesToolbar";
import {
  isNoteCategory,
  type NoteCategory,
} from "@/features/notes/data/categories";
import {
  deleteNote,
  RECENT_NOTE_AFTER,
  saveNote,
  toggleNoteFavorite,
  toggleNotePinned,
  useNotes,
  type Note,
  type NoteDraft,
} from "@/features/notes/data/notes";

interface NotesPageProps {
  variant?: "all" | "favourites";
}

type ComposerState =
  | { mode: "create" }
  | { mode: "edit"; note: Note }
  | null;

export default function NotesPage({ variant = "all" }: NotesPageProps) {
  const notes = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState<NotesStatus>("all");
  const [sortBy, setSortBy] = useState("updated");
  const [view, setView] = useState<NotesView>("grid");
  const [page, setPage] = useState(1);
  const [composer, setComposer] = useState<ComposerState>(null);

  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const category: NoteCategory | "all" = isNoteCategory(categoryParam)
    ? categoryParam
    : "all";

  const setCategory = (next: NoteCategory | "all") => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next === "all") params.delete("category");
      else params.set("category", next);
      return params;
    });
  };

  const visibleNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = notes.filter((note) => {
      if (variant === "favourites" && !note.isFavorite) return false;
      if (variant === "all" && status === "pinned" && !note.isPinned) return false;
      if (variant === "all" && status === "recent" && note.updatedAtMs < RECENT_NOTE_AFTER) {
        return false;
      }
      if (category !== "all" && note.category !== category) return false;
      if (!normalizedQuery) return true;

      return (
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.content.toLowerCase().includes(normalizedQuery)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") return a.updatedAtMs - b.updatedAtMs;
      if (sortBy === "created") return b.createdAtMs - a.createdAtMs;
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return b.updatedAtMs - a.updatedAtMs;
    });
  }, [notes, variant, status, category, query, sortBy]);

  const pageCount = Math.max(1, Math.ceil(visibleNotes.length / NOTES_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageNotes = visibleNotes.slice(
    (currentPage - 1) * NOTES_PAGE_SIZE,
    currentPage * NOTES_PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [status, category, query, sortBy, variant]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const emptyKind: NotesEmptyKind = (() => {
    const categoryNotes =
      category === "all"
        ? notes
        : notes.filter((note) => note.category === category);

    if (notes.length === 0) return "none";
    if (query.trim()) return "search";
    if (category !== "all" && categoryNotes.length === 0) return "category";
    if (variant === "favourites") return "favourites";
    if (status === "pinned") return "pinned";
    if (status === "recent") return "recent";
    return "none";
  })();

  const openCreate = () => setComposer({ mode: "create" });

  const handleSave = (draft: NoteDraft) => {
    saveNote(draft);
    setComposer(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {variant === "all" && (
          <NotesStatusFilter value={status} onChange={setStatus} />
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <NotesCategorySelect value={category} onChange={setCategory} />
          <NotesToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            view={view}
            onViewChange={setView}
          />
          <Button
            onClick={openCreate}
            className="h-9 gap-2 rounded-lg bg-[#0866F5] px-3.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="size-3.5" />
            Add Note
          </Button>
        </div>
      </div>

      {visibleNotes.length === 0 ? (
        <NotesEmptyState
          kind={emptyKind}
          category={category === "all" ? undefined : category}
          onAddNote={openCreate}
        />
      ) : (
        <>
          <ul
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-3"
            }
          >
            {pageNotes.map((note) => (
              <li key={note.id} className="min-w-0">
                <NoteCard
                  note={note}
                  view={view}
                  onTogglePin={toggleNotePinned}
                  onToggleFavorite={toggleNoteFavorite}
                  onEdit={(current) =>
                    setComposer({ mode: "edit", note: current })
                  }
                  onDelete={deleteNote}
                />
              </li>
            ))}
          </ul>

          <NotesPagination
            page={currentPage}
            total={visibleNotes.length}
            onPageChange={setPage}
          />
        </>
      )}

      {composer && (
        <NoteComposerDialog
          mode={composer.mode}
          note={composer.mode === "edit" ? composer.note : undefined}
          defaultCategory={category === "all" ? "Personal" : category}
          onClose={() => setComposer(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
