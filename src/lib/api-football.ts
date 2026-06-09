/**
 * API-Football client (https://www.api-football.com/)
 * Requires FOOTBALL_API_KEY in .env.local
 * Free tier: 100 requests/day — enough for dev use.
 * World Cup 2026 = league 1, season 2026
 */

const API_BASE = "https://v3.football.api-sports.io";

export function hasApiKey(): boolean {
  return !!process.env.FOOTBALL_API_KEY;
}

async function apiFetch<T = unknown>(path: string): Promise<T | null> {
  const key = process.env.FOOTBALL_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: 300 }, // 5-minute cache
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors && Object.keys(json.errors).length > 0) return null;
    return json as T;
  } catch {
    return null;
  }
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface ApiSquadPlayer {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string; // "Goalkeeper" | "Defender" | "Midfielder" | "Attacker"
  photo: string;    // https://media.api-sports.io/football/players/{id}.png
}

export interface ApiPlayerEntry {
  player: {
    id: number;
    name: string;
    nationality: string;
    photo: string;
  };
  statistics: Array<{
    games: { appearences: number | null; minutes: number | null };
    goals: {
      total: number | null;
      conceded: number | null;
      assists: number | null;
      saves: number | null;
    };
    passes: { accuracy: number | null };
    cards: { yellow: number; yellowred: number; red: number };
  }>;
}

export interface ApiCoach {
  id: number;
  name: string;
  photo: string;    // https://media.api-sports.io/football/coachs/{id}.png
  nationality: string;
  birth?: { date?: string; place?: string; country?: string };
  career: Array<{
    team: { id: number; name: string; logo: string };
    start: string;
    end: string | null;
  }>;
}

// ── Functions ──────────────────────────────────────────────────────────────

type TeamsResp = { response: Array<{ team: { id: number; name: string } }> };

/** Find an API-Football team ID by searching for the country/team name in WC 2026 */
export async function findApiTeamId(teamName: string): Promise<number | null> {
  // Try scoped to WC 2026 first
  const wc = await apiFetch<TeamsResp>(
    `/teams?search=${encodeURIComponent(teamName)}&league=1&season=2026`
  );
  if (wc?.response?.[0]) return wc.response[0].team.id;

  // Fallback: global search
  const all = await apiFetch<TeamsResp>(`/teams?search=${encodeURIComponent(teamName)}`);
  return all?.response?.[0]?.team?.id ?? null;
}

/** Get all players in a team's current squad */
export async function getSquad(teamId: number): Promise<ApiSquadPlayer[]> {
  type R = { response: Array<{ players: ApiSquadPlayer[] }> };
  const data = await apiFetch<R>(`/players/squads?team=${teamId}`);
  return data?.response?.[0]?.players ?? [];
}

/** Get all player stats for a team in WC 2026 (handles pagination) */
export async function getAllPlayerStats(teamId: number): Promise<ApiPlayerEntry[]> {
  type R = { response: ApiPlayerEntry[]; paging: { total: number } };
  const first = await apiFetch<R>(
    `/players?league=1&season=2026&team=${teamId}&page=1`
  );
  if (!first?.response?.length) return [];

  const all = [...first.response];
  const totalPages = Math.min(first.paging?.total ?? 1, 5); // cap at 5 pages

  for (let p = 2; p <= totalPages; p++) {
    const page = await apiFetch<R>(
      `/players?league=1&season=2026&team=${teamId}&page=${p}`
    );
    if (page?.response?.length) all.push(...page.response);
  }

  return all;
}

/** Get head coach for a team */
export async function getCoach(teamId: number): Promise<ApiCoach | null> {
  type R = { response: ApiCoach[] };
  const data = await apiFetch<R>(`/coachs?team=${teamId}`);
  return data?.response?.[0] ?? null;
}

/**
 * Some of our team names differ from API-Football names.
 * Override the search term here when needed.
 */
export const API_SEARCH_OVERRIDE: Record<string, string> = {
  USA:  "United States",
  KOR:  "Korea Republic",
  CIV:  "Cote d'Ivoire",
  COD:  "DR Congo",
  CUW:  "Curaçao",
  CPV:  "Cape Verde",
  KSA:  "Saudi Arabia",
  IRQ:  "Iraq",
  ALG:  "Algeria",
  MAR:  "Morocco",
  TUN:  "Tunisia",
  NOR:  "Norway",
  SUI:  "Switzerland",
  AUT:  "Austria",
  JOR:  "Jordan",
  UZB:  "Uzbekistan",
  HAI:  "Haiti",
  PRY:  "Paraguay",
  PAN:  "Panama",
  CAN:  "Canada",
  TUR:  "Turkey",
  ZAF:  "South Africa",
  BIH:  "Bosnia",
  QAT:  "Qatar",
  CZE:  "Czech Republic",
  SCO:  "Scotland",
  ENG:  "England",
  WAL:  "Wales",
};
