import { notFound } from "next/navigation";
import Link from "next/link";
import { teams } from "@/data/teams";
import {
  hasApiKey,
  findApiTeamId,
  getSquad,
  getAllPlayerStats,
  getCoach,
  API_SEARCH_OVERRIDE,
} from "@/lib/api-football";
import type { ApiSquadPlayer, ApiPlayerEntry } from "@/lib/api-football";
import { PlayerCard } from "@/components/PlayerCard";
import { CoachCard } from "@/components/CoachCard";

export const revalidate = 300; // refresh every 5 minutes for live stats

export async function generateStaticParams() {
  return teams.map((t) => ({ code: t.code.toLowerCase() }));
}

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const team = teams.find((t) => t.code.toLowerCase() === code.toLowerCase());
  return {
    title: team
      ? `${team.name} Squad & Stats | World Cup NYC 2026`
      : "Team | World Cup NYC 2026",
  };
}

export default async function TeamPage({ params }: Props) {
  const { code } = await params;
  const team = teams.find((t) => t.code.toLowerCase() === code.toLowerCase());
  if (!team) notFound();

  let squad: ApiSquadPlayer[] = [];
  let statsMap = new Map<number, ApiPlayerEntry>();
  let coach = null;
  let apiError = false;

  if (hasApiKey()) {
    const searchName = API_SEARCH_OVERRIDE[team.code] ?? team.name;
    const apiId = await findApiTeamId(searchName);

    if (apiId) {
      const [squadData, statsData, coachData] = await Promise.all([
        getSquad(apiId),
        getAllPlayerStats(apiId),
        getCoach(apiId),
      ]);
      squad = squadData;
      statsMap = new Map(statsData.map((e) => [e.player.id, e]));
      coach = coachData;
    } else {
      apiError = true;
    }
  }

  const goalkeepers  = squad.filter((p) => p.position === "Goalkeeper");
  const defenders    = squad.filter((p) => p.position === "Defender");
  const midfielders  = squad.filter((p) => p.position === "Midfielder");
  const forwards     = squad.filter((p) => p.position === "Attacker");

  const sections = [
    { title: "Goalkeepers", players: goalkeepers, isGK: true  },
    { title: "Defenders",   players: defenders,   isGK: false },
    { title: "Midfielders", players: midfielders, isGK: false },
    { title: "Forwards",    players: forwards,    isGK: false },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Back */}
        <Link
          href="/teams"
          className="inline-flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f172a] mb-8"
        >
          ← All Teams
        </Link>

        {/* Team header */}
        <div className="flex items-center gap-5 mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w80/${team.iso2}.png`}
            alt={team.name}
            className="h-16 w-auto rounded shadow-sm object-cover"
          />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a]">
              {team.name}
            </h1>
            <p className="mt-1 text-sm text-[#64748b]">
              Group {team.group} · FIFA World Cup 2026
            </p>
          </div>
        </div>

        {/* No API key notice */}
        {!hasApiKey() && (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
            <p className="font-semibold">Live stats require an API key.</p>
            <p className="mt-1 text-amber-700">
              Add{" "}
              <code className="font-mono font-bold">FOOTBALL_API_KEY=your_key</code> to{" "}
              <code className="font-mono">.env.local</code>.{" "}
              Get a free key at{" "}
              <a
                href="https://dashboard.api-sports.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                api-sports.io
              </a>
              .
            </p>
          </div>
        )}

        {/* API key present but team not found */}
        {hasApiKey() && apiError && (
          <div className="mt-8 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-sm text-[#64748b]">
            Could not find this team in the API. The squad may not be registered for WC 2026 yet.
          </div>
        )}

        {/* Stats refresh note */}
        {hasApiKey() && squad.length > 0 && (
          <p className="mt-4 text-xs text-[#94a3b8]">
            Stats refresh every 5 minutes · Live from API-Football
          </p>
        )}

        {/* Coach */}
        {coach && (
          <section className="mt-10">
            <h2 className="mb-4 border-b border-[#e2e8f0] pb-2 text-xl font-bold text-[#0f172a]">
              Coach
            </h2>
            <CoachCard coach={coach} />
          </section>
        )}

        {/* Player sections */}
        {sections.map(({ title, players, isGK }) =>
          players.length > 0 ? (
            <section key={title} className="mt-10">
              <h2 className="mb-4 border-b border-[#e2e8f0] pb-2 text-xl font-bold text-[#0f172a]">
                {title}
                <span className="ml-2 text-sm font-normal text-[#94a3b8]">
                  ({players.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {players.map((p) => (
                  <PlayerCard
                    key={p.id}
                    player={p}
                    stats={statsMap.get(p.id) ?? null}
                    isGK={isGK}
                  />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </main>
  );
}
