"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option]
    );
  }

  const summary =
    selected.length === 0
      ? "All"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-xs uppercase tracking-wider text-[#6070A0]">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-md border border-[#1E3155] bg-[#0C1830] px-3 py-2 text-sm text-[#A8BADC] focus:border-[#7B2FBE] focus:outline-none hover:border-[#2A4070]"
        >
          <span className={selected.length === 0 ? "text-[#4D5F82]" : "text-[#A8BADC]"}>
            {summary}
          </span>
          <ChevronDown className={`ml-2 h-4 w-4 shrink-0 text-[#6070A0] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[#1E3155] bg-[#0C1830] shadow-xl">
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => { onChange([]); setOpen(false); }}
                className="w-full px-3 py-2 text-left text-xs text-[#6070A0] hover:text-[#A8BADC] border-b border-[#162845]"
              >
                Clear selection
              </button>
            )}
            {options.map((option) => {
              const checked = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#8898C0] hover:bg-[#162845] hover:text-white text-left"
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? "border-[#C9FF00] bg-[#7B2FBE]" : "border-[#1E3155] bg-transparent"}`}>
                    {checked && <Check className="h-3 w-3 text-white" />}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
