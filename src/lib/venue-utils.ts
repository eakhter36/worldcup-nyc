const TYPE_MAP: Record<string, string> = {
  "Beer Garden":     "Bar",
  "Cultural Center": "Bar",
  "Nightlife":       "Bar",
  "Sports":          "Bar",
  "Public Viewing":  "Fan Zone",
  "Pop-Up":          "Fan Zone",
  "Hotel":           "Fan Zone",
  "Attraction":      "Miscellaneous",
  "Museum":          "Miscellaneous",
  "Shopping":        "Miscellaneous",
};

export function remapType(t: string): string {
  return TYPE_MAP[t] ?? t;
}
