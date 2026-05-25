"use client";

import { useState } from "react";
import { MapPin, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type Deal, type DealBorough, type DealType } from "@/data/deals";

const BOROUGHS: (DealBorough | "All")[] = [
  "All",
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
];

const DEAL_TYPES: { value: DealType | "All"; label: string }[] = [
  { value: "All",       label: "All types" },
  { value: "food",      label: "Food" },
  { value: "drink",     label: "Drink" },
  { value: "prix-fixe", label: "Prix-fixe" },
  { value: "combo",     label: "Combo" },
];

const DEAL_TYPE_STYLES: Record<DealType, string> = {
  food:      "bg-sky-900/40 border-sky-800 text-sky-300",
  drink:     "bg-amber-900/40 border-amber-800 text-amber-300",
  "prix-fixe": "bg-violet-900/40 border-violet-800 text-violet-300",
  combo:     "bg-emerald-900/40 border-emerald-800 text-emerald-300",
};

const DEAL_TYPE_LABELS: Record<DealType, string> = {
  food:        "Food",
  drink:       "Drink",
  "prix-fixe": "Prix-fixe",
  combo:       "Combo",
};

function DealCard({ deal }: { deal: Deal }) {
  return (
    <Card className="flex flex-col border-slate-800 bg-slate-900 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold leading-snug text-white">
          {deal.name}
        </CardTitle>
        <p className="text-xs text-slate-500">
          {deal.neighborhood} · {deal.borough}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="border-slate-700 text-xs text-slate-400">
            {deal.cuisine}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${DEAL_TYPE_STYLES[deal.dealType]}`}
          >
            {DEAL_TYPE_LABELS[deal.dealType]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pt-0">
        <p className="text-sm text-slate-300">{deal.dealDescription}</p>

        {deal.address && (
          <div className="flex items-start gap-1.5 text-xs text-slate-500">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
            <span>{deal.address}</span>
          </div>
        )}

        {deal.notes && (
          <p className="text-xs italic text-slate-500">{deal.notes}</p>
        )}

        <div className="mt-auto space-y-3 pt-2">
          {deal.website && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              <a href={deal.website} target="_blank" rel="noopener noreferrer">
                Visit website →
              </a>
            </Button>
          )}

          <div className="flex items-center gap-1.5 border-t border-slate-800 pt-3">
            {deal.source === "official" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span className="text-xs text-slate-500">
                  Official Five Borough Winners Special participant
                </span>
              </>
            ) : (
              <>
                <Circle className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                <span className="text-xs text-slate-600">User-submitted</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const TOGGLE_BASE =
  "rounded-full border border-slate-700 bg-slate-900 text-slate-300 " +
  "data-[state=on]:border-emerald-600 data-[state=on]:bg-emerald-900/40 data-[state=on]:text-emerald-300";

export function DealsFilter({ deals }: { deals: Deal[] }) {
  const [borough, setBorough] = useState<string>("All");
  const [dealType, setDealType] = useState<string>("All");

  const filtered = deals.filter((d) => {
    const boroughMatch = borough === "All" || d.borough === borough;
    const typeMatch = dealType === "All" || d.dealType === dealType;
    return boroughMatch && typeMatch;
  });

  return (
    <div>
      {/* Filter bar */}
      <div className="space-y-3">
        <ToggleGroup
          type="single"
          value={borough}
          onValueChange={(v) => setBorough(v || "All")}
          className="flex-wrap justify-start gap-2"
        >
          {BOROUGHS.map((b) => (
            <ToggleGroupItem key={b} value={b} className={TOGGLE_BASE}>
              {b}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <ToggleGroup
          type="single"
          value={dealType}
          onValueChange={(v) => setDealType(v || "All")}
          className="flex-wrap justify-start gap-2"
        >
          {DEAL_TYPES.map(({ value, label }) => (
            <ToggleGroupItem key={value} value={value} className={TOGGLE_BASE}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Count */}
      <p className="mt-6 text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-300">{filtered.length}</span>{" "}
        of{" "}
        <span className="font-semibold text-slate-300">{deals.length}</span>{" "}
        deals
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-12 text-center">
          <p className="text-slate-400">No deals match these filters.</p>
          <p className="mt-1 text-sm text-slate-600">
            Try removing one or both filters, or check back as more participants are
            added.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}
