export type Stage = "group" | "ro32" | "ro16" | "final";

export interface Match {
  id: number;
  date: string;
  kickoffET: string;
  homeTeam: string;
  awayTeam: string;
  stage: Stage;
  group: string | null;
  matchNumber: number;
}

export const matches: Match[] = [
  {
    id: 1,
    matchNumber: 7,
    date: "2026-06-13T22:00:00Z",
    kickoffET: "6:00 PM ET",
    homeTeam: "BRA",
    awayTeam: "MAR",
    stage: "group",
    group: "C",
  },
  {
    id: 2,
    matchNumber: 17,
    date: "2026-06-16T19:00:00Z",
    kickoffET: "3:00 PM ET",
    homeTeam: "FRA",
    awayTeam: "SEN",
    stage: "group",
    group: "I",
  },
  {
    id: 3,
    matchNumber: 41,
    date: "2026-06-23T00:00:00Z",
    kickoffET: "8:00 PM ET",
    homeTeam: "NOR",
    awayTeam: "SEN",
    stage: "group",
    group: "I",
  },
  {
    id: 4,
    matchNumber: 56,
    date: "2026-06-25T20:00:00Z",
    kickoffET: "4:00 PM ET",
    homeTeam: "ECU",
    awayTeam: "GER",
    stage: "group",
    group: "E",
  },
  {
    id: 5,
    matchNumber: 67,
    date: "2026-06-27T21:00:00Z",
    kickoffET: "5:00 PM ET",
    homeTeam: "PAN",
    awayTeam: "ENG",
    stage: "group",
    group: "L",
  },
  {
    id: 6,
    matchNumber: 77,
    date: "2026-06-30T21:00:00Z",
    kickoffET: "5:00 PM ET",
    homeTeam: "TBD",
    awayTeam: "TBD",
    stage: "ro32",
    group: null,
  },
  {
    id: 7,
    matchNumber: 91,
    date: "2026-07-05T20:00:00Z",
    kickoffET: "4:00 PM ET",
    homeTeam: "TBD",
    awayTeam: "TBD",
    stage: "ro16",
    group: null,
  },
  {
    id: 8,
    matchNumber: 104,
    date: "2026-07-19T19:00:00Z",
    kickoffET: "3:00 PM ET",
    homeTeam: "TBD",
    awayTeam: "TBD",
    stage: "final",
    group: null,
  },
];
