import { StickySection } from "@/widgets";

import { Title } from "./title";

interface IHeroSection {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

export const HeroSection = ({ id, duration, isBackground }: IHeroSection) => {
  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div className="relative z-10 flex h-full items-start sm:items-center justify-center text-center pt-30 sm:pt-0">
        <Title />
      </div>
    </StickySection>
  );
};
