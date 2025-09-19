"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

import firstBgLayer from "@/../public/media/image/sun-layer.webp";
import secondBgLayer from "@/../public/media/image/bg-layer.webp";

export const Preloader = ({ children }: { children: React.ReactNode }) => {
  const { progress } = useProgress();

  return (
    <div className="relative w-full h-screen">
      <AnimatePresence>
        {progress < 100 && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center text-white z-50"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-no-repeat bg-cover z-[40]"
              style={{
                backgroundImage: `url(${firstBgLayer.src})`,
              }}
            />

            <div aria-hidden="true" className="absolute inset-0 bg-black/50 z-[41]" />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-no-repeat bg-cover z-[45]"
              style={{
                backgroundImage: `url(${secondBgLayer.src})`,
              }}
            />

            <div className="relative z-50 flex flex-col items-center">
              <motion.p
                initial={{ x: -300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0 }}
                className="mb-4 neon-text text-3xl font-bold uppercase mb-10"
              >
                Immersive Cinematic UI
              </motion.p>

              <div className="w-64 h-1 bg-gray-700 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  className="h-1 neon-bar"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>

              <p className="mt-2 neon-text font-medium text-sm">{Math.floor(progress)}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};
