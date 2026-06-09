import Link from "next/link";

const PAGE_LINKS = [
  { label: "Teams",     href: "/teams" },
  { label: "Schedule",  href: "/schedule" },
  { label: "Transit",   href: "/transit" },
  { label: "Fan Zones", href: "/fan-zones" },
  { label: "Deals",     href: "/deals" },
];

const OFFICIAL_LINKS = [
  { label: "FIFA World Cup 2026",  href: "https://www.fifa.com/worldcup" },
  { label: "NYNJ Host Committee",  href: "https://nynjfwc26.com" },
  { label: "NYC Tourism",          href: "https://www.nyctourism.com" },
  { label: "NJ Transit",           href: "https://www.njtransit.com" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Col 1 — Wordmark + logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/6557938f75ff26001dd04342.jpg"
                alt="FIFA World Cup 2026"
                width={40}
                height={40}
                className="h-10 w-10 object-contain rounded"
              />
              <p className="text-lg font-bold text-[#0f172a]">
                World Cup <span className="text-[#7B2FBE]">NYC</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[#64748b]">
              A free guide to the 8 FIFA World Cup 2026 matches at MetLife
              Stadium and everything happening across NYC this summer.
            </p>
          </div>

          {/* Col 2 — Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
              Pages
            </h3>
            <ul className="mt-3 space-y-2">
              {PAGE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Official Sources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
              Official Sources
            </h3>
            <ul className="mt-3 space-y-2">
              {OFFICIAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-[#e2e8f0] pt-6 text-xs text-[#94a3b8]">
          © {year} World Cup NYC · Not affiliated with FIFA
        </div>
      </div>
    </footer>
  );
}
