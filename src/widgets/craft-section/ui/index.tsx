"use client";

import { motion } from "framer-motion";

import { metrics, stack, Marquee, SectionHeading } from "@/shared";
import { StickySection } from "@/widgets";

export const CraftSection = ({ id }: { id: string }) => (
  <StickySection id={id} className="px-0" contentClassName="mx-auto w-full max-w-6xl">
    <SectionHeading
      index="04"
      eyebrow="Craft"
      title="Built for Speed"
      lead="Cinematic does not have to mean heavy. Every asset here was measured, re-encoded and budgeted."
      className="mb-10 px-5"
    />

    <Marquee items={stack} className="mb-10" />

    <div className="grid gap-3 px-5 sm:grid-cols-2 sm:gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="panel panel-hover rounded-2xl p-5 sm:p-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-fog/55">
            {metric.label}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-base text-red-300/50 line-through">{metric.from}</span>

            <span className="text-lime-400/70">→</span>

            <span className="neon-text text-3xl font-extrabold text-white">{metric.to}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-fog/70">{metric.note}</p>
        </motion.div>
      ))}
    </div>
  </StickySection>
);
