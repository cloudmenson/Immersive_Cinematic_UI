"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/shared";

import { Background } from "./background";

gsap.registerPlugin(ScrollTrigger);

interface IStickySection {
  id?: string;
  duration?: number;
  className?: string;
  isBackground?: boolean;
  children: React.ReactNode;
}

export const StickySection = ({
  id,
  children,
  className,
  duration = 2,
  isBackground = true,
}: IStickySection) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        pin: true,
        scrub: 0.6,
        trigger: el,
        start: "top top",
        end: "+=200%",
        snap: {
          snapTo: 1,
          duration: 0.6,
          ease: "power1.inOut",
        },
      },
    });

    tl.fromTo(
      el.querySelectorAll("[data-fade]"),
      { scale: 0.8, opacity: 0.2 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out",
      },
      0.2
    );

    return () => {
      tl.scrollTrigger?.kill();

      tl.kill();
    };
  }, [duration]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative h-[100svh] w-full overflow-hidden px-5", className)}
    >
      {children}

      {isBackground && <Background />}
    </section>
  );
};
