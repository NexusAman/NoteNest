import type { ReactNode } from "react";
import { Calendar, Info, Tag, TextAlignStart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getCategory } from "@/features/notes/data/categories";
import {
  countNoteWords,
  formatNoteDateTime,
  type Note,
} from "@/features/notes/data/notes";

interface NoteInfoPanelProps {
  note: Note;
}

export function NoteInfoPanel({ note }: NoteInfoPanelProps) {
  const category = getCategory(note.category);
  const words = countNoteWords(note.content);

  return (
    <aside className="rounded-2xl border border-[#E1EAF8] bg-white p-5 shadow-[0_3px_12px_rgba(31,65,114,0.05)]">
      <div className="mb-2 flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#E8F1FF] text-[#0866F5]">
          <Info className="size-4" />
        </span>
        <h2 className="text-base font-semibold text-[#172033]">Note Info</h2>
      </div>

      <div className="divide-y divide-[#F1F5F9]">
        <InfoRow icon={Tag} label="Category">
          <span
            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${category.badgeClass}`}
          >
            {note.category}
          </span>
        </InfoRow>
        <InfoRow icon={Calendar} label="Created">
          {formatNoteDateTime(note.createdAtMs)}
        </InfoRow>
        <InfoRow icon={Calendar} label="Last Updated">
          {formatNoteDateTime(note.updatedAtMs)}
        </InfoRow>
        <InfoRow icon={TextAlignStart} label="Word Count">
          {words} {words === 1 ? "word" : "words"}
        </InfoRow>
      </div>
    </aside>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5">
      <div className="flex items-center gap-2.5 text-sm text-[#64748B]">
        <Icon className="size-4 shrink-0" />
        {label}
      </div>
      <div className="text-right text-sm font-medium text-[#172033]">
        {children}
      </div>
    </div>
  );
}
