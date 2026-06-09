"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

interface Props {
  targetDate: string;
  matchLabel: string;
}

export function CountdownTimer({ targetDate, matchLabel }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => compute(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(compute(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs",  value: timeLeft.hours },
    { label: "Min",  value: timeLeft.minutes },
    { label: "Sec",  value: timeLeft.seconds },
  ];

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-sm uppercase tracking-widest text-[#8898C0]">
        Next match · {matchLabel}
      </p>
      <div className="flex gap-4">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="w-16 rounded-lg bg-[#162845] py-3 text-center font-mono text-3xl font-bold tabular-nums text-[#C9FF00]">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-[#6070A0]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
