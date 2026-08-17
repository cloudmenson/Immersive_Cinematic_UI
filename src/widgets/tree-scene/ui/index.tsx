"use client";

import { useEffect, useRef, useState } from "react";

import { cn, useDeviceTier } from "@/shared";

import type { TreeSceneHandle } from "../lib/scene";

export const TreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = useDeviceTier();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (tier !== "high" || !containerRef.current) return;

    const container = containerRef.current;

    let handle: TreeSceneHandle | null = null;
    let cancelled = false;
    let queued = false;
    let max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const remeasure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const onScroll = () => {
      if (queued || !handle) return;

      queued = true;

      requestAnimationFrame(() => {
        queued = false;

        handle?.setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      handle?.setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1
      );
    };

    import("../lib/scene").then(({ createTreeScene }) => {
      if (cancelled) return;

      handle = createTreeScene(container);

      handle.ready.then(() => !cancelled && setVisible(true));

      onScroll();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", remeasure);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    });

    return () => {
      cancelled = true;

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("pointermove", onPointerMove);

      handle?.dispose();
    };
  }, [tier]);

  if (tier !== "high") return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        visible ? "opacity-70" : "opacity-0"
      )}
    />
  );
};
