import { Check, Sparkles, X, ChevronDown} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  "Rich note creation and editing",
  "Categories with custom colors",
  "Search and filter notes",
  "Mark important notes as favourites",
  "Trash and restore deleted notes",
];

const DetailedFeatures = () => {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-linear-to-b from-slate-50 to-white px-6 py-14 md:px-8"
    >
      <div className="mx-auto grid max-w-300 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: Feature description */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3 py-1.5 text-[11px] font-semibold text-blue-800">
            <Sparkles className="h-3 w-3" />
            Powerful Features
          </div>

          <h2 className="max-w-md text-3xl font-bold leading-[1.2] tracking-tight text-slate-950">
            Everything you need
            <br />
            in a{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              notes app.
            </span>
          </h2>

          <p className="mt-3 max-w-md text-[13px] leading-[1.6] text-slate-600">
            From quick notes to organized knowledge, NoteNest helps you capture,
            manage, and access your ideas anytime, anywhere.
          </p>

          {/* Feature checklist */}
          <ul className="mt-5 space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-[12px] text-slate-700"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-blue-300 bg-blue-50">
                  <Check className="h-3 w-3 text-blue-600" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Create note preview */}
        <div className="relative mx-auto w-full max-w-107.5">
          {/* Decorative background */}
          <div className="absolute -inset-8 -z-10 rounded-[35%] bg-blue-100/70 blur-[1px]" />

          {/* Decorative lines */}
          <div className="absolute -right-7 -top-5 rotate-12 text-blue-600">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 2L12 13M29 9L21 17M33 23L23 25"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Note creation card */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(30,64,175,0.14)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-tight text-slate-900">
                Create New Note
              </h3>

              <X className="h-4 w-4 text-slate-500" />
            </div>

            {/* Title */}
            <label className="mb-1 block text-[11px] font-semibold text-slate-800">
              Title
            </label>

            <div className="mb-3 rounded-md border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-800">
              React Hooks Notes
            </div>

            {/* Content */}
            <label className="mb-1 block text-[11px] font-semibold text-slate-800">
              Content
            </label>

            <div className="relative mb-3 min-h-26.25 rounded-md border border-slate-200 p-2.5">
              <p className="text-[10px] font-medium text-slate-800">
                Key React hooks I learned today:
              </p>

              <ul className="mt-1 list-disc pl-4 text-[10px] leading-[1.6] text-slate-700">
                <li>useState – manage state</li>
                <li>useEffect – handle side effects</li>
                <li>useContext – share data globally</li>
              </ul>

              <span className="absolute bottom-2 right-2 text-[9px] text-slate-500">
                107/1000
              </span>
            </div>

            {/* Category */}
            <label className="mb-1 block text-[11px] font-semibold text-slate-800">
              Category
            </label>

            <div className="mb-3 flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
              <span className="flex-1 text-[10px] text-slate-800">
                Learning
              </span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                className="h-8 rounded-md px-4 text-[10px]"
              >
                Cancel
              </Button>

              <Button className="h-8 rounded-md bg-blue-600 px-4 text-[10px] hover:bg-blue-700">
                Create Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;
