import { fanZones } from "@/data/fan-zones";
import { FanZoneGrid } from "@/components/FanZoneGrid";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Fan Zones & Viewing Hubs | World Cup NYC 2026",
  description:
    "Where to watch the World Cup with a crowd — official fan festivals, ticketed fan hubs, and major watch party venues across the NYC area.",
};

export default function FanZonesPage() {
  return (
    <main className="min-h-screen bg-[#040A18] text-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Fan Zones &amp; Viewing Hubs
        </h1>
        <p className="mt-4 max-w-3xl text-base text-[#8898C0] sm:text-lg">
          Where to watch the World Cup with a crowd — official fan festivals, ticketed
          fan hubs, and major watch party venues across the NYC area.
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6070A0]">
          <strong className="text-[#8898C0]">Official fan zones</strong> are FIFA-sanctioned
          events produced by the NYNJ Host Committee with live match broadcasts and
          programmed activations.{" "}
          <strong className="text-[#8898C0]">Fan hubs</strong> are ticketed venue experiences
          — expect a dedicated setup and confirmed viewing, but they&apos;re not always
          free.{" "}
          <strong className="text-[#8898C0]">Watch parties</strong> are bar or community
          events where a venue screens matches for fans — usually free or low-cost, with
          varying levels of organization.
        </p>

        {/* Grid + filter (client component) */}
        <div className="mt-12">
          <FanZoneGrid zones={fanZones} />
        </div>

        {/* Closing section */}
        <div className="mt-20 rounded-xl border border-[#162845] bg-[#0C1830]/50 px-6 py-8">
          <h2 className="text-xl font-bold text-white">Know a fan zone we missed?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8898C0]">
            We&apos;re crowd-sourcing the most complete list of World Cup viewing spots in NYC.
            If you know of a bar, restaurant, park, or venue hosting watch parties, let us
            know.
          </p>
          <Button
            asChild
            className="mt-4 bg-[#7B2FBE] text-white hover:bg-[#7B2FBE]/80"
          >
            <a href="mailto:hello@worldcupnyc.com">Email us</a>
          </Button>

          <p className="mt-6 text-xs text-[#4D5F82]">
            Source:{" "}
            <a
              href="https://nynjfwc26.com/fan-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#8898C0]"
            >
              NYNJ Host Committee official fan events page
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
