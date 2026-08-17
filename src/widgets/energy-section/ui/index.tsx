"use client";

import { energy, Card, SectionHeading } from "@/shared";
import { StickySection } from "@/widgets";

export const EnergySection = ({ id }: { id: string }) => (
  <StickySection id={id} className="px-0" contentClassName="mx-auto w-full max-w-7xl">
    <SectionHeading
      index="03"
      eyebrow="Pillars"
      title="Three Pillars"
      lead="The systems that carry a civilisation from extraction to symbiosis."
      className="mb-12 px-5"
    />

    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
      {energy.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          video={card.video}
          poster={card.poster}
          title={card.title}
          middleTitle={card.middleTitle}
          description={card.description}
          className="h-[27rem] w-[80vw] snap-center sm:h-[29rem] sm:w-[60vw] md:w-[44vw] lg:h-[30rem] lg:w-auto"
        />
      ))}
    </div>

    <p className="px-5 text-[10px] uppercase tracking-[0.35em] text-fog/40 lg:hidden">
      Swipe to explore →
    </p>
  </StickySection>
);
