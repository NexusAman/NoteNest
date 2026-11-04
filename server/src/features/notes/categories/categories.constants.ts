export const DEFAULT_CATEGORIES = [
  { name: "Personal", color: "#22C55E", isDefault: true },
  { name: "Work", color: "#3B82F6", isDefault: false },
  { name: "Learning", color: "#A855F7", isDefault: false },
  { name: "Ideas", color: "#F59E0B", isDefault: false },
  { name: "Travel", color: "#EC4899", isDefault: false },
] as const;

export default DEFAULT_CATEGORIES;