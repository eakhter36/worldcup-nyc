import Image from "next/image";
import Link from "next/link";

const PAGE_LINKS = [
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
    <footer className="border-t border-[#162845] bg-[#040A18]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Col 1 — Wordmark + logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/6557938f75ff26001dd04342.jpg"
                alt="FIFA World Cup 2026"
                width={40}
                height={40}
                className="object-contain"
              />
              <p className="text-lg font-bold text-white">
                World Cup <span className="text-[#C9FF00]">NYC</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[#6070A0]">
              A free guide to the 8 FIFA World Cup 2026 matches at MetLife
              Stadium and everything happening across NYC this summer.
            </p>
          </div>

          {/* Col 2 — Pages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6070A0]">
              Pages
            </h3>
            <ul className="mt-3 space-y-2">
              {PAGE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#8898C0] transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Official Sources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6070A0]">
              Official Sources
            </h3>
            <ul className="mt-3 space-y-2">
              {OFFICIAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8898C0] transition-colors hover:text-white"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-[#162845] pt-6 text-xs text-[#4D5F82]">
          © {year} World Cup NYC · Not affiliated with FIFA
        </div>
      </div>
    </footer>
  );
}
