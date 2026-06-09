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
  official: "border-[#7B2FBE]/40 bg-[#7B2FBE]/10 text-[#7B2FBE]",
  "watch-party": "border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[#3b82f6]",
  community: "border-[#E0145A]/40 bg-[#E0145A]/10 text-[#E0145A]",
};

const TYPE_LABELS: Record<string, string> = {
  official: "Official",
  "watch-party": "Watch Party",
  community: "Community",
};

function FanZoneCard({ zone }: { zone: FanZone }) {
  return (
    <Card className="flex flex-col border-[#e2e8f0] bg-white text-[#0f172a]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-bold leading-snug text-[#0f172a]">
            {zone.name}
          </CardTitle>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs ${TYPE_STYLES[zone.type]}`}
          >
            {TYPE_LABELS[zone.type]}
          </Badge>
        </div>
        <p className="text-xs text-[#94a3b8]">
          {zone.venue} · {zone.neighborhood} · {zone.borough}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#475569]">
          {zone.description}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        {/* Data grid */}
        <div className="border-t border-[#e2e8f0] pt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="whitespace-nowrap text-[#64748b]">Cost</dt>
            <dd className="text-[#334155]">{zone.cost}</dd>
            <dt className="whitespace-nowrap text-[#64748b]">Ages</dt>
            <dd className="text-[#334155]">{zone.ageRestriction}</dd>
            <dt className="whitespace-nowrap text-[#64748b]">Dates</dt>
            <dd className="text-[#334155]">{zone.operatingDates}</dd>
            <dt className="whitespace-nowrap text-[#64748b]">Address</dt>
            <dd className="text-[#334155]">{zone.address}</dd>
          </dl>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {zone.features.map((f) => (
            <Badge
              key={f}
              variant="outline"
              className="border-[#e2e8f0] text-xs text-[#64748b]"
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
              className="border-[#e2e8f0] text-[#475569] hover:border-[#cbd5e1] hover:bg-[#f8fafc] hover:text-[#0f172a]"
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
      <Alert className="mb-8 border-[#e2e8f0] bg-[#f8fafc] text-[#334155]">
        <Info className="h-4 w-4 text-[#64748b]" />
        <AlertDescription className="text-[#475569]">
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
            className="rounded-full border border-[#e2e8f0] bg-white px-4 text-[#475569] data-[state=on]:border-[#7B2FBE] data-[state=on]:bg-[#7B2FBE]/10 data-[state=on]:text-[#7B2FBE]"
          >
            {b}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {displayed.length === 0 ? (
        <p className="text-[#94a3b8]">No fan zones found for this area yet.</p>
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
