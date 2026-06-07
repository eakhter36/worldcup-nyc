"use client";

import { useState, useMemo } from "react";
import { type Match } from "@/data/matches";
import { MatchCard } from "@/components/MatchCard";

const STAGE_TABS = [
  { key: "group", label: "Group Stage" },
  { key: "knockout", label: "Knockout" },
] as const;

const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

const KNOCKOUT_SECTIONS = [
  { stage: "ro32",  label: "Round of 32" },
  { stage: "ro16",  label: "Round of 16" },
  { stage: "qf",    label: "Quarterfinals" },
  { stage: "sf",    label: "Semifinals" },
  { stage: "third", label: "Third Place" },
  { stage: "final", label: "Final" },
] as const;

function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(iso));
}

function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date(iso));
}

export function ScheduleGrid({ matches }: { matches: Match[] }) {
  const [tab, setTab]         = useState<"group" | "knockout">("group");
  const [groupView, setGroupView] = useState<"group" | "date">("group");
  const [group, setGroup]     = useState<string>("A");

  const groupMatches = useMemo(
    () => matches.filter((m) => m.stage === "group" && m.group === group),
    [matches, group]
  );

  // All group-stage matches sorted by date, then grouped by calendar day (ET)
  const byDate = useMemo(() => {
    const all = matches
      .filter((m) => m.stage === "group")
      .sort((a, b) => a.date.localeCompare(b.date));

    const map = new Map<string, { label: string; matches: Match[] }>();
    for (const m of all) {
      const key = dayKey(m.date);
      if (!map.has(key)) map.set(key, { label: formatDay(m.date), matches: [] });
      map.get(key)!.matches.push(m);
    }
    return [...map.values()];
  }, [matches]);

  const knockoutByStage = useMemo(() => {
    return KNOCKOUT_SECTIONS.map(({ stage, label }) => ({
      stage,
      label,
      matches: matches.filter((m) => m.stage === stage),
    }));
  }, [matches]);

  return (
    <div>
      {/* Stage tabs */}
      <div className="flex gap-2 mb-6">
        {STAGE_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === key
                ? "bg-emerald-600 text-white"
                : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "group" && (
        <>
          {/* View toggle: By Group / By Date */}
          <div className="mb-5 flex items-center gap-1 rounded-lg border border-slate-700 p-1 w-fit">
            {(["group", "date"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setGroupView(v)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  groupView === v
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {v === "group" ? "By Group" : "By Date"}
              </button>
            ))}
          </div>

          {groupView === "group" && (
            <>
              {/* Group selector */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {GROUPS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroup(g)}
                    className={`h-8 w-8 rounded-md text-xs font-semibold transition-colors ${
                      group === g
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupMatches.map((m) => (
                  <MatchCard key={m.id} match={m} showCity />
                ))}
              </div>
            </>
          )}

          {groupView === "date" && (
            <div className="space-y-10">
              {byDate.map(({ label, matches: dayMatches }) => (
                <div key={label}>
                  <h3 className="mb-4 border-b border-slate-800 pb-2 text-base font-bold tracking-tight text-white">
                    {label}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {dayMatches.map((m) => (
                      <MatchCard key={m.id} match={m} showCity />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "knockout" && (
        <div className="space-y-10">
          {knockoutByStage.map(({ stage, label, matches: sMatches }) => (
            <div key={stage}>
              <h3 className="mb-4 text-lg font-bold tracking-tight text-white border-b border-slate-800 pb-2">
                {label}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sMatches.map((m) => (
                  <MatchCard key={m.id} match={m} showCity />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
