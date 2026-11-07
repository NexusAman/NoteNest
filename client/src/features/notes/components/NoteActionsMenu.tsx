import { MoreVertical, Pencil, Pin, Star, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Note } from "@/features/notes/data/notes";

interface NoteActionsMenuProps {
  note: Note;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteActionsMenu({
  note,
  onTogglePin,
  onToggleFavorite,
  onEdit,
  onDelete,
}: NoteActionsMenuProps) {
  return (
    <DropdownMenu key={`${note.isPinned}-${note.isFavorite}`}>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`Actions for ${note.title}`}
            className="flex size-7 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#F3F6FC] hover:text-[#172033]"
          />
        }
      >
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
        <DropdownMenuItem
          className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[#172033]"
          onClick={() => onTogglePin(note.id)}
        >
          <Pin className="size-4 text-[#64748B]" />
          {note.isPinned ? "Unpin Note" : "Pin Note"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[#172033]"
          onClick={() => onToggleFavorite(note.id)}
        >
          <Star className="size-4 text-[#64748B]" />
          {note.isFavorite ? "Remove from Favourites" : "Add to Favourites"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[#172033]"
          onClick={() => onEdit(note)}
        >
          <Pencil className="size-4 text-[#64748B]" />
          Edit Note
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="size-4" />
          Delete Note
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
