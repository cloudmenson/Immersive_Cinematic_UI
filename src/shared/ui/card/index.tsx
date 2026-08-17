"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn, usePrefersReducedMotion } from "@/shared";

interface ICard {
  video: string;
  poster: string;
  title: string;
  index?: number;
  className?: string;
  middleTitle: string;
  description: string;
}

const CORNERS = "rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg";

export const Card = ({
  video,
  poster,
  title,
  index = 0,
  className,
  middleTitle,
  description,
}: ICard) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;

    if (!el) return;

    if (inView && !reducedMotion) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, reducedMotion]);

  return (
    <motion.article
      ref={wrapRef}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className={cn(
        "group relative shrink-0 overflow-hidden border border-white/12 bg-ink",
        "transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-lime-400/60",
        CORNERS,
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-80 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {inView && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster={poster}
            src={video}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 via-45% to-ink/20" />

        <div className="pointer-events-none absolute inset-0 bg-lime-950/25 mix-blend-color" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 lg:p-7">
        <span className="absolute left-6 top-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-lime-400/50 bg-ink/60 font-mono text-[11px] text-lime-300 backdrop-blur-sm lg:left-7 lg:top-7">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-shadow-deep text-xl font-extrabold uppercase leading-tight tracking-[0.06em] text-white lg:text-2xl">
          {title}
        </h3>

        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-lime-300">
          {middleTitle}
        </p>

        <span className="my-4 h-px w-full bg-gradient-to-r from-lime-400/60 via-lime-400/20 to-transparent" />

        <p className="text-sm leading-relaxed text-fog/80">{description}</p>
      </div>
    </motion.article>
  );
};
