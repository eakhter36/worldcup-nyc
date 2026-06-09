"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Schedule",  href: "/schedule" },
  { label: "Transit",   href: "/transit" },
  { label: "Fan Zones", href: "/fan-zones" },
  { label: "Venues",    href: "/venues" },
  { label: "Map",       href: "/map" },
];

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const isActive = useIsActive();

  return (
    <header className="sticky top-0 z-50 border-b border-[#162845] bg-[#040A18]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Wordmark + logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/6557938f75ff26001dd04342.jpg"
            alt="FIFA World Cup 2026"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-lg font-bold text-white">
            World Cup <span className="text-[#C9FF00]">NYC</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                isActive(href)
                  ? "font-semibold text-[#C9FF00]"
                  : "text-[#8898C0] hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open navigation menu"
              className="rounded-md p-1.5 text-[#8898C0] hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 border-[#162845] bg-[#040A18] p-0"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col pt-14">
              <nav className="flex flex-col gap-1 px-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive(href)
                        ? "bg-[#162845] font-semibold text-[#C9FF00]"
                        : "text-[#8898C0] hover:bg-[#0C1830] hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
