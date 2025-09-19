import { Button } from "@/shared";
import { StickySection } from "@/widgets";

interface IFooterCTA {
  id: string;
  duration?: number;
  isBackground?: boolean;
}

export const FooterCTA = ({ id, duration, isBackground }: IFooterCTA) => {
  return (
    <StickySection id={id} duration={duration} isBackground={isBackground}>
      <div
        data-fade
        className="flex flex-col w-full h-full items-center justify-center z-1 gap-5 text-center"
      >
        <h3 className="mb-4 text-4xl font-bold neon-text">Ready for more?</h3>

        <p className="mb-8 text-2xl text-[#eaeaea]">
          Explore the code, deploy, and watch the walkthrough.
        </p>

        <Button text="View" onClick={() => null} />
      </div>
    </StickySection>
  );
};
