"use client";

import { useState } from "react";

interface Props {
  src: string;
  name: string;
  size?: "sm" | "lg";
}

export function PlayerPhoto({ src, name, size = "sm" }: Props) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const dim = size === "lg" ? "h-24 w-24 text-2xl" : "h-20 w-20 text-xl";

  if (failed) {
    return (
      <div
        className={`${dim} rounded-full bg-[#7B2FBE]/10 flex items-center justify-center shrink-0`}
      >
        <span className={`font-bold text-[#7B2FBE]`}>{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={`${dim} rounded-full object-cover object-top shrink-0 bg-[#f1f5f9]`}
      onError={() => setFailed(true)}
    />
  );
}
