import { venues } from "@/data/venues";
import { VenuesTable } from "@/components/VenuesTable";

export const metadata = {
  title: "Venues | World Cup NYC 2026",
  description:
    "1,000+ NYC-area venues for the 2026 FIFA World Cup — watch parties, the Five Borough Winners Special $26 deal, fan bars, and more.",
};

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<{ countries?: string }>;
}) {
  const params = await searchParams;
  const initialCountries = params.countries
    ? params.countries.split(",").map(decodeURIComponent).filter(Boolean)
    : [];

  const totalWithDeal    = venues.filter(v => v.dealDetails).length;
  const totalWithCountry = venues.filter(v => v.country).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">

        {/* Header */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
          NYC 2026 World Cup
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Venues
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Every bar, restaurant, fan zone, and watch venue we&apos;ve tracked for the 2026 FIFA
          World Cup in New York. Includes all{" "}
          <span className="text-emerald-400 font-medium">Five Borough Winners Special</span>{" "}
          participants offering $26 deals, plus watch-party venues from watchworldcup.nyc.
          Filter by borough, neighborhood, venue type, or country affiliation.
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-white">{venues.length.toLocaleString()}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">Total venues</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-emerald-400">{totalWithDeal.toLocaleString()}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">With $26 deal</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-white">{totalWithCountry.toLocaleString()}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500">Country affiliations</span>
          </div>
        </div>

        {/* Interactive table */}
        <div className="mt-10">
          <VenuesTable venues={venues} initialCountries={initialCountries} />
        </div>

        {/* Attribution */}
        <p className="mt-12 text-xs leading-relaxed text-slate-600">
          Sources: NYC Tourism + Conventions (Five Borough Winners Special), watchworldcup.nyc.
          Addresses sourced from nyctourism.com venue pages. Always confirm details directly with
          the venue. World Cup NYC is not affiliated with FIFA, NYC Tourism + Conventions, or the
          NYNJ Host Committee.
        </p>
      </div>
    </main>
  );
}
