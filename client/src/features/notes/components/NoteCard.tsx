import { Calendar, Pin, Star } from "lucide-react";
import { Link, useLocation } from "react-router";

import { getCategory } from "@/features/notes/data/categories";
import { noteExcerpt, type Note } from "@/features/notes/data/notes";
import { type NotesView } from "@/features/notes/components/NotesToolbar";

import { NoteActionsMenu } from "./NoteActionsMenu";

interface NoteCardProps {
  note: Note;
  view: NotesView;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

function CategoryBadge({ category }: { category: Note["category"] }) {
  const meta = getCategory(category);

  return (
    <span
      className={`inline-flex w-fit rounded-md px-2.5 py-1 text-xs font-medium ${meta.badgeClass}`}
    >
      {category}
    </span>
  );
}

function NoteDate({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
      <Calendar className="size-3.5 shrink-0" />
      <time>{label}</time>
    </p>
  );
}

const cardClass =
  "rounded-2xl border border-[#E6EEF8] bg-white shadow-[0_3px_12px_rgba(31,65,114,0.05)] transition hover:border-[#C9DBF8]";

function NoteMarks({
  note,
  onTogglePin,
  onToggleFavorite,
}: {
  note: Note;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  if (!note.isPinned && !note.isFavorite) return null;

  return (
    <div className="flex shrink-0 items-center">
      {note.isPinned && (
        <button
          type="button"
          aria-label="Unpin note"
          aria-pressed="true"
          onClick={() => onTogglePin(note.id)}
          className="flex size-7 items-center justify-center rounded-lg text-[#0866F5] hover:bg-[#F3F7FD]"
        >
          <Pin className="size-4 fill-[#0866F5]" />
        </button>
      )}
      {note.isFavorite && (
        <button
          type="button"
          aria-label="Remove from favourites"
          aria-pressed="true"
          onClick={() => onToggleFavorite(note.id)}
          className="flex size-7 items-center justify-center rounded-lg text-[#F5B942] hover:bg-[#F3F7FD]"
        >
          <Star className="size-4 fill-[#F5B942]" />
        </button>
      )}
    </div>
  );
}

export function NoteCard({
  note,
  view,
  onTogglePin,
  onToggleFavorite,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const location = useLocation();
  const excerpt = noteExcerpt(note.content);
  const to = `/notes/${note.id}`;
  const state = { from: `${location.pathname}${location.search}` };

  const menu = (
    <NoteActionsMenu
      note={note}
      onTogglePin={onTogglePin}
      onToggleFavorite={onToggleFavorite}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

  if (view === "list") {
    return (
      <article className={`flex items-center gap-4 px-4 py-3.5 ${cardClass}`}>
        <Link
          to={to}
          state={state}
          className="flex min-w-0 flex-1 items-center gap-4"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-[15px] font-bold text-[#172033]">
                {note.title}
              </h3>
              <CategoryBadge category={note.category} />
            </div>
            <p className="mt-1 truncate text-[13px] text-[#64748B]">{excerpt}</p>
          </div>
          <NoteDate label={note.updatedAtLabel} />
        </Link>
        <NoteMarks
          note={note}
          onTogglePin={onTogglePin}
          onToggleFavorite={onToggleFavorite}
        />
        {menu}
      </article>
    );
  }

  return (
    <article className={`flex h-full flex-col p-4 sm:p-5 ${cardClass}`}>
      <div className="flex items-start justify-between gap-3">
        <Link to={to} state={state} className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold text-[#172033]">
            {note.title}
          </h3>
        </Link>
        <NoteMarks
          note={note}
          onTogglePin={onTogglePin}
          onToggleFavorite={onToggleFavorite}
        />
        {menu}
      </div>

      <Link to={to} state={state} className="mt-2 flex flex-1 flex-col">
        <NoteDate label={note.updatedAtLabel} />
        <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-5 whitespace-pre-line text-[#64748B]">
          {excerpt}
        </p>
        <div className="mt-4">
          <CategoryBadge category={note.category} />
        </div>
      </Link>
    </article>
  );
}
