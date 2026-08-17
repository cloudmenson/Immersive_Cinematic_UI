"use client";

import { cn, usePrefersReducedMotion } from "@/shared";

interface IMarquee {
  items: readonly string[];
  className?: string;
  speed?: number;
}

export const Marquee = ({ items, className, speed = 32 }: IMarquee) => {
  const reducedMotion = usePrefersReducedMotion();
  const track = [...items, ...items];

  return (
    <div
      data-chrome
      className={cn(
        "relative flex overflow-hidden border-y border-white/10 bg-black/25 py-4",
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          !reducedMotion && "animate-marquee"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 text-xs font-semibold uppercase tracking-[0.3em] text-fog/55"
          >
            {item}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-lime-400/70" />
          </span>
        ))}
      </div>
    </div>
  );
};
