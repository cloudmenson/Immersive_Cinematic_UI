"use client";

import { motion } from "framer-motion";

import { cn } from "@/shared";

interface IRevealText {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const RevealText = ({ text, className, delay = 0, as = "span" }: IRevealText) => {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={cn("inline-flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden py-[0.08em] pr-[0.28em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
