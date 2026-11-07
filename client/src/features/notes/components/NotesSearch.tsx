
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NotesSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function NotesSearch({
  value,
  onChange,
  placeholder = "Search your notes...",
  className,
}: NotesSearchProps) {
  return (
    <div className={`relative w-full sm:w-64 ${className ?? ""}`}>
      <Search
        className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search your notes"
        className="h-10 rounded-xl bg-background pl-9 pr-9 shadow-sm"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
