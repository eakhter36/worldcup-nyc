"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type FanZone, type Borough } from "@/data/fan-zones";

const BOROUGHS: (Borough | "All")[] = [
  "All",
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
  "Jersey",
];

const TYPE_STYLES: Record<string, string> = {
  official: "border-[#C9FF00]/40 bg-[#C9FF00]/10 text-[#C9FF00]",
  "watch-party": "border-[#7B2FBE]/60 bg-[#7B2FBE]/20 text-[#C0A0FF]",
  community: "border-[#E0145A]/50 bg-[#E0145A]/10 text-[#FF6090]",
};

const TYPE_LABELS: Record<string, string> = {
  official: "Official",
  "watch-party": "Watch Party",
  community: "Community",
};

function FanZoneCard({ zone }: { zone: FanZone }) {
  return (
    <Card className="flex flex-col border-[#162845] bg-[#0C1830] text-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-bold leading-snug text-white">
            {zone.name}
          </CardTitle>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs ${TYPE_STYLES[zone.type]}`}
          >
            {TYPE_LABELS[zone.type]}
          </Badge>
        </div>
        <p className="text-xs text-[#6070A0]">
          {zone.venue} · {zone.neighborhood} · {zone.borough}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#A8BADC]">
          {zone.description}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        {/* Data grid */}
        <div className="border-t border-[#162845] pt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="whitespace-nowrap text-[#6070A0]">Cost</dt>
            <dd className="text-[#A8BADC]">{zone.cost}</dd>
            <dt className="whitespace-nowrap text-[#6070A0]">Ages</dt>
            <dd className="text-[#A8BADC]">{zone.ageRestriction}</dd>
            <dt className="whitespace-nowrap text-[#6070A0]">Dates</dt>
            <dd className="text-[#A8BADC]">{zone.operatingDates}</dd>
            <dt className="whitespace-nowrap text-[#6070A0]">Address</dt>
            <dd className="text-[#A8BADC]">{zone.address}</dd>
          </dl>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {zone.features.map((f) => (
            <Badge
              key={f}
              variant="outline"
              className="border-[#1E3155] text-xs text-[#8898C0]"
            >
              {f}
            </Badge>
          ))}
        </div>

        {/* Visit site */}
        {zone.website && (
          <div className="mt-auto">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-[#1E3155] text-[#A8BADC] hover:border-[#2A4070] hover:bg-[#162845] hover:text-white"
            >
              <a href={zone.website} target="_blank" rel="noopener noreferrer">
                Visit site →
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FanZoneGrid({ zones }: { zones: FanZone[] }) {
  const [selected, setSelected] = useState<string>("All");

  const displayed =
    selected === "All" ? zones : zones.filter((z) => z.borough === selected);

  return (
    <div>
      <Alert className="mb-8 border-[#1E3155] bg-[#162845]/50 text-[#C8D8F0]">
        <Info className="h-4 w-4 text-[#8898C0]" />
        <AlertDescription className="text-[#A8BADC]">
          Programming details for many fan zones are still being announced by the NYNJ
          Host Committee. Check each venue&apos;s official page for the latest schedule and
          ticketing info.
        </AlertDescription>
      </Alert>

      <ToggleGroup
        type="single"
        value={selected}
        onValueChange={(v) => setSelected(v || "All")}
        className="mb-8 flex-wrap justify-start gap-2"
      >
        {BOROUGHS.map((b) => (
          <ToggleGroupItem
            key={b}
            value={b}
            className="rounded-full border border-[#1E3155] bg-[#0C1830] px-4 text-[#A8BADC] data-[state=on]:border-[#C9FF00] data-[state=on]:bg-[#C9FF00]/10 data-[state=on]:text-[#C9FF00]"
          >
            {b}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {displayed.length === 0 ? (
        <p className="text-[#6070A0]">No fan zones found for this area yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {displayed.map((zone) => (
            <FanZoneCard key={zone.id} zone={zone} />
          ))}
        </div>
      )}
    </div>
  );
}
