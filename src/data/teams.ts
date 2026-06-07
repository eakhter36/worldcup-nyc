export interface Team {
  code: string;
  name: string;
  flag: string;
  iso2: string;        // flagcdn.com country code (e.g. "us", "gb-eng")
  primaryColor: string;
  group: string;
  venueCountry: string | null;
}

export const teams: Team[] = [
  // Group A
  { code: "MEX", name: "Mexico",       flag: "🇲🇽", iso2: "mx",     primaryColor: "#006847", group: "A", venueCountry: "Mexico" },
  { code: "ZAF", name: "South Africa", flag: "🇿🇦", iso2: "za",     primaryColor: "#007A4D", group: "A", venueCountry: null },
  { code: "KOR", name: "South Korea",  flag: "🇰🇷", iso2: "kr",     primaryColor: "#C60C30", group: "A", venueCountry: "Korea Republic" },
  { code: "CZE", name: "Czechia",      flag: "🇨🇿", iso2: "cz",     primaryColor: "#D7141A", group: "A", venueCountry: null },
  // Group B
  { code: "CAN", name: "Canada",       flag: "🇨🇦", iso2: "ca",     primaryColor: "#FF0000", group: "B", venueCountry: "Canada" },
  { code: "BIH", name: "Bosnia & Herzegovina", flag: "🇧🇦", iso2: "ba", primaryColor: "#002395", group: "B", venueCountry: null },
  { code: "QAT", name: "Qatar",        flag: "🇶🇦", iso2: "qa",     primaryColor: "#8D1B3D", group: "B", venueCountry: null },
  { code: "SUI", name: "Switzerland",  flag: "🇨🇭", iso2: "ch",     primaryColor: "#FF0000", group: "B", venueCountry: null },
  // Group C
  { code: "BRA", name: "Brazil",       flag: "🇧🇷", iso2: "br",     primaryColor: "#009C3B", group: "C", venueCountry: "Brazil" },
  { code: "MAR", name: "Morocco",      flag: "🇲🇦", iso2: "ma",     primaryColor: "#C1272D", group: "C", venueCountry: "Morocco" },
  { code: "HAI", name: "Haiti",        flag: "🇭🇹", iso2: "ht",     primaryColor: "#00209F", group: "C", venueCountry: null },
  { code: "SCO", name: "Scotland",     flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", iso2: "gb-sct", primaryColor: "#003893", group: "C", venueCountry: "Scotland" },
  // Group D
  { code: "USA", name: "United States", flag: "🇺🇸", iso2: "us",    primaryColor: "#3C3B6E", group: "D", venueCountry: "United States" },
  { code: "PRY", name: "Paraguay",     flag: "🇵🇾", iso2: "py",     primaryColor: "#D52B1E", group: "D", venueCountry: null },
  { code: "AUS", name: "Australia",    flag: "🇦🇺", iso2: "au",     primaryColor: "#00008B", group: "D", venueCountry: "Australia" },
  { code: "TUR", name: "Türkiye",      flag: "🇹🇷", iso2: "tr",     primaryColor: "#E30A17", group: "D", venueCountry: "Turkiye" },
  // Group E
  { code: "GER", name: "Germany",      flag: "🇩🇪", iso2: "de",     primaryColor: "#000000", group: "E", venueCountry: "Germany" },
  { code: "CUW", name: "Curaçao",      flag: "🇨🇼", iso2: "cw",     primaryColor: "#003DA5", group: "E", venueCountry: null },
  { code: "CIV", name: "Ivory Coast",  flag: "🇨🇮", iso2: "ci",     primaryColor: "#F77F00", group: "E", venueCountry: "Cote d'Ivoire" },
  { code: "ECU", name: "Ecuador",      flag: "🇪🇨", iso2: "ec",     primaryColor: "#FFD100", group: "E", venueCountry: "Ecuador" },
  // Group F
  { code: "NED", name: "Netherlands",  flag: "🇳🇱", iso2: "nl",     primaryColor: "#FF4700", group: "F", venueCountry: "Netherlands" },
  { code: "JPN", name: "Japan",        flag: "🇯🇵", iso2: "jp",     primaryColor: "#BC002D", group: "F", venueCountry: null },
  { code: "SWE", name: "Sweden",       flag: "🇸🇪", iso2: "se",     primaryColor: "#006AA7", group: "F", venueCountry: null },
  { code: "TUN", name: "Tunisia",      flag: "🇹🇳", iso2: "tn",     primaryColor: "#E70013", group: "F", venueCountry: null },
  // Group G
  { code: "IRN", name: "Iran",         flag: "🇮🇷", iso2: "ir",     primaryColor: "#239F40", group: "G", venueCountry: "Iran" },
  { code: "NZL", name: "New Zealand",  flag: "🇳🇿", iso2: "nz",     primaryColor: "#00247D", group: "G", venueCountry: "New Zealand" },
  { code: "BEL", name: "Belgium",      flag: "🇧🇪", iso2: "be",     primaryColor: "#EF3340", group: "G", venueCountry: "Belgium" },
  { code: "EGY", name: "Egypt",        flag: "🇪🇬", iso2: "eg",     primaryColor: "#CE1126", group: "G", venueCountry: "Egypt" },
  // Group H
  { code: "ESP", name: "Spain",        flag: "🇪🇸", iso2: "es",     primaryColor: "#AA151B", group: "H", venueCountry: "Spain" },
  { code: "CPV", name: "Cape Verde",   flag: "🇨🇻", iso2: "cv",     primaryColor: "#003893", group: "H", venueCountry: null },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", iso2: "sa",     primaryColor: "#006C35", group: "H", venueCountry: null },
  { code: "URU", name: "Uruguay",      flag: "🇺🇾", iso2: "uy",     primaryColor: "#5CB8E8", group: "H", venueCountry: "Uruguay" },
  // Group I
  { code: "FRA", name: "France",       flag: "🇫🇷", iso2: "fr",     primaryColor: "#003189", group: "I", venueCountry: "France" },
  { code: "SEN", name: "Senegal",      flag: "🇸🇳", iso2: "sn",     primaryColor: "#00853F", group: "I", venueCountry: "Senegal" },
  { code: "IRQ", name: "Iraq",         flag: "🇮🇶", iso2: "iq",     primaryColor: "#007A3D", group: "I", venueCountry: null },
  { code: "NOR", name: "Norway",       flag: "🇳🇴", iso2: "no",     primaryColor: "#EF2B2D", group: "I", venueCountry: null },
  // Group J
  { code: "ARG", name: "Argentina",    flag: "🇦🇷", iso2: "ar",     primaryColor: "#74ACDF", group: "J", venueCountry: "Argentina" },
  { code: "ALG", name: "Algeria",      flag: "🇩🇿", iso2: "dz",     primaryColor: "#006233", group: "J", venueCountry: null },
  { code: "AUT", name: "Austria",      flag: "🇦🇹", iso2: "at",     primaryColor: "#ED2939", group: "J", venueCountry: null },
  { code: "JOR", name: "Jordan",       flag: "🇯🇴", iso2: "jo",     primaryColor: "#007A3D", group: "J", venueCountry: null },
  // Group K
  { code: "POR", name: "Portugal",     flag: "🇵🇹", iso2: "pt",     primaryColor: "#006600", group: "K", venueCountry: "Portugal" },
  { code: "COD", name: "DR Congo",     flag: "🇨🇩", iso2: "cd",     primaryColor: "#007FFF", group: "K", venueCountry: null },
  { code: "UZB", name: "Uzbekistan",   flag: "🇺🇿", iso2: "uz",     primaryColor: "#1EB53A", group: "K", venueCountry: null },
  { code: "COL", name: "Colombia",     flag: "🇨🇴", iso2: "co",     primaryColor: "#FCD116", group: "K", venueCountry: "Colombia" },
  // Group L
  { code: "ENG", name: "England",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", iso2: "gb-eng", primaryColor: "#012169", group: "L", venueCountry: "England" },
  { code: "HRV", name: "Croatia",      flag: "🇭🇷", iso2: "hr",     primaryColor: "#FF0000", group: "L", venueCountry: "Croatia" },
  { code: "GHA", name: "Ghana",        flag: "🇬🇭", iso2: "gh",     primaryColor: "#006B3F", group: "L", venueCountry: "Ghana" },
  { code: "PAN", name: "Panama",       flag: "🇵🇦", iso2: "pa",     primaryColor: "#DB0032", group: "L", venueCountry: null },
];

export const teamByCode = Object.fromEntries(teams.map((t) => [t.code, t])) as Record<string, Team>;
