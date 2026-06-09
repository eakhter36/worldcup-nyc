"use client";

import { useState, useEffect } from "react";
import { type Match } from "@/data/matches";
import { teamByCode } from "@/data/teams";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function getNextSlot(matches: Match[]): { nextDate: string; nextMatches: Match[] } | null {
  const now = Date.now();
  const upcoming = [...matches]
    .filter((m) => new Date(m.date).getTime() > now)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!upcoming.length) return null;
  const nextDate = upcoming[0].date;
  return { nextDate, nextMatches: upcoming.filter((m) => m.date === nextDate) };
}

function formatKickoff(iso: string, kickoffET: string) {
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York",
  }).format(new Date(iso));
  return `${day} · ${kickoffET}`;
}

function TeamLine({ code }: { code: string }) {
  const team = teamByCode[code];
  if (!team) return <span className="text-[#64748b]">TBD</span>;
  return (
    <span className="inline-flex items-center gap-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${team.iso2}.png`}
        width={20}
        height={14}
        alt={team.name}
        className="rounded-sm object-cover"
      />
      <span>{team.name}</span>
    </span>
  );
}

export function ScheduleCountdown({ matches }: { matches: Match[] }) {
  const slot = getNextSlot(matches);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    slot ? compute(new Date(slot.nextDate).getTime()) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  useEffect(() => {
    if (!slot) return;
    const target = new Date(slot.nextDate).getTime();
    const id = setInterval(() => setTimeLeft(compute(target)), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot?.nextDate]);

  if (!slot) return null;

  const { nextDate, nextMatches } = slot;
  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs",  value: timeLeft.hours },
    { label: "Min",  value: timeLeft.minutes },
    { label: "Sec",  value: timeLeft.seconds },
  ];

  return (
    <div className="mb-10 rounded-xl border border-[#e2e8f0] bg-white px-6 py-6 shadow-sm">
      <p className="mb-1 text-xs uppercase tracking-widest text-[#64748b]">
        {nextMatches.length === 1 ? "Next match" : `Next ${nextMatches.length} matches (simultaneous)`}
      </p>
      <p className="mb-4 text-sm font-medium text-[#475569]">
        {formatKickoff(nextDate, nextMatches[0].kickoffET)}
      </p>

      {/* Countdown digits */}
      <div className="flex gap-3 mb-5">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="w-14 rounded-lg bg-[#7B2FBE] py-2 text-center font-mono text-2xl font-bold tabular-nums text-[#C9FF00] sm:w-16 sm:text-3xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-[#94a3b8]">{label}</span>
          </div>
        ))}
      </div>

      {/* Match list */}
      <div className="space-y-2">
        {nextMatches.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#475569]">
            <TeamLine code={m.homeTeam} />
            <span className="text-[#94a3b8] text-xs font-bold">vs</span>
            <TeamLine code={m.awayTeam} />
            <span className="text-[#94a3b8]">·</span>
            <span className="text-xs text-[#94a3b8]">{m.city}</span>
            {m.group && (
              <span className="text-xs text-[#94a3b8]">(Group {m.group})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
