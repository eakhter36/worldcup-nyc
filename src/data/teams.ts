export interface Team {
  code: string;
  name: string;
  flag: string;
  primaryColor: string;
  group: string;
}

export const teams: Team[] = [
  { code: "BRA", name: "Brazil",  flag: "🇧🇷", primaryColor: "#009C3B", group: "C" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", primaryColor: "#C1272D", group: "C" },
  { code: "FRA", name: "France",  flag: "🇫🇷", primaryColor: "#003189", group: "I" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", primaryColor: "#00853F", group: "I" },
  { code: "NOR", name: "Norway",  flag: "🇳🇴", primaryColor: "#EF2B2D", group: "I" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", primaryColor: "#FFD100", group: "E" },
  { code: "GER", name: "Germany", flag: "🇩🇪", primaryColor: "#000000", group: "E" },
  { code: "PAN", name: "Panama",  flag: "🇵🇦", primaryColor: "#DB0032", group: "L" },
  { code: "ENG", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", primaryColor: "#012169", group: "L" },
];

export const teamByCode = Object.fromEntries(teams.map((t) => [t.code, t])) as Record<string, Team>;
