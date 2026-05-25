import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Match } from "@/data/matches";
import { teamByCode } from "@/data/teams";

const stageLabel: Record<string, string> = {
  group: "Group Stage",
  ro32: "Round of 32",
  ro16: "Round of 16",
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

function TeamRow({ code }: { code: string }) {
  const team = teamByCode[code];
  if (!team) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl">🏳️</span>
        <span className="text-base font-semibold text-slate-300">TBD</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{team.flag}</span>
      <span className="text-base font-semibold text-white">{team.name}</span>
      <span className="ml-1 text-xs text-slate-500">{team.code}</span>
    </div>
  );
}

interface Props {
  match: Match;
}

export function MatchCard({ match }: Props) {
  return (
    <Card className="border-slate-800 bg-slate-900 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
              {stageLabel[match.stage]}
            </Badge>
            {match.group && (
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 text-xs">
                Group {match.group}
              </Badge>
            )}
          </div>
          <span className="text-xs text-slate-500">#{match.matchNumber}</span>
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-slate-300">{formatDate(match.date)}</p>
          <p className="text-xs text-slate-500">{match.kickoffET} · MetLife Stadium</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          <TeamRow code={match.homeTeam} />
          <span className="text-xs font-bold text-slate-600 pl-1">vs</span>
          <TeamRow code={match.awayTeam} />
        </div>
      </CardContent>
    </Card>
  );
}
