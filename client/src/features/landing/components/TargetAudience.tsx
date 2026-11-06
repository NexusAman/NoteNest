import { GraduationCap, Code2, BriefcaseBusiness, Users } from "lucide-react";

const audiences = [
  {
    title: "Students",
    description:
      "Keep your class notes, study materials, and assignments organized.",
    icon: GraduationCap,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Developers",
    description: "Save code snippets, technical ideas, and programming notes.",
    icon: Code2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Professionals",
    description: "Manage meeting notes, work tasks, and important information.",
    icon: BriefcaseBusiness,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Everyone",
    description: "Capture everyday thoughts, personal ideas, and inspiration.",
    icon: Users,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
];

const TargetAudience = () => {
  return (
    <section className="bg-white px-6 py-14 md:px-8">
      <div className="mx-auto max-w-300">
        {/* Section heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
            Perfect For{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>

          <p className="mt-2 text-[13px] text-slate-600">
            Whether you're studying, working, or exploring new ideas.
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audience.icon;

            return (
              <div
                key={audience.title}
                className="rounded-xl border border-slate-200/80 bg-white p-5 text-center shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${audience.iconBg}`}
                >
                  <Icon
                    className={`h-6 w-6 ${audience.iconColor}`}
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {audience.title}
                </h3>

                <p className="mt-2 text-[12px] leading-[1.6] text-slate-600">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
