import { motion } from "framer-motion";

import { cn } from "@/shared";

interface IPolygonCard {
  src: string;
  mp4: string;
  title: string;
  className?: string;
  middleTitle: string;
  description: string;
}

export const PolygonCard = ({
  src,
  mp4,
  title,
  className,
  middleTitle,
  description,
}: IPolygonCard) => {
  return (
    <motion.div
      viewport={{ once: false, amount: 0.3 }}
      whileInView={{ y: 0, scale: 1, opacity: 1 }}
      initial={{ y: 100, scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.8, ease: "backOut" }}
      className={cn("relative z-2, overflow-hidden", className)}
    >
      <div className="p-[20px] relative z-1 w-full h-full text-center flex flex-col items-center justify-between text-pretty border border-[#343434] rounded-tl-4xl rounded-br-4xl rounded-tr-lg rounded-bl-lg">
        <div className="z-1">
          <h2 className="mb-4 font-semibold uppercase tracking-widest neon-text xl:text-2xl 2xl:text-4xl">
            {title}
          </h2>

          <div className="text-[#eaeaea] font-mono sm:text-sm xl:text-base 2xl:text-xl">
            {middleTitle}
          </div>
        </div>

        <p className="z-1 text-gray-300 leading-relaxed text-[#eaeaea] mt-auto sm:text-sm xl:text-base 2xl:text-xl">
          {description}
        </p>

        {src && (
          <div className="w-full h-full absolute inset-0 z-0 rounded-tl-4xl rounded-br-4xl rounded-tr-lg rounded-bl-lg overflow-hidden">
            <video
              loop
              muted
              autoPlay
              src={src}
              playsInline
              className="w-full h-full object-cover grayscale rounded-tl-4xl rounded-br-4xl rounded-tr-lg rounded-bl-lg"
            >
              <source src={src} type="video/webm" />
              <source src={mp4} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
