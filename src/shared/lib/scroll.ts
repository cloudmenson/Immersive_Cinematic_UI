import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  if (lenis) return () => {};

  const instance = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    touchMultiplier: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis = instance;

  const onScroll = () => ScrollTrigger.update();
  const raf = (time: number) => instance.raf(time * 1000);

  instance.on("scroll", onScroll);

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    instance.off("scroll", onScroll);

    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);

    instance.destroy();

    if (lenis === instance) lenis = null;
  };
};

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);

  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 });

    return;
  }

  el.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
};
