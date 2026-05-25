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
  official: "border-emerald-800 bg-emerald-900/40 text-emerald-300",
  "watch-party": "border-sky-800 bg-sky-900/40 text-sky-300",
  community: "border-violet-800 bg-violet-900/40 text-violet-300",
};

const TYPE_LABELS: Record<string, string> = {
  official: "Official",
  "watch-party": "Watch Party",
  community: "Community",
};

function FanZoneCard({ zone }: { zone: FanZone }) {
  return (
    <Card className="flex flex-col border-slate-800 bg-slate-900 text-white">
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
        <p className="text-xs text-slate-500">
          {zone.venue} · {zone.neighborhood} · {zone.borough}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {zone.description}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        {/* Data grid */}
        <div className="border-t border-slate-800 pt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="whitespace-nowrap text-slate-500">Cost</dt>
            <dd className="text-slate-300">{zone.cost}</dd>
            <dt className="whitespace-nowrap text-slate-500">Ages</dt>
            <dd className="text-slate-300">{zone.ageRestriction}</dd>
            <dt className="whitespace-nowrap text-slate-500">Dates</dt>
            <dd className="text-slate-300">{zone.operatingDates}</dd>
            <dt className="whitespace-nowrap text-slate-500">Address</dt>
            <dd className="text-slate-300">{zone.address}</dd>
          </dl>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {zone.features.map((f) => (
            <Badge
              key={f}
              variant="outline"
              className="border-slate-700 text-xs text-slate-400"
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
              className="border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
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
      <Alert className="mb-8 border-slate-700 bg-slate-800/50 text-slate-200">
        <Info className="h-4 w-4 text-slate-400" />
        <AlertDescription className="text-slate-300">
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
            className="rounded-full border border-slate-700 bg-slate-900 px-4 text-slate-300 data-[state=on]:border-emerald-600 data-[state=on]:bg-emerald-900/40 data-[state=on]:text-emerald-300"
          >
            {b}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {displayed.length === 0 ? (
        <p className="text-slate-500">No fan zones found for this area yet.</p>
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
