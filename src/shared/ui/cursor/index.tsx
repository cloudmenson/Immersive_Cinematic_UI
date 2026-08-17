"use client";

import { useEffect, useRef, useState } from "react";

import { useIsTouch, usePrefersReducedMotion } from "@/shared";

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      const interactive = (event.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea"
      );

      setActive(Boolean(interactive));
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);

      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    };

    loop();

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("pointermove", onMove);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-lime-300"
      />

      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[60] rounded-full border border-lime-300/60 transition-[width,height,opacity] duration-300 ${
          active ? "h-12 w-12 opacity-100" : "h-8 w-8 opacity-60"
        }`}
      />
    </>
  );
};
