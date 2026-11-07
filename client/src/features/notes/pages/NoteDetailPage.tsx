import { useState, type ReactNode } from "react";
import { ArrowLeft, Calendar, Pin, Star } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

import { NoteActionsMenu } from "@/features/notes/components/NoteActionsMenu";
import { NoteComposerDialog } from "@/features/notes/components/NoteComposerDialog";
import { NoteContent } from "@/features/notes/components/NoteContent";
import { NoteInfoPanel } from "@/features/notes/components/NoteInfoPanel";
import {
  deleteNote,
  formatNoteDateTime,
  saveNote,
  toggleNoteFavorite,
  toggleNotePinned,
  toggleNoteTask,
  useNotes,
  type NoteDraft,
} from "@/features/notes/data/notes";

export default function NoteDetailPage() {
  const { noteId } = useParams();
  const notes = useNotes();
  const navigate = useNavigate();
  const location = useLocation();
  const note = notes.find((item) => item.id === noteId);
  const [editing, setEditing] = useState(false);

  const from = (location.state as { from?: string } | null)?.from;
  const backTo = from?.startsWith("/") ? from : "/notes";

  if (!note) {
    return (
      <div className="rounded-2xl border border-[#E1EAF8] bg-white px-6 py-16 text-center">
        <h1 className="text-lg font-semibold text-[#172033]">Note not found</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          This note may have been deleted.
        </p>
        <Link
          to="/notes"
          className="mt-4 inline-flex text-sm font-semibold text-[#0866F5]"
        >
          Back to notes
        </Link>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    deleteNote(id);
    navigate(backTo);
  };

  const handleSave = (draft: NoteDraft) => {
    saveNote(draft);
    setEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-2 text-lg font-semibold text-[#172033]"
        >
          <ArrowLeft className="size-5" />
          Note Details
        </button>

        <div className="flex items-center gap-1">
          <IconToggle
            label={note.isPinned ? "Unpin note" : "Pin note"}
            pressed={note.isPinned}
            onClick={() => toggleNotePinned(note.id)}
          >
            <Pin
              className={`size-[18px] ${
                note.isPinned ? "fill-[#0866F5] text-[#0866F5]" : "text-[#64748B]"
              }`}
            />
          </IconToggle>
          <IconToggle
            label={
              note.isFavorite ? "Remove from favourites" : "Add to favourites"
            }
            pressed={note.isFavorite}
            onClick={() => toggleNoteFavorite(note.id)}
          >
            <Star
              className={`size-[18px] ${
                note.isFavorite
                  ? "fill-[#F5B942] text-[#F5B942]"
                  : "text-[#64748B]"
              }`}
            />
          </IconToggle>
          <NoteActionsMenu
            note={note}
            onTogglePin={toggleNotePinned}
            onToggleFavorite={toggleNoteFavorite}
            onEdit={() => setEditing(true)}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <article className="rounded-2xl border border-[#E6EEF8] bg-white px-6 py-6 shadow-[0_8px_24px_rgba(31,65,114,0.05)] sm:px-8 sm:py-7">
          <h1 className="text-[26px] font-bold tracking-tight text-[#0F172A]">
            {note.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-[#94A3B8]">
            <Calendar className="size-4" />
            Last updated: {formatNoteDateTime(note.updatedAtMs)}
          </p>
          <hr className="my-5 border-[#EEF2F7]" />
          <NoteContent
            content={note.content}
            onToggleTask={(taskIndex) => toggleNoteTask(note.id, taskIndex)}
          />
        </article>

        <NoteInfoPanel note={note} />
      </div>

      {editing && (
        <NoteComposerDialog
          mode="edit"
          note={note}
          defaultCategory={note.category}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function IconToggle({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-lg transition hover:bg-white"
    >
      {children}
    </button>
  );
}

