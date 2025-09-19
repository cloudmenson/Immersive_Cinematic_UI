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
        id: id,
        pin: true,
        trigger: el,
        end: "+=250%",
        anticipatePin: 1,
        start: "top top",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      el.querySelectorAll("[data-fade]"),
      { y: 100, scale: 0.6, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
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
      className={cn("relative min-h-screen w-full overflow-hidden px-5", className)}
    >
      {children}

      {isBackground && <Background />}
    </section>
  );
};
