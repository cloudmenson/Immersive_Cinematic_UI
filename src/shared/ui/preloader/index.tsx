"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useBootProgress } from "@/shared";

const POSTER = "/media/image/backdrop-poster.webp";

export const Preloader = () => {
  const { progress, done } = useBootProgress(POSTER);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-chrome
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ink"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${POSTER})` }}
          />

          <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />

          <div className="relative flex flex-col items-center px-6">
            <p className="neon-text mb-10 text-center text-2xl font-extrabold uppercase tracking-[0.3em] sm:text-3xl">
              Immersive
              <br />
              Cinematic UI
            </p>

            <div className="h-[3px] w-56 overflow-hidden rounded bg-white/10 sm:w-72">
              <motion.div
                className="neon-bar h-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>

            <p className="mt-4 font-mono text-xs tracking-[0.3em] text-lime-300/80">
              {String(Math.floor(progress)).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
