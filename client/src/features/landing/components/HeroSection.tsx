import {
  ArrowRight,
  Check,
  Plus,
  Search,
  Star,
  Trash2,
  Pencil,
  BookOpen,
  Settings,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const notes = [
  {
    title: "React Learning",
    date: "Oct 24, 2026 · 10:30 AM",
    content: "Today I learned about React components, props and state...",
    category: "Learning",
    color: "blue",
  },
  {
    title: "Project Ideas",
    date: "Oct 23, 2026 · 06:15 PM",
    content:
      "1. Student Productivity Manager\n2. Enviro Monitor\n3. Travel Planner",
    category: "Ideas",
    color: "purple",
  },
  {
    title: "Travel Plan",
    date: "Oct 22, 2026 · 09:20 AM",
    content: "– Darjeeling\n– Ooty\n– Varanasi",
    category: "Travel",
    color: "red",
  },
  {
    title: "To Do List",
    date: "Oct 21, 2026 · 08:45 AM",
    content: "– Complete DSA practice\n– Work on notes app\n– Go to gym",
    category: "Personal",
    color: "green",
  },
];

const categories = [
  { name: "Personal", color: "bg-green-500" },
  { name: "Work", color: "bg-amber-400" },
  { name: "Learning", color: "bg-violet-500" },
  { name: "Ideas", color: "bg-fuchsia-500" },
  { name: "Travel", color: "bg-red-500" },
];

const DashboardPreview = () => {
  return (
    <div className="relative w-full">
      {/* Decorative background */}
      <div className="absolute -right-8 -top-6 h-64 w-64 rounded-full bg-blue-100/70 blur-[1px]" />

      {/* Dashboard window */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(30,64,175,0.14)]">
        {/* Window controls */}
        <div className="flex h-7 items-center gap-1.5 border-b border-slate-200 bg-slate-50/80 px-4">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>

        <div className="flex min-h-75">
          {/* Sidebar */}
          <aside className="hidden w-[28%] shrink-0 border-r border-slate-200 bg-slate-50/70 p-3 sm:block">
            <div className="mb-5 flex items-center gap-2">
              <img
                src="/images/notenest-logo.png"
                className="h-10 fill-blue-600 text-blue-600"
              />
            </div>

            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2 rounded-md bg-blue-100 px-2 py-1.5 font-semibold text-blue-700">
                <BookOpen className="h-3 w-3" />
                All Notes
              </div>

              <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600">
                <Star className="h-3 w-3" />
                Favourites
              </div>

              <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600">
                <Trash2 className="h-3 w-3" />
                Trash
              </div>
            </div>

            <p className="mb-2 mt-5 text-[10px] font-semibold text-slate-500">
              Categories
            </p>

            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center gap-2 text-[10px] text-slate-600"
                >
                  <span className={`h-2 w-2 rounded-full ${category.color}`} />
                  {category.name}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[9px] font-semibold text-slate-700">
                A
              </div>
              <span className="text-[9px] font-medium text-slate-700">
                Aman Kumar
              </span>
              <Settings className="ml-auto h-3 w-3 text-slate-500" />
            </div>
          </aside>

          {/* Main dashboard */}
          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-tight text-slate-900">
                All Notes
              </h3>

              <Button
                size="sm"
                className="h-7 gap-1 rounded-md bg-blue-600 px-2.5 text-[10px] hover:bg-blue-700"
              >
                <Plus className="h-3 w-3" />
                Add Note
              </Button>
            </div>

            {/* Search */}
            <div className="mb-3 flex h-7 items-center gap-2 rounded-md border border-slate-200 px-2.5">
              <Search className="h-3 w-3 text-slate-500" />
              <span className="text-[10px] text-slate-400">
                Search notes...
              </span>
            </div>

            {/* Note cards */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className="flex min-h-27 flex-col rounded-lg border border-slate-100 bg-white p-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
                >
                  <h4 className="mb-0.5 truncate text-[10px] font-bold text-slate-800">
                    {note.title}
                  </h4>

                  <p className="mb-1 text-[9px] text-slate-400">{note.date}</p>

                  <p className="line-clamp-3 flex-1 whitespace-pre-line text-[9px] leading-relaxed text-slate-600">
                    {note.content}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                        note.color === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : note.color === "purple"
                            ? "bg-purple-100 text-purple-700"
                            : note.color === "red"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {note.category}
                    </span>

                    <div className="flex gap-2 text-slate-500">
                      <Pencil className="h-3 w-3" />
                      <Trash2 className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-blue-50/50"
    >
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-blue-100/50 blur-sm" />

      <div className="relative mx-auto grid max-w-300 items-center gap-10 px-6 pb-12 pt-10 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:pb-14 md:pt-10">
        {/* Hero content */}
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3 py-1.5 text-[11px] font-semibold text-blue-800">
            <Sparkles className="h-3 w-3" />
            Your Personal Notes Space
          </div>

          <h1 className="max-w-md text-4xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl">
            Your thoughts,
            <br />
            <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              one place.
            </span>
          </h1>

          <p className="mt-4 max-w-90 text-[15px] leading-normal text-slate-600">
            A simple and powerful notes app to capture, organize, and manage
            your ideas. Built with the MERN stack.
          </p>

          {/* CTA buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              render={<a href="/signup" />}
              className="h-10 gap-2 rounded-lg bg-blue-600 px-5 text-xs font-semibold shadow-sm hover:bg-blue-700"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              render={<a href="#features" />}
              variant="outline"
              className="h-10 rounded-lg border-slate-300 bg-white/60 px-5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
            >
              Learn More
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium text-slate-600">
            {["Free to use", "Secure & private", "No ads"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-blue-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
