"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ExternalLink } from "lucide-react";
import { type Venue, BOROUGHS, COUNTRIES } from "@/data/venues";

type SortKey = "name" | "borough" | "neighborhood" | "venueType" | "country" | "dealDetails";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 50;

const TYPE_MAP: Record<string, string> = {
  "Beer Garden":    "Bar",
  "Cultural Center":"Bar",
  "Nightlife":      "Bar",
  "Sports":         "Bar",
  "Public Viewing": "Fan Zone",
  "Pop-Up":         "Fan Zone",
  "Hotel":          "Fan Zone",
  "Attraction":     "Miscellaneous",
  "Museum":         "Miscellaneous",
  "Shopping":       "Miscellaneous",
};
function remapType(t: string): string { return TYPE_MAP[t] ?? t; }

const VENUE_TYPES = ["Bar", "Fan Zone", "Miscellaneous", "Restaurant"];

const NYC_BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="ml-1 inline h-3 w-3 text-slate-600" />;
  return sortDir === "asc"
    ? <ChevronUp className="ml-1 inline h-3 w-3 text-emerald-400" />
    : <ChevronDown className="ml-1 inline h-3 w-3 text-emerald-400" />;
}

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

// Filter neighborhoods based on selected borough
function getNeighborhoods(venues: Venue[], borough: string): string[] {
  const filtered = borough ? venues.filter(v => v.borough === borough) : venues;
  return [...new Set(filtered.map(v => v.neighborhood).filter(Boolean))].sort();
}

export function VenuesTable({ venues }: { venues: Venue[] }) {
  const [borough, setBorough]       = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [venueType, setVenueType]   = useState("");
  const [country, setCountry]       = useState("");
  const [sortKey, setSortKey]       = useState<SortKey>("borough");
  const [sortDir, setSortDir]       = useState<SortDir>("asc");
  const [page, setPage]             = useState(0);

  const neighborhoods = useMemo(() => getNeighborhoods(venues, borough), [venues, borough]);

  function handleBorough(v: string) {
    setBorough(v);
    setNeighborhood(""); // reset neighborhood when borough changes
    setPage(0);
  }

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  const filtered = useMemo(() => {
    return venues.filter(v => {
      if (borough && v.borough !== borough) return false;
      if (neighborhood && v.neighborhood !== neighborhood) return false;
      if (venueType && remapType(v.venueType) !== venueType) return false;
      if (country) {
        const countries = v.country.split(";").map(s => s.trim());
        if (!countries.includes(country)) return false;
      }
      return true;
    });
  }, [venues, borough, neighborhood, venueType, country]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = sortKey === "venueType" ? remapType(a[sortKey] || "") : (a[sortKey] || "");
      const bv = sortKey === "venueType" ? remapType(b[sortKey] || "") : (b[sortKey] || "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData   = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function Th({ col, label }: { col: SortKey; label: string }) {
    return (
      <th
        onClick={() => handleSort(col)}
        className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200"
      >
        {label}
        <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
      </th>
    );
  }

  const hasFilters = borough || neighborhood || venueType || country;

  return (
    <div>
      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select
          label="Borough"
          value={borough}
          onChange={handleBorough}
          options={BOROUGHS}
        />
        <Select
          label="Neighborhood"
          value={neighborhood}
          onChange={(v) => { setNeighborhood(v); setPage(0); }}
          options={neighborhoods}
        />
        <Select
          label="Venue type"
          value={venueType}
          onChange={(v) => { setVenueType(v); setPage(0); }}
          options={VENUE_TYPES}
        />
        <Select
          label="Country"
          value={country}
          onChange={(v) => { setCountry(v); setPage(0); }}
          options={COUNTRIES}
        />
      </div>

      {/* Count + clear */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-300">{sorted.length.toLocaleString()}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-300">{venues.length.toLocaleString()}</span>{" "}
          venues
        </p>
        {hasFilters && (
          <button
            onClick={() => { setBorough(""); setNeighborhood(""); setVenueType(""); setCountry(""); setPage(0); }}
            className="text-xs text-slate-500 underline hover:text-slate-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-12 text-center">
          <p className="text-slate-400">No venues match these filters.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80">
                <tr>
                  <Th col="name"        label="Venue" />
                  <Th col="borough"     label="Borough" />
                  <Th col="neighborhood" label="Neighborhood" />
                  <Th col="venueType"   label="Type" />
                  <Th col="country"     label="Country" />
                  <Th col="dealDetails" label="$26 Deal" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pageData.map((v, i) => {
                  const isNYC = NYC_BOROUGHS.includes(v.borough);
                  return (
                    <tr
                      key={`${v.name}-${i}`}
                      className="bg-slate-950 transition-colors hover:bg-slate-900"
                    >
                      {/* Name */}
                      <td className="px-3 py-3 font-medium text-white">
                        {v.website ? (
                          <a
                            href={v.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-emerald-400"
                          >
                            {v.name}
                            <ExternalLink className="h-3 w-3 shrink-0 text-slate-600" />
                          </a>
                        ) : (
                          v.name
                        )}
                        {v.address && (
                          <div className="mt-0.5 text-xs text-slate-600">{v.address}</div>
                        )}
                      </td>

                      {/* Borough */}
                      <td className="px-3 py-3 text-slate-300">
                        <span className={isNYC ? "" : "text-slate-500"}>
                          {v.borough || "—"}
                        </span>
                      </td>

                      {/* Neighborhood */}
                      <td className="px-3 py-3 text-slate-400">{v.neighborhood || "—"}</td>

                      {/* Type */}
                      <td className="px-3 py-3">
                        {v.venueType ? (
                          <span className="inline-block rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-300">
                            {remapType(v.venueType)}
                          </span>
                        ) : "—"}
                      </td>

                      {/* Country */}
                      <td className="px-3 py-3 text-slate-400">
                        {v.country ? (
                          <span className="text-xs">{v.country}</span>
                        ) : "—"}
                      </td>

                      {/* $26 Deal */}
                      <td className="px-3 py-3 text-slate-400">
                        {v.dealDetails ? (
                          <span className="text-xs text-emerald-400/80">{v.dealDetails}</span>
                        ) : (
                          <span className="text-xs text-slate-700">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-400 disabled:opacity-30 hover:border-slate-500 hover:text-slate-200"
              >
                ← Previous
              </button>
              <span className="text-slate-500">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-400 disabled:opacity-30 hover:border-slate-500 hover:text-slate-200"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
