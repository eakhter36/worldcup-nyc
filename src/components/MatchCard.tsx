import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Match } from "@/data/matches";
import { teamByCode } from "@/data/teams";

const stageLabel: Record<string, string> = {
  group: "Group Stage",
  ro32:  "Round of 32",
  ro16:  "Round of 16",
  qf:    "Quarterfinal",
  sf:    "Semifinal",
  third: "Third Place",
  final: "Final",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(iso));
}

function venueUrl(match: Match): string | null {
  if (match.homeTeam === "TBD" || match.awayTeam === "TBD") return null;
  const homeCountry = teamByCode[match.homeTeam]?.venueCountry;
  const awayCountry = teamByCode[match.awayTeam]?.venueCountry;
  const countries = [homeCountry, awayCountry].filter(Boolean) as string[];
  if (countries.length === 0) return null;
  return `/venues?countries=${countries.map(encodeURIComponent).join(",")}`;
}

function TeamRow({ code }: { code: string }) {
  const team = teamByCode[code];
  if (!team) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-block h-4 w-6 rounded-sm bg-[#162845]" />
        <span className="text-base font-semibold text-[#8898C0]">TBD</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${team.iso2}.png`}
        width={24}
        height={16}
        alt={team.name}
        className="rounded-sm object-cover"
      />
      <span className="text-base font-semibold text-white">{team.name}</span>
      <span className="ml-1 text-xs text-[#4D5F82]">{team.code}</span>
    </div>
  );
}

interface Props {
  match: Match;
  showCity?: boolean;
}

export function MatchCard({ match, showCity = false }: Props) {
  const href = venueUrl(match);

  const inner = (
    <Card className="relative border-[#162845] bg-[#0C1830] text-white transition-colors hover:border-[#1E3155]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="border-[#1E3155] text-[#8898C0] text-xs">
              {stageLabel[match.stage]}
            </Badge>
            {match.group && (
              <Badge variant="secondary" className="bg-[#162845] text-[#A8BADC] text-xs">
                Group {match.group}
              </Badge>
            )}
          </div>
          <span className="text-xs text-[#4D5F82]">#{match.matchNumber}</span>
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-[#A8BADC]">{formatDate(match.date)}</p>
          <p className="text-xs text-[#6070A0]">
            {match.kickoffET}
            {showCity && ` · ${match.city}`}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          <TeamRow code={match.homeTeam} />
          <span className="text-xs font-bold text-[#4D5F82] pl-1">vs</span>
          <TeamRow code={match.awayTeam} />
        </div>

        {href && (
          <div className="mt-3 flex items-center gap-1.5 rounded-md bg-[#7B2FBE]/20 px-2.5 py-1.5 text-xs text-[#C9FF00] opacity-0 transition-opacity group-hover:opacity-100">
            <span>Find venues watching this match →</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="group block">
      {inner}
    </Link>
  );
}
