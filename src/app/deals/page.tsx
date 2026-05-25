import { deals, getUniqueCuisines } from "@/data/deals";
import { DealsFilter } from "@/components/DealsFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Five Borough Winners Special | World Cup NYC 2026",
  description:
    "$26 World Cup dining deals across NYC — tracking confirmed participants in the Five Borough Winners Special program.",
};

function daysUntil(isoDate: string): number {
  const target = new Date(isoDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((target.getTime() - now.getTime()) / 86_400_000));
}

interface StatCardProps {
  value: string | number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900 px-5 py-4 text-center">
      <span className="text-2xl font-extrabold text-white">{value}</span>
      <span className="mt-0.5 text-xs uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}

const MAILTO_BODY = encodeURIComponent(
  "Restaurant name:\nBorough:\nNeighborhood:\nDeal description:\nSource (where you saw it):\n"
);
const MAILTO_SUBJECT = encodeURIComponent("New Five Borough Winners Special submission");
const SUBMIT_HREF = `mailto:hello@worldcupnyc.com?subject=${MAILTO_SUBJECT}&body=${MAILTO_BODY}`;

export default function DealsPage() {
  const totalDeals = deals.length;
  const boroughsCount = new Set(deals.map((d) => d.borough)).size;
  const cuisinesCount = getUniqueCuisines().length;
  const daysToKickoff = daysUntil("2026-06-11");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-16">

        {/* Header */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
          NYC Tourism + Conventions Program
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Five Borough Winners Special
        </h1>
        <p className="mt-2 text-lg font-semibold text-emerald-400">
          $26 World Cup Deals Across NYC
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          NYC&apos;s official citywide dining program for the 2026 World Cup. Hundreds of
          restaurants and bars across all five boroughs are offering $26 specials —
          prix-fixe menus, food-and-drink combos, signature cocktails, or anything in
          between — throughout the tournament from June 11 to July 19. The complete
          official directory will publish at nyctourism.com closer to kickoff. We&apos;re
          tracking confirmed participants here as they&apos;re announced.
        </p>

        {/* Stats bar */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard value={totalDeals} label="Deals tracked" />
          <StatCard value={boroughsCount} label="Boroughs" />
          <StatCard value={cuisinesCount} label="Cuisines" />
          <StatCard value={daysToKickoff} label="Days to kickoff" />
        </div>

        {/* Filters + grid (client) */}
        <div className="mt-12">
          <DealsFilter deals={deals} />
        </div>

        {/* Submit-a-deal */}
        <Card className="mt-16 border-slate-800 bg-slate-900/60">
          <CardContent className="px-6 py-8">
            <h2 className="text-xl font-bold text-white">Know a spot we missed?</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              We&apos;re tracking confirmed participants here as they&apos;re announced. If you&apos;ve
              seen a restaurant or bar promoting their $26 Five Borough Winners Special,
              send it our way.
            </p>
            <Button
              asChild
              className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <a href={SUBMIT_HREF}>Submit a deal</a>
            </Button>
          </CardContent>
        </Card>

        {/* Attribution */}
        <p className="mt-10 text-xs leading-relaxed text-slate-600">
          Last updated May 25, 2026. Confirmed participants sourced from the NYC Mayor&apos;s
          office announcement and Eater NY. The full official directory will publish at{" "}
          <a
            href="https://www.nyctourism.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400"
          >
            nyctourism.com
          </a>
          . Always confirm pricing and availability with the restaurant directly. World
          Cup NYC is not affiliated with the Five Borough Winners Special program, NYC
          Tourism + Conventions, or the NYNJ Host Committee.
        </p>
      </div>
    </main>
  );
}
