import { matches } from "@/data/matches";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { ScheduleCountdown } from "@/components/ScheduleCountdown";

export const metadata = {
  title: "Schedule | World Cup NYC 2026",
  description: "Full FIFA World Cup 2026 match schedule — all 104 games across the USA, Canada, and Mexico.",
};

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f8fafc] text-[#0f172a]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-24">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] px-3 py-1 text-xs uppercase tracking-widest text-[#64748b]">
          FIFA World Cup 2026
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
          Full Schedule
        </h1>
        <p className="mt-2 mb-8 text-sm text-[#64748b]">
          All 104 matches · June 11 – July 19, 2026 · Hover a match to find NYC venues.
        </p>

        <ScheduleCountdown matches={matches} />

        <ScheduleGrid matches={matches} />
      </div>
    </main>
  );
}
