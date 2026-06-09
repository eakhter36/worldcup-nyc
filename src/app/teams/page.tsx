import Link from "next/link";
import { teams } from "@/data/teams";

export const metadata = {
  title: "Teams | World Cup NYC 2026",
  description: "All 48 nations competing in FIFA World Cup 2026 — squads, rosters, and live tournament stats.",
};

const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

export default function TeamsPage() {
  const byGroup = GROUPS.map((g) => ({
    group: g,
    teams: teams.filter((t) => t.group === g),
  })).filter((g) => g.teams.length > 0);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] px-3 py-1 text-xs uppercase tracking-widest text-[#64748b]">
          FIFA World Cup 2026
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
          Teams
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[#64748b]">
          All 48 nations competing in FIFA World Cup 2026. Click any team to view their squad, coaching staff, and live tournament stats.
        </p>

        <div className="mt-12 space-y-12">
          {byGroup.map(({ group, teams: groupTeams }) => (
            <section key={group}>
              <h2 className="mb-4 flex items-center gap-3 border-b border-[#e2e8f0] pb-2 text-lg font-bold text-[#0f172a]">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#C9FF00] text-sm font-extrabold text-[#040A18]">
                  {group}
                </span>
                Group {group}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {groupTeams.map((team) => (
                  <Link
                    key={team.code}
                    href={`/teams/${team.code.toLowerCase()}`}
                    className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 transition-all hover:border-[#7B2FBE]/40 hover:shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w40/${team.iso2}.png`}
                      alt={team.name}
                      width={28}
                      height={20}
                      className="rounded-sm object-cover shrink-0"
                    />
                    <span className="text-sm font-semibold text-[#0f172a] leading-tight">
                      {team.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
