"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn, timelines } from "@/shared";
import { StickySection } from "@/widgets";

gsap.registerPlugin(ScrollTrigger);

interface ITimelineSection {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

export const TimelineSection = ({ id, duration, isBackground }: ITimelineSection) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".timeline-item");

      gsap.fromTo(
        items,
        { opacity: 0, y: 100 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div ref={containerRef} className="relative w-full h-full px-4 px-[20px] sm:px-20 lg:px-60">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-green-500/40 -translate-x-1/2 hidden md:block" />

        <div className="py-20 md:py-32">
          <div className="space-y-15">
            {timelines.map((event, i) => (
              <div
                key={event.year}
                className={cn(
                  "timeline-item relative w-full flex",
                  "flex-col md:flex-row",
                  i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                )}
              >
                <div className="w-full md:w-[45%] bg-green-900/20 border border-green-500/40 rounded-xl p-6 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <h3 className="text-2xl font-bold text-green-300">{event.year}</h3>

                  <h4 className="text-lg font-semibold mb-1">{event.title}</h4>

                  <p className="text-sm text-[#eaeaea]">{event.desc}</p>
                </div>

                <span className="absolute left-1/2 top-6 w-4 h-4 bg-green-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(34,197,94,0.8)] hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StickySection>
  );
};
