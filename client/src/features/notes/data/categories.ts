export const NOTE_CATEGORIES = [
  {
    name: "Personal",
    color: "#22C55E",
    badgeClass: "bg-[#E7F8EE] text-[#15803D]",
  },
  {
    name: "Work",
    color: "#F59E0B",
    badgeClass: "bg-[#FEF3C7] text-[#B45309]",
  },
  {
    name: "Learning",
    color: "#6366F1",
    badgeClass: "bg-[#EEF2FF] text-[#4F46E5]",
  },
  {
    name: "Ideas",
    color: "#EC4899",
    badgeClass: "bg-[#FCE7F3] text-[#BE185D]",
  },
  {
    name: "Travel",
    color: "#EF4444",
    badgeClass: "bg-[#FEE2E2] text-[#DC2626]",
  },
] as const;

export type NoteCategory = (typeof NOTE_CATEGORIES)[number]["name"];

export function isNoteCategory(value: string | null): value is NoteCategory {
  return NOTE_CATEGORIES.some((category) => category.name === value);
}

export function getCategory(name: NoteCategory) {
  const category = NOTE_CATEGORIES.find((item) => item.name === name);
  if (!category) {
    throw new Error(`Unknown category: ${name}`);
  }
  return category;
}
