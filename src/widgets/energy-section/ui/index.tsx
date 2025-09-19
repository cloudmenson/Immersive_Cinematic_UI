"use client";

import { StickySection } from "@/widgets";
import { energy, Card } from "@/shared";

interface IFutureEnergySection {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

export const EnergySection = ({ id, duration, isBackground }: IFutureEnergySection) => {
  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div className="flex flex-col lg:flex-row w-full h-full items-center justify-center z-10 gap-1 md:gap-2 lg:gap-8">
        {energy.map((card) => (
          <Card
            key={card.id}
            mp4={card.mp4}
            src={card.src}
            title={card.title}
            middleTitle={card.middleTitle}
            description={card.description}
            className="w-[92vw] h-[135vw] p-[20px] md:my-[40px] md:w-[25vw] md:h-[100%] lg:p-[40px] lg:w-[25vw] lg:h-[35.5vw]"
          />
        ))}
      </div>
    </StickySection>
  );
};
