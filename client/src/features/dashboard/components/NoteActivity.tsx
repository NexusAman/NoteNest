
import { useState } from "react";
import {
  ChartNoAxesColumnIncreasing,
  Zap,
} from "lucide-react";

const activityData = {
  week: [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 3 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 5 },
    { day: "Fri", value: 3 },
    { day: "Sat", value: 4 },
    { day: "Sun", value: 7 },
  ],
  month: [
    { day: "W1", value: 4 },
    { day: "W2", value: 7 },
    { day: "W3", value: 5 },
    { day: "W4", value: 9 },
  ],
};

const NoteActivity = () => {
  const [period, setPeriod] = useState<"week" | "month">("week");

  const data = activityData[period];
  const maxValue = 10;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const axisValues = [10, 8, 6, 4, 2, 0];

  return (
    <section
      className="
        flex min-w-0 flex-col
        rounded-2xl border border-[#E1EAF8] bg-white
        p-5 shadow-[0_3px_12px_rgba(31,65,114,0.06)]
        sm:p-6
        xl:h-full xl:min-h-0
      "
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ChartNoAxesColumnIncreasing
            className="size-7 shrink-0 text-[#7C3AED]"
            strokeWidth={2.5}
          />

          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-[#101828]">
              Note Activity
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Notes created over time.
            </p>
          </div>
        </div>

        {/* Period selector */}
        <select
          value={period}
          onChange={(e) =>
            setPeriod(e.target.value as "week" | "month")
          }
          aria-label="Activity period"
          className="h-9 shrink-0 rounded-lg border border-[#DCE6F5] bg-white px-3 text-xs font-semibold text-[#344563] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Flexible chart */}
      <div className="mt-6 flex min-h-[220px] flex-1 gap-3">

        {/* Y axis */}
        <div className="flex w-5 shrink-0 flex-col justify-between pb-6 text-right text-xs font-medium text-[#64748B]">
          {axisValues.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="relative flex min-w-0 flex-1 flex-col">

          {/* Plot area */}
          <div className="relative min-h-0 flex-1">

            {/* Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {axisValues.map((value) => (
                <div
                  key={value}
                  className="w-full border-t border-[#EDF1F7]"
                />
              ))}
            </div>

            {/* Bars */}
            <div className="relative z-10 flex h-full items-end justify-around gap-2">
              {data.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full min-w-0 flex-1 items-end justify-center"
                >
                  <div
                    title={`${item.value} notes`}
                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-[#62A5F8] to-[#0875F9] transition-all duration-300 hover:from-[#3B82F6] hover:to-[#0759D8]"
                    style={{
                      height: `${(item.value / maxValue) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X axis labels */}
          <div className="flex h-6 shrink-0 items-end justify-around gap-2">
            {data.map((item) => (
              <span
                key={item.day}
                className="min-w-0 flex-1 text-center text-[11px] font-medium text-[#405779]"
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity summary */}
      <div className="mt-5 flex shrink-0 items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-[#FFF9EB] to-[#EDF5FF] px-3 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Zap className="size-5 shrink-0 fill-[#F59E0B] text-[#F59E0B]" />

          <p className="truncate text-sm font-semibold text-[#172033]">
            {total} notes created{" "}
            {period === "week" ? "this week" : "this month"}
          </p>
        </div>

        <span className="shrink-0 rounded-lg bg-[#DCFCE7] px-2.5 py-1.5 text-xs font-semibold text-[#15803D]">
          ↑ +40%
        </span>
      </div>
    </section>
  );
};

export default NoteActivity;
