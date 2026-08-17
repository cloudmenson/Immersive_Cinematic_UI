"use client";

import { useEffect, useRef, useState } from "react";

import { useDeviceTier, usePrefersReducedMotion } from "@/shared";

const POSTER = "/media/image/backdrop-poster.webp";

const SOURCES = {
  high: "/media/video/backdrop-1080.mp4",
  low: "/media/video/backdrop-720.mp4",
};

export const Backdrop = () => {
  const tier = useDeviceTier();
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const src = tier && !reducedMotion ? SOURCES[tier] : undefined;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !src) return;

    video.play().catch(() => setReady(false));

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div className="absolute inset-0 scale-105 blur-[2px]">
        <img
          src={POSTER}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {src && (
          <video
            ref={videoRef}
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
            poster={POSTER}
            src={src}
            onCanPlay={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-ink/75" />

      <div className="pointer-events-none absolute inset-0 bg-emerald-950/60 mix-blend-color" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(16,185,129,0.14),transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,7,6,0.92)_95%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
};
