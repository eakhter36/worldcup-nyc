"use client";

import { PlayerPhoto } from "@/components/PlayerPhoto";
import type { ApiCoach } from "@/lib/api-football";

export function CoachCard({ coach }: { coach: ApiCoach }) {
  const birthYear = coach.birth?.date
    ? new Date(coach.birth.date).getFullYear()
    : null;

  const currentClub = coach.career.find((c) => c.end === null);

  return (
    <div className="w-fit rounded-xl border border-[#e2e8f0] bg-white p-4 flex items-center gap-4">
      <PlayerPhoto src={coach.photo} name={coach.name} size="lg" />
      <div>
        <p className="text-xl font-extrabold text-[#0f172a]">{coach.name}</p>
        <p className="text-sm text-[#64748b]">{coach.nationality}</p>
        {birthYear && (
          <p className="text-xs text-[#94a3b8] mt-0.5">Born {birthYear}</p>
        )}
        {currentClub && (
          <p className="text-xs text-[#94a3b8]">
            Club: {currentClub.team.name}
          </p>
        )}
      </div>
    </div>
  );
}
