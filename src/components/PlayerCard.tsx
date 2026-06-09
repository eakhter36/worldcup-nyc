"use client";

import { PlayerPhoto } from "@/components/PlayerPhoto";
import type { ApiSquadPlayer, ApiPlayerEntry } from "@/lib/api-football";

interface Props {
  player: ApiSquadPlayer;
  stats: ApiPlayerEntry | null;
  isGK: boolean;
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9] last:border-0">
      <span className="text-xs text-[#64748b]">{label}</span>
      <span className="text-sm font-semibold text-[#0f172a]">{value}</span>
    </div>
  );
}

export function PlayerCard({ player, stats, isGK }: Props) {
  const s = stats?.statistics?.[0];

  const saves = s?.goals?.saves ?? 0;
  const conceded = s?.goals?.conceded ?? 0;
  const savePct =
    saves + conceded > 0
      ? ((saves / (saves + conceded)) * 100).toFixed(1) + "%"
      : "—";

  const goals = s?.goals?.total ?? 0;
  const assists = s?.goals?.assists ?? 0;
  const yellow = s?.cards?.yellow ?? 0;
  const red = (s?.cards?.red ?? 0) + (s?.cards?.yellowred ?? 0);
  const passAcc = s?.passes?.accuracy != null ? s.passes.accuracy + "%" : "—";

  const posLabel =
    player.position === "Attacker" ? "Forward" : player.position;

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <PlayerPhoto src={player.photo} name={player.name} />
        <div className="flex-1 min-w-0">
          {player.number != null && (
            <span className="text-xs font-bold text-[#7B2FBE] bg-[#7B2FBE]/10 px-1.5 py-0.5 rounded mb-1 inline-block">
              #{player.number}
            </span>
          )}
          <p className="font-bold text-[#0f172a] leading-tight">{player.name}</p>
          <p className="text-xs text-[#64748b] mt-0.5">{posLabel} · {player.age} yrs</p>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-lg bg-[#f8fafc] px-3 py-1">
        {isGK ? (
          <>
            <StatRow label="Saves" value={saves} />
            <StatRow label="Save %" value={savePct} />
            <StatRow label="Clean Sheets" value="—" />
            <StatRow label="Yellow Cards" value={yellow} />
            <StatRow label="Red Cards" value={red} />
          </>
        ) : (
          <>
            <StatRow label="Goals" value={goals} />
            <StatRow label="Assists" value={assists} />
            <StatRow label="Yellow Cards" value={yellow} />
            <StatRow label="Red Cards" value={red} />
            <StatRow label="Pass %" value={passAcc} />
          </>
        )}
      </div>
    </div>
  );
}
