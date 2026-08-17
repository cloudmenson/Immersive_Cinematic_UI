"use client";

import { useEffect, useState } from "react";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let queued = false;

    const remeasure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const onScroll = () => {
      if (queued) return;

      queued = true;

      requestAnimationFrame(() => {
        queued = false;

        setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  return progress;
};
