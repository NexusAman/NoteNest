import { useSyncExternalStore } from "react";

import { type NoteCategory } from "./categories";

export type Note = {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  updatedAtLabel: string;
  updatedAtMs: number;
  createdAtMs: number;
  isPinned: boolean;
  isFavorite: boolean;
};

export type NoteDraft = {
  id?: string;
  title: string;
  content: string;
  category: NoteCategory;
};

type NoteSeed = {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  createdAt?: string;
  updatedAt: string;
  updatedAtLabel: string;
  isPinned?: boolean;
  isFavorite?: boolean;
};

/** Notes updated on or after this instant count as Recent. */
export const RECENT_NOTE_AFTER = Date.parse("2026-10-20T00:00:00");

const seed: NoteSeed[] = [
  {
    id: "react-learning",
    title: "React Learning",
    content: [
      "Today I learned about React components, props and state. Here are the key takeaways:",
      "",
      "## 1. Components",
      "Components are the building blocks of a React application. They help us break the UI into smaller, reusable pieces.",
      "",
      "```jsx",
      "function Welcome() {",
      "  return <h1>Hello, React!</h1>;",
      "}",
      "```",
      "",
      "## 2. Props",
      "Props let us pass data from a parent component to a child component.",
      "",
      "```jsx",
      '<Greeting name="Aman" />',
      "```",
      "",
      "## 3. State",
      "State is used to manage data that can change over time, usually with the useState hook.",
      "",
      "```jsx",
      "const [count, setCount] = useState(0);",
      "```",
      "",
      "## Next Steps",
      "- [x] Revise components, props and state",
      "- [ ] Practice by building a small project",
      "- [ ] Learn about useEffect and custom hooks",
    ].join("\n"),
    category: "Personal",
    createdAt: "2026-10-20T09:15:00",
    updatedAt: "2026-10-24T10:30:00",
    updatedAtLabel: "Oct 24, 2026 · 10:30 AM",
    isPinned: true,
  },
  {
    id: "project-ideas",
    title: "Project Ideas",
    content:
      "Ideas for next project and feature list. 1. Notes collaboration...",
    category: "Ideas",
    updatedAt: "2026-10-23T18:15:00",
    updatedAtLabel: "Oct 23, 2026 · 06:15 PM",
    isPinned: true,
    isFavorite: true,
  },
  {
    id: "travel-plan",
    title: "Travel Plan",
    content:
      "Places to visit in Ooty and Varanasi.\n- Ooty: Botanical Garden...",
    category: "Travel",
    updatedAt: "2026-10-22T09:20:00",
    updatedAtLabel: "Oct 22, 2026 · 09:20 AM",
    isFavorite: true,
  },
  {
    id: "dsa-revision",
    title: "DSA Revision",
    content: "Revising important DSA topics:\n- Arrays and Strings...",
    category: "Learning",
    updatedAt: "2026-10-21T08:45:00",
    updatedAtLabel: "Oct 21, 2026 · 08:45 AM",
  },
  {
    id: "team-meeting",
    title: "Team Meeting Notes",
    content:
      "Key points from today's team meeting:\n- Discussed project timeline...",
    category: "Work",
    updatedAt: "2026-10-20T16:30:00",
    updatedAtLabel: "Oct 20, 2026 · 04:30 PM",
  },
  {
    id: "todo-list",
    title: "To Do List",
    content: "☐ Complete DSA practice\n☐ Work on notes app...",
    category: "Personal",
    updatedAt: "2026-10-19T11:10:00",
    updatedAtLabel: "Oct 19, 2026 · 11:10 AM",
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    content: "Notes on useState, useEffect and custom hooks...",
    category: "Learning",
    updatedAt: "2026-10-18T14:30:00",
    updatedAtLabel: "Oct 18, 2026 · 02:30 PM",
  },
  {
    id: "system-design",
    title: "System Design",
    content: "High-level design topics:\n- Scalability, Caching...",
    category: "Learning",
    updatedAt: "2026-10-16T09:00:00",
    updatedAtLabel: "Oct 16, 2026 · 09:00 AM",
  },
  {
    id: "morning-routine",
    title: "Morning Routine",
    content: "Wake up, revise one topic, and plan the day's tasks.",
    category: "Personal",
    updatedAt: "2026-10-15T07:40:00",
    updatedAtLabel: "Oct 15, 2026 · 07:40 AM",
  },
  {
    id: "sprint-goals",
    title: "Sprint Goals",
    content: "Ship note filters, empty states, and the card menu.",
    category: "Work",
    updatedAt: "2026-10-14T15:05:00",
    updatedAtLabel: "Oct 14, 2026 · 03:05 PM",
  },
  {
    id: "packing-list",
    title: "Packing List",
    content: "Clothes, charger, notebook, and copies of tickets.",
    category: "Travel",
    updatedAt: "2026-10-13T19:20:00",
    updatedAtLabel: "Oct 13, 2026 · 07:20 PM",
  },
  {
    id: "javascript-notes",
    title: "JavaScript Notes",
    content: "Closures, promises, and how the event loop schedules work.",
    category: "Learning",
    updatedAt: "2026-10-12T11:15:00",
    updatedAtLabel: "Oct 12, 2026 · 11:15 AM",
  },
  {
    id: "weekend-plans",
    title: "Weekend Plans",
    content: "Finish the notes page and take a walk in the evening.",
    category: "Personal",
    updatedAt: "2026-10-12T08:00:00",
    updatedAtLabel: "Oct 12, 2026 · 08:00 AM",
  },
  {
    id: "app-names",
    title: "App Names",
    content: "Short name ideas for the next side project.",
    category: "Ideas",
    updatedAt: "2026-10-11T17:45:00",
    updatedAtLabel: "Oct 11, 2026 · 05:45 PM",
  },
  {
    id: "client-call",
    title: "Client Call",
    content: "Follow up on the timeline and share the updated scope.",
    category: "Work",
    updatedAt: "2026-10-10T13:30:00",
    updatedAtLabel: "Oct 10, 2026 · 01:30 PM",
  },
  {
    id: "grocery-list",
    title: "Grocery List",
    content: "Milk, eggs, bread, fruit, and coffee.",
    category: "Personal",
    updatedAt: "2026-10-09T18:10:00",
    updatedAtLabel: "Oct 09, 2026 · 06:10 PM",
  },
  {
    id: "css-grid",
    title: "CSS Grid",
    content: "Tracks, gaps, and how to build the notes card layout.",
    category: "Learning",
    updatedAt: "2026-10-08T10:00:00",
    updatedAtLabel: "Oct 08, 2026 · 10:00 AM",
  },
  {
    id: "train-tickets",
    title: "Train Tickets",
    content: "Varanasi return tickets and the station arrival time.",
    category: "Travel",
    updatedAt: "2026-10-07T09:50:00",
    updatedAtLabel: "Oct 07, 2026 · 09:50 AM",
  },
  {
    id: "reading-list",
    title: "Reading List",
    content: "Finish the React chapter and start system design notes.",
    category: "Personal",
    updatedAt: "2026-10-06T20:15:00",
    updatedAtLabel: "Oct 06, 2026 · 08:15 PM",
  },
  {
    id: "release-checklist",
    title: "Release Checklist",
    content: "Review copy, check empty states, and tag the build.",
    category: "Work",
    updatedAt: "2026-10-05T16:40:00",
    updatedAtLabel: "Oct 05, 2026 · 04:40 PM",
  },
  {
    id: "git-commands",
    title: "Git Commands",
    content: "Status, diff, commit, and how to undo a local change.",
    category: "Learning",
    updatedAt: "2026-10-04T12:25:00",
    updatedAtLabel: "Oct 04, 2026 · 12:25 PM",
  },
  {
    id: "journal",
    title: "Journal",
    content: "What went well today and what to pick up tomorrow.",
    category: "Personal",
    updatedAt: "2026-10-03T21:05:00",
    updatedAtLabel: "Oct 03, 2026 · 09:05 PM",
  },
  {
    id: "side-project",
    title: "Side Project",
    content: "A small tool for organising study notes by topic.",
    category: "Ideas",
    updatedAt: "2026-10-02T15:35:00",
    updatedAtLabel: "Oct 02, 2026 · 03:35 PM",
  },
  {
    id: "budget-notes",
    title: "Budget Notes",
    content: "Track this month's spending and set aside travel money.",
    category: "Personal",
    updatedAt: "2026-09-28T11:00:00",
    updatedAtLabel: "Sep 28, 2026 · 11:00 AM",
  },
];

function toNote(item: NoteSeed): Note {
  const updatedAtMs = Date.parse(item.updatedAt);

  return {
    id: item.id,
    title: item.title,
    content: item.content,
    category: item.category,
    updatedAtLabel: item.updatedAtLabel,
    updatedAtMs,
    createdAtMs: Date.parse(item.createdAt ?? item.updatedAt),
    isPinned: item.isPinned ?? false,
    isFavorite: item.isFavorite ?? false,
  };
}

let notes: Note[] = seed.map(toNote);
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setNotes(next: Note[]) {
  notes = next;
  emit();
}

export function formatNoteDateTime(ms: number) {
  const date = new Date(ms);
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} · ${timePart}`;
}

export function noteExcerpt(content: string) {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^##\s+/gm, "")
    .replace(/^- \[[ xX]\]\s+/gm, "")
    .trim();

  const firstBlock = cleaned.split(/\n\s*\n/)[0] ?? "";
  return firstBlock.replace(/[ \t]+/g, " ").trim();
}

export function countNoteWords(content: string) {
  const plain = content
    .replace(/```[\w-]*\n?/g, " ")
    .replace(/```/g, " ")
    .replace(/^##\s+/gm, "")
    .replace(/^- \[[ xX]\]\s+/gm, "")
    .replace(/^- /gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return 0;
  return plain.split(/\s+/).length;
}

export function formatNoteTimestamp(date = new Date()) {
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${datePart} · ${timePart}`;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getNotes() {
  return notes;
}

export function useNotes() {
  return useSyncExternalStore(subscribe, getNotes, getNotes);
}

export function toggleNotePinned(id: string) {
  setNotes(
    notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note,
    ),
  );
}

export function toggleNoteFavorite(id: string) {
  setNotes(
    notes.map((note) =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note,
    ),
  );
}

export function deleteNote(id: string) {
  setNotes(notes.filter((note) => note.id !== id));
}

export function toggleNoteTask(id: string, taskIndex: number) {
  setNotes(
    notes.map((note) => {
      if (note.id !== id) return note;

      let seen = 0;
      const content = note.content
        .split("\n")
        .map((line) => {
          const match = line.match(/^(- \[)([ xX])(\] .*)$/);
          if (!match) return line;
          const current = seen;
          seen += 1;
          if (current !== taskIndex) return line;
          const mark = match[2].toLowerCase() === "x" ? " " : "x";
          return `${match[1]}${mark}${match[3]}`;
        })
        .join("\n");

      return { ...note, content };
    }),
  );
}

export function saveNote(draft: NoteDraft) {
  const title = draft.title.trim();
  const content = draft.content.trim();
  const now = new Date();

  if (draft.id) {
    setNotes(
      notes.map((note) =>
        note.id === draft.id
          ? {
              ...note,
              title,
              content,
              category: draft.category,
              updatedAtMs: now.getTime(),
              updatedAtLabel: formatNoteTimestamp(now),
            }
          : note,
      ),
    );
    return;
  }

  const created: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    category: draft.category,
    updatedAtMs: now.getTime(),
    updatedAtLabel: formatNoteTimestamp(now),
    createdAtMs: now.getTime(),
    isPinned: false,
    isFavorite: false,
  };

  setNotes([created, ...notes]);
}
