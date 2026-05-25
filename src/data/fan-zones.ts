export type Borough =
  | "Manhattan"
  | "Brooklyn"
  | "Queens"
  | "Bronx"
  | "Staten Island"
  | "Jersey";

export type FanZoneType = "official" | "watch-party" | "community";

export interface FanZone {
  id: string;
  name: string;
  venue: string;
  neighborhood: string;
  borough: Borough;
  address: string;
  description: string;
  features: string[];
  cost: string;
  ageRestriction: string;
  operatingDates: string;
  matchesShown: string;
  website: string | null;
  type: FanZoneType;
}

export const fanZones: FanZone[] = [
  {
    id: "nynj-jersey-fan-hub",
    name: "NYNJ World Cup 26 Jersey Fan Hub",
    venue: "Sports Illustrated Stadium",
    neighborhood: "Harrison",
    borough: "Jersey",
    address: "Sports Illustrated Stadium, Harrison, NJ",
    description:
      "The Host Committee's official New Jersey fan experience, activated across the full tournament. Features live match viewings, immersive fan experiences, cultural programming, musical performances, and community-driven events designed to welcome residents and fans from around the world.",
    features: [
      "Live match viewings",
      "Immersive fan experiences",
      "Cultural programming",
      "Musical performances",
      "Community events",
    ],
    cost: "Ticketed — see venue for pricing",
    ageRestriction: "All ages",
    operatingDates: "Select dates, June 11 – July 19, 2026",
    matchesShown: "Live broadcasts of select FIFA World Cup matches",
    website: "https://www.sportsillustratedstadium.com/fan-hub",
    type: "official",
  },
  {
    id: "queens-group-stage-hq",
    name: "NYNJ World Cup 26 Queens Group Stage HQ",
    venue: "USTA Billie Jean King National Tennis Center",
    neighborhood: "Flushing Meadows",
    borough: "Queens",
    address: "USTA Billie Jean King National Tennis Center, Queens, NY",
    description:
      "Produced by Live Nation, this flagship fan destination runs throughout the entire Group Stage. Set in the world's borough, it's an immersive celebration of the world's game for local families, diverse communities, and dedicated soccer fans.",
    features: [
      "Produced by Live Nation",
      "Group Stage focus",
      "Family-friendly",
      "Live entertainment",
      "Multicultural programming",
    ],
    cost: "Details coming soon",
    ageRestriction: "All ages",
    operatingDates: "June 11 – June 27, 2026",
    matchesShown: "Group Stage matches",
    website: "https://nynjfwc26.com/fan-events/#fan-zone-queens",
    type: "official",
  },
  {
    id: "fan-village-rockefeller-center",
    name: "NYNJ World Cup 26 Fan Village at Rockefeller Center",
    venue: "Rockefeller Center",
    neighborhood: "Midtown",
    borough: "Manhattan",
    address: "Rockefeller Center, Midtown Manhattan, NY",
    description:
      "The iconic Rockefeller Center rink transforms into a vibrant pitch surrounded by large screens for live match broadcasts. The celebration extends across the entire three-block Rockefeller Center campus, including Top of the Rock, throughout the knockout rounds and Final.",
    features: [
      "Iconic Manhattan location",
      "Large outdoor screens",
      "Knockout & Final coverage",
      "Three-block campus",
      "Includes Top of the Rock",
    ],
    cost: "Details coming soon",
    ageRestriction: "All ages",
    operatingDates: "July 6 – July 19, 2026",
    matchesShown: "Knockout rounds and the Final",
    website: "https://nynjfwc26.com/fan-events/#fan-village-rockefeller",
    type: "official",
  },
  {
    id: "staten-island-fan-zone",
    name: "NYNJ World Cup 26 Staten Island Fan Zone",
    venue: "SIUH Community Park",
    neighborhood: "St. George",
    borough: "Staten Island",
    address: "SIUH Community Park, Staten Island, NY",
    description:
      "A relaxed, family-oriented fan environment anchored in community access and evening match viewings — bringing tournament atmosphere to a borough often underserved by large-scale events.",
    features: [
      "Family-oriented",
      "Evening match viewings",
      "Community focus",
      "Relaxed atmosphere",
    ],
    cost: "Details coming soon",
    ageRestriction: "All ages",
    operatingDates: "June 29 – July 2, 2026",
    matchesShown: "Evening matches during the date range",
    website: "https://nynjfwc26.com/fan-events/#fan-zones-island",
    type: "official",
  },
  {
    id: "bronx-fan-zone",
    name: "NYNJ World Cup 26 Bronx Fan Zone",
    venue: "Bronx Terminal Market",
    neighborhood: "South Bronx",
    borough: "Bronx",
    address: "Bronx Terminal Market, South Bronx, NY",
    description:
      "A high-energy, community-driven environment leaning into key match moments with culturally relevant programming, local food, and family-friendly experiences that reflect the borough's deep connection to sport and community.",
    features: [
      "High-energy",
      "Local food",
      "Family-friendly",
      "Cultural programming",
      "Community-driven",
    ],
    cost: "Details coming soon",
    ageRestriction: "All ages",
    operatingDates: "June 13 – June 14, 2026",
    matchesShown: "Matches during the date range",
    website: "https://nynjfwc26.com/fan-events/#fan-zones-bronx",
    type: "official",
  },
  {
    id: "brooklyn-fan-zone",
    name: "Brooklyn Fan Zone",
    venue: "Brooklyn Bridge Park",
    neighborhood: "East River Waterfront",
    borough: "Brooklyn",
    address: "Brooklyn Bridge Park, Brooklyn's East River Waterfront, NY",
    description:
      "Waterfront views, creative culture, and destination foot traffic combine for a curated, lifestyle-driven fan experience — blending matchday energy with food, music, and programming that reflects the borough's role as a cultural epicenter.",
    features: [
      "Waterfront views",
      "Lifestyle programming",
      "Food & music",
      "Cultural focus",
      "Destination location",
    ],
    cost: "Details coming soon",
    ageRestriction: "All ages",
    operatingDates: "Select dates, June 13 – July 19, 2026",
    matchesShown: "Select matches across the tournament",
    website: "https://nynjfwc26.com/fan-events/#fan-zones-brooklyn",
    type: "official",
  },
];
