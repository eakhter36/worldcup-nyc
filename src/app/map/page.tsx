import { venues } from "@/data/venues";
import { remapType } from "@/lib/venue-utils";
import coordsData from "@/data/venue-coords.json";
import type { VenueMarker } from "@/components/VenueMap";
import { VenueMapFilters } from "@/components/VenueMapFilters";

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
      neighborhood: v.neighborhood,
      borough: v.borough,
      lat: c.lat,
      lng: c.lng,
    };
  })
  .filter((m): m is VenueMarker => m !== null);

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <VenueMapFilters markers={markers} totalCount={markers.length} />
    </main>
  );
}
