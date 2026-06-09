import Link from "next/link";
import { metlifeMatches } from "@/data/matches";
import { MatchCard } from "@/components/MatchCard";
import { CountdownTimer } from "@/components/CountdownTimer";

function getNextMatch() {
  const now = new Date();
  return metlifeMatches.find((m) => new Date(m.date) > now) ?? metlifeMatches[metlifeMatches.length - 1];
}

function formatMatchLabel(match: (typeof metlifeMatches)[number]) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(match.date));

  if (match.homeTeam === "TBD") {
    const stageMap: Record<string, string> = {
      ro32: "Round of 32",
      ro16: "Round of 16",
      qf:   "Quarterfinal",
      sf:   "Semifinal",
      third: "Third Place",
      final: "Final",
    };
    return `${stageMap[match.stage] ?? match.stage} · ${date}`;
  }

  return `${match.homeTeam} vs ${match.awayTeam} · ${date}`;
}

export default function Home() {
  const nextMatch = getNextMatch();

  return (
    <main className="flex flex-col min-h-screen bg-[#040A18] text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1E3155] px-4 py-1.5 text-xs uppercase tracking-widest text-[#8898C0]">
          MetLife Stadium · East Rutherford, NJ
        </div>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          World Cup <span className="text-[#C9FF00]">NYC</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-[#8898C0] sm:text-lg">
          Your guide to the 8 matches at MetLife Stadium and everything
          happening across NYC this summer.
        </p>

        <CountdownTimer
          targetDate={nextMatch.date}
          matchLabel={formatMatchLabel(nextMatch)}
        />
      </section>

      {/* MetLife Schedule */}
      <section id="schedule" className="flex-1 px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              MetLife Schedule
            </h2>
            <Link
              href="/schedule"
              className="text-sm text-[#C9FF00] hover:text-[#C9FF00]/80 underline underline-offset-2"
            >
              View all 104 matches →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metlifeMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
