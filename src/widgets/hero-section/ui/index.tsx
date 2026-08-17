"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button, site, scrollToSection } from "@/shared";

const REVEAL = {
  hidden: { opacity: 0, y: 70 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const HeroSection = ({ id }: { id: string }) => (
  <section
    id={id}
    className="screen relative flex w-full flex-col items-center justify-center px-5 text-center"
  >
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={REVEAL}
      className="mb-8 flex items-center gap-4"
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-lime-400" />

      <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-lime-300 sm:text-xs">
        Scroll-Driven Experience
      </span>

      <span className="h-px w-8 bg-gradient-to-l from-transparent to-lime-400" />
    </motion.div>

    <motion.h1
      custom={1}
      initial="hidden"
      animate="visible"
      variants={REVEAL}
      className="neon-text text-shadow-deep flex flex-col text-[14vw] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] sm:text-[9.5vw] lg:text-[7.5vw]"
    >
      <span>Immersive</span>
      <span>Cinematic UI</span>
    </motion.h1>

    <motion.p
      custom={2}
      initial="hidden"
      animate="visible"
      variants={REVEAL}
      className="text-shadow-deep mt-8 max-w-lg text-sm leading-relaxed text-fog/85 sm:text-base"
    >
      A journey into a future where technology finally learns to grow instead of consume.
    </motion.p>

    <motion.div
      custom={3}
      initial="hidden"
      animate="visible"
      variants={REVEAL}
      className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
    >
      <Button text="Explore" onClick={() => scrollToSection("nature")} />

      <Button text="View Code" href={site.repo} variant="ghost" />
    </motion.div>

    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="absolute bottom-32 left-1/2 -translate-x-1/2 md:bottom-14"
    >
      <ChevronDown className="h-5 w-5 animate-bounce text-lime-300/70" />
    </motion.div>
  </section>
);
