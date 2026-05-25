export type DealBorough =
  | "Manhattan"
  | "Brooklyn"
  | "Queens"
  | "Bronx"
  | "Staten Island";

export type DealType = "food" | "drink" | "prix-fixe" | "combo";

export interface Deal {
  id: string;
  name: string;
  neighborhood: string;
  borough: DealBorough;
  cuisine: string;
  dealType: DealType;
  dealDescription: string;
  address: string | null;
  website: string | null;
  notes: string | null;
  source: "official" | "user-submitted";
  dateAdded: string;
}

export const deals: Deal[] = [
  {
    id: "kills-boro-brewing",
    name: "Kills Boro Brewing Company",
    neighborhood: "Stapleton",
    borough: "Staten Island",
    cuisine: "Brewery",
    dealType: "drink",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
  {
    id: "red-rooster-harlem",
    name: "Red Rooster",
    neighborhood: "Harlem",
    borough: "Manhattan",
    cuisine: "American / Soul Food",
    dealType: "food",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
  {
    id: "naro-rockefeller-center",
    name: "Naro",
    neighborhood: "Rockefeller Center",
    borough: "Manhattan",
    cuisine: "Korean",
    dealType: "food",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
  {
    id: "armondos-jackson-heights",
    name: "Armondo's",
    neighborhood: "Jackson Heights",
    borough: "Queens",
    cuisine: "Italian",
    dealType: "food",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
  {
    id: "la-baraka-little-neck",
    name: "La Baraka",
    neighborhood: "Little Neck",
    borough: "Queens",
    cuisine: "Tunisian",
    dealType: "food",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
  {
    id: "morgans-prospect-heights",
    name: "Morgan's",
    neighborhood: "Prospect Heights",
    borough: "Brooklyn",
    cuisine: "Texas BBQ",
    dealType: "food",
    dealDescription: "$26 Five Borough Winners Special — details at venue",
    address: null,
    website: null,
    notes: null,
    source: "official",
    dateAdded: "2026-05-25",
  },
];

export function getDealsByBorough(borough: string): Deal[] {
  return deals.filter((d) => d.borough === borough);
}

export function getDealsByCuisine(cuisine: string): Deal[] {
  return deals.filter((d) => d.cuisine === cuisine);
}

export function getUniqueCuisines(): string[] {
  return [...new Set(deals.map((d) => d.cuisine))].sort();
}

export function getDealCounts(): Record<string, number> {
  return deals.reduce<Record<string, number>>((acc, d) => {
    acc[d.borough] = (acc[d.borough] ?? 0) + 1;
    return acc;
  }, {});
}
