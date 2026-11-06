
import {
  Pencil,
  Tag,
  ShieldCheck,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    title: "Create Notes",
    description: "Write and save your ideas easily.",
    icon: Pencil,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Organize",
    description: "Use categories to keep things neat.",
    icon: Tag,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Secure",
    description: "Your data stays safe with JWT authentication.",
    icon: ShieldCheck,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    title: "Responsive",
    description: "A seamless experience across all your devices.",
    icon: MonitorSmartphone,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
];

const FeaturesOverview = () => {
  return (
    <section
      id="features"
      className="bg-linear-to-b from-slate-50 to-white px-6 py-8 md:px-8"
    >
      <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="relative flex flex-col items-center px-5 text-center"
            >
              {/* Icon */}
              <div
                className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full ${feature.iconBg}`}
              >
                <Icon
                  className={`h-6 w-6 ${feature.iconColor}`}
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold tracking-tight text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-1 max-w-47.5 text-[12px] leading-normal text-slate-600">
                {feature.description}
              </p>

              {/* Divider */}
              {index !== features.length - 1 && (
                <div className="absolute right-0 top-6 hidden h-16 w-px bg-slate-200 md:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesOverview;
