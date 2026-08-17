"use client";

import { useEffect, useState } from "react";

const MAX_WAIT_MS = 3500;

export const useBootProgress = (posterSrc?: string) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    let current = 0;

    const set = (value: number) => {
      if (!alive) return;

      current = Math.max(current, Math.min(100, value));

      setProgress(current);

      if (current >= 100) setDone(true);
    };

    const tasks: Promise<unknown>[] = [];

    if ("fonts" in document) tasks.push(document.fonts.ready);

    if (posterSrc) {
      tasks.push(
        new Promise<void>((resolve) => {
          const img = new Image();

          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = posterSrc;
        })
      );
    }

    const creep = window.setInterval(() => set(current + 5), 80);

    let settled = 0;

    tasks.forEach((task) =>
      Promise.resolve(task).finally(() => {
        settled += 1;

        set((settled / tasks.length) * 90);
      })
    );

    const finish = () => set(100);
    const timeout = window.setTimeout(finish, MAX_WAIT_MS);

    Promise.allSettled(tasks).then(finish);

    return () => {
      alive = false;

      window.clearInterval(creep);
      window.clearTimeout(timeout);
    };
  }, [posterSrc]);

  return { progress, done };
};
