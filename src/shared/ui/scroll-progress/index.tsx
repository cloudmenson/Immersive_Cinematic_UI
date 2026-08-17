"use client";

import { useScrollProgress } from "@/shared";

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      data-chrome
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-white/5"
    >
      <div
        className="neon-bar h-full origin-left shadow-[0_0_12px_rgba(63,220,119,0.8)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
