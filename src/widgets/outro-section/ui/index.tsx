"use client";

import { Button, RevealText, site } from "@/shared";
import { StickySection } from "@/widgets";

export const OutroSection = ({ id }: { id: string }) => (
  <StickySection id={id} contentClassName="mx-auto w-full max-w-4xl text-center">
    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-lime-300/80">
      05 — End of Journey
    </p>

    <RevealText
      as="h2"
      text="Ready for more?"
      className="text-shadow-deep justify-center text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
    />

    <p
      data-fade
      className="text-shadow-deep mx-auto mt-7 max-w-xl text-base text-fog/80 md:text-lg"
    >
      Explore the source, read how it was built, or get in touch.
    </p>

    <div data-fade className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button text="View Source" href={site.repo} />

      <Button text="GitHub" href={site.github} variant="ghost" />
    </div>

    <footer className="panel mt-16 flex flex-col items-center gap-2 rounded-2xl px-6 py-7 text-xs text-fog/55">
      <p className="font-bold uppercase tracking-[0.35em] text-fog/80">{site.name}</p>

      <p>
        Designed and built by{" "}
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer noopener"
          className="text-lime-300 underline-offset-4 transition-colors hover:underline"
        >
          {site.author}
        </a>
      </p>

      <p className="mt-1 text-fog/40">Next.js · three.js · GSAP · Lenis</p>
    </footer>
  </StickySection>
);
