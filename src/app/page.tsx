"use client";

import { useEffect } from "react";

import { Cursor, Grain, Preloader, ProgressDots, ScrollProgress, initSmoothScroll } from "@/shared";
import {
  Backdrop,
  TreeScene,
  SiteHeader,
  HeroSection,
  CraftSection,
  OutroSection,
  NatureSection,
  EnergySection,
  TimelineSection,
} from "@/widgets";

export default function Home() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <Preloader />
      <Cursor />
      <Grain />
      <ScrollProgress />
      <SiteHeader />

      <div className="pointer-events-none fixed inset-0 z-0">
        <Backdrop />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <TreeScene />
      </div>

      <main id="main" className="relative z-10">
        <ProgressDots />

        <HeroSection id="hero" />
        <NatureSection id="nature" />
        <TimelineSection id="timeline" />
        <EnergySection id="energy" />
        <CraftSection id="craft" />
        <OutroSection id="outro" />
      </main>
    </>
  );
}
