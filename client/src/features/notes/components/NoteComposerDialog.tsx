import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NOTE_CATEGORIES,
  type NoteCategory,
} from "@/features/notes/data/categories";
import { type Note, type NoteDraft } from "@/features/notes/data/notes";

interface NoteComposerDialogProps {
  mode: "create" | "edit";
  note?: Note;
  defaultCategory: NoteCategory;
  onClose: () => void;
  onSave: (draft: NoteDraft) => void;
}

export function NoteComposerDialog({
  mode,
  note,
  defaultCategory,
  onClose,
  onSave,
}: NoteComposerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [category, setCategory] = useState<NoteCategory>(
    note?.category ?? defaultCategory,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onSave({
      id: note?.id,
      title,
      content,
      category,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed top-1/2 left-1/2 w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#E1EAF8] bg-white p-0 shadow-xl backdrop:bg-[#0F172A]/40"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
        <div>
          <h2 id={titleId} className="text-lg font-semibold text-[#172033]">
            {mode === "edit" ? "Edit Note" : "Add Note"}
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            {mode === "edit"
              ? "Update the title, content, or category."
              : "Capture an idea, task, or note."}
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="note-title" className="text-sm font-medium text-[#344563]">
            Title
          </label>
          <Input
            id="note-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (error) setError("");
            }}
            placeholder="Note title"
            autoFocus
            className="h-10 rounded-lg border-[#DCE6F5] bg-white px-3 shadow-none"
          />
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="note-content" className="text-sm font-medium text-[#344563]">
            Content
          </label>
          <textarea
            id="note-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note..."
            className="min-h-32 w-full rounded-lg border border-[#DCE6F5] bg-white px-3 py-2 text-sm text-[#172033] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-1.5">
          <span className="text-sm font-medium text-[#344563]">Category</span>
          <Select
            value={category}
            onValueChange={(next) => {
              const match = NOTE_CATEGORIES.find((item) => item.name === next);
              if (match) setCategory(match.name);
            }}
          >
            <SelectTrigger
              className="h-10 w-full rounded-lg border-[#DCE6F5] bg-white px-3 text-sm font-medium text-[#344563] shadow-none"
              aria-label="Note category"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NOTE_CATEGORIES.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 rounded-lg px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-10 rounded-lg bg-[#0866F5] px-4 font-semibold text-white hover:bg-blue-700"
          >
            {mode === "edit" ? "Save Changes" : "Add Note"}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
