"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { VenueMarker } from "@/components/VenueMap";

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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-wider text-slate-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus:border-emerald-600 focus:outline-none"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function VenueMapFilters({
  markers,
  totalCount,
}: {
  markers: VenueMarker[];
  totalCount: number;
}) {
  const [borough, setBorough]           = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [venueType, setVenueType]       = useState("");
  const [country, setCountry]           = useState("");

  // Derive filter options from markers
  const boroughs = useMemo(
    () => [...new Set(markers.map((m) => m.borough).filter(Boolean))].sort(),
    [markers]
  );

  const neighborhoods = useMemo(() => {
    const source = borough ? markers.filter((m) => m.borough === borough) : markers;
    return [...new Set(source.map((m) => m.neighborhood).filter(Boolean))].sort();
  }, [markers, borough]);

  const countries = useMemo(
    () =>
      [
        ...new Set(
          markers.flatMap((m) =>
            m.country.split(";").map((s) => s.trim()).filter(Boolean)
          )
        ),
      ].sort(),
    [markers]
  );

  function handleBorough(v: string) {
    setBorough(v);
    setNeighborhood("");
  }

  const filtered = useMemo(() => {
    return markers.filter((m) => {
      if (borough && m.borough !== borough) return false;
      if (neighborhood && m.neighborhood !== neighborhood) return false;
      if (venueType && m.venueType !== venueType) return false;
      if (country) {
        const parts = m.country.split(";").map((s) => s.trim());
        if (!parts.includes(country)) return false;
      }
      return true;
    });
  }, [markers, borough, neighborhood, venueType, country]);

  const hasFilters = borough || neighborhood || venueType || country;

  return (
    <>
      {/* Page header */}
      <div className="px-4 pt-10 pb-4 mx-auto w-full max-w-7xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
          NYC 2026 World Cup
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Venue Map
        </h1>
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
          <Select label="Borough"      value={borough}       onChange={handleBorough}                              options={boroughs} />
          <Select label="Neighborhood" value={neighborhood}  onChange={(v) => setNeighborhood(v)}                  options={neighborhoods} />
          <Select label="Venue type"   value={venueType}     onChange={(v) => setVenueType(v)}                     options={VENUE_TYPES} />
          <Select label="Country"      value={country}       onChange={(v) => setCountry(v)}                       options={countries} />
        </div>

        {hasFilters && (
          <button
            onClick={() => { setBorough(""); setNeighborhood(""); setVenueType(""); setCountry(""); }}
            className="mt-2 text-xs text-slate-500 underline hover:text-slate-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 px-4 pb-6 mx-auto w-full max-w-7xl" style={{ minHeight: "600px" }}>
        <div className="h-[70vh] min-h-[500px] w-full overflow-hidden rounded-xl border border-slate-800">
          <VenueMap markers={filtered} />
        </div>
      </div>
    </>
  );
}
