"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/shared";

interface IButton {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "ghost";
}

const BASE =
  "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl " +
  "px-8 py-4 text-xs font-bold uppercase tracking-[2px] transition-all duration-300 sm:px-10 sm:text-sm";

const VARIANTS = {
  solid:
    "border-2 border-lime-400/70 bg-gradient-to-b from-lime-600/30 to-lime-600/5 text-lime-100 " +
    "shadow-[0_0_24px_rgba(34,197,94,0.35)] hover:border-lime-400 hover:shadow-[0_0_44px_rgba(34,197,94,0.55)]",
  ghost: "border border-white/25 text-fog hover:border-lime-400/70 hover:text-lime-100",
};

export const Button = ({ text, href, onClick, className, variant = "solid" }: IButton) => {
  const Icon = href ? ArrowUpRight : ArrowRight;
  const classes = cn(BASE, VARIANTS[variant], className);

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(34,197,94,0.16)_0,rgba(34,197,94,0.16)_1px,transparent_1px,transparent_3px)] opacity-60"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-lime-300/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />

      <span className="relative z-10 flex items-center gap-2">
        {text}
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
