"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "low";

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) return false;

    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();

    return true;
  } catch {
    return false;
  }
};

const detect = (): DeviceTier => {
  if (typeof window === "undefined") return "low";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";
  if (!hasWebGL()) return "low";

  const isPhone =
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(max-width: 1024px)").matches;

  if (isPhone) return "low";

  if ((navigator.hardwareConcurrency ?? 8) <= 4) return "low";

  const conn = (navigator as any).connection;

  if (conn?.saveData) return "low";
  if (conn?.effectiveType && /^(slow-)?2g$|^3g$/.test(conn.effectiveType)) return "low";

  const memory = (navigator as any).deviceMemory;

  if (typeof memory === "number" && memory <= 4) return "low";

  return "high";
};

export const useDeviceTier = (): DeviceTier | null => {
  const [tier, setTier] = useState<DeviceTier | null>(null);

  useEffect(() => {
    setTier(detect());

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setTier(detect());

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return tier;
};

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

export const useIsTouch = () => {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return touch;
};
