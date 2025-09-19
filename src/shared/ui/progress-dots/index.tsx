"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { cn, sections } from "@/shared";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const ProgressDots = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const tops = sections.map((id) => {
        const el = document.getElementById(id);

        return el ? Math.abs(el.getBoundingClientRect().top) : Infinity;
      });

      setActive(tops.indexOf(Math.min(...tops)));
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;

    const extra = Math.round(window.innerHeight * 0.06);

    gsap.to(window, {
      duration: 1,
      overwrite: "auto",
      ease: "power4.inOut",
      scrollTo: { y: el, offsetY: -extra },
      onUpdate: () => ScrollTrigger.update(),
    });
  };

  return (
    <div className="fixed z-50 bottom-10 left-1/2 -translate-x-1/2 md:bottom-[unset] md:left-[unset] md:right-4 md:top-1/2 md:-translate-y-1/2">
      <div className="relative flex gap-3 md:gap-1.5 flex-row md:flex-col md:gap-1 items-center">
        <motion.div
          animate={{ top: active * 12 }}
          style={{ position: "absolute" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 blur-lg opacity-70 z-5"
        />

        {sections.map((id, i) => (
          <button
            key={id}
            onClick={() => go(id)}
            aria-label={`Go to ${id}`}
            className={cn(
              "relative z-50 flex items-center justify-center h-4 w-4 rounded-full transition cursor-pointer focus:outline-none",
              i === active
                ? "scale-125 bg-white/80 border-[0.5px] border-green-700"
                : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};
