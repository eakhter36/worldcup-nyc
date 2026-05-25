# Adding New Deals

Deals live in `src/data/deals.ts` as a plain TypeScript array. No database, no API — just edit the file and redeploy.

## Quick steps

1. Open `src/data/deals.ts`
2. Add a new object to the bottom of the `deals` array (see template below)
3. Run `npm run dev` and navigate to `/deals` to confirm it appears and filters correctly
4. Commit and push — Vercel deploys automatically

---

## Field reference

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Slug: lowercase, hyphens, no spaces. Format: `venue-name-neighborhood` |
| `name` | `string` | Restaurant or bar name, exactly as it appears publicly |
| `neighborhood` | `string` | Neighborhood name (e.g. `"Astoria"`, `"Harlem"`) |
| `borough` | `string` | One of: `"Manhattan"` `"Brooklyn"` `"Queens"` `"Bronx"` `"Staten Island"` |
| `cuisine` | `string` | Free text (e.g. `"Mexican"`, `"Korean BBQ"`, `"Brewery"`) |
| `dealType` | `string` | One of: `"food"` `"drink"` `"prix-fixe"` `"combo"` |
| `dealDescription` | `string` | Short description of the offer. Use `"$26 Five Borough Winners Special — details at venue"` when specifics are unknown |
| `address` | `string \| null` | Full street address, or `null` if unknown |
| `website` | `string \| null` | Full URL including `https://`, or `null` |
| `notes` | `string \| null` | Any caveats, hours, reservation info, etc. — or `null` |
| `source` | `"official" \| "user-submitted"` | See sourcing rules below |
| `dateAdded` | `string` | ISO date the entry was added, e.g. `"2026-05-25"` |

---

## Generating an ID

Format: `[venue-slug]-[neighborhood-slug]`

Rules:
- All lowercase
- Spaces → hyphens
- Drop apostrophes and special characters
- Keep it short but globally unique within the array

Examples:
- Red Rooster in Harlem → `red-rooster-harlem`
- La Baraka in Little Neck → `la-baraka-little-neck`
- Armondo's in Jackson Heights → `armondos-jackson-heights`

---

## Template

```ts
{
  id: "venue-name-neighborhood",
  name: "Venue Name",
  neighborhood: "Neighborhood",
  borough: "Queens",
  cuisine: "Cuisine Type",
  dealType: "food",
  dealDescription: "$26 Five Borough Winners Special — details at venue",
  address: null,
  website: null,
  notes: null,
  source: "official",
  dateAdded: "2026-05-25",
},
```

---

## Sourcing rules

**`"official"`** — Use when the entry is confirmed via:
- The NYC Mayor's office announcement
- Eater NY's official coverage
- The nyctourism.com directory (once live)
- The venue's own website or social media explicitly naming the program

**`"user-submitted"`** — Use for tips sent via the `/deals` email form. Always note the source in the `notes` field (e.g. `"Tip via email — unverified"`). Upgrade to `"official"` once you've confirmed against a published source.

---

## Filling in missing details later

When a deal is added early (before full details are available), set `address`, `website`, and `notes` to `null`. To update later:

1. Find the entry by `id` in the `deals` array
2. Replace `null` with the real value
3. Update `dealDescription` if the actual offer differs from the placeholder text

---

## Helper functions (available throughout the app)

```ts
getDealsByBorough("Queens")   // → Deal[]
getDealsByCuisine("Korean")   // → Deal[]
getUniqueCuisines()            // → sorted string[] of all cuisines
getDealCounts()                // → { Manhattan: 2, Queens: 2, ... }
```
