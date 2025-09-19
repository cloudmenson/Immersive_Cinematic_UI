"use client";

import { useEffect } from "react";

import { ProgressDots, initSmoothScroll } from "@/shared";
import {
  TreeScene,
  FooterCTA,
  HeroSection,
  VideoBackdrop,
  NatureSection,
  EnergySection,
} from "@/widgets";

export default function Home() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 z-0">
        <VideoBackdrop
          src="/media/video/video-backdrop.webm"
          mp4="/media/video/video-backdrop.mp4"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-10">
        <TreeScene />
      </div>

      <div className="relative z-10">
        <ProgressDots />

        <HeroSection id="hero" />

        <NatureSection id="nature" />

        <EnergySection id="energy" />

        <FooterCTA id="footerCTA" />
      </div>
    </main>
  );
}
