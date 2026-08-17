"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn, timelines, SectionHeading } from "@/shared";
import { StickySection } from "@/widgets";

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection = ({ id }: { id: string }) => {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current;

    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-event]"),
        { opacity: 0, y: 50 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );

      gsap.fromTo(
        el.querySelector("[data-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 70%", scrub: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <StickySection id={id} contentClassName="mx-auto max-w-5xl">
      <SectionHeading
        index="02"
        eyebrow="Timeline"
        title="A Century of Balance"
        className="mb-8 md:mb-10"
      />

      <ol ref={listRef} className="relative space-y-3 pl-8 md:space-y-3 md:pl-0">
        <span
          data-line
          aria-hidden="true"
          className="absolute left-[5px] top-2 h-full w-px origin-top bg-gradient-to-b from-lime-400 via-lime-400/50 to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        {timelines.map((event, i) => (
          <li
            key={event.year}
            data-event
            className={cn(
              "relative flex w-full",
              i % 2 === 0 ? "md:justify-start" : "md:justify-end"
            )}
          >
            <span
              aria-hidden="true"
              className="absolute -left-8 top-6 h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_14px_rgba(63,220,119,0.9)] md:left-1/2 md:-translate-x-1/2"
            />

            <div className="panel panel-hover w-full rounded-2xl p-4 sm:p-5 md:w-[47%]">
              <div className="flex items-baseline gap-3">
                <p className="neon-text text-xl font-extrabold text-lime-300 sm:text-2xl">
                  {event.year}
                </p>

                <span className="h-px flex-1 bg-white/10" />
              </div>

              <h3 className="mb-1.5 mt-1.5 text-sm font-bold uppercase tracking-[0.2em] text-white">
                {event.title}
              </h3>

              <p className="text-[13px] leading-relaxed text-fog/75">{event.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </StickySection>
  );
};
