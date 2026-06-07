"use client";

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

export function VenueMapClient({ markers }: { markers: VenueMarker[] }) {
  return <VenueMap markers={markers} />;
}
