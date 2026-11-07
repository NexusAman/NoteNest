
import { ArrowUpDown, LayoutGrid, List } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export type NotesView = "grid" | "list";

const sortItems = [
  { value: "updated", label: "Recently Updated" },
  { value: "oldest", label: "Oldest Updated" },
  { value: "created", label: "Date Created" },
  { value: "alphabetical", label: "Alphabetical" },
];

interface NotesToolbarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  view: NotesView;
  onViewChange: (value: NotesView) => void;
}

export function NotesToolbar({
  sortBy,
  onSortChange,
  view,
  onViewChange,
}: NotesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Sorting and View Controls */}
      <div className="flex min-w-0 items-center gap-2">
        <Select
          items={sortItems}
          value={sortBy}
          onValueChange={(value) => {
            if (typeof value === "string") onSortChange(value);
          }}
        >
          <SelectTrigger
            className="h-9 w-[172px] rounded-lg border-[#DCE6F5] bg-white
            px-3 text-xs font-semibold text-[#344563] shadow-none
            focus:ring-2 focus:ring-blue-100"
            aria-label="Sort notes"
          >
            <ArrowUpDown className="size-3.5 text-[#64748B]" />
            <SelectValue placeholder="Sort notes" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="updated">Recently Updated</SelectItem>
            <SelectItem value="oldest">Oldest Updated</SelectItem>
            <SelectItem value="created">Date Created</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup
          value={[view]}
          onValueChange={(values) => {
            const value = values[0];
            if (value === "grid" || value === "list") {
              onViewChange(value);
            }
          }}
          className="h-9 gap-0 rounded-lg border border-[#DCE6F5] bg-white p-1"
          aria-label="Notes layout"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="size-7 rounded-md text-[#64748B]
            data-[state=on]:bg-[#EAF2FF]
            data-[state=on]:text-[#0866F5]
            hover:bg-[#F3F6FC]"
          >
            <LayoutGrid className="size-3.5" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="size-7 rounded-md text-[#64748B]
            data-[state=on]:bg-[#EAF2FF]
            data-[state=on]:text-[#0866F5]
            hover:bg-[#F3F6FC]"
          >
            <List className="size-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

    </div>
  );
}
