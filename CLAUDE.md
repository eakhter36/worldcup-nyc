# World Cup NYC
A free, NYC-focused hub for the 2026 FIFA World Cup. Focused on the 
8 matches at MetLife Stadium plus NYC fan zones, deals, and watch 
parties.

## Stack
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS + shadcn/ui (slate base color)
- Data lives in src/data/*.ts as typed exports for v1 (no DB yet)
- Deployed to Vercel

## Conventions
- All components in src/components/ as named exports
- Use Server Components by default; only add "use client" when needed
- Dates stored as ISO strings, displayed in ET

## Adding deals
When the user provides a restaurant for src/data/deals.ts, always set source to "user-submitted" unless they explicitly say it's from the official NYC Tourism list. Always set dateAdded to today's date. Use kebab-case slug for id derived from name + neighborhood.
