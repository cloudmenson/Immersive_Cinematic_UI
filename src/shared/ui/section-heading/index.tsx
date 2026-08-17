"use client";

import { motion } from "framer-motion";

import { cn, RevealText } from "@/shared";

interface ISectionHeading {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: ISectionHeading) => (
  <div className={cn(align === "center" && "flex flex-col items-center text-center", className)}>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-5 flex items-center gap-4"
    >
      <span className="font-mono text-xs tracking-[0.2em] text-lime-400">{index}</span>

      <span className="h-px w-10 bg-gradient-to-r from-lime-400 to-transparent" />

      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-fog/60">
        {eyebrow}
      </span>
    </motion.div>

    <RevealText
      as="h2"
      text={title}
      className={cn(
        "text-[2rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl",
        "[text-shadow:0_2px_30px_rgba(0,0,0,0.9)]",
        align === "center" && "justify-center"
      )}
    />

    {lead && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-6 max-w-2xl text-base leading-relaxed text-fog/85 md:text-lg",
          "[text-shadow:0_1px_16px_rgba(0,0,0,0.9)]"
        )}
      >
        {lead}
      </motion.p>
    )}
  </div>
);
