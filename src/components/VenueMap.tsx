"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface VenueMarker {
  name: string;
  venueType: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
}

const TYPE_COLORS: Record<string, string> = {
  "Bar":           "#3b82f6",
  "Restaurant":    "#10b981",
  "Fan Zone":      "#f97316",
  "Miscellaneous": "#94a3b8",
};

function getColor(type: string): string {
  return TYPE_COLORS[type] ?? "#94a3b8";
}

function mapsUrl(name: string, address: string): string {
  const query = address && address.length > 6 ? address : `${name} New York City`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function VenueMap({ markers }: { markers: VenueMarker[] }) {
  // Fix Leaflet default icon paths broken by webpack
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {markers.map((m, i) => (
        <CircleMarker
          key={i}
          center={[m.lat, m.lng]}
          radius={6}
          pathOptions={{
            color: getColor(m.venueType),
            fillColor: getColor(m.venueType),
            fillOpacity: 0.85,
            weight: 1.5,
          }}
          eventHandlers={{
            click: () => {
              window.open(mapsUrl(m.name, m.address), "_blank", "noopener,noreferrer");
            },
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={0.97}>
            <div className="min-w-[140px]">
              <p className="font-semibold text-slate-900 leading-tight">{m.name}</p>
              <p className="text-xs text-slate-600 mt-0.5">{m.venueType}</p>
              {m.country && (
                <p className="text-xs text-slate-500 mt-0.5">{m.country}</p>
              )}
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
