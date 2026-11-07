
import {
  FileText,
  Star,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

const stats: StatItem[] = [
  {
    title: "Total Notes",
    value: 24,
    icon: FileText,
    iconColor: "text-[#0866F5]",
    iconBg: "bg-[#E5F0FF]",
  },
  {
    title: "Favourites",
    value: 5,
    icon: Star,
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-[#FFF5DF]",
  },
  {
    title: "Notes This Week",
    value: 7,
    icon: CalendarDays,
    iconColor: "text-[#8B5CF6]",
    iconBg: "bg-[#F0E9FF]",
  },
];

const DashboardStats = () => {
  return (
    <section
      aria-label="Dashboard statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="flex min-h-[100px] items-center gap-5 rounded-2xl border border-[#E1EAF8] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(31,65,114,0.06)] transition-shadow hover:shadow-[0_5px_16px_rgba(31,65,114,0.09)]"
          >
            {/* Icon */}
            <div
              className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg}`}
            >
              <Icon
                className={`size-8 ${stat.iconColor}`}
                strokeWidth={2}
              />
            </div>

            {/* Statistic */}
            <div className="min-w-0 space-y-1">
              <p className="text-3xl font-bold leading-none tracking-tight text-[#101828] tabular-nums">
                {stat.value}
              </p>

              <p className="text-sm font-medium text-[#405779]">
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardStats;
