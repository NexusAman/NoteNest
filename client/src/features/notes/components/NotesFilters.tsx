import { Clock, Folder, Pin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

export type NotesStatus = "all" | "recent" | "pinned";

const statuses: { value: NotesStatus; label: string; icon?: LucideIcon }[] = [
  { value: "all", label: "All" },
  { value: "recent", label: "Recent", icon: Clock },
  { value: "pinned", label: "Pinned", icon: Pin },
];

interface NotesStatusFilterProps {
  value: NotesStatus;
  onChange: (value: NotesStatus) => void;
}

export function NotesStatusFilter({ value, onChange }: NotesStatusFilterProps) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Filter notes">
      {statuses.map((status) => {
        const selected = value === status.value;

        const Icon = status.icon;

        return (
          <button
            key={status.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(status.value)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              selected
                ? "bg-[#0866F5] text-white shadow-sm"
                : "border border-[#E1EAF8] bg-white text-[#344563] hover:bg-[#F4F7FC]"
            }`}
          >
            {Icon && <Icon className="size-3.5" />}
            {status.label}
          </button>
        );
      })}
    </div>
  );
}

interface NotesCategorySelectProps {
  value: NoteCategory | "all";
  onChange: (value: NoteCategory | "all") => void;
}

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function NotesCategorySelect({
  value,
  onChange,
}: NotesCategorySelectProps) {
  const selected =
    value === "all"
      ? null
      : NOTE_CATEGORIES.find((category) => category.name === value);

  const items = [
    { value: "all", label: "All Categories" },
    ...NOTE_CATEGORIES.map((category) => ({
      value: category.name,
      label: category.name,
    })),
  ];

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => {
        if (!next || next === "all") {
          onChange("all");
          return;
        }

        const match = NOTE_CATEGORIES.find((category) => category.name === next);
        if (match) onChange(match.name);
      }}
    >
      <SelectTrigger
        className="h-9 min-w-[158px] rounded-lg border-[#DCE6F5] bg-white px-3 text-xs font-semibold text-[#344563] shadow-none focus:ring-2 focus:ring-blue-100"
        style={
          selected
            ? {
                backgroundColor: hexToRgba(selected.color, 0.14),
                borderColor: hexToRgba(selected.color, 0.45),
                color: selected.color,
              }
            : undefined
        }
        aria-label="Filter by category"
      >
        <Folder className="size-3.5 text-[#64748B]" />
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {NOTE_CATEGORIES.map((category) => (
          <SelectItem key={category.name} value={category.name}>
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
