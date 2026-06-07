export type Stage = "group" | "ro32" | "ro16" | "qf" | "sf" | "third" | "final";

export interface Match {
  id: number;
  date: string;        // ISO UTC
  kickoffET: string;   // e.g. "3:00 PM ET"
  homeTeam: string;
  awayTeam: string;
  stage: Stage;
  group: string | null;
  matchNumber: number;
  stadium: string;
  city: string;
}

export const matches: Match[] = [
  // ── Group A ──────────────────────────────────────────────────────────────
  { id:  1, matchNumber:  1, date: "2026-06-11T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "MEX", awayTeam: "ZAF", stage: "group", group: "A", stadium: "Estadio Azteca",           city: "Mexico City" },
  { id:  2, matchNumber:  2, date: "2026-06-12T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "KOR", awayTeam: "CZE", stage: "group", group: "A", stadium: "Estadio Akron",             city: "Guadalajara" },
  { id:  3, matchNumber:  3, date: "2026-06-18T16:00:00Z", kickoffET: "12:00 PM ET", homeTeam: "CZE", awayTeam: "ZAF", stage: "group", group: "A", stadium: "Mercedes-Benz Stadium",     city: "Atlanta" },
  { id:  4, matchNumber:  4, date: "2026-06-19T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "MEX", awayTeam: "KOR", stage: "group", group: "A", stadium: "Estadio Akron",             city: "Guadalajara" },
  { id:  5, matchNumber:  5, date: "2026-06-25T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "CZE", awayTeam: "MEX", stage: "group", group: "A", stadium: "Estadio Azteca",           city: "Mexico City" },
  { id:  6, matchNumber:  6, date: "2026-06-25T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "ZAF", awayTeam: "KOR", stage: "group", group: "A", stadium: "Estadio BBVA",             city: "Monterrey" },
  // ── Group B ──────────────────────────────────────────────────────────────
  { id:  7, matchNumber:  7, date: "2026-06-12T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "CAN", awayTeam: "BIH", stage: "group", group: "B", stadium: "BMO Field",               city: "Toronto" },
  { id:  8, matchNumber:  8, date: "2026-06-13T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "QAT", awayTeam: "SUI", stage: "group", group: "B", stadium: "Levi's Stadium",           city: "San Francisco" },
  { id:  9, matchNumber:  9, date: "2026-06-18T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "SUI", awayTeam: "BIH", stage: "group", group: "B", stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 10, matchNumber: 10, date: "2026-06-18T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "CAN", awayTeam: "QAT", stage: "group", group: "B", stadium: "BC Place",                 city: "Vancouver" },
  { id: 11, matchNumber: 11, date: "2026-06-24T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "SUI", awayTeam: "CAN", stage: "group", group: "B", stadium: "BC Place",                 city: "Vancouver" },
  { id: 12, matchNumber: 12, date: "2026-06-24T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "BIH", awayTeam: "QAT", stage: "group", group: "B", stadium: "Lumen Field",             city: "Seattle" },
  // ── Group C ──────────────────────────────────────────────────────────────
  { id: 13, matchNumber: 13, date: "2026-06-13T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "BRA", awayTeam: "MAR", stage: "group", group: "C", stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 14, matchNumber: 14, date: "2026-06-14T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "HAI", awayTeam: "SCO", stage: "group", group: "C", stadium: "Gillette Stadium",         city: "Boston" },
  { id: 15, matchNumber: 15, date: "2026-06-19T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "SCO", awayTeam: "MAR", stage: "group", group: "C", stadium: "Gillette Stadium",         city: "Boston" },
  { id: 16, matchNumber: 16, date: "2026-06-20T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "BRA", awayTeam: "HAI", stage: "group", group: "C", stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  { id: 17, matchNumber: 17, date: "2026-06-24T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "SCO", awayTeam: "BRA", stage: "group", group: "C", stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 18, matchNumber: 18, date: "2026-06-24T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "MAR", awayTeam: "HAI", stage: "group", group: "C", stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  // ── Group D ──────────────────────────────────────────────────────────────
  { id: 19, matchNumber: 19, date: "2026-06-13T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "USA", awayTeam: "PRY", stage: "group", group: "D", stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 20, matchNumber: 20, date: "2026-06-13T04:00:00Z", kickoffET: "12:00 AM ET", homeTeam: "AUS", awayTeam: "TUR", stage: "group", group: "D", stadium: "BC Place",                 city: "Vancouver" },
  { id: 21, matchNumber: 21, date: "2026-06-19T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "USA", awayTeam: "AUS", stage: "group", group: "D", stadium: "Lumen Field",             city: "Seattle" },
  { id: 22, matchNumber: 22, date: "2026-06-20T04:00:00Z", kickoffET: "12:00 AM ET", homeTeam: "TUR", awayTeam: "PRY", stage: "group", group: "D", stadium: "Levi's Stadium",           city: "San Francisco" },
  { id: 23, matchNumber: 23, date: "2026-06-26T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "TUR", awayTeam: "USA", stage: "group", group: "D", stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 24, matchNumber: 24, date: "2026-06-26T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "PRY", awayTeam: "AUS", stage: "group", group: "D", stadium: "Levi's Stadium",           city: "San Francisco" },
  // ── Group E ──────────────────────────────────────────────────────────────
  { id: 25, matchNumber: 25, date: "2026-06-14T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "GER", awayTeam: "CUW", stage: "group", group: "E", stadium: "NRG Stadium",              city: "Houston" },
  { id: 26, matchNumber: 26, date: "2026-06-14T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "CIV", awayTeam: "ECU", stage: "group", group: "E", stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  { id: 27, matchNumber: 27, date: "2026-06-20T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "GER", awayTeam: "CIV", stage: "group", group: "E", stadium: "BMO Field",               city: "Toronto" },
  { id: 28, matchNumber: 28, date: "2026-06-21T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "ECU", awayTeam: "CUW", stage: "group", group: "E", stadium: "Arrowhead Stadium",        city: "Kansas City" },
  { id: 29, matchNumber: 29, date: "2026-06-25T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "ECU", awayTeam: "GER", stage: "group", group: "E", stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 30, matchNumber: 30, date: "2026-06-25T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "CUW", awayTeam: "CIV", stage: "group", group: "E", stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  // ── Group F ──────────────────────────────────────────────────────────────
  { id: 31, matchNumber: 31, date: "2026-06-14T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "NED", awayTeam: "JPN", stage: "group", group: "F", stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 32, matchNumber: 32, date: "2026-06-15T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "SWE", awayTeam: "TUN", stage: "group", group: "F", stadium: "Estadio BBVA",             city: "Monterrey" },
  { id: 33, matchNumber: 33, date: "2026-06-20T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "NED", awayTeam: "SWE", stage: "group", group: "F", stadium: "NRG Stadium",              city: "Houston" },
  { id: 34, matchNumber: 34, date: "2026-06-21T04:00:00Z", kickoffET: "12:00 AM ET", homeTeam: "TUN", awayTeam: "JPN", stage: "group", group: "F", stadium: "Estadio BBVA",             city: "Monterrey" },
  { id: 35, matchNumber: 35, date: "2026-06-25T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "JPN", awayTeam: "SWE", stage: "group", group: "F", stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 36, matchNumber: 36, date: "2026-06-25T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "TUN", awayTeam: "NED", stage: "group", group: "F", stadium: "Arrowhead Stadium",        city: "Kansas City" },
  // ── Group G ──────────────────────────────────────────────────────────────
  { id: 37, matchNumber: 37, date: "2026-06-15T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "BEL", awayTeam: "EGY", stage: "group", group: "G", stadium: "Lumen Field",             city: "Seattle" },
  { id: 38, matchNumber: 38, date: "2026-06-16T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "IRN", awayTeam: "NZL", stage: "group", group: "G", stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 39, matchNumber: 39, date: "2026-06-21T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "BEL", awayTeam: "IRN", stage: "group", group: "G", stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 40, matchNumber: 40, date: "2026-06-22T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "NZL", awayTeam: "EGY", stage: "group", group: "G", stadium: "BC Place",                 city: "Vancouver" },
  { id: 41, matchNumber: 41, date: "2026-06-27T03:00:00Z", kickoffET: "11:00 PM ET", homeTeam: "EGY", awayTeam: "IRN", stage: "group", group: "G", stadium: "Lumen Field",             city: "Seattle" },
  { id: 42, matchNumber: 42, date: "2026-06-27T03:00:00Z", kickoffET: "11:00 PM ET", homeTeam: "NZL", awayTeam: "BEL", stage: "group", group: "G", stadium: "BC Place",                 city: "Vancouver" },
  // ── Group H ──────────────────────────────────────────────────────────────
  { id: 43, matchNumber: 43, date: "2026-06-15T16:00:00Z", kickoffET: "12:00 PM ET", homeTeam: "ESP", awayTeam: "CPV", stage: "group", group: "H", stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  { id: 44, matchNumber: 44, date: "2026-06-15T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "KSA", awayTeam: "URU", stage: "group", group: "H", stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 45, matchNumber: 45, date: "2026-06-21T16:00:00Z", kickoffET: "12:00 PM ET", homeTeam: "ESP", awayTeam: "KSA", stage: "group", group: "H", stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  { id: 46, matchNumber: 46, date: "2026-06-21T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "URU", awayTeam: "CPV", stage: "group", group: "H", stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 47, matchNumber: 47, date: "2026-06-27T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "CPV", awayTeam: "KSA", stage: "group", group: "H", stadium: "NRG Stadium",              city: "Houston" },
  { id: 48, matchNumber: 48, date: "2026-06-27T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "URU", awayTeam: "ESP", stage: "group", group: "H", stadium: "Estadio Akron",            city: "Guadalajara" },
  // ── Group I ──────────────────────────────────────────────────────────────
  { id: 49, matchNumber: 49, date: "2026-06-16T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "FRA", awayTeam: "SEN", stage: "group", group: "I", stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 50, matchNumber: 50, date: "2026-06-16T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "IRQ", awayTeam: "NOR", stage: "group", group: "I", stadium: "Gillette Stadium",         city: "Boston" },
  { id: 51, matchNumber: 51, date: "2026-06-22T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "FRA", awayTeam: "IRQ", stage: "group", group: "I", stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  { id: 52, matchNumber: 52, date: "2026-06-23T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "NOR", awayTeam: "SEN", stage: "group", group: "I", stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 53, matchNumber: 53, date: "2026-06-26T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "NOR", awayTeam: "FRA", stage: "group", group: "I", stadium: "Gillette Stadium",         city: "Boston" },
  { id: 54, matchNumber: 54, date: "2026-06-26T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "SEN", awayTeam: "IRQ", stage: "group", group: "I", stadium: "BMO Field",               city: "Toronto" },
  // ── Group J ──────────────────────────────────────────────────────────────
  { id: 55, matchNumber: 55, date: "2026-06-17T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "ARG", awayTeam: "ALG", stage: "group", group: "J", stadium: "Arrowhead Stadium",        city: "Kansas City" },
  { id: 56, matchNumber: 56, date: "2026-06-17T04:00:00Z", kickoffET: "12:00 AM ET", homeTeam: "AUT", awayTeam: "JOR", stage: "group", group: "J", stadium: "Levi's Stadium",           city: "San Francisco" },
  { id: 57, matchNumber: 57, date: "2026-06-22T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "ARG", awayTeam: "AUT", stage: "group", group: "J", stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 58, matchNumber: 58, date: "2026-06-23T03:00:00Z", kickoffET: "11:00 PM ET", homeTeam: "JOR", awayTeam: "ALG", stage: "group", group: "J", stadium: "Levi's Stadium",           city: "San Francisco" },
  { id: 59, matchNumber: 59, date: "2026-06-28T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "ALG", awayTeam: "AUT", stage: "group", group: "J", stadium: "Arrowhead Stadium",        city: "Kansas City" },
  { id: 60, matchNumber: 60, date: "2026-06-28T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "JOR", awayTeam: "ARG", stage: "group", group: "J", stadium: "AT&T Stadium",             city: "Dallas" },
  // ── Group K ──────────────────────────────────────────────────────────────
  { id: 61, matchNumber: 61, date: "2026-06-17T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "POR", awayTeam: "COD", stage: "group", group: "K", stadium: "NRG Stadium",              city: "Houston" },
  { id: 62, matchNumber: 62, date: "2026-06-18T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "UZB", awayTeam: "COL", stage: "group", group: "K", stadium: "Estadio Azteca",           city: "Mexico City" },
  { id: 63, matchNumber: 63, date: "2026-06-23T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "POR", awayTeam: "UZB", stage: "group", group: "K", stadium: "NRG Stadium",              city: "Houston" },
  { id: 64, matchNumber: 64, date: "2026-06-24T02:00:00Z", kickoffET: "10:00 PM ET", homeTeam: "COL", awayTeam: "COD", stage: "group", group: "K", stadium: "Estadio Akron",            city: "Guadalajara" },
  { id: 65, matchNumber: 65, date: "2026-06-27T23:30:00Z", kickoffET: "7:30 PM ET",  homeTeam: "COL", awayTeam: "POR", stage: "group", group: "K", stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 66, matchNumber: 66, date: "2026-06-27T23:30:00Z", kickoffET: "7:30 PM ET",  homeTeam: "COD", awayTeam: "UZB", stage: "group", group: "K", stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  // ── Group L ──────────────────────────────────────────────────────────────
  { id: 67, matchNumber: 67, date: "2026-06-17T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "ENG", awayTeam: "HRV", stage: "group", group: "L", stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 68, matchNumber: 68, date: "2026-06-17T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "GHA", awayTeam: "PAN", stage: "group", group: "L", stadium: "BMO Field",               city: "Toronto" },
  { id: 69, matchNumber: 69, date: "2026-06-23T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "ENG", awayTeam: "GHA", stage: "group", group: "L", stadium: "Gillette Stadium",         city: "Boston" },
  { id: 70, matchNumber: 70, date: "2026-06-23T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "PAN", awayTeam: "HRV", stage: "group", group: "L", stadium: "BMO Field",               city: "Toronto" },
  { id: 71, matchNumber: 71, date: "2026-06-27T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "PAN", awayTeam: "ENG", stage: "group", group: "L", stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 72, matchNumber: 72, date: "2026-06-27T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "HRV", awayTeam: "GHA", stage: "group", group: "L", stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  // ── Round of 32 ──────────────────────────────────────────────────────────
  { id: 73, matchNumber: 73, date: "2026-06-28T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 74, matchNumber: 74, date: "2026-06-29T20:30:00Z", kickoffET: "4:30 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Gillette Stadium",         city: "Boston" },
  { id: 75, matchNumber: 75, date: "2026-06-30T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Estadio BBVA",             city: "Monterrey" },
  { id: 76, matchNumber: 76, date: "2026-06-29T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "NRG Stadium",              city: "Houston" },
  { id: 77, matchNumber: 77, date: "2026-06-30T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 78, matchNumber: 78, date: "2026-06-30T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 79, matchNumber: 79, date: "2026-07-01T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Estadio Azteca",           city: "Mexico City" },
  { id: 80, matchNumber: 80, date: "2026-07-01T16:00:00Z", kickoffET: "12:00 PM ET", homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  { id: 81, matchNumber: 81, date: "2026-07-02T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Levi's Stadium",           city: "San Francisco" },
  { id: 82, matchNumber: 82, date: "2026-07-01T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Lumen Field",             city: "Seattle" },
  { id: 83, matchNumber: 83, date: "2026-07-02T23:00:00Z", kickoffET: "7:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "BMO Field",               city: "Toronto" },
  { id: 84, matchNumber: 84, date: "2026-07-02T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 85, matchNumber: 85, date: "2026-07-03T03:00:00Z", kickoffET: "11:00 PM ET", homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "BC Place",                 city: "Vancouver" },
  { id: 86, matchNumber: 86, date: "2026-07-03T22:00:00Z", kickoffET: "6:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 87, matchNumber: 87, date: "2026-07-04T01:30:00Z", kickoffET: "9:30 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "Arrowhead Stadium",        city: "Kansas City" },
  { id: 88, matchNumber: 88, date: "2026-07-03T18:00:00Z", kickoffET: "2:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro32", group: null, stadium: "AT&T Stadium",             city: "Dallas" },
  // ── Round of 16 ──────────────────────────────────────────────────────────
  { id: 89, matchNumber: 89, date: "2026-07-04T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "Lincoln Financial Field",  city: "Philadelphia" },
  { id: 90, matchNumber: 90, date: "2026-07-04T17:00:00Z", kickoffET: "1:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "NRG Stadium",              city: "Houston" },
  { id: 91, matchNumber: 91, date: "2026-07-05T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "MetLife Stadium",          city: "East Rutherford" },
  { id: 92, matchNumber: 92, date: "2026-07-06T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "Estadio Azteca",           city: "Mexico City" },
  { id: 93, matchNumber: 93, date: "2026-07-06T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 94, matchNumber: 94, date: "2026-07-07T00:00:00Z", kickoffET: "8:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "Lumen Field",             city: "Seattle" },
  { id: 95, matchNumber: 95, date: "2026-07-07T16:00:00Z", kickoffET: "12:00 PM ET", homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  { id: 96, matchNumber: 96, date: "2026-07-07T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "ro16", group: null, stadium: "BC Place",                 city: "Vancouver" },
  // ── Quarterfinals ─────────────────────────────────────────────────────────
  { id: 97,  matchNumber:  97, date: "2026-07-09T20:00:00Z", kickoffET: "4:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "qf", group: null, stadium: "Gillette Stadium",         city: "Boston" },
  { id: 98,  matchNumber:  98, date: "2026-07-10T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "qf", group: null, stadium: "SoFi Stadium",             city: "Los Angeles" },
  { id: 99,  matchNumber:  99, date: "2026-07-11T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "qf", group: null, stadium: "Hard Rock Stadium",        city: "Miami" },
  { id: 100, matchNumber: 100, date: "2026-07-12T01:00:00Z", kickoffET: "9:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "qf", group: null, stadium: "Arrowhead Stadium",        city: "Kansas City" },
  // ── Semifinals ────────────────────────────────────────────────────────────
  { id: 101, matchNumber: 101, date: "2026-07-14T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "sf", group: null, stadium: "AT&T Stadium",             city: "Dallas" },
  { id: 102, matchNumber: 102, date: "2026-07-15T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "sf", group: null, stadium: "Mercedes-Benz Stadium",    city: "Atlanta" },
  // ── Third-Place ───────────────────────────────────────────────────────────
  { id: 103, matchNumber: 103, date: "2026-07-18T21:00:00Z", kickoffET: "5:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "third", group: null, stadium: "Hard Rock Stadium",    city: "Miami" },
  // ── Final ─────────────────────────────────────────────────────────────────
  { id: 104, matchNumber: 104, date: "2026-07-19T19:00:00Z", kickoffET: "3:00 PM ET",  homeTeam: "TBD", awayTeam: "TBD", stage: "final", group: null, stadium: "MetLife Stadium",       city: "East Rutherford" },
];

export const metlifeMatches = matches.filter((m) => m.stadium === "MetLife Stadium");
