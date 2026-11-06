
import {
  Zap,
  Layers3,
  LockKeyhole,
} from "lucide-react";

const benefits = [
  {
    title: "Simple & Fast",
    description:
      "A clean and intuitive interface that lets you focus on your thoughts.",
    icon: Zap,
  },
  {
    title: "Organized Your Way",
    description:
      "Use categories, search, and favourites to find notes instantly.",
    icon: Layers3,
  },
  {
    title: "Private & Secure",
    description:
      "Your notes are protected with industry-standard authentication.",
    icon: LockKeyhole,
  },
];

const WhyNoteNest = () => {
  return (
    <section className="bg-linear-to-b from-white to-slate-50 px-6 pb-12 pt-4 md:px-8">
      <div className="mx-auto max-w-300">
        {/* Section heading */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
            Why{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              NoteNest?
            </span>
          </h2>

          <p className="mt-1 text-[13px] text-slate-600">
            A notes app designed for students, developers, and anyone who loves
            to stay organized.
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-xl border border-slate-200/80 bg-white/70 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-md"
              >
                <div className="shrink-0 pt-0.5">
                  <Icon
                    className="h-7 w-7 text-blue-600"
                    strokeWidth={2}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-tight text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-[12px] leading-normal text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNoteNest;
