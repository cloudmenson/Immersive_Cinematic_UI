"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/shared";

gsap.registerPlugin(ScrollTrigger);

interface IStickySection {
  id: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const StickySection = ({ id, className, contentClassName, children }: IStickySection) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-fade]");

      if (targets.length) {
        gsap.fromTo(
          targets,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "screen relative flex w-full items-center justify-center px-5 py-24",
        className
      )}
    >
      <div data-inner className={cn("relative z-10 w-full", contentClassName)}>
        {children}
      </div>
    </section>
  );
};
