import { venues } from "@/data/venues";
import { remapType } from "@/lib/venue-utils";
import coordsData from "@/data/venue-coords.json";
import type { VenueMarker } from "@/components/VenueMap";
import { VenueMapClient } from "@/components/VenueMapClient";

export const metadata = {
  title: "Venue Map | World Cup NYC 2026",
  description: "Interactive map of 1,000+ NYC World Cup venues — bars, restaurants, fan zones and more.",
};

const coords = coordsData as Record<string, { lat: number; lng: number }>;

const markers: VenueMarker[] = venues
  .map((v) => {
    const c = coords[v.name];
    if (!c) return null;
    return {
      name: v.name,
      venueType: remapType(v.venueType),
      country: v.country,
      address: v.address,
      lat: c.lat,
      lng: c.lng,
    };
  })
  .filter((m): m is VenueMarker => m !== null);

const LEGEND = [
  { color: "#10b981", label: "Restaurant" },
  { color: "#3b82f6", label: "Bar" },
  { color: "#f97316", label: "Fan Zone" },
  { color: "#94a3b8", label: "Miscellaneous" },
];

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 mx-auto w-full max-w-7xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
          NYC 2026 World Cup
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Venue Map
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {markers.length.toLocaleString()} venues plotted. Hover for details · Click to open in Google Maps.
        </p>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-4">
          {LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map — fills remaining viewport height */}
      <div className="flex-1 px-4 pb-6 mx-auto w-full max-w-7xl" style={{ minHeight: "600px" }}>
        <div className="h-[70vh] min-h-[500px] w-full overflow-hidden rounded-xl border border-slate-800">
          <VenueMapClient markers={markers} />
        </div>
      </div>
    </main>
  );
}
