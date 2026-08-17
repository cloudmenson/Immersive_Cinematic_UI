"use client";

import { useEffect, useState } from "react";

export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = ids
      .map((id, index) => ({ el: document.getElementById(id), index }))
      .filter((entry): entry is { el: HTMLElement; index: number } => Boolean(entry.el));

    if (!elements.length) return;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));

        let best = -1;
        let bestRatio = 0;

        elements.forEach(({ el, index }) => {
          const ratio = ratios.get(el) ?? 0;

          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = index;
          }
        });

        if (best !== -1) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
};
