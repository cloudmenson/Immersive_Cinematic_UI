import { motion } from "framer-motion";

export const Title = () => {
  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      className="neon-text uppercase flex flex-col text-[10vw] sm:text-[6vw] lg:text-[5vw] font-extrabold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
      variants={{
        hidden: { opacity: 0.4, y: 800 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { staggerChildren: 0.2, ease: "easeOut", duration: 1.3 },
        },
      }}
    >
      <span>Immersive</span>

      <span className="flex gap-4">
        <span>Cinematic</span>

        <span>Limits</span>
      </span>
    </motion.h1>
  );
};
