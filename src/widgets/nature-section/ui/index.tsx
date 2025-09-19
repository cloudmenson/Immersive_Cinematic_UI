import { StickySection } from "@/widgets";

interface INatureSection {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

export const NatureSection = ({ id, duration, isBackground }: INatureSection) => {
  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div
        data-fade
        className="relative text-center z-1 w-full h-full flex flex-col items-center justify-center text-pretty"
      >
        <h2 className="mb-6 text-3xl md:text-5xl font-extrabold neon-text bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.9)]">
          The Future is a Garden
        </h2>

        <p className="text-lg md:text-xl leading-relaxed md:max-w-4xl">
          In the distant future, nature is no longer at the periphery of civilization — it has
          become its heart. We live in gardens of light and energy, where every tree is an ally of
          technology, and every ray a reminder of harmony.
        </p>
      </div>
    </StickySection>
  );
};
