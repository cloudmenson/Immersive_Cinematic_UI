import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  function raf(time: number) {
    lenis.raf(time);

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (value !== undefined) lenis.scrollTo(value);

      return lenis.scroll;
    },

    getBoundingClientRect() {
      return { top: 0, left: 0, width: innerWidth, height: innerHeight };
    },
  });

  return lenis;
};
