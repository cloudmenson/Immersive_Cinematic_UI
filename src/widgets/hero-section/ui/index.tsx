import gsap from "gsap";
import { motion } from "framer-motion";
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

  if (!el) return;

  const extra = Math.round(window.innerHeight * 0.06);

  if (el) {
    gsap.to(window, {
      duration: 1,
      overwrite: "auto",
      ease: "power4.inOut",
      scrollTo: { y: el, offsetY: -extra },
      onUpdate: () => ScrollTrigger.update(),
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
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2 items-center"
          variants={{
            hidden: { opacity: 0.4, y: 600 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { staggerChildren: 0.2, ease: "easeOut", duration: 1 },
            },
          }}
        >
          <Title />

          <p className="uppercase text-md tracking-[5px] px-6 py-3 w-fit bg-green-700/10 font-semibold">
            Explore New Paths.
          </p>
        </motion.div>

        <Button text="Explore" onClick={() => nextId && scrollToSection(nextId)} />
      </div>
    </StickySection>
  );
};
