"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { VenueMarker } from "@/components/VenueMap";
import { MultiSelect } from "@/components/ui/multi-select";

const VenueMap = dynamic(
  () => import("@/components/VenueMap").then((m) => m.VenueMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-slate-900 rounded-xl flex items-center justify-center">
        <span className="text-slate-600 text-sm">Loading map…</span>
      </div>
    ),
  }
);

const VENUE_TYPES = ["Bar", "Fan Zone", "Miscellaneous", "Restaurant"];

const LEGEND = [
  { color: "#10b981", label: "Restaurant" },
  { color: "#3b82f6", label: "Bar" },
  { color: "#f97316", label: "Fan Zone" },
  { color: "#94a3b8", label: "Miscellaneous" },
];

export function VenueMapFilters({ markers, totalCount }: { markers: VenueMarker[]; totalCount: number }) {
  const [boroughs, setBoroughs]           = useState<string[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [venueTypes, setVenueTypes]       = useState<string[]>([]);
  const [countries, setCountries]         = useState<string[]>([]);

  const boroughOptions = useMemo(
    () => [...new Set(markers.map((m) => m.borough).filter(Boolean))].sort(),
    [markers]
  );

  const neighborhoodOptions = useMemo(() => {
    const source = boroughs.length > 0 ? markers.filter((m) => boroughs.includes(m.borough)) : markers;
    return [...new Set(source.map((m) => m.neighborhood).filter(Boolean))].sort();
  }, [markers, boroughs]);

  const countryOptions = useMemo(
    () => [...new Set(markers.flatMap((m) => m.country.split(";").map((s) => s.trim()).filter(Boolean)))].sort(),
    [markers]
  );

  function handleBoroughs(val: string[]) {
    setBoroughs(val);
    if (val.length > 0) {
      setNeighborhoods((prev) =>
        prev.filter((n) => markers.some((m) => val.includes(m.borough) && m.neighborhood === n))
      );
    }
  }

  const filtered = useMemo(() => {
    return markers.filter((m) => {
      if (boroughs.length > 0 && !boroughs.includes(m.borough)) return false;
      if (neighborhoods.length > 0 && !neighborhoods.includes(m.neighborhood)) return false;
      if (venueTypes.length > 0 && !venueTypes.includes(m.venueType)) return false;
      if (countries.length > 0) {
        const parts = m.country.split(";").map((s) => s.trim());
        if (!countries.some((c) => parts.includes(c))) return false;
      }
      return true;
    });
  }, [markers, boroughs, neighborhoods, venueTypes, countries]);

  const hasFilters = boroughs.length > 0 || neighborhoods.length > 0 || venueTypes.length > 0 || countries.length > 0;

  return (
    <>
      <div className="px-4 pt-10 pb-4 mx-auto w-full max-w-7xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
          NYC 2026 World Cup
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Venue Map</h1>
        <p className="mt-2 text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">{filtered.length.toLocaleString()}</span>{" "}
          of{" "}
          <span className="font-semibold text-white">{totalCount.toLocaleString()}</span>{" "}
          venues. Hover for details · Click to open in Google Maps.
        </p>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-4">
          {LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MultiSelect label="Borough"      options={boroughOptions}      selected={boroughs}      onChange={handleBoroughs} />
          <MultiSelect label="Neighborhood" options={neighborhoodOptions} selected={neighborhoods} onChange={setNeighborhoods} />
          <MultiSelect label="Venue type"   options={VENUE_TYPES}        selected={venueTypes}    onChange={setVenueTypes} />
          <MultiSelect label="Country"      options={countryOptions}     selected={countries}     onChange={setCountries} />
        </div>

        {hasFilters && (
          <button
            onClick={() => { setBoroughs([]); setNeighborhoods([]); setVenueTypes([]); setCountries([]); }}
            className="mt-2 text-xs text-slate-500 underline hover:text-slate-300"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="flex-1 px-4 pb-6 mx-auto w-full max-w-7xl" style={{ minHeight: "600px" }}>
        <div className="h-[70vh] min-h-[500px] w-full overflow-hidden rounded-xl border border-slate-800">
          <VenueMap markers={filtered} />
        </div>
      </div>
    </>
  );
}
