import { Plus, House, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const previewNotes = [
  {
    title: "React Learning",
    category: "Learning",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Project Ideas",
    category: "Ideas",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Travel Plan",
    category: "Travel",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "To Do List",
    category: "Personal",
    color: "bg-green-100 text-green-600",
  },
];

export const WelcomeBanner = () => {
  return (
    <section className="relative isolate flex min-h-[270px] items-center overflow-hidden rounded-2xl border border-[#DCE9FF] bg-gradient-to-r from-[#EAF2FF] via-[#E5EFFF] to-[#DDEAFF] px-8 py-8 sm:px-12">
      {/* Background waves */}
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-[125px] w-full"
        viewBox="0 0 1200 150"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 150V132C120 132 165 119 255 111C365 101 395 142 490 130C590 118 625 37 735 53C842 69 848 116 956 109C1070 101 1095 39 1200 60V150H0Z"
          fill="#D2E5FF"
          opacity="0.8"
        />
        <path
          d="M0 150V145C155 145 230 120 340 133C460 147 500 105 590 111C700 119 737 139 840 119C965 95 1055 89 1200 112V150H0Z"
          fill="#BBD8FF"
          opacity="0.55"
        />
      </svg>

      {/* Left content */}
      <div className="relative z-10 w-full max-w-[520px] space-y-5">
        <div className="space-y-3">
          <h2 className="text-[34px] font-bold leading-[1.12] tracking-tight text-[#101828] sm:text-[40px]">
            Your thoughts,
            <br />
            <span className="text-[#0866F5]">one place.</span>
          </h2>

          <p className="max-w-[420px] text-[15px] leading-[1.65] text-[#405779] sm:text-base">
            Capture, organize, and manage your ideas
            <br className="hidden sm:block" />
            beautifully with NoteNest.
          </p>
        </div>

        <Button className="h-12 rounded-xl bg-[#0866F5] px-7 text-[15px] font-semibold text-white shadow-[0_3px_8px_rgba(8,102,245,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0759D8]">
          <Plus className="size-5" />
          Create Note
        </Button>
      </div>

      {/* Mini NoteNest application preview */}
      <div className="relative z-10 ml-auto hidden w-[440px] shrink-0 lg:block xl:mr-16">
        <div className="relative overflow-hidden rounded-[15px] border border-[#D7E4F8] bg-white shadow-[0_12px_30px_rgba(57,104,170,0.16)]">
          {/* Window controls */}
          <div className="flex h-[32px] items-center justify-between border-b border-[#E9EFF8] bg-[#F8FAFE] px-4">
            <div className="flex items-center gap-[7px]">
              <span className="size-[10px] rounded-full bg-[#FF5F57]" />
              <span className="size-[10px] rounded-full bg-[#FEBC2E]" />
              <span className="size-[10px] rounded-full bg-[#28C840]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#DCE6F5]" />
              <span className="size-2 rounded-full bg-[#DCE6F5]" />
            </div>
          </div>

          {/* Application content */}
          <div className="flex min-h-[195px]">
            {/* Preview sidebar */}
            <aside className="w-[125px] shrink-0 border-r border-[#EDF1F7] bg-white px-3 py-4">
              <div className="mb-5 flex items-center gap-1.5">
                <img
                  src="/images/notenest-logo.png"
                  className="fill-[#0866F5] text-[#0866F5]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-md bg-[#EDF4FF] px-2 py-1.5 text-[10px] font-semibold text-[#0866F5]">
                  <House className="size-3" />
                  All Notes
                </div>

                <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-[#64748B]">
                  <Star className="size-3" />
                  Favourites
                </div>

                <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-[#64748B]">
                  <Trash2 className="size-3" />
                  Trash
                </div>
              </div>
            </aside>

            {/* Preview notes */}
            <div className="min-w-0 flex-1 bg-[#FCFDFF] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#172033]">
                  All Notes
                </h3>

                <button className="flex items-center gap-1 rounded-md bg-[#0866F5] px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-sm">
                  <Plus className="size-3" />
                  Add Note
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {previewNotes.map((note) => (
                  <div
                    key={note.title}
                    className="min-w-0 rounded-[9px] border border-[#E5ECF7] bg-white px-2.5 py-2.5 shadow-[0_2px_6px_rgba(31,65,114,0.05)] transition-shadow hover:shadow-md"
                  >
                    <p className="truncate text-[10px] font-semibold text-[#172033]">
                      {note.title}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-[5px] px-2 py-1 text-[9px] font-medium ${note.color}`}
                    >
                      {note.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Decorative accent strokes */}
        <svg
          className="pointer-events-none absolute -right-5 -top-6 z-20 h-11 w-11"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          {/* Left stroke - angled upwards and left */}
          <path
            d="M17 18L14 6"
            stroke="#0866F5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Upper-right stroke - angled upwards and right */}
          <path
            d="M26 18L34 6"
            stroke="#0866F5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Right stroke - angled right */}
          <path
            d="M32 26L44 24"
            stroke="#0866F5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default WelcomeBanner;
