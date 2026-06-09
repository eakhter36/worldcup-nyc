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
      <label className="text-xs uppercase tracking-wider text-[#64748b]">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#334155] focus:border-[#7B2FBE] focus:outline-none hover:border-[#cbd5e1]"
        >
          <span className={selected.length === 0 ? "text-[#94a3b8]" : "text-[#334155]"}>
            {summary}
          </span>
          <ChevronDown className={`ml-2 h-4 w-4 shrink-0 text-[#94a3b8] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[#e2e8f0] bg-white shadow-lg">
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => { onChange([]); setOpen(false); }}
                className="w-full px-3 py-2 text-left text-xs text-[#64748b] hover:text-[#334155] border-b border-[#f1f5f9]"
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
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] text-left"
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? "border-[#C9FF00] bg-[#7B2FBE]" : "border-[#e2e8f0] bg-transparent"}`}>
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
