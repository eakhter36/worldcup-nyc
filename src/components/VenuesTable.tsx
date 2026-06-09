"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ExternalLink } from "lucide-react";
import { type Venue, BOROUGHS, COUNTRIES } from "@/data/venues";
import { remapType } from "@/lib/venue-utils";
import { MultiSelect } from "@/components/ui/multi-select";

type SortKey = "name" | "borough" | "neighborhood" | "venueType" | "country" | "dealDetails";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 50;
const VENUE_TYPES = ["Bar", "Fan Zone", "Miscellaneous", "Restaurant"];
const NYC_BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="ml-1 inline h-3 w-3 text-[#94a3b8]" />;
  return sortDir === "asc"
    ? <ChevronUp className="ml-1 inline h-3 w-3 text-[#7B2FBE]" />
    : <ChevronDown className="ml-1 inline h-3 w-3 text-[#7B2FBE]" />;
}

export function VenuesTable({ venues, initialCountries = [] }: { venues: Venue[]; initialCountries?: string[] }) {
  const [boroughs, setBoroughs]           = useState<string[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [venueTypes, setVenueTypes]       = useState<string[]>([]);
  const [countries, setCountries]         = useState<string[]>(initialCountries);
  const [sortKey, setSortKey]             = useState<SortKey>("borough");
  const [sortDir, setSortDir]             = useState<SortDir>("asc");
  const [page, setPage]                   = useState(0);

  const neighborhoodOptions = useMemo(() => {
    const source = boroughs.length > 0
      ? venues.filter((v) => boroughs.includes(v.borough))
      : venues;
    return [...new Set(source.map((v) => v.neighborhood).filter(Boolean))].sort();
  }, [venues, boroughs]);

  function handleBoroughs(val: string[]) {
    setBoroughs(val);
    if (val.length > 0) {
      setNeighborhoods((prev) =>
        prev.filter((n) => venues.some((v) => val.includes(v.borough) && v.neighborhood === n))
      );
    }
    setPage(0);
  }

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(0);
  }

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      if (boroughs.length > 0 && !boroughs.includes(v.borough)) return false;
      if (neighborhoods.length > 0 && !neighborhoods.includes(v.neighborhood)) return false;
      if (venueTypes.length > 0 && !venueTypes.includes(remapType(v.venueType))) return false;
      if (countries.length > 0) {
        const vCountries = v.country.split(";").map((s) => s.trim());
        if (!countries.some((c) => vCountries.includes(c))) return false;
      }
      return true;
    });
  }, [venues, boroughs, neighborhoods, venueTypes, countries]);

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
        className="cursor-pointer select-none whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748b] hover:text-[#0f172a]"
      >
        {label}
        <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
      </th>
    );
  }

  const hasFilters = boroughs.length > 0 || neighborhoods.length > 0 || venueTypes.length > 0 || countries.length > 0;

  return (
    <div>
      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MultiSelect label="Borough"      options={BOROUGHS}           selected={boroughs}      onChange={handleBoroughs} />
        <MultiSelect label="Neighborhood" options={neighborhoodOptions} selected={neighborhoods} onChange={(v) => { setNeighborhoods(v); setPage(0); }} />
        <MultiSelect label="Venue type"   options={VENUE_TYPES}        selected={venueTypes}    onChange={(v) => { setVenueTypes(v); setPage(0); }} />
        <MultiSelect label="Country"      options={COUNTRIES}          selected={countries}     onChange={(v) => { setCountries(v); setPage(0); }} />
      </div>

      {/* Count + clear */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-[#94a3b8]">
          Showing{" "}
          <span className="font-semibold text-[#334155]">{sorted.length.toLocaleString()}</span>{" "}
          of{" "}
          <span className="font-semibold text-[#334155]">{venues.length.toLocaleString()}</span>{" "}
          venues
        </p>
        {hasFilters && (
          <button
            onClick={() => { setBoroughs([]); setNeighborhoods([]); setVenueTypes([]); setCountries([]); setPage(0); }}
            className="text-xs text-[#64748b] underline hover:text-[#334155]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="mt-8 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-6 py-12 text-center">
          <p className="text-[#64748b]">No venues match these filters.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[#e2e8f0]">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                <tr>
                  <Th col="name"         label="Venue" />
                  <Th col="borough"      label="Borough" />
                  <Th col="neighborhood" label="Neighborhood" />
                  <Th col="venueType"    label="Type" />
                  <Th col="country"      label="Country" />
                  <Th col="dealDetails"  label="$26 Deal" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {pageData.map((v, i) => {
                  const isNYC = NYC_BOROUGHS.includes(v.borough);
                  return (
                    <tr key={`${v.name}-${i}`} className="bg-white transition-colors hover:bg-[#f8fafc]">
                      <td className="px-3 py-3 font-medium text-[#0f172a]">
                        {v.website ? (
                          <a href={v.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#7B2FBE]">
                            {v.name}
                            <ExternalLink className="h-3 w-3 shrink-0 text-[#94a3b8]" />
                          </a>
                        ) : v.name}
                        {v.address && <div className="mt-0.5 text-xs text-[#94a3b8]">{v.address}</div>}
                      </td>
                      <td className="px-3 py-3 text-[#334155]">
                        <span className={isNYC ? "" : "text-[#94a3b8]"}>{v.borough || "—"}</span>
                      </td>
                      <td className="px-3 py-3 text-[#64748b]">{v.neighborhood || "—"}</td>
                      <td className="px-3 py-3">
                        {v.venueType ? (
                          <span className="inline-block rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2 py-0.5 text-xs text-[#475569]">
                            {remapType(v.venueType)}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-3 py-3 text-[#64748b]">
                        {v.country ? <span className="text-xs">{v.country}</span> : "—"}
                      </td>
                      <td className="px-3 py-3 text-[#64748b]">
                        {v.dealDetails ? (
                          <span className="text-xs text-[#7B2FBE]">{v.dealDetails}</span>
                        ) : (
                          <span className="text-xs text-[#d1d5db]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                className="rounded-md border border-[#e2e8f0] px-3 py-1.5 text-[#64748b] disabled:opacity-30 hover:border-[#cbd5e1] hover:text-[#0f172a]">
                ← Previous
              </button>
              <span className="text-[#94a3b8]">Page {page + 1} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                className="rounded-md border border-[#e2e8f0] px-3 py-1.5 text-[#64748b] disabled:opacity-30 hover:border-[#cbd5e1] hover:text-[#0f172a]">
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
