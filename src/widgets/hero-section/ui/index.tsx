import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
import { StickySection } from "@/widgets";

import { Title } from "./title";
import { Button, sections } from "@/shared";

interface IHeroSection {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);

  if (el) {
    gsap.to(window, {
      duration: 1,
      ease: "power2.inOut",
      scrollTo: { y: el, offsetY: 0 },
    });
  }
};

export const HeroSection = ({ id, duration, isBackground }: IHeroSection) => {
  const currentIndex = sections.indexOf(id);
  const nextId =
    currentIndex !== -1 && currentIndex < sections.length - 1 ? sections[currentIndex + 1] : "";

  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div className="relative gap-20 md:gap-50 z-10 flex flex-col w-full h-full items-center justify-center text-center pt-30 sm:pt-0">
        <div className="flex flex-col gap-2 items-center">
          <Title />

          <div className="uppercase text-md tracking-[5px] px-6 py-3 w-fit bg-green-700/10 font-semibold">
            Explore New Paths.
          </div>
        </div>

        <Button text="Explore" onClick={() => nextId && scrollToSection(nextId)} />
      </div>
    </StickySection>
  );
};
