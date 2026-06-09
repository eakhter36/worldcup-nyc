import { matches } from "@/data/matches";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { ScheduleCountdown } from "@/components/ScheduleCountdown";

export const metadata = {
  title: "Schedule | World Cup NYC 2026",
  description: "Full FIFA World Cup 2026 match schedule — all 104 games across the USA, Canada, and Mexico.",
};

export default function SchedulePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#040A18] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-24">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#1E3155] px-3 py-1 text-xs uppercase tracking-widest text-[#8898C0]">
          FIFA World Cup 2026
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Full Schedule
        </h1>
        <p className="mt-2 mb-8 text-sm text-[#8898C0]">
          All 104 matches · June 11 – July 19, 2026 · Hover a match to find NYC venues.
        </p>

        <ScheduleCountdown matches={matches} />

        <ScheduleGrid matches={matches} />
      </div>
    </main>
  );
}
