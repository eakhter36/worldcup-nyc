import Link from "next/link";

const PAGE_LINKS = [
  { label: "Schedule",  href: "/#schedule" },
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
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Col 1 — Wordmark */}
          <div>
            <p className="text-lg font-bold text-white">
              World Cup <span className="text-emerald-400">NYC</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              A free guide to the 8 FIFA World Cup 2026 matches at MetLife
              Stadium and everything happening across NYC this summer.
            </p>
          </div>

          {/* Col 2 — Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pages
            </h3>
            <ul className="mt-3 space-y-2">
              {PAGE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Official Sources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Official Sources
            </h3>
            <ul className="mt-3 space-y-2">
              {OFFICIAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-600">
          © {year} World Cup NYC · Not affiliated with FIFA
        </div>
      </div>
    </footer>
  );
}
