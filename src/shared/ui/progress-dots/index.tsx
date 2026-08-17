"use client";

import { useMemo } from "react";

import { cn, sections, scrollToSection, useActiveSection } from "@/shared";

export const ProgressDots = () => {
  const ids = useMemo(() => sections.map((section) => section.id), []);
  const active = useActiveSection(ids);

  return (
    <nav
      data-chrome
      aria-label="Section navigation"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
    >
      <ul className="flex flex-row items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md md:flex-col md:gap-2 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        {sections.map((section, i) => {
          const isActive = i === active;

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-8 w-8 items-center justify-center md:h-6 md:w-6"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "h-2.5 w-2.5 bg-lime-300 shadow-[0_0_12px_rgba(63,220,119,0.9)]"
                      : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70"
                  )}
                />

                <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-fog/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
