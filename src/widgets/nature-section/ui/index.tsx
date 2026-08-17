"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/shared";
import { StickySection } from "@/widgets";

const STATS = [
  { value: "100%", label: "Renewable", note: "Grid powered by sun, wind and tide" },
  { value: "0", label: "Waste", note: "Every output re-enters the loop" },
  { value: "∞", label: "Possibility", note: "Growth measured in what survives" },
];

export const NatureSection = ({ id }: { id: string }) => (
  <StickySection id={id} contentClassName="mx-auto max-w-6xl">
    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
      <SectionHeading
        index="01"
        eyebrow="Vision"
        title="The Future is a Garden"
        lead="Nature is no longer at the edge of civilisation — it is the centre of it. We live in gardens of light and energy, where every tree is an ally of technology and every ray a reminder of balance."
      />

      <div className="flex flex-col gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="panel panel-hover flex items-center gap-6 rounded-2xl p-5 sm:p-6"
          >
            <span className="neon-text w-24 shrink-0 text-4xl font-extrabold sm:text-5xl">
              {stat.value}
            </span>

            <span className="h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-lime-400/60 to-transparent" />

            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                {stat.label}
              </span>

              <span className="mt-1 block text-sm text-fog/70">{stat.note}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </StickySection>
);
