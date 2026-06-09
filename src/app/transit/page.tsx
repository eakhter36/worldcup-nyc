import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface Route {
  title: string;
  badge: string;
  cost: string;
  time: string;
  bestFor: string;
  keyFacts: string[];
  howItWorks: string[];
}

const routes: Route[] = [
  {
    title: "NJ Transit Rail",
    badge: "Best value · Most reliable",
    cost: "$98 round trip",
    time: "~25–35 min Penn Station → MetLife (plus security buffer)",
    bestFor: "Most NYC fans",
    keyFacts: [
      "NYC fans from all five boroughs MUST depart from NY Penn Station",
      "Tickets are ONLY sold via the NJ Transit mobile app — not at stations, not at ticket machines, not online elsewhere",
      "You must hold a valid World Cup match ticket to buy a transit ticket",
      "Capacity capped at 40,000 per matchday — buy early",
      "Tickets have specific boarding time windows; arrive in your window",
      "Trains run from 4 hours before kickoff to 3 hours after final whistle",
    ],
    howItWorks: [
      "Download the NJ Transit mobile app and buy your round-trip ticket in advance",
      "Arrive at NY Penn Station within your assigned boarding window",
      "Take the train to Secaucus Junction (~10 min)",
      "Follow signage to transfer to the dedicated stadium shuttle train (no extra fare, included in your ticket)",
      "Shuttle drops you at MetLife Stadium",
    ],
  },
  {
    title: "Official Shuttle Bus",
    badge: "Cheapest option",
    cost: "$20 round trip (reduced from $80; existing $80 holders get a $60 refund)",
    time: "30–60 min depending on traffic",
    bestFor: "Budget-conscious fans, or fans staying in Midtown",
    keyFacts: [
      "Pickup from three Midtown NYC locations: Port Authority Bus Terminal, Midtown East (east of Grand Central), and Midtown North — exact addresses sent to ticket holders",
      "20% of seats reserved for New York residents",
      "Capacity: 18,000 seats for 5 matches, 12,000 for the other 3",
      "Tickets sold via the official World Cup transportation portal",
    ],
    howItWorks: [
      "Buy a shuttle ticket in advance via the FIFA / NYNJ Host Committee transit portal",
      "Arrive at your assigned pickup location at the assigned time",
      "Direct ride to MetLife Stadium",
      "Return buses queue at the stadium after the match",
    ],
  },
  {
    title: "Premium Parking at American Dream Mall",
    badge: "Driving option",
    cost: "From $225 per vehicle, advance purchase required",
    time: "25–90+ min from Manhattan depending on traffic and route",
    bestFor: "Groups of 3–4 splitting cost, fans driving in from out of town",
    keyFacts: [
      "This is the ONLY parking option for match days — there is no general parking at MetLife Stadium itself",
      "Must be purchased in advance; will sell out",
      "American Dream Mall is approximately a 1-mile walk to the stadium — wear comfortable shoes",
      "Expect severe traffic on Route 3 and the NJ Turnpike, especially 2–3 hours before kickoff",
    ],
    howItWorks: [
      "Purchase a parking pass in advance via the American Dream World Cup parking portal",
      "Allow at least 2 hours from Manhattan; longer for late afternoon kickoffs",
      "Park at American Dream, then walk ~1 mile to the stadium entrance",
      "Plan your return: post-match traffic can add 60–90 min to your drive home",
    ],
  },
  {
    title: "Rideshare (Uber / Lyft)",
    badge: "Most flexible",
    cost: "Highly variable — $50–150+ each way with surge",
    time: "30–90 min depending on traffic",
    bestFor: "Late-arriving fans, groups splitting the cost",
    keyFacts: [
      "Rideshare drop-off is at Meadowlands Racing and Entertainment (the sportsbook/horse track) — NOT at the stadium itself",
      "From the drop-off, it's approximately a 1-mile walk to MetLife",
      "Capacity for ~6,000 fans on match days",
      "Severe surge pricing expected 1–2 hours before and immediately after matches",
    ],
    howItWorks: [
      "Request a ride to the Meadowlands Racing and Entertainment drop-off zone",
      "Walk ~1 mile to MetLife Stadium",
      "For the return, consider walking to a different pickup spot or using the official shuttle/rail to avoid post-match surge",
    ],
  },
];

const timingTips = [
  "Plan to arrive at the stadium at least 90 minutes before kickoff",
  "From Manhattan, allow a minimum of 2 hours door-to-door (Penn Station to your seat), 3 hours for high-demand matches like the Final",
  "Rail and shuttle tickets have specific boarding windows — miss yours and you may not be allowed on",
  "Post-match: expect 30–60 min waits for return transit; consider staying near the stadium for 30 min after final whistle to let the initial rush clear",
];

const whatToBring = [
  "Your World Cup match ticket (digital, in the FIFA app)",
  "Your transit ticket (in the NJ Transit app or shuttle portal)",
  "Clear bag only — no backpacks (strict bag policy)",
  "Cards or mobile pay only — MetLife is a cashless venue",
  "Sunscreen, water bottle (empty, refill inside), portable charger",
];

export default function TransitPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
          Getting There
        </h1>
        <p className="mt-4 max-w-3xl text-base text-[#64748b] sm:text-lg">
          Getting to MetLife Stadium from NYC requires advance planning. There&apos;s no
          parking at the stadium, walking is prohibited, and all transit tickets must be
          purchased in advance via official channels. NYC fans must use Penn Station for
          rail travel. Here are your four options.
        </p>

        {/* Warning Alert */}
        <Alert variant="destructive" className="mt-8 border-red-800 bg-red-950/60 text-red-200">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">
            <strong>Walking to MetLife Stadium is prohibited on match days.</strong> Private
            charter buses are not permitted. All transit tickets must be purchased in
            advance — there are no walk-up options.
          </AlertDescription>
        </Alert>

        {/* Route Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {routes.map((route, i) => (
            <Card key={i} className="border-[#e2e8f0] bg-white text-[#0f172a]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-bold text-white">
                    {route.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-[#f1f5f9] text-[#475569] text-xs"
                  >
                    {route.badge}
                  </Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="text-[#64748b]">Cost: </span>
                    <span className="font-semibold text-[#7B2FBE]">{route.cost}</span>
                  </p>
                  <p>
                    <span className="text-[#64748b]">Time: </span>
                    <span className="text-[#334155]">{route.time}</span>
                  </p>
                  <p>
                    <span className="text-[#64748b]">Best for: </span>
                    <span className="text-[#334155]">{route.bestFor}</span>
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    Key facts
                  </h3>
                  <ul className="space-y-1.5">
                    {route.keyFacts.map((fact, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[#334155]">
                        <span className="mt-0.5 shrink-0 text-[#94a3b8]">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    How it works
                  </h3>
                  <ol className="space-y-1.5">
                    {route.howItWorks.map((step, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[#334155]">
                        <span className="shrink-0 font-mono text-[#94a3b8]">
                          {j + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Match Day Tips */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">Match day timing</h2>
            <ul className="space-y-3">
              {timingTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#334155]">
                  <span className="mt-0.5 shrink-0 text-[#7B2FBE]">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">What to bring</h2>
            <ul className="space-y-3">
              {whatToBring.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#334155]">
                  <span className="mt-0.5 shrink-0 text-[#7B2FBE]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Last updated */}
        <p className="mt-16 text-xs text-[#94a3b8]">
          Last updated May 25, 2026. Transit pricing and capacity can change — verify on
          the NJ Transit mobile app and the official FIFA World Cup 2026 NYNJ Host
          Committee site before purchasing.
        </p>
      </div>
    </main>
  );
}
